import { Column, Model, Table, ForeignKey, AllowNull, PrimaryKey, DataType, Unique, BelongsTo } from 'sequelize-typescript';
import { Recipe } from './recipe.model';

@Table({tableName: 'VOTES', timestamps: false})
export class Vote extends Model {

  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  voterId: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  upvote: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  downvote: string

  @ForeignKey(() => Recipe)
  @Column({
    type: DataType.UUID,
  })
  recipeId: string

  @BelongsTo(() => Recipe)
  recipe: Recipe

}
