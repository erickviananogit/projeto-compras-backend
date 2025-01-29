const mongoose = require('mongoose');

// Esquema da categoria (ex: "Hortifruti", "Limpeza")
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome da categoria é obrigatório'],
    unique: true
  },
  // Relacionamento com o usuário que criou a categoria
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Category', categorySchema);