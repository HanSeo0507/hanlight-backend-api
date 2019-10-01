import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';

import LOLTeam from './LOLTeam.model';

@Table({
  timestamps: false,
})
export default class LOLTeamMember extends Model<LOLTeamMember> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => LOLTeam)
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

  @BelongsTo(() => LOLTeam, {
    onDelete: 'CASCADE',
  })
  public LOLTeam: LOLTeam;
}
