import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Singer from './singer.model';

@Table({
  timestamps: false,
})
export default class SingerVote extends Model<SingerVote> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => Singer)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public singer_pk: number;

  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @BelongsTo(() => Singer, {
    onDelete: 'CASCADE',
  })
  public singer: Singer;
}
