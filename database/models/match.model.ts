import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import User from './user.model';

@Table({
  timestamps: false,
})
export default class Match extends Model<Match> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public match_number: number;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public confirm: boolean;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  public user: User;
}
