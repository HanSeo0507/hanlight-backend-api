import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '../index';
import Notice from './notice.model';
import User from './user.model';

export default class NoticeApproveLog extends Model<NoticeApproveLog> {
  public static associations: {
    notice: BelongsTo<NoticeApproveLog, Notice>;
    user: BelongsTo<NoticeApproveLog, User>;
  };

  public notice: Notice;
  public user: User;

  public pk: number;
  public notice_pk: number;
  public user_pk: string;
  public approved: boolean;
  public type: string;

  public readonly createdAt: Date;
  public readonly deletedAt: Date;
}

NoticeApproveLog.init(
  {
    pk: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    notice_pk: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    user_pk: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    approved: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.BOOLEAN,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'noticeApproveLogs',
  }
);
