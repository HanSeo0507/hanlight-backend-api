import * as dotenv from 'dotenv';

import { Sequelize } from 'sequelize-typescript';

dotenv.config();

export const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  dialect: 'mysql',
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
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
