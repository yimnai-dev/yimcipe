import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator'

export class RecipeByIdDto {
  @IsNotEmpty()
  @ApiProperty()
  recipeId!: string
}

export default RecipeByIdDto
