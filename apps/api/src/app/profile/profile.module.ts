import { Profile } from './../models/profile.model';
import { Module } from '@nestjs/common';
import { ProfileController } from './controller/profile.controller';
import { ProfileService } from './service/profile.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([Profile])
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
