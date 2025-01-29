require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const supermarketRoutes = require('./routes/supermarketRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão ao banco de dados
connectDB();

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/supermarkets', supermarketRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));