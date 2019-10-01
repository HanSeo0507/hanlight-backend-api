import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Singer from './singer.model';
import User from './user.model';

@Table({
  timestamps: true,
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

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  public user: User;

  @BelongsTo(() => Singer, {
    onDelete: 'CASCADE',
  })
  public singer: Singer;
}
