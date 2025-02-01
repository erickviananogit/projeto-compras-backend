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

// Atualizar categoria
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndUpdate(
      { _id: id, createdBy: req.user.id }, // Só permite atualizar se o usuário for o dono
      req.body,
      { new: true }
    );
    if (!category) throw new Error('Categoria não encontrada');
    res.json(category);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Excluir categoria
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndDelete({
      _id: id,
      createdBy: req.user.id
    });
    if (!category) throw new Error('Categoria não encontrada');
    res.json({ message: 'Categoria excluída' });
  } catch (err) {
    res.status(404).json({ message: err.message });
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