import { Sequelize } from 'sequelize';

// export const sequelize = new Sequelize('db_february_d98m', 'db_february_d98m_user', 'Qb0uQmcxljRBoQHdyQQBtlADKELdRcwQ', {
//   // host: 'dpg-curf75bqf0us73fj93u0-a.oregon-postgres.render.com',
//   host: 'dpg-curf75bqf0us73fj93u0-a',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     }
//   },
//   dialect: 'postgres',
//   logging: false,
// });

// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

export const sequelize = new Sequelize('march_db', 'march_db_user', 'OYXvW8MG9utK5wscUbOkRZW4Ch1yRHNO', {
  // host: 'dpg-cvf9bbhopnds73b7vbv0-a.oregon-postgres.render.com',
  host: 'dpg-cvf9bbhopnds73b7vbv0-a',
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