import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsIn } from 'class-validator'

export class UpdateRecipeStatusDto {
  @IsIn(['FAVOURITE', 'PERSONAL', 'GENERAL'])
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Contains the new status of the recipe',
    example: 'FAVOURITE',
  })
  status: string
}

export default UpdateRecipeStatusDto
