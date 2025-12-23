const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  // Referência ao Usuário (Relacionamento 1:1)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Informações Físicas
  gender: {
    type: String,
    enum: ['Masculino', 'Feminino', 'Outro'],
    required: [true, 'O gênero é obrigatório']
  },
  height: {
    type: Number, // Armazenado em cm
    required: false
  },
  weight: {
    type: Number, // Armazenado em kg
    required: false
  },

  // Características de Jogo
  play_style: {
    type: String,
    enum: ['Destro', 'Canhoto'],
    required: [true, 'O braço dominante é obrigatório']
  },
  backhand: {
    type: String,
    enum: ['1 Mão', '2 Mãos'],
    required: [true, 'O tipo de backhand é obrigatório']
  },

  // Evolução e Nível
  category: {
    type: String,
    default: 'Iniciante' // Pode ser A, B, C ou Especial conforme o ranking
  },
  city: {
    type: String,
    required: false,
    trim: true
  },
  
  // Metadados
  last_updated: {
    type: Date,
    default: Date.now
  }
});

// Middleware para atualizar a data de modificação sempre que o perfil for salvo
ProfileSchema.pre('save', function(next) {
  this.last_updated = Date.now();
  next();
});

module.exports = mongoose.model('Profile', ProfileSchema);
