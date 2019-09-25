import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  timestamps: false,
})
export default class TimeTableFestival extends Model<TimeTableFestival> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public part: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public detail: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public time: string;
}
