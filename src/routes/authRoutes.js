// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Definimos la ruta de registro
// Cuando alguien haga un POST a /api/register, se ejecutará authController.register
router.post('/register', authController.register);

module.exports = router;