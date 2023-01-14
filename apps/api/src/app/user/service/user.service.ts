import { VerifyUserDto } from './../../../../../../libs/api-interfaces/src/lib/verify-user.dto';
import * as rn from 'random-number'
import { UpdateCredentialsDto } from './../../../../../../libs/api-interfaces/src/lib/update-credentials.dto';
import { UserByIdDto } from './../../../../../../libs/api-interfaces/src/lib/user-by-id.dto';
import { UserRegistrationMechanism } from '../../utils/types/user.type';
import { generateUUID } from './../../utils/cid-generator.util';
import { RegisterUserDto } from '../../../../../../libs/api-interfaces/src/lib/register.dto';
import { encryptPassword } from './../../utils/password.util';
import { User } from './../../models/user.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { SendMailService } from '../../shared/services/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private sendMailService: SendMailService
  ){}

  verifyEmail = async (user: VerifyUserDto, req: Request) => {
    const randomCode = rn.generator({
      min:  10000,
      max:  99999,
      integer: true
    })()
    let payload: {} = {};
    const message = `
    <p>Hey ${user.email},</p>
    <p>Please copy the code below and enter in the form. It expires in 15 minutes after which you would have to verify your email again</p>
    <h1><strong>${randomCode}</strong></h1>
    <p>If you did not request this email you can safely ignore it.</p>`
    const subject = 'Email Verification'
    await this.sendMailService.sendEmail(user.email, subject, message)
    .then((result) => {
      req.session.verificationCode = randomCode
      req.session.verificationEmail = user.email
      setTimeout(() => {
       req.session.destroy((error: Error) => {})
      }, 900000)
      payload = {
        success: true,
        message: result,
        status: HttpStatus.OK
      }
    })
    .catch((error) => {
      payload = {
        success: false,
        message: error,
        status: HttpStatus.BAD_REQUEST
      }
    })
    return {...payload}
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

  async forgotPassword(user: VerifyUserDto, req: Request){
    const userExists = await this.userModel.findOne({where: {email: user.email}})
    if(!userExists){
      return new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    const resetToken = generateUUID()
    await this.userModel.update({ passwordResetToken: resetToken, passwordResetExpires: new Date(Date.now() + 3600000)}, {where: {email: user.email}})
    const passwordResetLink = `http://localhost:3333/api/v1.0/user/auth/reset/${resetToken}`
    const message = `
    <p>Hey ${user.email},</p>
    <p>Please click the link below to reset your email. It expires in one hour after which you would have to verify your email again</p>
    <h1><strong>${passwordResetLink}</strong></h1>
    <p>If you did not request this email you can safely ignore it.</p>

  `
    const subject = 'Reset Password'
    let payload = {};
    await this.sendMailService.sendEmail(user.email, subject, message)
    .then((result) => {
      req.session.verificationEmail = user.email
      req.session.passwordResetLink = passwordResetLink
      payload = {
        success: true,
        message: result,
        status: HttpStatus.OK
      }
    })
    .catch((error) => {
      const payload = {
        success: false,
        message: error,
        status: HttpStatus.BAD_REQUEST
      }
    })
    return payload;
  }

  resetPassword = async (resetLink: string, req: Request) => {
    if(resetLink !== req.session.passwordResetLink){
      return {
        success: false,
        message: 'Invalid Password Reset Link',
        status: HttpStatus.PRECONDITION_FAILED
      }
    }
    const userExists = req.session.verificationEmail && await this.userModel.findOne({where: {email: req.session.verificationEmail}})
    if(!userExists){
      return {
        success: false,
        message: 'Reset link has expired. Ask for another',
        status: HttpStatus.GATEWAY_TIMEOUT
      }
    }
    const resetToken = resetLink.split('/').slice(-1)[0];
    if(resetToken !== userExists.getDataValue('passwordResetToken')){
      return {
        success: false,
        message: 'Invalid reset Token',
        status: HttpStatus.FORBIDDEN
      }
    }
    const passwordResetEnabled = await this.userModel.update({passwordResetToken: null, passwordResetExpires: null, passwordResetPossible: true}, {where: {email: req.session.verificationEmail}});
    if(!passwordResetEnabled){
      return {
        success: false,
        message: 'Permission Denied. Try again later',
        status: HttpStatus.PRECONDITION_FAILED
      }
    }

    return {
      success: true,
      message: 'Password change enabled.',
      status: HttpStatus.CREATED
    }
  }

  changePassword = async (newPass: string, confirmPass: string, email: string) => {
    if(newPass.length < 8 || confirmPass.length < 8){
      return {
        success: false,
        message: 'Password is too short',
        status: HttpStatus.NOT_ACCEPTABLE
      }
    }
    if(newPass !== confirmPass){
      return {
        success: false,
        message: 'Passwords do not match!',
        status: HttpStatus.NOT_ACCEPTABLE
      }
    }
    const encrpytedNewPass = encryptPassword(newPass)
    const changePassword = await this.userModel.update({password: encrpytedNewPass}, {where: {email: email}})
    if(!changePassword){
      return {
        success: false,
        message: 'Could not update password. Try again later',
        status: HttpStatus.EXPECTATION_FAILED
      }
    }
    await this.userModel.update({passwordResetPossible: false}, {where: {email: email}})
    return {
      success: true,
      message: 'Password changed successfully',
      status: HttpStatus.CREATED
    }
  }
}

