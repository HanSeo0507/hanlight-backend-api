import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import LolTeam from './lolTeam.model';
import User from './user.model';

@Table({
  timestamps: false,
})
export default class LolVote extends Model<LolVote> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => LolTeam)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public team_pk: number;

  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  public user: User;

  @BelongsTo(() => LolTeam, {
    onDelete: 'CASCADE',
  })
  public lolTeam: LolTeam;
}
