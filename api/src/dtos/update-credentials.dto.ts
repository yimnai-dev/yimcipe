import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

//Update Credentials

export class UpdateCredentialsDto {
  @IsOptional()
  @ApiProperty({
    description: 'This field contains your username',
    example: 'johndoe',
    required: false,
  })
  username!: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'Contains user email',
    example: 'johndoe@gmail.com',
    required: false,
  })
  email!: string;

  @MinLength(8)
  @IsOptional()
  @ApiProperty({
    description: 'This field contains your your password',
    example: 'password',
    required: false,
  })
  password!: string;
}

export default UpdateCredentialsDto;
