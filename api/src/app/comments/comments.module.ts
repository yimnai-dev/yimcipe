import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentController } from './controller/comments.controller';
import { CommentService } from './service/comments.service';
import { Comments } from '../models/comments.model';
import { User } from '../models/user.model';
import { Recipe } from '../models/recipe.model';

@Module({
  imports: [SequelizeModule.forFeature([Comments, User, Recipe])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentsModule {}
