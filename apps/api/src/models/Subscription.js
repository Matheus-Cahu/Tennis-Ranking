const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  // Referência ao Usuário conforme o diagrama
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  // Tipo de Plano (baseado no seu planejamento de monetização/acesso)
  plan_type: {
    type: String,
    enum: ['Free', 'Premium', 'Pro'],
    default: 'Free'
  },

  // Status da Assinatura
  status: {
    type: String,
    enum: ['active', 'inactive', 'past_due', 'canceled'],
    default: 'active'
  },

  // Datas de Vigência
  start_date: {
    type: Date,
    default: Date.now
  },
  end_date: {
    type: Date,
    required: false // Nulo se for plano Free por tempo indeterminado
  },

  // Dados de Pagamento (integração futura com Stripe/Apple Pay)
  payment_customer_id: {
    type: String,
    required: false
  },

  auto_renew: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para verificar se a assinatura expirou
SubscriptionSchema.methods.is_active = function() {
  if (this.status !== 'active') return false;
  if (this.end_date && this.end_date < new Date()) return false;
  return true;
};

module.exports = mongoose.model('Subscription', SubscriptionSchema);
