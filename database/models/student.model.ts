import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import User from './user.model';

@Table({
  timestamps: true,
})
export default class Student extends Model<Student> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public user_pk: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public major: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public grade: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public classNum: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public studentNum: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public signKey: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @BelongsTo(() => User)
  public user: User;
}
