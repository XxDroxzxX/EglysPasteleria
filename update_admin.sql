-- Agregar campo de rol a la tabla usuarios
ALTER TABLE usuarios ADD COLUMN rol ENUM('usuario', 'admin') DEFAULT 'usuario';

-- Crear usuario administrador yeisonzero
INSERT INTO usuarios (nombres, apellidos, correo, contraseña, rol) VALUES 
('Admin', 'System', 'yeisonzero', 'admin123', 'admin')
ON DUPLICATE KEY UPDATE rol = 'admin';
