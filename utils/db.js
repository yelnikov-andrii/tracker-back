import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('june_2025', 'june_2025_user', 'xqx6JmoweEmsz6U4bnqCdBW9h6Birt5D', {
  // host: 'dpg-d10s5ve3jp1c739aik20-a.oregon-postgres.render.com',
  host: 'dpg-d10s5ve3jp1c739aik20-a',
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
