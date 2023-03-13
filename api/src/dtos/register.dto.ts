import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

//Registration

export class RegisterUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'This field contains the user verification code',
    example: '12345',
    required: true,
  })
  verificationCode!: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'This field contains your username',
    example: 'johndoe',
    required: true,
  })
  username!: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Contains user email',
    example: 'johndoe@gmail.com',
    required: true,
  })
  email!: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description: 'This field contains your your password',
    example: 'password',
    required: true,
  })
  password!: string;
}

export default RegisterUserDto;
