const Supermarket = require('../models/Supermarket');

// Criar supermercado (protegido por autenticação)
exports.createSupermarket = async (req, res) => {
  try {
    const { name, location } = req.body;
    const supermarket = new Supermarket({
      name,
      location,
      createdBy: req.user.id // ID do usuário logado (vem do token JWT)
    });
    await supermarket.save();
    res.status(201).json(supermarket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Atualizar supermercado
exports.updateSupermarket = async (req, res) => {
  try {
    const { id } = req.params;
    const supermarket = await Supermarket.findOneAndUpdate(
      { _id: id, createdBy: req.user.id }, // Só permite atualizar se o usuário for o dono
      req.body,
      { new: true }
    );
    if (!supermarket) throw new Error('Supermercado não encontrado');
    res.json(supermarket);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Excluir supermercado
exports.deleteSupermarket = async (req, res) => {
  try {
    const { id } = req.params;
    const supermarket = await Supermarket.findOneAndDelete({
      _id: id,
      createdBy: req.user.id
    });
    if (!supermarket) throw new Error('Supermercado não encontrado');
    res.json({ message: 'Supermercado excluído' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Listar todos os supermercados do usuário
exports.getSupermarkets = async (req, res) => {
  try {
    const supermarkets = await Supermarket.find({ createdBy: req.user.id });
    res.json(supermarkets);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar supermercados' });
  }
};