const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Esquema do usuário
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Nome de usuário é obrigatório'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória']
  }
});

// Criptografar senha antes de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);