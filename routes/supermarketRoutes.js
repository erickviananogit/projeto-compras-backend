const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createSupermarket, getSupermarkets, updateSupermarket, deleteSupermarket } = require('../controllers/supermarketController');

// Rotas protegidas por autenticação
router.post('/', auth, createSupermarket);
router.get('/', auth, getSupermarkets);
router.put('/:id', auth, updateSupermarket);
router.delete('/:id', auth, deleteSupermarket);

module.exports = router;