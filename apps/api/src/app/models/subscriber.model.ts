import { SubscriberManager } from './subscriber-manager.model';
import { Column, Model, Table, AllowNull, PrimaryKey, DataType, ForeignKey, BelongsToMany, Unique } from 'sequelize-typescript';
import { User } from './user.model';

@Table({tableName: 'SUBSCRIBERS', timestamps: false})
export class Subscriber extends Model {

  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column({
    type: DataType.UUID
  })
  subscriberId!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'userId'
  })
  userId!: string;

  @BelongsToMany(() => User, () => SubscriberManager)
  users!: User[];

}
