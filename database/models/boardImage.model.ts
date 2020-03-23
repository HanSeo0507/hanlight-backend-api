import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '../index';

export default class BoardImage extends Model<BoardImage> {
  public static associations: {
    board: BelongsTo<BoardImage, Board>;
  };

  public board: Board;

  public pk: number;
  public board_pk: Board['pk'];
  public file: string;
}

BoardImage.init(
  {
    pk: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    board_pk: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    file: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'boardImages',
  }
);

import Board from './board.model';

BoardImage.belongsTo(Board, {
  foreignKey: 'board_pk',
  as: 'board',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
