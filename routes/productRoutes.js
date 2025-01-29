const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createProduct, getProducts } = require('../controllers/productController');

router.post('/', auth, createProduct);
router.get('/', auth, getProducts);

module.exports = router;