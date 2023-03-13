import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CommentDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: '(UUID.V4)',
  })
  commenterId!: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    required: true,
    example: '(UUID.v4)',
  })
  recipeId!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Thanks for this wonderful recipe mehn',
  })
  comment!: string;
}

export default CommentDto;
