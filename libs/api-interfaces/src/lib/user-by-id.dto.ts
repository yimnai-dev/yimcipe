import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator'

export class UserByIdDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: string
}

export default UserByIdDto
