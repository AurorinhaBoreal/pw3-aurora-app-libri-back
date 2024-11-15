const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const mysql = require('mysql2/promise');

dotenv.config();

const createDatabaseIfNotExists = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`);
    await connection.end();
};

const connection = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '3306',
        dialect: 'mysql',
        timezone: '-03:00',
    }
);

const initializeDatabase = async () => {
    await createDatabaseIfNotExists();
    try {
        await connection.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
    }
};

initializeDatabase();

module.exports = connection;