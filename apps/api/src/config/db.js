const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // A URI vem do seu arquivo .env para maior segurança
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`🎾 MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Erro de conexão: ${error.message}`);
    // Encerra o processo com falha se não conseguir conectar ao banco
    process.exit(1);
  }
};

module.exports = connectDB;
