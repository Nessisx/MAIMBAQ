const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    process.env.DB_MODE = 'memory';
    console.warn('MONGODB_URI no está configurada. Usando almacenamiento en memoria.');
    return { mode: 'memory' };
  }

  const databaseName = process.env.MONGODB_DB_NAME;

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(mongoUri, {
      ...(databaseName ? { dbName: databaseName } : {}),
      serverSelectionTimeoutMS: 3000,
    });

    process.env.DB_MODE = 'mongo';
    return { mode: 'mongo' };
  } catch (error) {
    process.env.DB_MODE = 'memory';
    console.warn(
      'No se pudo conectar a MongoDB. El backend seguirá en modo memoria para pruebas locales.'
    );
    console.warn(error.message);
    return { mode: 'memory', error };
  }
};

module.exports = connectDB;
