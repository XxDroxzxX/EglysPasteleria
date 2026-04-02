// Script para crear la base de datos automáticamente
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Configuración (debe coincidir con db.js)
const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '',  // Cambia si es necesario
  multipleStatements: true  // Permite ejecutar múltiples queries
};

async function setupDatabase() {
  console.log('🔧 Configurando base de datos...\n');

  // Primero conectar sin especificar base de datos
  const connection = mysql.createConnection(DB_CONFIG);

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('❌ Error al conectar con MySQL:');
        console.error(err.message);
        console.error('\n💡 Verifica:');
        console.error('   1. Que MySQL esté corriendo');
        console.error('   2. Las credenciales en setup-database.js (línea 8-10)');
        reject(err);
        return;
      }

      console.log('✅ Conectado a MySQL\n');

      // Leer el archivo SQL
      const sqlFile = path.join(__dirname, 'eglys_pasteleria.sql');
      
      if (!fs.existsSync(sqlFile)) {
        console.error('❌ No se encontró el archivo eglys_pasteleria.sql');
        connection.end();
        reject(new Error('Archivo SQL no encontrado'));
        return;
      }

      const sql = fs.readFileSync(sqlFile, 'utf8');
      
      console.log('📝 Ejecutando script SQL...\n');

      // Ejecutar el script SQL
      connection.query(sql, (err, results) => {
        if (err) {
          console.error('❌ Error al ejecutar el script SQL:');
          console.error(err.message);
          connection.end();
          reject(err);
          return;
        }

        console.log('✅ Base de datos creada exitosamente!\n');
        console.log('📋 Tablas creadas:');
        console.log('   - usuarios');
        console.log('   - productos');
        console.log('   - pedidos');
        console.log('   - items_pedido');
        console.log('   - carrito\n');
        console.log('📦 Productos iniciales insertados\n');
        console.log('✅ ¡Todo listo! Ahora puedes ejecutar: npm start\n');

        connection.end();
        resolve();
      });
    });
  });
}

setupDatabase()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    process.exit(1);
  });

