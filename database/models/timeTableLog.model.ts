import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '../index';
import { UserType } from '@Lib/type';

export default class TimeTableLog extends Model<TimeTableLog> {
  public static associations: {
    timeTable: BelongsTo<TimeTableLog, TimeTable>;
    user: BelongsTo<TimeTableLog, User>;
  };

  public timeTable: TimeTable;
  public user: User;

  public pk: number;
  public timeTable_pk: TimeTable['pk'];
  public user_pk: User['pk'];
  public type: string;
  public major: UserType;
  public grade: number;
  public classNum: number;

  public readonly createdAt: Date;
}

TimeTableLog.init(
  {
    pk: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    timeTable_pk: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    user_pk: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    major: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    grade: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    classNum: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'timeTableLogs',
  }
);

import TimeTable from './timeTable.model';
import User from './user.model';

TimeTableLog.belongsTo(User, {
  foreignKey: 'user_pk',
  as: 'user',
  onUpdate: 'CASCADE',
});

TimeTableLog.belongsTo(TimeTable, {
  foreignKey: 'timeTable_pk',
  as: 'timeTable',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
