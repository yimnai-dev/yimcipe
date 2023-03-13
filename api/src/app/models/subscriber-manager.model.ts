import { Subscriber } from './subscriber.model';
import { User } from './user.model';
import {
  Column,
  ForeignKey,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'SUBSCRIBER_MANAGER', timestamps: false })
export class SubscriberManager extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'userId',
  })
  userId!: string;

  @ForeignKey(() => Subscriber)
  @Column({
    type: DataType.UUID,
    field: 'subscriberId',
  })
  subscriberId!: string;
}
