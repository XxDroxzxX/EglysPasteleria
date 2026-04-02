// Script para probar diferentes contraseñas comunes de MySQL
const mysql = require('mysql2');

// Contraseñas comunes a probar
const passwordsToTest = [
  '',           // Sin contraseña (XAMPP/WAMP común)
  'root',       // Contraseña común
  '123456',     // Contraseña que estás usando
  'password',   // Otra común
  'admin',      // Otra común
  '1234',       // Otra común
];

const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  database: 'eglys_pasteleria',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

async function testPasswords() {
  console.log('🔍 Probando contraseñas comunes de MySQL...\n');
  console.log('Probando con usuario: root\n');

  for (const password of passwordsToTest) {
    const config = { ...DB_CONFIG, password };
    const pool = mysql.createPool(config);
    const promisePool = pool.promise();

    try {
      const [rows] = await promisePool.execute('SELECT 1 as test');
      console.log(`✅ CONTRASEÑA CORRECTA: "${password === '' ? '(vacía)' : password}"`);
      console.log('   Usa esta contraseña en db.js\n');
      
      // Cerrar el pool
      await promisePool.end();
      process.exit(0);
    } catch (error) {
      if (error.code === 'ER_ACCESS_DENIED_ERROR') {
        console.log(`❌ "${password === '' ? '(vacía)' : password}" - Incorrecta`);
      } else if (error.code === 'ER_BAD_DB_ERROR') {
        console.log(`⚠️  "${password === '' ? '(vacía)' : password}" - Conexión OK pero BD no existe`);
        console.log('   Esta contraseña funciona, pero necesitas crear la base de datos\n');
        await promisePool.end();
        process.exit(0);
      } else {
        console.log(`❌ "${password === '' ? '(vacía)' : password}" - Error: ${error.code}`);
      }
      await promisePool.end();
    }
  }

  console.log('\n❌ Ninguna de las contraseñas comunes funcionó.');
  console.log('\n💡 Opciones:');
  console.log('   1. Verifica tu contraseña de MySQL en phpMyAdmin o MySQL Workbench');
  console.log('   2. Si usas XAMPP, normalmente la contraseña está vacía');
  console.log('   3. Si usas WAMP, normalmente la contraseña está vacía');
  console.log('   4. Si instalaste MySQL directamente, usa la contraseña que configuraste');
  console.log('\n📝 Para encontrar tu contraseña:');
  console.log('   - Abre phpMyAdmin (http://localhost/phpmyadmin)');
  console.log('   - Si puedes entrar sin contraseña, usa: password: ""');
  console.log('   - Si pide contraseña, esa es la que debes usar\n');
  
  process.exit(1);
}

testPasswords();

