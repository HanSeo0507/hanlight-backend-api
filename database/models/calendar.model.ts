import { Model, DataTypes, HasMany } from 'sequelize';

import { sequelize } from '../index';

export default class Calendar extends Model<Calendar> {
  public static associations: {
    calendarLog: HasMany<Calendar, CalendarLog>;
  };

  public calendarLog: CalendarLog[];

  public pk: number;
  public year: number;
  public month: number;
  public date: number;
  public detail: string;
}

Calendar.init(
  {
    pk: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    year: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    month: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    date: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    detail: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'calendars',
  }
);

import CalendarLog from './calendarLog.model';

Calendar.hasMany(CalendarLog, {
  sourceKey: 'pk',
  foreignKey: 'calendar_pk',
  as: 'calendarLog',
});
