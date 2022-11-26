import { User } from './../models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
