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

import Recruit from './recruit.model';
import RecruitAnswerer from './recruitAnswerer.model';
import RecruitQuestion from './recruitQuestion.model';

@Table({
  timestamps: true,
})
export default class RecruitAnswer extends Model {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => Recruit)
  @Column(DataType.INTEGER)
  public recruit_pk: number;

  @ForeignKey(() => RecruitAnswerer)
  @Column(DataType.INTEGER)
  public answerer_pk: number;

  @ForeignKey(() => RecruitQuestion)
  @Column(DataType.INTEGER)
  public question_pk: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public answer: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @BelongsTo(() => Recruit)
  public recruit: Recruit;
  @BelongsTo(() => RecruitAnswerer, {
    onDelete: 'CASCADE',
  })
  public recruitAnswerer: RecruitAnswerer;
  @BelongsTo(() => RecruitQuestion)
  public recruitQuestion: RecruitQuestion;
}
