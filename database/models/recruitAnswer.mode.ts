import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import RecruitAnswerer from './recruitAnswerer.model';

@Table({
  timestamps: true,
})
export default class RecruitAnswer extends Model {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => RecruitAnswerer)
  @Column(DataType.INTEGER)
  public answerer_pk: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public content: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;
}
