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
import RecruitQuestionSelect from './recruitQuestionSelect.model';

@Table({
  timestamps: true,
})
export default class RecruitQuestion extends Model {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => Recruit)
  @Column(DataType.INTEGER)
  public recruit_pk: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public type: 'short' | 'long' | 'select';

  @AllowNull(false)
  @Column(DataType.TEXT)
  public question: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @BelongsTo(() => Recruit)
  public recruit: Recruit;
  @HasMany(() => RecruitAnswer)
  public recruitAnswer: RecruitAnswer[];
  @HasMany(() => RecruitQuestionSelect)
  public recruitQuestionSelect: RecruitQuestionSelect[];
}
