import { isMatches } from '../../utils/password.util';
import { User } from '../../models/user.model';
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService
  ){}
  validateUser = async (email: string, password: string) => {
    if(password.length < 8){
      return {
        success: false,
        message: 'Password must be longer than 8 characters'
      }
    }
    const user = await this.userModel.findOne({where: {email: email}})
    if(!user){
      return {
        success: false,
        message: 'No user with that email exists!',
        status: HttpStatus.NOT_FOUND
      }
    }
    if(!isMatches(password, user.getDataValue('password'))){
      return {
        success: false,
        message: 'Wrong password entered!'
      }
    }
      const result = {username: user.getDataValue('username'), userId: user.getDataValue('userId'), email: email}
      return result
  }

  async login(req: any) {
    if(req.user.success === false){
      return req.user
    }
    return {
      access_token: this.jwtService.sign(req.user),
      expires_in: '10800'
    };
  }

  googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }
}
