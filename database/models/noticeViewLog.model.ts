import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '../index';

export default class NoticeViewLog extends Model<NoticeViewLog> {
  public static associations: {
    user: BelongsTo<NoticeViewLog, User>;
    notice: BelongsTo<NoticeViewLog, Notice>;
  };

  public user: User;
  public notice: Notice;

  public pk: number;
  public user_pk: User['pk'];
  public notice_pk: number;

  public readonly createdAt: Date;
}

NoticeViewLog.init(
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
    notice_pk: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
  },
  {
    sequelize,
    tableName: 'noticeViewLogs',
  }
);

import User from './user.model';
import Notice from './notice.model';

NoticeViewLog.belongsTo(User, {
  foreignKey: 'user_pk',
  as: 'user',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

NoticeViewLog.belongsTo(Notice, {
  foreignKey: 'notice_pk',
  as: 'notice',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
