// apps/api/src/app.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const User = require('./models/User'); // Importe o model

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Rota de Cadastro de Teste
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password, gender, play_style, backhand } = req.body;
    
    // Cria o usuário no MongoDB
    const newUser = await User.create({
      name,
      email,
      password, // Lembrete: em produção, use bcrypt para criptografar!
      player_info: { gender, play_style, backhand }
    });

    res.status(201).json({ message: "Usuário criado!", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Erro ao criar usuário", error: error.message });
  }
});

// Rota de Login
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Busca o usuário e força a seleção da senha (que está como select: false no Model)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: "E-mail ou senha incorretos." });
    }

    // 2. Verifica a senha (comparação simples por enquanto)
    if (user.password !== password) {
      return res.status(401).json({ message: "E-mail ou senha incorretos." });
    }

    // 3. Remove a senha do objeto de resposta por segurança
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ 
      message: "Login realizado com sucesso!", 
      user: userResponse 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor na porta ${PORT}`));
