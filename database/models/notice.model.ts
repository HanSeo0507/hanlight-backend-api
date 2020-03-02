import { Model, DataTypes, BelongsTo, HasMany } from 'sequelize';

import { sequelize } from '../index';

export default class Notice extends Model<Notice> {
  public static associations: {
    user: BelongsTo<Notice, User>;
    noticeApproveLog: HasMany<Notice, NoticeApproveLog>;
    noticeViewLog: HasMany<Notice, NoticeViewLog>;
  };

  public user: User;
  public noticeApproveLog: NoticeApproveLog[];
  public noticeViewLog: NoticeViewLog[];

  public pk: number;
  public user_pk: string;
  public title: string;
  public content: string;
  public approved: boolean;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;
}

Notice.init(
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
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    approved: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    tableName: 'notices',
  }
);

import User from './user.model';
import NoticeApproveLog from './noticeApproveLog.model';
import NoticeViewLog from './noticeViewLog.model';

Notice.hasMany(NoticeApproveLog, {
  sourceKey: 'pk',
  foreignKey: 'notice_pk',
  as: 'noticeApproveLog',
});

Notice.hasMany(NoticeViewLog, {
  sourceKey: 'pk',
  foreignKey: 'notice_pk',
  as: 'noticeViewLog',
});

Notice.belongsTo(User, {
  foreignKey: 'user_pk',
  as: 'user',
});
