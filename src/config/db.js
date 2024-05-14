const mysql = require('mysql2/promise');
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || 10, 
  queueLimit: 0,
  port: process.env.MYSQL_PORT 
});

pool.getConnection().then(connection => {
  console.log('Connexion à la base de données réussie !');
  connection.release();
}).catch(error => {
  console.error('Erreur de connexion à la base de données:', error);
});

module.exports = pool;
