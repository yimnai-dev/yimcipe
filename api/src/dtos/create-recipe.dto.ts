import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RecipeDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Fufu corn and jama jama',
    description: 'Title of a given recipe',
    required: true,
  })
  title!: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Fufu corn and jama jama is prepared by.....',
    description: 'Description of the given recipe',
    required: true,
  })
  content!: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Fufu corn and jama jama is prepared by.....',
    description: 'Description of the given recipe',
    required: true,
  })
  category!: string;
}

export default RecipeDto;
