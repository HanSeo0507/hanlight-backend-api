import * as dotenv from 'dotenv';

import { Sequelize } from 'sequelize';

dotenv.config();

const DB_CONFIG = {
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

export const sequelize: Sequelize = new Sequelize({
  host: DB_CONFIG.DB_HOST,
  dialect: 'mysql',
  database: DB_CONFIG.DB_NAME,
  username: DB_CONFIG.DB_USERNAME,
  password: DB_CONFIG.DB_PASSWORD,
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
});

export const connect = async (force: boolean, logging?: boolean) => {
  try {
    await sequelize.sync({ force, logging });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
