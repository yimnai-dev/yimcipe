import { RecipeShares } from './../models/recipe-shares.model';
import { Module } from '@nestjs/common';
import { ShareController } from './controller/shares.controller';
import { SharesService } from './service/shares.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([RecipeShares])],
  controllers: [ShareController],
  providers: [SharesService],
})
export class SharesModule {}
