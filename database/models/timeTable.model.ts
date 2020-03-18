import { Model, DataTypes, HasMany } from 'sequelize';

import { sequelize } from '../index';
import { UserMajor } from '@Lib/type';

export default class TimeTable extends Model<TimeTable> {
  public static associations: {
    timeTableLog: HasMany<TimeTable, TimeTableLog>;
  };

  public timeTableLog: TimeTableLog[];

  public pk: number;
  public major: UserMajor;
  public grade: number;
  public classNum: number;
  public day: string;
  public detail: string;
  public th: number;
}

TimeTable.init(
  {
    pk: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
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
    day: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    detail: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    th: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'timeTables',
  }
);

import TimeTableLog from './timeTableLog.model';

TimeTable.hasMany(TimeTableLog, {
  sourceKey: 'pk',
  foreignKey: 'timeTable_pk',
  as: 'timeTableLog',
});
