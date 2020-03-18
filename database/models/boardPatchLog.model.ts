import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '../index';

export default class BoardPatchLog extends Model<BoardPatchLog> {
  public static associations: {
    board: BelongsTo<BoardPatchLog, Board>;
    boardComment: BelongsTo<BoardPatchLog, BoardComment>;
  };

  public board: Board;
  public boardComment: BoardComment;

  public pk: number;
  public board_pk: Board['pk'];
  public comment_pk: BoardComment['pk'];
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

import Board from './board.model';
import BoardComment from './boardComment.model';

BoardPatchLog.belongsTo(Board, {
  foreignKey: 'board_pk',
  as: 'board',
  onUpdate: 'CASCADE',
});

BoardPatchLog.belongsTo(BoardComment, {
  foreignKey: 'comment_pk',
  as: 'boardComment',
  onUpdate: 'CASCADE',
});
