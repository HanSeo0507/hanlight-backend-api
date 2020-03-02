import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '../index';

export default class CalendarLog extends Model<CalendarLog> {
  public static associations: {
    calendar: BelongsTo<CalendarLog, Calendar>;
    user: BelongsTo<CalendarLog, User>;
  };

  public calendar: Calendar;
  public user: User;

  public pk: number;
  public calendar_pk: number;
  public user_pk: string;
  public type: string;
  public month: number;
  public date: number;
  public detail: string;

  public readonly createdAt: Date;
}

CalendarLog.init(
  {
    pk: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    calendar_pk: {
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
    tableName: 'calendarLogs',
  }
);

import Calendar from './calendar.model';
import User from './user.model';

CalendarLog.belongsTo(Calendar, {
  foreignKey: 'calendar_pk',
  as: 'calendar',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

CalendarLog.belongsTo(User, {
  foreignKey: 'user_pk',
  as: 'user',
});
