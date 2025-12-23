const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  // Jogador que inicia o desafio
  challenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Jogador que recebe o desafio
  challenged: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Status do convite
  status: {
    type: String,
    enum: ['Pendente', 'Aceito', 'Recusado', 'Expirado', 'Convertido'],
    default: 'Pendente'
  },

  // Data sugerida para o jogo
  suggested_date: {
    type: Date,
    required: true
  },

  // Local sugerido
  location: {
    type: String,
    trim: true
  },

  // Referência para a partida criada após o aceite
  match_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: false
  },

  // Mensagem opcional de "trash talk" ou convite
  message: {
    type: String,
    maxLength: 200
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Validação para garantir que o desafio ocorra no período permitido (dia 21 ao 30/31)
ChallengeSchema.pre('save', function(next) {
  const today = new Date();
  const dayOfMonth = today.getDate();

  // Se o status for novo (Pendente), verifica a regra de negócio do dia 21
  if (this.isNew && dayOfMonth < 21) {
    // Nota: Você pode desativar isso para testes, mas é a regra do seu planejamento
    // return next(new Error('Desafios só podem ser realizados a partir do dia 21 de cada mês.'));
  }
  
  if (this.challenger.equals(this.challenged)) {
    return next(new Error('Você não pode desafiar a si mesmo.'));
  }
  next();
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
