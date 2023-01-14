import { Comments } from './comments.model';
import { Subscriber } from './subscriber.model';
import { Recipe } from './recipe.model';
import { Profile } from './profile.model';
import { Column, Model, Table, AllowNull, PrimaryKey, DataType, Unique, HasMany, HasOne, Default } from 'sequelize-typescript';

@Table({tableName: 'USERS', timestamps: false})
export class User extends Model {

  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column({
    type: DataType.UUID
  })
  userId!: string;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  username!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  email!: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING
  })
  password!: string;

  @AllowNull(true)
  @Column({
    type: DataType.UUID
  })
  passwordResetToken!: string;

  @AllowNull(true)
  @Column({
    type: DataType.TIME
  })
  passwordResetExpires: unknown;

  @AllowNull(false)
  @Default(true)
  @Column({
    type: DataType.BOOLEAN
  })
  passwordResetPossible!: boolean



  //Registration mechanism stores whether user was created via
  //signup form or used a federated login mechanism. In the latter
  //case, the password field will be left as null
  @AllowNull(false)
  @Column({
    type: DataType.ENUM('LOCAL', 'FEDERATED'),
  })
  registrationMechanism!: string;

  @HasOne(() => Profile)
  profile!: Profile;

  @HasMany(() => Recipe)
  recipes!: Recipe[];

  @HasMany(() => Subscriber)
  subscribers!: Subscriber[];

  @HasMany(() => Comments)
  comments!: Comments[];

}
