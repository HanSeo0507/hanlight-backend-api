import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '../index';
import Board from './board.model';
import User from './user.model';

export default class BoardManageLog extends Model<BoardManageLog> {
  public static associations: {
    board: BelongsTo<BoardManageLog, Board>;
    user: BelongsTo<BoardManageLog, User>;
  };

  public board: Board;
  public user: User;

  public pk: number;
  public board_pk: number;
  public user_pk: string;
  public type: 'board' | 'comment';
  public reason: string;

  public readonly createdAt: Date;
}

BoardManageLog.init(
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
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    reason: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'boardManageLogs',
  }
);
