README - Eglys Pastelería 

ESTRUCTURA DEL PROYECTO:
- ingreso.html        -> pantalla de inicio de sesión
- registro.html      -> pantalla para crear cuenta
- servicio.html      -> seleccionar Tortas o Eventos
- producto.html      -> lista de tortas (seleccionar suma al carrito)
- evento.html        -> lista de eventos
- detalle-pedido.html-> ver carrito y confirmar pedido
- estilos.css        -> estilos compartidos
- main.js            -> lógica JS (conectado a API backend)
- server.js          -> servidor Express con endpoints API
- db.js              -> configuración de conexión MySQL
- eglys_pasteleria.sql -> esquema de base de datos

REQUISITOS:
1. Node.js instalado (versión 14 o superior)
2. MySQL instalado y corriendo
3. Base de datos creada (ver instrucciones abajo)

INSTALACIÓN Y CONFIGURACIÓN:

1. Instalar dependencias:
   npm install

2. Configurar base de datos MySQL:
   - Abre MySQL (phpMyAdmin)
   - Ejecuta el archivo: eglys_pasteleria.sql
   - Esto creará la base de datos y todas las tablas necesarias
   - También insertará los productos iniciales

CÓMO EJECUTAR:

1. Iniciar el servidor:
   npm start
   o para desarrollo con auto-reload:
   npm run dev

2. Abrir en el navegador:
   http://localhost:3000

3. Flujo de uso:
   - Regístrate en "registro.html"
   - Inicia sesión en "ingreso.html"
   - Selecciona servicios (Tortas o Eventos)
   - Agrega productos al carrito
   - Confirma tu pedido

ENDPOINTS API DISPONIBLES:

POST   /api/register              - Registrar nuevo usuario
POST   /api/login                 - Iniciar sesión
GET    /api/productos?tipo=torta  - Obtener productos (opcional: ?tipo=torta o ?tipo=evento)
POST   /api/carrito               - Agregar producto al carrito
GET    /api/carrito/:usuario_id   - Obtener carrito del usuario
DELETE /api/carrito/:usuario_id/:producto_id - Eliminar del carrito
POST   /api/pedidos               - Confirmar pedido
GET    /api/pedidos/:usuario_id   - Obtener pedidos del usuario

NOTAS IMPORTANTES:

- Los datos ahora se guardan en MySQL, NO en localStorage
- El usuario actual se mantiene en localStorage solo para la sesión
- Todos los productos, carritos y pedidos se almacenan en la base de datos
- Si cambias la contraseña de MySQL, actualiza db.js

SOLUCIÓN DE PROBLEMAS:

- Error de conexión a MySQL:
  * Verifica que MySQL esté corriendo
  * Revisa los datos en db.js
  * Asegúrate de que la base de datos exista

- Error "Cannot find module":
  * Ejecuta: npm install

- El servidor no inicia:
  * Verifica que el puerto 3000 no esté en uso
  * Cambia el PORT en server.js si es necesario

- Los productos no se muestran:
  * Verifica que se hayan insertado los productos en la BD
  * Revisa la consola del navegador (F12) para ver errores

SOPORTE:
- Revisa los logs del servidor en la terminal
- Revisa la consola del navegador (F12) para errores del frontend
- Verifica que todas las tablas existan en la base de datos
