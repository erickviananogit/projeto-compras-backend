const express = require('express');
const router = express.Router();
const { register, login, updateUser, deleteUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Rota de registro
router.post('/register', register);

// Rota de login
router.post('/login', login);

// Rotas protegidas
router.put('/me', auth, updateUser);   // Atualizar usuário logado
router.delete('/me', auth, deleteUser); // Excluir usuário logado

module.exports = router;