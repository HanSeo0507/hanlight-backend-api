import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../index';

export default class MealOrder extends Model<MealOrder> {
  public pk: number;
  public order: string;
  public count: number;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

MealOrder.init(
  {
    pk: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    order: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    count: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'mealOrders',
  }
);
