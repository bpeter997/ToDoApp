const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST_URL,
    dialect: 'mssql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

db.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => console.log(err));

module.exports = db;
