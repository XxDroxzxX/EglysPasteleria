# 🔧 Configuración de Base de Datos

## ⚠️ IMPORTANTE: Configura tus credenciales de MySQL

El error que estás viendo indica que las credenciales de MySQL no son correctas. 

### Pasos para configurar:

1. **Abre el archivo `db.js`**

2. **Actualiza las siguientes líneas con tus credenciales de MySQL:**

```javascript
const DB_CONFIG = {
  host: 'localhost',
  user: 'root',           // ← Cambia por tu usuario de MySQL
  password: '123456',      // ← Cambia por tu contraseña de MySQL
  database: 'eglys_pasteleria',
  // ...
};
```

### Opciones comunes de configuración:

**Si usas XAMPP:**
- Usuario: `root`
- Contraseña: (deja vacío `''` o `'root'`)

**Si usas WAMP:**
- Usuario: `root`
- Contraseña: (deja vacío `''`)

**Si usas MySQL instalado directamente:**
- Usuario: `root` (o el que configuraste)
- Contraseña: (la que configuraste durante la instalación)

**Si usas MariaDB:**
- Usuario: `root`
- Contraseña: (la que configuraste)

### Después de configurar:

1. **Ejecuta el script SQL:**
   - Abre phpMyAdmin o tu cliente MySQL
   - Ejecuta el contenido del archivo `eglys_pasteleria.sql`
   - Esto creará la base de datos y las tablas necesarias

2. **Prueba la conexión:**
   ```bash
   node test-connection.js
   ```

3. **Si la conexión es exitosa, inicia el servidor:**
   ```bash
   npm start
   ```

### ¿No recuerdas tu contraseña de MySQL?

**Para XAMPP:**
- Por defecto no tiene contraseña, usa `password: ''` (vacío)

**Para WAMP:**
- Por defecto no tiene contraseña, usa `password: ''` (vacío)

**Para MySQL instalado:**
- Puedes resetear la contraseña o crear un nuevo usuario con permisos

### Verificar que MySQL está corriendo:

- **XAMPP:** Abre el panel de control y verifica que MySQL esté en "Running"
- **WAMP:** Verifica que el ícono esté verde en la bandeja del sistema
- **MySQL directo:** Verifica el servicio en "Servicios" de Windows

