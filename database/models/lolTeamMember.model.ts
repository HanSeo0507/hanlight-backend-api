import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import LolTeam from './lolTeam.model';

@Table({
  timestamps: false,
})
export default class LolTeamMember extends Model<LolTeamMember> {
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
  @Column(DataType.STRING)
  public name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public studentId: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public leader: boolean;

  @BelongsTo(() => LolTeam, {
    onDelete: 'CASCADE',
  })
  public lolTeam: LolTeam;
}
