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
  @Column(DataType.TEXT)
  public question: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @BelongsTo(() => Recruit)
  public recruit: Recruit;
}
