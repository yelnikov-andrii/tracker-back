import { Sequelize } from 'sequelize';

// export const sequelize = new Sequelize('january_0m9c', 'january_0m9c_user', '82oAXwf0O4iyNvor4DPpYo6qrPpPlG9p', {
//   host: 'dpg-cu8efj52ng1s73ejpsi0-a.oregon-postgres.render.com',
//   // host: 'dpg-cu8efj52ng1s73ejpsi0-a',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     }
//   },
//   dialect: 'postgres',
//   logging: false,
// });

export const sequelize = new Sequelize('db_february_d98m', 'db_february_d98m_user', 'Qb0uQmcxljRBoQHdyQQBtlADKELdRcwQ', {
  // host: 'dpg-curf75bqf0us73fj93u0-a.oregon-postgres.render.com',
  host: 'dpg-curf75bqf0us73fj93u0-a',
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