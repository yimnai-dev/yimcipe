import { Optional } from '@nestjs/common';
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class UpdateRecipeDto {

    @Optional()
    @ApiProperty({
      example: 'Fufu corn and jama jama',
      description: 'Title of a given recipe',
      required: true,
    })
    title: string;

    @Optional()
    @ApiProperty({
      example: 'Fufu corn and jama jama is prepared by.....',
      description: 'Description of the given recipe',
      required: true,
    })
    content: string;

    @IsNotEmpty()
    @ApiProperty({
      example: 'Fufu corn and jama jama is prepared by.....',
      description: 'Description of the given recipe',
      required: true,
    })
    category: string;


}

export default UpdateRecipeDto
