import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '../index';
import User from './user.model';
import Notice from './notice.model';

export default class NoticeViewLog extends Model<NoticeViewLog> {
  public static associations: {
    user: BelongsTo<NoticeViewLog, User>;
    notice: BelongsTo<NoticeViewLog, Notice>;
  };

  public user: User;
  public notice: Notice;

  public pk: number;
  public user_pk: string;
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
