// apps/api/src/app.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Importação dos Modelos
const User = require('./models/User'); 
const Profile = require('./models/Profile');

const app = express();

// Ligação à Base de Dados
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // Essencial para ler o corpo das requisições JSON

// --- ROTAS DE UTILIZADOR ---

/**
 * Rota de Registo: Cria um utilizador e um perfil associado
 */
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password, player_info } = req.body;

    // 1. Criar o Utilizador no MongoDB
    // O campo player_info.gender é obrigatório conforme o User.js
    const newUser = await User.create({
      name,
      email,
      password, // Nota: Em produção, aplique bcrypt.hash aqui
      player_info: { 
        gender: player_info?.gender 
      }
    });

    // 2. Criar o Perfil vinculado ao ID do novo utilizador
    // Preenchemos com os dados de jogo enviados ou valores padrão
    const newProfile = await Profile.create({
      user: newUser._id,
      play_style: player_info?.play_style || 'Destro',
      backhand: player_info?.backhand || '2 Mãos',
      category: 'Iniciante'
    });

    res.status(201).json({ 
      msg: "Usuário e Perfil criados com sucesso!", 
      user: newUser,
      profile: newProfile 
    });
  } catch (error) {
    console.error("Erro no Registro:", error.message);
    res.status(400).json({ msg: "Erro ao criar usuário e perfil", error: error.message });
  }
});

/**
 * Rota de Login
 */
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca o utilizador e força a seleção da senha (select: false no Model)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ msg: "E-mail ou senha incorretos." });
    }

    // Verificação simples de senha
    if (user.password !== password) {
      return res.status(401).json({ msg: "E-mail ou senha incorretos." });
    }

    // Remove a senha do objeto de resposta por segurança
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ 
      msg: "Login realizado com sucesso!", 
      user: userResponse 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro interno no servidor." });
  }
});

/**
 * Rota de Ranking: Lista todos os utilizadores ordenados por pontos
 */
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({ active: true })
      .sort({ points: -1 }) 
      .select('-password'); 

    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ msg: "Erro ao carregar ranking." });
  }
});

/**
 * Rota de Detalhes: Busca um utilizador específico pelo ID
 */
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado" });
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar detalhes do usuário." });
  }
});

// Configuração da Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor a correr na porta ${PORT}`));
