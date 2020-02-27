import { Model, BelongsTo, DataTypes, HasMany } from 'sequelize';

import { sequelize } from '../index';
import User from './user.model';
import Board from './board.model';
import BoardCommentLike from './boardCommentLike.model';
import BoardPatchLog from './boardPatchLog.model';
import BoardReportLog from './boardReportLog.model';

export default class BoardComment extends Model<BoardComment> {
  public static associations: {
    user: BelongsTo<BoardComment, User>;
    board: BelongsTo<BoardComment, Board>;
    boardCommentLike: HasMany<BoardComment, BoardCommentLike>;
    boardPatchLog: HasMany<BoardComment, BoardPatchLog>;
    boardReportLog: HasMany<BoardComment, BoardReportLog>;
  };

  public user: User;
  public board: Board;
  public boardCommentLike: BoardCommentLike[];
  public boardPatchLog: BoardPatchLog[];
  public boardReportLog: BoardReportLog[];

  public pk: number;
  public user_pk: string;
  public board_pk: number;
  public content: string;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

BoardComment.init(
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
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: 'boardComments',
  }
);
