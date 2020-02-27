import { Model, BelongsTo, DataTypes } from 'sequelize';

import { sequelize } from '../index';
import Board from './board.model';
import User from './user.model';

export default class BoardLike extends Model<BoardLike> {
  public static associations: {
    board: BelongsTo<BoardLike, Board>;
    user: BelongsTo<BoardLike, User>;
  };

  public board: Board;
  public user: User;

  public pk: number;
  public board_pk: number;
  public user_pk: string;
}

BoardLike.init(
  {
    pk: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    board_pk: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    user_pk: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  },
  {
    sequelize,
    tableName: 'boardLikes',
  }
);
