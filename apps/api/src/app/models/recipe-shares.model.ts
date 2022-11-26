import { Recipe } from './recipe.model';
import { Column, Model, Table, ForeignKey, DataType, BelongsTo, PrimaryKey } from 'sequelize-typescript';

@Table({tableName: 'RECIPE_SHARES_TRACKER', timestamps: true})
export class RecipeShares extends Model {
  @PrimaryKey
  @ForeignKey(() => Recipe)
  @Column({
    type: DataType.UUID
  })
  recipeId: string

  @BelongsTo(() => Recipe)
  recipe: Recipe
}
