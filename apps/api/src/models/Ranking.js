const mongoose = require('mongoose');

const RankingSchema = new mongoose.Schema({
  // Referência ao Usuário/Jogador conforme o diagrama
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  // Dados de Classificação
  position: {
    type: Number,
    required: true,
    default: 0
  },
  points: {
    type: Number,
    required: true,
    default: 0
  },

  // Estatísticas de Partidas
  matches_played: {
    type: Number,
    default: 0
  },
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },

  // Histórico de Performance (Últimos jogos)
  performance_history: [{
    match_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match'
    },
    result: {
      type: String,
      enum: ['Vitoria', 'Derrota']
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],

  // Metadados de Controle
  last_match_date: {
    type: Date
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para atualizar a data de modificação
RankingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Ranking', RankingSchema);
