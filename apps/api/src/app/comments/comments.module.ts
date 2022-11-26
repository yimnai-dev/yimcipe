import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentController } from './controller/comments.controller';
import { CommentService } from './service/comments.service';
import { Comments } from '../models/comments.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Comments])
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentsModule {}
