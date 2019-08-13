import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import Recruit from './recruit.model';
import RecruitAnswer from './recruitAnswer.model';
import User from './user.model';

@Table({
  timestamps: true,
})
export default class RecruitAnswerer extends Model {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => Recruit)
  @Column(DataType.INTEGER)
  public recruit_pk: number;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  public user_pk: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public user_name: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @BelongsTo(() => User)
  public user: User;
  @BelongsTo(() => Recruit)
  public recruit: Recruit;
  @HasMany(() => RecruitAnswer)
  public recruitAnswer: RecruitAnswer[];
}
