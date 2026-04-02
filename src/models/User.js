// src/models/User.js
const db = require('../services/db');

const User = {
    // Función para crear un usuario en la BD
    create: async (userData) => {
        const { nombres, apellidos, telefono, correo, direccion, contraseña } = userData;
        const query = `
            INSERT INTO usuarios (nombres, apellidos, telefono, correo, direccion, contraseña) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [nombres, apellidos, telefono, correo, direccion, contraseña]);
        return result;
    },

    // Función para buscar un usuario por correo (útil para el login)
    findByEmail: async (correo) => {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        return rows[0];
    }
};

module.exports = User;