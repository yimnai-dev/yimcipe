import { UpdateCredentialsDto } from './../../../../../../libs/api-interfaces/src/lib/update-credentials.dto';
import { UserByIdDto } from './../../../../../../libs/api-interfaces/src/lib/user-by-id.dto';
import { LoginUserDto } from './../../../../../../libs/api-interfaces/src/lib/login.dto';
import { GoogleAuthGuard } from './../guards/google.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { RegisterUserDto } from '../../../../../../libs/api-interfaces/src/lib/register.dto';
import { UserService } from './../service/user.service';
import { Body, Controller, Get, Post, UseGuards, Request, Delete, Param, Query, Put } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users/auth')
export class UserController {

  constructor(private userService: UserService, private authService: AuthService){}

  @Post('register')
  registerUser(
    @Body() user: RegisterUserDto
  ){
    return this.userService.registerUser(user)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(
    @Body() user: LoginUserDto
  ){
    return this.authService.login(user)
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(@Request() req: any){}

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleAuthRedirect(@Request() req: any){
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
}
