import { UpdateCredentialsDto } from './../../../../../../libs/api-interfaces/src/lib/update-credentials.dto';
import { UserByIdDto } from './../../../../../../libs/api-interfaces/src/lib/user-by-id.dto';
import { UserRegistrationMechanism } from './../../utils/enums/user.enums';
import { generateUUID } from './../../utils/cid-generator.util';
import { RegisterUserDto } from '../../../../../../libs/api-interfaces/src/lib/register.dto';
import { encryptPassword } from './../../utils/password.util';
import { User } from './../../models/user.model';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ){}

  registerUser = async (user: RegisterUserDto) => {
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
        exclude: ['password']
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
