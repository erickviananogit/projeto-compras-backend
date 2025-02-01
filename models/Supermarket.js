const mongoose = require('mongoose');

// Esquema do supermercado
const supermarketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome do supermercado é obrigatório'],
    unique: true
  },
  // Relacionamento com o usuário que criou o supermercado
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Supermarket', supermarketSchema);