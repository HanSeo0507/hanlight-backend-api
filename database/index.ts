import { Sequelize } from 'sequelize-typescript';

import * as config from '../config/database.json';

export const sequelize = new Sequelize({
  host: config.host,
  dialect: 'mysql',
  database: config.database,
  username: config.username,
  password: config.password,
});

export async function connect(force: boolean) {
  try {
    await sequelize.addModels([__dirname + '/models/**/*.model.ts']);
    await sequelize.sync({ force });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export const models = sequelize.model;
