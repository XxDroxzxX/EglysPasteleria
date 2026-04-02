// src/controllers/authController.js
const User = require('../models/User'); // Importamos el modelo, ya no db directamente

exports.register = async (req, res) => {
    try {
        // El controlador ya no sabe de SQL, solo le pide al modelo que "cree"
        await User.create(req.body);
        res.status(201).json({ success: true, message: 'Usuario creado' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en el registro' });
    }
};