// database.js
require('dotenv').config();
const mysql = require('mysql2/promise');

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log('✅ Conexión exitosa a MySQL');
    return connection;
  } catch (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    throw err;
  }
}

module.exports = { connectDB };
