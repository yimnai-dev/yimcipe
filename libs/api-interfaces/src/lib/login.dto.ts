import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of user',
    required: true,
    example: 'johndoe'
  })
  email!: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description: 'Password of user who wants to log in',
    required: true,
    example: 'password'
  })
  password!: string;
}

export default LoginUserDto
