const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config({ path: './config.env' });
const app = require('./app');

const db = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST_URL,
    dialect: 'mssql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.authenticate().then(() => {
    console.log('Database connected...')
}).catch(err => console.log(err));


const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
