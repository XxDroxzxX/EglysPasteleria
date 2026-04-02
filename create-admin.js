const db = require('./src/services/db');

async function createAdmin() {
  try {
    // Verificar si yeisonzero ya existe
    const [existing] = await db.execute(
      'SELECT id FROM usuarios WHERE correo = ?',
      ['yeisonzero']
    );

    if (existing.length > 0) {
      console.log('✅ Usuario yeisonzero ya existe');
      
      // Actualizar a admin
      await db.execute(
        'UPDATE usuarios SET rol = ? WHERE correo = ?',
        ['admin', 'yeisonzero']
      );
      console.log('✅ Usuario yeisonzero actualizado a administrador');
    } else {
      // Crear nuevo usuario admin
      const [result] = await db.execute(
        'INSERT INTO usuarios (nombres, apellidos, correo, contraseña, rol) VALUES (?, ?, ?, ?, ?)',
        ['Admin', 'System', 'yeisonzero', 'admin123', 'admin']
      );
      console.log('✅ Administrador yeisonzero creado con ID:', result.insertId);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createAdmin();
