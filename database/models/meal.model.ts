import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../index';

export default class Meal extends Model<Meal> {
  public pk: number;
  public month: number;
  public date: number;
  public detail: string;
}

Meal.init(
  {
    pk: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
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
    tableName: 'meals',
  }
);
