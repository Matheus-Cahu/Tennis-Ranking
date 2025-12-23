const mongoose = require('mongoose');

const GroupMemberSchema = new mongoose.Schema({
  // Referência ao Grupo/Chave (Tabela Brackets/Groups no diagrama)
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bracket',
    required: true
  },

  // Referência ao Jogador
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Status do jogador no grupo (Ex: Ativo, Eliminado, Desistente)
  status: {
    type: String,
    enum: ['Ativo', 'Eliminado', 'Desistente', 'Concluiu'],
    default: 'Ativo'
  },

  // Pontuação específica dentro deste grupo/temporada
  points: {
    type: Number,
    default: 0
  },

  // Estatísticas exclusivas deste grupo
  games_won: {
    type: Number,
    default: 0
  },
  games_lost: {
    type: Number,
    default: 0
  },
  
  // Ordem de entrada ou sorteio
  seed: {
    type: Number,
    required: false
  },

  joinedAt: {
    type: Date,
    default: Date.now
  }
});

// Garante que um jogador não seja adicionado duas vezes ao mesmo grupo
GroupMemberSchema.index({ group: 1, player: 1 }, { unique: true });

module.exports = mongoose.model('GroupMember', GroupMemberSchema);
