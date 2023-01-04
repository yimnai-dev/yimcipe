import { VerifyUserDto } from './../../../../../../libs/api-interfaces/src/lib/verify-user.dto';
import * as rn from 'random-number'
import { UpdateCredentialsDto } from './../../../../../../libs/api-interfaces/src/lib/update-credentials.dto';
import { UserByIdDto } from './../../../../../../libs/api-interfaces/src/lib/user-by-id.dto';
import { UserRegistrationMechanism } from '../../utils/types/user.type';
import { generateUUID } from './../../utils/cid-generator.util';
import { RegisterUserDto } from '../../../../../../libs/api-interfaces/src/lib/register.dto';
import { encryptPassword } from './../../utils/password.util';
import { User } from './../../models/user.model';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MailerService } from '@nestjs-modules/mailer';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private mailerService: MailerService
  ){}

  verifyEmail = async (user: VerifyUserDto, req: Request) => {
    const randomCode = rn.generator({
      min:  10000,
      max:  99999,
      integer: true
    })()
    await this.mailerService.sendMail({
      to: user.email,
      from: 'yimnai.dev@outlook.com',
      subject: 'Verify your email',
      html: `
        <p>Hey ${user.email},</p>
        <p>Please copy the code below and enter in the form. It expires in 15 minutes after which you would have to verify your email again</p>
        <h1><strong>${randomCode}</strong></h1>
        <p>If you did not request this email you can safely ignore it.</p>

      `,
      context: {
        email: user.email,
        verificationCode: randomCode
      }
    })
    .then((result) => {
      req.session.verificationCode = randomCode
      req.session.verificationEmail = user.email
      setTimeout(() => {
       req.session.destroy((error: any) => {})
      }, 900000)
      return {
        success: true,
        message: result,
        status: HttpStatus.OK
      }
    })
    .catch((error) => {
      return {
        success: false,
        message: error,
        status: HttpStatus.BAD_REQUEST
      }
    })
  }


  registerUser = async (user: RegisterUserDto, req: Request) => {
    const userExists = await this.userModel.findOne({where: {email: user.email}})
    if(userExists){
      return {
        success: false,
        message: 'A user with this email already exists',
        status: HttpStatus.EXPECTATION_FAILED
      }
    }
    if(user.password.length < 8){
      return {
        success: false,
        message: 'Password must contain at least 8 characters',
        status: HttpStatus.EXPECTATION_FAILED
      }
    }
    if(!user.username || !user.email || !user.password){
      return {
        success: false,
        message: 'All fields (email, password, username) are required',
        status: HttpStatus.EXPECTATION_FAILED
      }
    }
    const hashedPassword = encryptPassword(user.password)
    const userId = generateUUID()
    if(!user.verificationCode || (+user.verificationCode !== req.session.verificationCode || user.email !== req.session.verificationEmail)){
      return {
        success: false,
        message: 'Verification code does not match or email does not match that used to get verification code',
        status: HttpStatus.BAD_REQUEST
      }
    }
    const payload = {userId: userId, username: user.username, email: user.email, password: hashedPassword, registrationMechanism: UserRegistrationMechanism.LOCAL_SIGNUP}
    const createUser = await this.userModel.create(payload)
    if(createUser){
      return {
        success: true,
        message: 'Successfully created new user',
        status: HttpStatus.CREATED
      }
    }
    return {
      success: false,
      message: 'Could not create user successfully due to an unknown error',
      status: HttpStatus.EXPECTATION_FAILED
    }
  }

  async getAllUsers(){
    const users = await this.userModel.findAll({
      attributes: {
        exclude: ['password'],
      }
    })
    if(!users){
      return {
        success: false,
        message: 'Not users exist yet!',
        status: HttpStatus.NOT_FOUND
      }
    }
    return {
      success: true,
      message: 'Users fetched successfully',
      payload: users
    }
  }

  async deleteUser(user: UserByIdDto){
    const account = await this.userModel.destroy({
      where: {userId: user.userId},
    })
    if(!account){
      return {
        success: false,
        message: 'Could not get User with given ID!',
        status: HttpStatus.NOT_FOUND
      }
    }
    return {
      success: true,
      message: 'User with given ID fetched',
      payload: account
    }
  }

  async updateUser(user: UserByIdDto, data: UpdateCredentialsDto){
    const userExists = await this.userModel.findOne({where: {userId: user.userId}})
    if(!userExists){
      return {
        success: false,
        message: 'User could not be found.',
        status: HttpStatus.NOT_FOUND
      }
    }

    const payload = {
      username: data.username ? data.username : userExists.get('username'),
      email: data.email ? data.email : userExists.get('email'),
      password: data.password ? encryptPassword(data.password) : userExists.get('password')
    }

    const updatedUser = await this.userModel.update(payload, {where: {userId: user.userId}})
    if(!updatedUser){
      return {
        success: false,
        message: 'User could not be updated',
        status: HttpStatus.EXPECTATION_FAILED
      }
    }
  }

}
