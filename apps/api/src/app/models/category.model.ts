import { Recipe } from './recipe.model';
import { Column, Model, Table, AllowNull, PrimaryKey, DataType, HasMany, Unique } from 'sequelize-typescript';

@Table({tableName: 'CATEGORIES', timestamps: false})
export class Category extends Model {

  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column({
    type: DataType.UUID
  })
  categoryId!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  category!: string;

  @HasMany(() => Recipe)
  recipe!: Recipe[];

}
