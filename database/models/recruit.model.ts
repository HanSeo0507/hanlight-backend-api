import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import RecruitAnswerer from './recruitAnswerer.model';
import RecruitQuestion from './recruitQuestion.model';
import User from './user.model';

@Table({
  timestamps: true,
})
export default class Recruit extends Model {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  public user_pk: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public user_name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public name: string;

  @Column(DataType.TEXT)
  public description: string;

  @Column(DataType.DATE)
  public dueAt: Date;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @DeletedAt
  public deletedAt: Date;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  public user: User;

  @HasMany(() => RecruitQuestion)
  public recruitQuestion: RecruitQuestion[];
  @HasMany(() => RecruitAnswerer)
  public recruitAnswerer: RecruitAnswerer[];
}
