const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  // Referências aos Jogadores
  player1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  player2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Vinculação com a Chave/Torneio
  bracket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bracket',
    required: false // Pode ser uma partida amistosa fora de chave
  },

  // Placar da Partida (Sets)
  score: {
    player1_sets: { type: Number, default: 0 },
    player2_sets: { type: Number, default: 0 },
    details: [{
      set_number: Number,
      player1_games: Number,
      player2_games: Number
    }]
  },

  // Resultado e Vencedor
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  status: {
    type: String,
    enum: ['Agendado', 'Em Andamento', 'Finalizado', 'Cancelado', 'W.O.'],
    default: 'Agendado'
  },

  // Dados de Local e Data
  match_date: {
    type: Date,
    required: true
  },
  location: {
    type: String, // Nome do clube ou quadra
    trim: true
  },

  // Controle de Confirmação
  reported_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  is_confirmed: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para garantir que um jogador não jogue contra si mesmo
MatchSchema.pre('save', function(next) {
  if (this.player1.equals(this.player2)) {
    return next(new Error('Um jogador não pode disputar uma partida contra si mesmo.'));
  }
  next();
});

module.exports = mongoose.model('Match', MatchSchema);
