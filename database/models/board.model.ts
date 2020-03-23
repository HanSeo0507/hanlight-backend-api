import { Model, BelongsTo, DataTypes, HasMany } from 'sequelize';

import { sequelize } from '../index';

export default class Board extends Model<Board> {
  public static associations: {
    user: BelongsTo<Board, User>;
    boardLike: HasMany<Board, BoardLike>;
    boardImage: HasMany<Board, BoardImage>;
    boardComment: HasMany<Board, BoardComment>;
    boardManageLog: HasMany<Board, BoardManageLog>;
    boardPatchLog: HasMany<Board, BoardPatchLog>;
    boardReportLog: HasMany<Board, BoardReportLog>;
  };

  public user: User;
  public boardLike: BoardLike[];
  public boardImage: BoardImage[];
  public boardComment: BoardComment[];
  public boardManageLog: BoardManageLog[];
  public boardPatchLog: BoardPatchLog[];
  public boardReportLog: BoardReportLog[];

  public pk: number;
  public user_pk: User['pk'];
  public content: string;
  public is_anonymous: boolean;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;
}

Board.init(
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
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    is_anonymous: {
      defaultValue: false,
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    tableName: 'boards',
    paranoid: true,
  }
);

import User from './user.model';
import BoardComment from './boardComment.model';
import BoardImage from './boardImage.model';
import BoardLike from './boardLike.model';
import BoardManageLog from './boardManageLog.model';
import BoardPatchLog from './boardPatchLog.model';
import BoardReportLog from './boardReportLog.model';

Board.hasMany(BoardLike, {
  sourceKey: 'pk',
  foreignKey: 'board_pk',
  as: 'boardLike',
});

Board.hasMany(BoardComment, {
  sourceKey: 'pk',
  foreignKey: 'board_pk',
  as: 'boardComment',
});

Board.hasMany(BoardImage, {
  sourceKey: 'pk',
  foreignKey: 'board_pk',
  as: 'boardImage',
});

Board.hasMany(BoardManageLog, {
  sourceKey: 'pk',
  foreignKey: 'board_pk',
  as: 'boardManageLog',
});

Board.hasMany(BoardPatchLog, {
  sourceKey: 'pk',
  foreignKey: 'board_pk',
  as: 'boardPatchLog',
});

Board.hasMany(BoardReportLog, {
  sourceKey: 'pk',
  foreignKey: 'board_pk',
  as: 'boardReportLog',
});

Board.belongsTo(User, {
  foreignKey: 'user_pk',
  as: 'user',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
