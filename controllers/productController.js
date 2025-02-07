const Product = require('../models/Product');
const Category = require('../models/Category');
const Supermarket = require('../models/Supermarket');

// Criar produto
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, supermarket, purchaseDate } = req.body;

    // Verificar se a categoria e o supermercado existem
    const categoryExists = await Category.findById(category);
    const supermarketExists = await Supermarket.findById(supermarket);

    if (!categoryExists || !supermarketExists) {
      return res.status(404).json({ message: 'Categoria ou supermercado não encontrado' });
    }

    const product = new Product({
      name,
      price,
      category,
      supermarket,
      purchaseDate: purchaseDate || Date.now(),
      createdBy: req.user.id
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Atualizar produto
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndUpdate(
      { _id: id, createdBy: req.user.id }, // Só permite atualizar se o usuário for o dono
      req.body,
      { new: true }
    );
    if (!product) throw new Error('Produto não encontrado');
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Excluir produto
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({
      _id: id,
      createdBy: req.user.id
    });
    if (!product) throw new Error('Produto não encontrado');
    res.json({ message: 'Produto excluído' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Listar produtos do usuário (com filtros opcionais)
exports.getProducts = async (req, res) => {
  try {
    const { category, supermarket } = req.query;
    const filter = { createdBy: req.user.id };

    if (category) filter.category = category;
    if (supermarket) filter.supermarket = supermarket;

    const products = await Product.find(filter)
      .populate('category', 'name') // Traz detalhes da categoria
      .populate('supermarket', 'name location'); // Traz detalhes do supermercado

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
};