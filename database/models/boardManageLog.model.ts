import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '../index';

export default class BoardManageLog extends Model<BoardManageLog> {
  public static associations: {
    board: BelongsTo<BoardManageLog, Board>;
    user: BelongsTo<BoardManageLog, User>;
  };

  public board: Board;
  public user: User;

  public pk: number;
  public board_pk: Board['pk'];
  public user_pk: User['pk'];
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

import Board from './board.model';
import User from './user.model';

BoardManageLog.belongsTo(User, {
  foreignKey: 'user_pk',
  as: 'user',
  onUpdate: 'CASCADE',
});

BoardManageLog.belongsTo(Board, {
  foreignKey: 'board_pk',
  as: 'board',
  onUpdate: 'CASCADE',
});
