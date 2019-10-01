import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import LOLTeam from './LOLTeam.model';
import User from './user.model';

@Table({
  timestamps: true,
})
export default class LOLVote extends Model<LOLVote> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public pk: number;

  @ForeignKey(() => LOLTeam)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public team_pk: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  public user_pk: string;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  public user: User;

  @BelongsTo(() => LOLTeam, {
    onDelete: 'CASCADE',
  })
  public LOLTeam: LOLTeam;
}
