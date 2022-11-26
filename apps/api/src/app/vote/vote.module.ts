import { Vote } from './../models/vote.model';
import { Module } from '@nestjs/common';
import { VoteController } from './controller/vote.controller';
import { VoteService } from './service/vote.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([Vote])
  ],
  controllers: [VoteController],
  providers: [VoteService]
})
export class VoteModule {}
