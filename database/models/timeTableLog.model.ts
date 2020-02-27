import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '../index';
import TimeTable from './timeTable.model';
import User from './user.model';

export default class TimeTableLog extends Model<TimeTableLog> {
  public static associations: {
    timeTable: BelongsTo<TimeTableLog, TimeTable>;
    user: BelongsTo<TimeTableLog, User>;
  };

  public timeTable: TimeTable;
  public user: User;

  public pk: number;
  public timeTable_pk: number;
  public user_pk: string;
  public type: string;
  public major: 'G' | 'N' | 'H' | 'I';
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
