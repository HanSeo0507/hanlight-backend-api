import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import LolTeamMember from './lolTeamMember.model';
import LolVote from './lolVote.model';

@Table({
  timestamps: false,
})
export default class LolTeam extends Model<LolTeam> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public name: string;

  @HasMany(() => LolTeamMember)
  public lolTeamMember: LolTeamMember;

  @HasMany(() => LolVote)
  public lolVote: LolVote;
}
