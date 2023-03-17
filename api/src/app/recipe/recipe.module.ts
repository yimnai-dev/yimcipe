import { Category } from './../models/category.model';
import { Recipe } from './../models/recipe.model';
import { Module } from '@nestjs/common';
import { RecipeController } from './controller/recipe.controller';
import { RecipeService } from './service/recipe.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Recipe, Category])],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
