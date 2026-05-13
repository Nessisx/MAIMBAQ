const fs = require('fs');
const path = require('path');

const localEnvPath = path.join(__dirname, '..', 'test', '.env');
const rootEnvPath = path.join(__dirname, '..', '.env');

if (fs.existsSync(localEnvPath)) {
  require('dotenv').config({ path: localEnvPath });
} else if (fs.existsSync(rootEnvPath)) {
  require('dotenv').config({ path: rootEnvPath });
} else {
  require('dotenv').config();
}

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const connectDB = require('./database/connect');
const apiRoutes = require('./routes');
const { notFound } = require('./middlewares/notFound.middleware');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(helmet());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_ORIGIN
          ? process.env.CLIENT_ORIGIN.split(',')
          : '*'
        : true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({
    name: 'MAIMBAQ API',
    status: 'ok',
    message: 'Backend activo y conectado a MongoDB.',
  });
});

app.use('/api', apiRoutes);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`MAIMBAQ API ejecutándose en el puerto ${port}`);
  });
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error('No se pudo iniciar el servidor:', error);
    process.exit(1);
  });
}

module.exports = { app, startServer };
