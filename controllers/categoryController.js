const Category = require('../models/Category');

// Criar categoria
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name, createdBy: req.user.id });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Listar categorias do usuário
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ createdBy: req.user.id });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar categorias' });
  }
};