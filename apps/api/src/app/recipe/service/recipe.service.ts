import { RecipeByIdDto } from './../../../../../../libs/api-interfaces/src/lib/recipe-by-id.dto';
import { Category } from './../../models/category.model';
import { generateUUID } from './../../utils/cid-generator.util';
import { User } from './../../models/user.model';
import { RecipeDto } from './../../../../../../libs/api-interfaces/src/lib/recipe.dto';
import { UserByIdDto } from './../../../../../../libs/api-interfaces/src/lib/user-by-id.dto';
import { Recipe } from './../../models/recipe.model';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RecipeService {
    constructor(
        @InjectModel(Recipe)
        private recipeModel: typeof Recipe,
        @InjectModel(Category)
        private categoryModel: typeof Category
    ){}

    createNewRecipe = async (user: UserByIdDto, recipe: RecipeDto) => {
        const [categoryExists] = await this.categoryModel.findOrCreate({where: {category: recipe.category},
        defaults: {
            categoryId: generateUUID(),
            category: recipe.category
        }})
        const payload = {
            recipeId: generateUUID(),
            recipeTitle: recipe.title,
            recipeContent: recipe.content,
            userId: user.userId,
            categoryId: categoryExists.get('categoryId')
        }
        const newRecipe = await this.recipeModel.create(payload)
        if(!newRecipe){
            return{
                success: false,
                message: 'Could not successfully create new recipe',
                status: HttpStatus.EXPECTATION_FAILED
            }
        }

        return {
            success: true,
            message: `Successfully created new recipe for user with id: ${user.userId}`,
            payload: recipe
        }

    }

    getAllRecipes = async () =>{
        const recipes = await this.recipeModel.findAll({include: Category})
        if(!recipes){
            return {
                success: false,
                message: 'Could not get Recipes due to server error. Ensure you are authenticated and try again',
                status: HttpStatus.NOT_FOUND
            }
        }
        return {
            success: true,
            message: 'Recipes Query successful',
            payload: recipes
        }
    }

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

    updateRecipe = async (user: UserByIdDto, recipe: RecipeDto, recipeWithId: RecipeByIdDto) => {
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
}
