import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import SingerVote from './singerVote.model';

@Table({
  timestamps: false,
})
export default class Singer extends Model<Singer> {
  @AutoIncrement
  @PrimaryKey
  @AllowNull
  @Column(DataType.INTEGER)
  public pk: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public name: string;

  @HasMany(() => SingerVote)
  public singerVote: SingerVote;
}
