import { Sequelize } from 'sequelize-typescript';

import * as config from '../config/database.json';

export const sequelize = new Sequelize({
  host: config.host,
  dialect: 'mysql',
  database: config.database,
  username: config.username,
  password: config.password,
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
});

export async function connect(force: boolean, logging?: boolean) {
  try {
    await sequelize.addModels([__dirname + '/models/**/*.model.ts']);
    await sequelize.sync({ force, logging });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export const models = sequelize.model;
