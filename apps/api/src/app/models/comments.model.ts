import { Column, Model, Table, Unique, AllowNull, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Recipe } from './recipe.model';

@Table({tableName: 'COMMENTS', timestamps: true})
export class Comments extends Model {

  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column({
    type: DataType.UUID
  })
  commentId: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  comment: string

  @ForeignKey(() => Recipe)
  @Column({
    type: DataType.UUID,
  })
  recipeId: string

  @BelongsTo(() => Recipe)
  recipe: Recipe;

}
