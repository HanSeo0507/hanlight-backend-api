import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';

import RecruitQuestion from './recruitQuestion.model';

@Table({
  timestamps: false,
})
export default class RecruitQuestionSelect extends Model {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => RecruitQuestion)
  @Column(DataType.INTEGER)
  public question_pk: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public select: string;

  @BelongsTo(() => RecruitQuestion)
  public recruitQuestion: RecruitQuestion;
}
