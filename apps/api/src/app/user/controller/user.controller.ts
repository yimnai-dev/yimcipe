import { VerifyUserDto } from './../../../../../../libs/api-interfaces/src/lib/verify-user.dto';
import { UpdateCredentialsDto } from './../../../../../../libs/api-interfaces/src/lib/update-credentials.dto';
import { UserByIdDto } from './../../../../../../libs/api-interfaces/src/lib/user-by-id.dto';
import { GoogleAuthGuard } from './../guards/google.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { RegisterUserDto } from '../../../../../../libs/api-interfaces/src/lib/register.dto';
import { UserService } from './../service/user.service';
import { Body, Controller, Get, Post, UseGuards, Req, Delete, Query, Put } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('User')  
@Controller('users/auth')
export class UserController {

  constructor(
    private userService: UserService,
    private authService: AuthService){}

  @Post('verify-email')
  verifyEmail(
    @Body() user: VerifyUserDto,
    @Req() req: Request,
    ){
    return this.userService.verifyEmail(user, req);
  }

  @Post('register')
  registerUser(
    @Body() user: RegisterUserDto,
    @Req() req: Request,
  ){
    return this.userService.registerUser(user, req)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(
    @Req() req: any
  ){
    return this.authService.login(req)
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(@Req() req: any){}

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleAuthRedirect(@Req() req: any){
    this.authService.googleLogin(req)
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllUsers(){
    return this.userService.getAllUsers()
  }

  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    example: 'userId (uuid-v4)',
    required: true
  })
  @Delete('delete')
  deleteSingleUser(@Query() user: UserByIdDto){
    return this.userService.deleteUser(user)
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  updateUser(
    @Query() user: UserByIdDto,
    @Body() data: UpdateCredentialsDto
  ){
    return this.userService.updateUser(user, data)
  }

  @Post('forgot')
  sendPasswordResetLink(
    @Body() user: VerifyUserDto,
    @Req() req: Request
  ){
    return this.userService.forgotPassword(user, req)
  }

  @Post('reset')
  resetPasswordStatus(
    @Body() link: {resetLink: string},
    @Req() req: Request
  ){
    return this.userService.resetPassword(link.resetLink, req);
  }

  @Put('change-password')
  changePassword(
    @Body() user: {email: string, newPass: string, confirmPass: string},
    @Body() newPass: string,
    @Body() confirmPass: string
  ){
    return this.userService.changePassword(user.newPass, user.confirmPass, user.email)
  }
}
