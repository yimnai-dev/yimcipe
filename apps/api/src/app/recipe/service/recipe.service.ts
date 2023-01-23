import { RecipeResponse } from './../../utils/response.util';
import { UpdateRecipeStatusDto } from './../../../../../../libs/api-interfaces/src/lib/update-recipe-status.dto';
import { RecipeCurrentStatus } from './../../utils/types/user.type';
import { UpdateRecipeDto } from './../../../../../../libs/api-interfaces/src/lib/update-recipe.dto';
import { RecipeByIdDto } from './../../../../../../libs/api-interfaces/src/lib/recipe-by-id.dto';
import { Category } from './../../models/category.model';
import { generateUUID } from './../../utils/cid-generator.util';
import { RecipeDto } from '../../../../../../libs/api-interfaces/src/lib/create-recipe.dto';
import { UserByIdDto } from './../../../../../../libs/api-interfaces/src/lib/user-by-id.dto';
import { Recipe } from './../../models/recipe.model';
import { Injectable, HttpStatus, CACHE_MANAGER, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cache } from 'cache-manager';
import { environment } from 'apps/api/src/environments/environment';

@Injectable()
export class RecipeService {
    constructor(
        @InjectModel(Recipe)
        private recipeModel: typeof Recipe,
        @InjectModel(Category)
        private categoryModel: typeof Category,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache
    ){}

    createNewRecipe = async (user: UserByIdDto, recipe: RecipeDto) => {
        const cachedRecipes = await this.cacheManager.get('recipes') as RecipeResponse
        const [categoryExists] = await this.categoryModel.findOrCreate({where: {category: recipe.category},
        defaults: {
            categoryId: generateUUID(),
            category: recipe.category
        }})
        const currentStatus: RecipeCurrentStatus = 'GENERAL'
        const payload = {
            recipeId: generateUUID(),
            recipeTitle: recipe.title,
            recipeContent: recipe.content,
            userId: user.userId,
            categoryId: categoryExists.get('categoryId'),
            recipeCurrentStatus: currentStatus
        }
        const newRecipe = await this.recipeModel.create(payload)
        if(!newRecipe){
            return{
                success: false,
                message: 'Could not successfully create new recipe',
                status: HttpStatus.EXPECTATION_FAILED
            }
        }
        console.log('Cached: ', cachedRecipes)

        return {
            success: true,
            message: `Successfully created new recipe for user with id: ${user.userId}`,
            payload: recipe
        }

    }

    getAllRecipes = async () => {
    const cachedRecipes = await this.cacheManager.get('recipes');
    if (cachedRecipes) {
      return cachedRecipes;
    }
    const payload = await this.recipeModel.findAll({ include: Category });
    if (!payload) {
      return {
        success: false,
        message: 'Could not get Recipes due to server error. Ensure you are authenticated and try again',
        status: HttpStatus.NOT_FOUND
      };
    }
    const recipes = {
      success: true,
      message: 'Recipes Query successful',
      recipes: payload
    };
    this.cacheManager.set('recipes', recipes as RecipeResponse, environment.cacheTTL);
    return recipes;
  };

    getRecipesForSingleUser = async (user: UserByIdDto, recipe: RecipeByIdDto) => {
        const targetRecipe = await this.recipeModel.findOne({where: {recipeId: recipe.recipeId}})
        if(targetRecipe && (targetRecipe.get('userId') === user.userId)){
            const deleteRecipe = await this.recipeModel.destroy({where: {recipeId: recipe.recipeId}})
            if(deleteRecipe){
                return {
                    success: true,
                    message: 'Recipe deleted successfully',
                    status: HttpStatus.CREATED
                }

            }
            return {
                success: false,
                message: 'Could not delete recipes successfully',
                status: HttpStatus.EXPECTATION_FAILED
            }
        }
        return {
            success: false,
            message: 'Recipe does not exist or has already been deleted!',
            status: HttpStatus.NOT_FOUND
        }
    }

    updateRecipe = async (user: UserByIdDto, recipe: UpdateRecipeDto, recipeWithId: RecipeByIdDto) => {
        const recipeToUpdate = await this.recipeModel.findOne({where: {recipeId: recipeWithId.recipeId}})
        if(!recipeToUpdate){
            return {
                success: false,
                message: 'Could not find Recipe due to server error',
                status: HttpStatus.BAD_GATEWAY
            }
        }
        if(recipeToUpdate.get('userId') === user.userId){
            const [categoryExists] = await this.categoryModel.findOrCreate(
                {where:{
                    category: recipe.category
                },
                defaults:{
                    categoryId: generateUUID(),
                    category: recipe.category
                }})
            const categoryId = recipeToUpdate.get('category') === categoryExists.get('category') ? recipeToUpdate.get('categoryId') : categoryExists.get('categoryId')
            const payload = {
                recipeTitle: recipe.title,
                recipeContent: recipe.content,
                categoryId: categoryId
            }
            const updateRecipe = await this.recipeModel.update(payload, {where: {recipeId: recipeWithId.recipeId}})
            if(!updateRecipe){
                return {
                    success: false,
                    message: 'Could not update recipe',
                    status: HttpStatus.EXPECTATION_FAILED
                }
            }
            return {
                success: true,
                message: 'Recipe Update successful',
                status: HttpStatus.ACCEPTED
            }
        }
    }

    deleteRecipeById = async (user: UserByIdDto, recipeWithId: RecipeByIdDto) => {
        const recipeToDelete = await this.recipeModel.findOne({where: {recipeId: recipeWithId.recipeId}})
        if(!recipeToDelete){
            return {
                success: false,
                message: 'Could not find particular recipe. Try again later!',
                status: HttpStatus.NOT_FOUND
            }
        }
        if(recipeToDelete.get('userId') !== user.userId){
            return {
                success: false,
                message: 'Only User with the given ID can delete a recipe. Ensure that you have passed the correct user Id',
                status: HttpStatus.NOT_MODIFIED
            }
        }
        const culpritRecipe = await this.recipeModel.destroy({where: {recipeId: recipeWithId.recipeId}})
        if(!culpritRecipe){
            return {
                success: false,
                message: 'Could not delete recipe.',
                status: HttpStatus.ACCEPTED
            }
        }
        return {
            success: true,
            message: 'Recipe deleted successfully',
            status: HttpStatus.CREATED
        }
    }

    changeRecipeStatus = async (user: UserByIdDto, recipeWithId: RecipeByIdDto, activeRecipe: UpdateRecipeStatusDto) => {
        const recipe = await this.recipeModel.findOne({where: {
            recipeId: recipeWithId.recipeId
        }})
        if(!recipe){
            return {
                success: false,
                message: 'Could not find recipe',
                status: HttpStatus.NOT_FOUND
            }
        }
        if(recipe.get('userId') !== user.userId){
            return {
                success: false,
                message: 'You can only update recipes you created',
                status: HttpStatus.PRECONDITION_FAILED
            }
        }

        await this.recipeModel.update({recipeCurrentStatus: activeRecipe.status}, {where: {recipeId: recipeWithId.recipeId}})
        return {
            success: true,
            message: 'Successfully changed status',
            status: HttpStatus.CREATED
        }

    }
}
