import {
  UpdateRecipeStatusDto,
  UpdateRecipeDto,
  RecipeByIdDto,
  RecipeDto,
  UserByIdDto
 } from '../../../dtos/dto.holder';
import { JwtAuthGuard } from './../../user/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Body, CACHE_MANAGER, Controller, Delete, Get, Inject, Post, Put, Query, UseGuards, CacheTTL, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { RecipeService } from '../service/recipe.service';
import { Cache } from 'cache-manager';

@UseGuards(JwtAuthGuard)
@ApiTags('Recipes')
@Controller('recipes')
export class RecipeController {
    constructor(
        private recipeService: RecipeService,
    ) { }
    @Post('create')
    createRecipe(
        @Query() user: UserByIdDto,
        @Body() recipe: RecipeDto
    ) {
        return this.recipeService.createNewRecipe(user, recipe)
    }

    @Get('all')
    async getAllRecipes() {
        return this.recipeService.getAllRecipes()
    }

    @Get('all/single')
    async getRecipesForSingleUser(
        @Query() user: UserByIdDto,
    ) {
        return this.recipeService.getRecipesForSingleUser(user)
    }
    @Put('update')
    updateRecipe(
        @Query() user: UserByIdDto,
        @Body() recipe: UpdateRecipeDto,
        @Query() recipeWithId: RecipeByIdDto
    ) {
        return this.recipeService.updateRecipe(user, recipe, recipeWithId)
    }

    @Delete('delete')
    deleteRecipe(
        @Query() user: UserByIdDto,
        @Query() recipeWithId: RecipeByIdDto
    ) {
        return this.recipeService.deleteRecipeById(user, recipeWithId)
    }

    @Put('update/status')
    updateStatus(
        @Query() user: UserByIdDto,
        @Query() recipeWithId: RecipeByIdDto,
        @Body() activeRecipe: UpdateRecipeStatusDto
    ) {
        return this.recipeService.changeRecipeStatus(user, recipeWithId, activeRecipe)
    }

    @Get('categories/all')
    getCategories() {
        return this.recipeService.getCategories()
    }
}
