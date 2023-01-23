import { RecipeCurrentStatus } from './../utils/types/user.type';
import { RecipeShares } from './recipe-shares.model';
import { User } from './user.model';
import { Vote } from './vote.model';
import { Category } from './category.model';
import { Column, Model, Table, AllowNull, PrimaryKey, DataType, Unique, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Comments } from './comments.model';

@Table({tableName: 'RECIPES', timestamps: true})
export class Recipe extends Model {
  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column({
    type: DataType.UUID
  })
  recipeId!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  recipeTitle!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  recipeContent!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  recipeCurrentStatus!: RecipeCurrentStatus;

  @HasMany(() => Comments)
  comments!: Comments[];

  @HasMany(() => Vote)
  votes!: Vote[];

  @HasMany(() => RecipeShares)
  shares!: RecipeShares[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'userId'
  })
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
  })
  categoryId!: string;

  @BelongsTo(() => Category)
  category!: string;
}
