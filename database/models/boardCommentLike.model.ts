import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '../index';

export default class BoardCommentLike extends Model<BoardCommentLike> {
  public static associations: {
    boardComment: BelongsTo<BoardCommentLike, BoardComment>;
    user: BelongsTo<BoardCommentLike, User>;
  };

  public boardComment: BoardComment;
  public user: User;

  public pk: number;
  public comment_pk: BoardComment['pk'];
  public user_pk: User['pk'];
}

BoardCommentLike.init(
  {
    pk: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    comment_pk: {
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
    tableName: 'boardCommentLikes',
  }
);

import BoardComment from './boardComment.model';
import User from './user.model';

BoardCommentLike.belongsTo(BoardComment, {
  foreignKey: 'comment_pk',
  as: 'boardComment',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

BoardCommentLike.belongsTo(User, {
  foreignKey: 'user_pk',
  as: 'user',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
