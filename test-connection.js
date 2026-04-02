const db = require('./src/services/db');

console.log('Probando conexión a la base de datos...');

// Probar una consulta simple
async function testConnection() {
  try {
    const [rows] = await db.execute('SELECT 1 as test');
    console.log('✅ Conexión exitosa:', rows);
    
    // Probar consultar usuarios
    const [users] = await db.execute('SELECT COUNT(*) as count FROM usuarios');
    console.log('📊 Usuarios en la base de datos:', users[0].count);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en la conexión:', error);
    process.exit(1);
  }
}

testConnection();
