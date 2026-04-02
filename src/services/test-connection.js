// Script de prueba de conexión
const db = require('./db.js');

async function testConnection() {
  console.log('🔍 Probando conexión a la base de datos...\n');

  try {
    // Probar conexión básica
    const [rows] = await db.execute('SELECT 1 as test');
    console.log('✅ Conexión a MySQL exitosa');

    // Verificar que la base de datos existe y tiene tablas
    const [tables] = await db.execute('SHOW TABLES');
    console.log(`✅ Base de datos encontrada. Tablas: ${tables.length}`);
    
    if (tables.length > 0) {
      console.log('\n📋 Tablas encontradas:');
      tables.forEach(table => {
        const tableName = Object.values(table)[0];
        console.log(`   - ${tableName}`);
      });
    }

    // Verificar productos
    const [productos] = await db.execute('SELECT COUNT(*) as count FROM productos');
    console.log(`\n📦 Productos en la base de datos: ${productos[0].count}`);

    // Verificar usuarios
    const [usuarios] = await db.execute('SELECT COUNT(*) as count FROM usuarios');
    console.log(`👥 Usuarios registrados: ${usuarios[0].count}`);

    // Listar algunos productos de ejemplo
    const [productosList] = await db.execute('SELECT id, nombre, tipo, precio FROM productos LIMIT 3');
    if (productosList.length > 0) {
      console.log('\n📝 Productos de ejemplo:');
      productosList.forEach(p => {
        console.log(`   - ${p.nombre} (${p.tipo}): $${p.precio}`);
      });
    }

    console.log('\n✅ Todas las pruebas pasaron correctamente!');
    console.log('🚀 El servidor está listo para iniciar.\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en la conexión:');
    console.error(error.message);
    
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('\n💡 Solución: Ejecuta el archivo eglys_pasteleria.sql para crear la base de datos');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Solución: Verifica que MySQL esté corriendo');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Solución: Verifica usuario y contraseña en db.js');
    }
    
    process.exit(1);
  }
}

testConnection();

