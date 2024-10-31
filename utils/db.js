import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('db_october', 'db_october_user', 'WHLHRryIHWRzc3kmDFmeGpdR9Cs0jemw', {
  // host: 'dpg-cs61c9tumphs73b41k2g-a.oregon-postgres.render.com',
  host: 'dpg-cs61c9tumphs73b41k2g-a',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  },
  dialect: 'postgres',
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}