import { Module } from '@nestjs/common';
import { VoteController } from './controller/vote.controller';
import { VoteService } from './service/vote.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vote } from './../models/vote.model';
import { User } from '../models/user.model';
import { Recipe } from '../models/recipe.model';

@Module({
  imports: [SequelizeModule.forFeature([Vote, User, Recipe])],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
