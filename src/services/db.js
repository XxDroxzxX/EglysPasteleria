require('dotenv').config();

const mysql = require('mysql2');

function buildPoolConfig() {
  const url =
    process.env.DATABASE_URL ||
    process.env.MYSQL_URL ||
    process.env.MYSQL_PUBLIC_URL;

  if (url && url.startsWith('mysql')) {
    return url;
  }

  const host =
    process.env.DB_HOST ||
    process.env.MYSQLHOST ||
    process.env.MYSQL_HOST ||
    'localhost';
  const user =
    process.env.DB_USER ||
    process.env.MYSQLUSER ||
    process.env.MYSQL_USER ||
    'root';
  const password =
    process.env.DB_PASSWORD !== undefined
      ? process.env.DB_PASSWORD
      : process.env.MYSQLPASSWORD !== undefined
        ? process.env.MYSQLPASSWORD
        : process.env.MYSQL_PASSWORD !== undefined
          ? process.env.MYSQL_PASSWORD
          : '';
  const database =
    process.env.DB_NAME ||
    process.env.MYSQLDATABASE ||
    process.env.MYSQL_DATABASE ||
    'eglys_pasteleria';
  const port = Number(
    process.env.DB_PORT || process.env.MYSQLPORT || process.env.MYSQL_PORT || 3306
  );

  const isLocal =
    !host || host === 'localhost' || host === '127.0.0.1';
  const isRailwayInternal =
    typeof host === 'string' && host.includes('railway.internal');
  const forceSsl =
    process.env.DB_SSL === 'true' ||
    process.env.DB_SSL === '1' ||
    (!isLocal && !isRailwayInternal && process.env.DB_SSL !== 'false');

  const config = {
    host,
    user,
    password,
    database,
    port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  if (forceSsl) {
    config.ssl = {
      rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
    };
  }

  return config;
}

const poolConfig = buildPoolConfig();
const pool =
  typeof poolConfig === 'string'
    ? mysql.createPool(poolConfig)
    : mysql.createPool(poolConfig);

const promisePool = pool.promise();

pool.getConnection((err, connection) => {
  if (err) {
    console.log('❌ Error al conectar con la base de datos:');
    console.log(err.message);
  } else {
    console.log('✅ Conexión exitosa a la base de datos MySQL');
    connection.release();
  }
});

module.exports = promisePool;
