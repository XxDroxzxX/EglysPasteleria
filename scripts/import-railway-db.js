/**
 * Importa eglys_pasteleria.sql y update_admin.sql en MySQL remoto (p. ej. Railway).
 * Uso (PowerShell):
 *   $env:MYSQL_PUBLIC_URL="mysql://..."; node scripts/import-railway-db.js
 */
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function main() {
  const url = process.env.MYSQL_PUBLIC_URL || process.env.DATABASE_URL;
  if (!url || !url.startsWith('mysql')) {
    console.error('Define MYSQL_PUBLIC_URL o DATABASE_URL con la URL mysql://...');
    process.exit(1);
  }

  const root = path.join(__dirname, '..');
  const conn = await mysql.createConnection({
    uri: url,
    multipleStatements: true,
    ssl: { rejectUnauthorized: false },
  });

  const sql1 = fs.readFileSync(path.join(root, 'eglys_pasteleria.sql'), 'utf8');
  await conn.query(sql1);
  console.log('Listo: eglys_pasteleria.sql');

  const sql2 = fs.readFileSync(path.join(root, 'update_admin.sql'), 'utf8');
  try {
    await conn.query(sql2);
    console.log('Listo: update_admin.sql');
  } catch (e) {
    if (e.code === 'ER_DUP_FIELDNAME' || String(e.message).includes('Duplicate column')) {
      console.log('La columna rol ya existía; solo se actualiza/inserta el admin.');
      await conn.query(
        `INSERT INTO usuarios (nombres, apellidos, correo, contraseña, rol) VALUES
        ('Admin', 'System', 'yeisonzero', 'admin123', 'admin')
        ON DUPLICATE KEY UPDATE rol = 'admin'`
      );
    } else {
      throw e;
    }
  }

  await conn.end();
  console.log('Importación terminada.');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
