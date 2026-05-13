const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI no está configurada.');
  }

  const databaseName = process.env.MONGODB_DB_NAME;

  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUri, databaseName ? { dbName: databaseName } : {});
};

module.exports = connectDB;
