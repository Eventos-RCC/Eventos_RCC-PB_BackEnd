import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    url: process.env.POSTGRE_URL,
    dialect: "postgres",
    schema: 'rcc',
    logging: false,
  },
  test: {
    url: process.env.DB_URL_TEST,
    dialect: "postgres",
    schema: 'rcc',
    logging: false,
  },
  production: {
    url: process.env.DB_URL_PROD,
    dialect: "postgres",
    schema: 'rcc',
    logging: false,
  }
}
