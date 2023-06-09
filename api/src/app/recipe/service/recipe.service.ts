import {
  UpdateRecipeDto,
  RecipeByIdDto,
  RecipeDto,
  UpdateRecipeStatusDto,
  UserByIdDto,
} from '../../../dtos/dto.holder';
import { Subscriber } from './../../models/subscriber.model';
import { Profile } from './../../models/profile.model';
import { RecipeCurrentStatus } from './../../utils/types/user.type';
import { Category } from './../../models/category.model';
import { generateUUID } from './../../utils/cid-generator.util';
import { Recipe } from './../../models/recipe.model';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../models/user.model';
import { Comments } from '../../models/comments.model';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe)
    private recipeModel: typeof Recipe,
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  createNewRecipe = async (user: UserByIdDto, recipe: RecipeDto) => {
    const [categoryExists] = await this.categoryModel.findOrCreate({
      where: { category: recipe.category },
      defaults: {
        categoryId: generateUUID(),
        category: recipe.category,
      },
    });
    const currentStatus: RecipeCurrentStatus = 'GENERAL';
    const payload = {
      recipeId: generateUUID(),
      recipeTitle: recipe.title,
      recipeContent: recipe.content,
      userId: user.userId,
      categoryId: categoryExists.get('categoryId'),
      recipeCurrentStatus: currentStatus,
    };
    const newRecipe = await this.recipeModel.create(payload);
    if (!newRecipe) {
      return {
        success: false,
        message: 'Could not successfully create new recipe',
        status: HttpStatus.EXPECTATION_FAILED,
      };
    }
    return {
      success: true,
      message: `Successfully created new recipe for user with id: ${user.userId}`,
      payload: recipe,
    };
  };

  getAllRecipes = async () => {
    const payload = await this.recipeModel.findAll({
      include: [
        {
          model: Comments,
          attributes: ['commentId', 'comment', 'userId'],
          include: [{ model: User, attributes: ['username'] }],
        },
        { model: Category, attributes: ['categoryId', 'category'] },
        {
          model: User,
          attributes: ['userId', 'username', 'email'],
          include: [
            {
              model: Profile,
              attributes: [
                'profileId',
                'fullName',
                'occupation',
                'photo',
                'status',
              ],
            },
            { model: Subscriber },
          ],
        },
      ],
    });
    if (!payload) {
      return {
        success: false,
        message:
          'Could not get Recipes due to server error. Ensure you are authenticated and try again',
        status: HttpStatus.NOT_FOUND,
      };
    }
    const recipes = {
      success: true,
      message: 'Recipes Query successful',
      recipes: payload,
    };
    return recipes;
  };

  getRecipesForSingleUser = async (user: UserByIdDto) => {
    // const cachedUserRecipes = await this.cacheManager.get('userRecipes');
    // if (cachedUserRecipes) {
    //   return cachedUserRecipes;
    // }
    const recipes = await this.recipeModel.findAll({
      where: { userId: user.userId },
      include: Category,
    });
    if (!recipes) {
      return {
        success: false,
        message: 'Recipes not found for this user',
        status: HttpStatus.NOT_FOUND,
      };
    }
    const payload = {
      success: true,
      message: 'User recipes loaded successfully',
      recipes: recipes,
    };
    return payload;
  };

  updateRecipe = async (
    user: UserByIdDto,
    recipe: UpdateRecipeDto,
    recipeWithId: RecipeByIdDto,
  ) => {
    const recipeToUpdate = await this.recipeModel.findOne({
      where: { recipeId: recipeWithId.recipeId },
    });
    if (!recipeToUpdate) {
      return {
        success: false,
        message: 'Could not find Recipe due to server error',
        status: HttpStatus.BAD_GATEWAY,
      };
    }
    if (recipeToUpdate.get('userId') === user.userId) {
      const [categoryExists] = await this.categoryModel.findOrCreate({
        where: {
          category: recipe.category,
        },
        defaults: {
          categoryId: generateUUID(),
          category: recipe.category,
        },
      });
      const categoryId =
        recipeToUpdate.get('category') === categoryExists.get('category')
          ? recipeToUpdate.get('categoryId')
          : categoryExists.get('categoryId');
      const payload = {
        recipeTitle: recipe.title,
        recipeContent: recipe.content,
        categoryId: categoryId,
      };
      const updateRecipe = await this.recipeModel.update(payload, {
        where: { recipeId: recipeWithId.recipeId },
      });
      if (!updateRecipe) {
        return {
          success: false,
          message: 'Could not update recipe',
          status: HttpStatus.EXPECTATION_FAILED,
        };
      }
      return {
        success: true,
        message: 'Recipe Update successful',
        status: HttpStatus.ACCEPTED,
      };
    }
  };

  deleteRecipeById = async (user: UserByIdDto, recipeWithId: RecipeByIdDto) => {
    const recipeToDelete = await this.recipeModel.findOne({
      where: { recipeId: recipeWithId.recipeId },
    });
    if (!recipeToDelete) {
      return {
        success: false,
        message: 'Could not find particular recipe. Try again later!',
        status: HttpStatus.NOT_FOUND,
      };
    }
    if (recipeToDelete.get('userId') !== user.userId) {
      return {
        success: false,
        message:
          'Only User with the given ID can delete a recipe. Ensure that you have passed the correct user Id',
        status: HttpStatus.NOT_MODIFIED,
      };
    }
    const culpritRecipe = await this.recipeModel.destroy({
      where: { recipeId: recipeWithId.recipeId },
    });
    if (!culpritRecipe) {
      return {
        success: false,
        message: 'Could not delete recipe.',
        status: HttpStatus.ACCEPTED,
      };
    }
    return {
      success: true,
      message: 'Recipe deleted successfully',
      status: HttpStatus.CREATED,
    };
  };

  changeRecipeStatus = async (
    user: UserByIdDto,
    recipeWithId: RecipeByIdDto,
    activeRecipe: UpdateRecipeStatusDto,
  ) => {
    const recipe = await this.recipeModel.findOne({
      where: {
        recipeId: recipeWithId.recipeId,
      },
    });
    if (!recipe) {
      return {
        success: false,
        message: 'Could not find recipe',
        status: HttpStatus.NOT_FOUND,
      };
    }
    if (recipe.get('userId') !== user.userId) {
      return {
        success: false,
        message: 'You can only update recipes you created',
        status: HttpStatus.PRECONDITION_FAILED,
      };
    }

    await this.recipeModel.update(
      { recipeCurrentStatus: activeRecipe.status },
      { where: { recipeId: recipeWithId.recipeId } },
    );
    return {
      success: true,
      message: 'Successfully changed status',
      status: HttpStatus.CREATED,
    };
  };

  getCategories = async () => {
    const categories = await this.categoryModel.findAll();
    if (!categories) {
      return {
        success: false,
        error: 'Could not get categories',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return {
      success: true,
      message: 'Categories retrieved successfully',
      categories: categories,
    };
  };
}
