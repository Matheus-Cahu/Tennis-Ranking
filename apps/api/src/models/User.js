const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // --- Dados de Conta (Tabela Users no Diagrama) ---
  name: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória'],
    select: false // Não retorna a senha em consultas comuns por segurança
  },
  photo_url: {
    type: String,
    default: ''
  },
  
  // --- Informações de Tenista (Tabela Players no Diagrama) ---
  player_info: {
    gender: {
      type: String,
      enum: ['Masculino', 'Feminino', 'Outro'], // Conforme opções do protótipo
      required: true
    },
    play_style: {
      type: String,
      enum: ['Destro', 'Canhoto'], // Braço dominante
      required: true
    },
    backhand: {
      type: String,
      enum: ['1 Mão', '2 Mãos'], // Tipo de backhand
      required: true
    },
    height: {
      type: Number, // Armazenado em cm
      required: false
    },
    weight: {
      type: Number, // Armazenado em kg
      required: false
    }
  },

  // --- Estatísticas e Controle ---
  level: {
    type: String,
    default: 'Iniciante' // Pode ser vinculado à lógica de ranking
  },
  points: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para criptografar a senha antes de salvar (exemplo básico)
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  // Aqui você usaria bcrypt.hash no futuro
});

module.exports = mongoose.model('User', UserSchema);
