import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '../index';

export default class TermAcceptLog extends Model<TermAcceptLog> {
  public static associations: {
    user: BelongsTo<TermAcceptLog, User>;
  };

  public user: User;

  public pk: number;
  public user_pk: string;
  public accept: boolean;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

TermAcceptLog.init(
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
    accept: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    tableName: 'termAcceptLogs',
  }
);

import User from './user.model';

TermAcceptLog.belongsTo(User, {
  foreignKey: 'user_pk',
  as: 'user',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
