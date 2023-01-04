import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from 'class-validator'

export class VerifyUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of user',
    required: true,
    example: 'johndoe@example.com'
  })
  email: string;
}

export default VerifyUserDto
