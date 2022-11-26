import { Subscriber } from './subscriber.model';
import { Recipe } from './recipe.model';
import { Profile } from './profile.model';
import { Column, Model, Table, AllowNull, PrimaryKey, DataType, Unique, HasMany, HasOne } from 'sequelize-typescript';

@Table({tableName: 'USERS', timestamps: false})
export class User extends Model {

  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column({
    type: DataType.UUID
  })
  userId: string

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  username: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  email: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  password: string

  @HasOne(() => Profile)
  profile: Profile

  @HasMany(() => Recipe)
  recipes: Recipe[]

  @HasMany(() => Subscriber)
  subscribers: Subscriber[]

}
