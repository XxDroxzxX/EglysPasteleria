-- Base: en Railway suele llamarse "railway"; créala en el panel o usa USE railway;
-- CREATE DATABASE IF NOT EXISTS eglys_pasteleria;
-- USE eglys_pasteleria;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(100) UNIQUE NOT NULL,
    direccion VARCHAR(150),
    contraseña VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('torta', 'evento') NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('pendiente', 'confirmado', 'cancelado') DEFAULT 'pendiente',
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de items del pedido
CREATE TABLE IF NOT EXISTS items_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- Tabla de carrito (sesión temporal)
CREATE TABLE IF NOT EXISTS carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_item (usuario_id, producto_id)
);

-- Insertar productos iniciales
INSERT INTO productos (tipo, nombre, precio, descripcion, imagen) VALUES
('torta', 'Torta frutal', 30000, 'Suave bizcocho relleno de crema ligera y coronado con una vibrante selección de frutas frescas de temporada.', 'img/frutas.jpg'),
('torta', 'Torta sol amarillo', 30000, 'Bizcocho esponjoso con un delicioso toque cítrico, usualmente de naranja o limón, bañado con un glaseado brillante de color amarillo', 'img/amarillo.png'),
('torta', 'Torta chocolate', 30000, 'Intenso y húmedo bizcocho de chocolate, con un rico relleno y cubierto por una cremosa ganache o frosting de chocolate.', 'img/chocolate.jpg'),
('evento', 'Fiesta Rosa', 230000, 'Ideal para celebrar quinceañeras, baby showers o cumpleaños con un ambiente suave, femenino y elegante, donde el color rosa es el protagonista de la decoración y el dress code', 'img/rosa.jpg'),
('evento', 'Fiesta Matrimonio', 300000, 'El evento más importante para la pareja, donde los detalles, la elegancia y la emoción se unen para festejar el inicio de su vida juntos, con una atmósfera de solemnidad y gran alegría.', 'img/matrimonio.jpeg'),
('evento', 'Fiesta Dorada', 200000, 'Un tema que evoca lujo, distinción y éxito. Es perfecta para grandes aniversarios, graduaciones importantes o eventos corporativos que buscan impactar con sofisticación y glamour.', 'img/dorado.jpg')
ON DUPLICATE KEY UPDATE nombre=nombre;
