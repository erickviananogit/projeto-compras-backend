const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createSupermarket, getSupermarkets } = require('../controllers/supermarketController');

// Rotas protegidas por autenticação
router.post('/', auth, createSupermarket);
router.get('/', auth, getSupermarkets);

module.exports = router;