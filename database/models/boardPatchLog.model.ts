import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '../index';
import Board from './board.model';
import BoardComment from './boardComment.model';

export default class BoardPatchLog extends Model<BoardPatchLog> {
  public static associations: {
    board: BelongsTo<BoardPatchLog, Board>;
    boardComment: BelongsTo<BoardPatchLog, BoardComment>;
  };

  public board: Board;
  public boardComment: BoardComment;

  public pk: number;
  public board_pk: number;
  public comment_pk: number;
  public past_content: string;

  public readonly createdAt: Date;
}

BoardPatchLog.init(
  {
    pk: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    board_pk: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    comment_pk: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    past_content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: 'boardPatchLogs',
  }
);
