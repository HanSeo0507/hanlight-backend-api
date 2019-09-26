import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';

import LOLTeamMember from './LOLTeamMember.model';
import LOLVote from './LOLVote.model';

@Table({
  timestamps: false,
})
export default class LOLTeam extends Model<LOLTeam> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public name: string;

  @HasMany(() => LOLTeamMember)
  public LOLTeamMember: LOLTeamMember[];

  @HasMany(() => LOLVote)
  public LOLVote: LOLVote[];
}
