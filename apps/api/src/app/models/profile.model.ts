import { User } from './user.model';
import { Column, Model, Table, Unique, AllowNull, PrimaryKey, DataType, ForeignKey } from 'sequelize-typescript';

@Table({tableName: 'PROFILES', timestamps: true})
export class Profile extends Model{

  @Unique
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.UUID
  })
  profileId: string

  @Unique
  @Column({
    type: DataType.STRING
  })
  fullName: string

  @Column({
    type: DataType.STRING
  })
  occupation: string

  @Column({
    type: DataType.BLOB
  })
  photo: Blob

  @Column({
    type: DataType.STRING
  })
  status: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'userId'
  })
  userId: string

}
