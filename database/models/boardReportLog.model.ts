import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '../index';

export default class BoardReportLog extends Model<BoardReportLog> {
  public static associations: {
    user: BelongsTo<BoardReportLog, User>;
    board: BelongsTo<BoardReportLog, Board>;
    boardComment: BelongsTo<BoardReportLog, BoardComment>;
  };

  public user: User;
  public board: Board;
  public boardComment: BoardComment;

  public pk: number;
  public user_pk: User['pk'];
  public board_pk: Board['pk'];
  public comment_pk: BoardComment['pk'];
  public type: 'board' | 'comment';
  public content: string;

  public readonly createdAt: Date;
}

BoardReportLog.init(
  {
    pk: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    user_pk: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    board_pk: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    comment_pk: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'boardReportLogs',
  }
);

import User from './user.model';
import Board from './board.model';
import BoardComment from './boardComment.model';

BoardReportLog.belongsTo(User, {
  foreignKey: 'user_pk',
  as: 'user',
});

BoardReportLog.belongsTo(Board, {
  foreignKey: 'board_pk',
  as: 'board',
  onUpdate: 'CASCADE',
});

BoardReportLog.belongsTo(BoardComment, {
  foreignKey: 'comment_pk',
  as: 'boardComment',
});
