import { Model, BelongsTo, DataTypes } from 'sequelize';

import { sequelize } from '../index';

export default class BoardLike extends Model<BoardLike> {
  public static associations: {
    board: BelongsTo<BoardLike, Board>;
    user: BelongsTo<BoardLike, User>;
  };

  public board: Board;
  public user: User;

  public pk: number;
  public board_pk: Board['pk'];
  public user_pk: User['pk'];
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

import Board from './board.model';
import User from './user.model';

BoardLike.belongsTo(User, {
  foreignKey: 'user_pk',
  as: 'user',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

BoardLike.belongsTo(Board, {
  foreignKey: 'board_pk',
  as: 'board',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
