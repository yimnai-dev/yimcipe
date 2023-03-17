import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentDto } from '../../../dtos/dto.holder';
import { JwtAuthGuard } from '../../user/guards/jwt-auth.guard';
import { CommentService } from '../service/comments.service';

@ApiTags('Comments')
@Controller('recipes/comments')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentsService: CommentService) {}

  @Post('make-comment')
  makeComment(@Body() commentInfo: CommentDto) {
    return this.commentsService.makeComment(commentInfo);
  }

  @Get('all')
  getAllComments() {
    return this.commentsService.getAllComments();
  }
}
