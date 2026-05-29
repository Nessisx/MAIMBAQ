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

const projectRoot = path.join(__dirname, '..', '..');
const frontendRoot = path.join(projectRoot, 'frontend');
const pagesRoot = path.join(projectRoot, 'pages');

const app = express();

// En desarrollo, desactivar helmet CSP para permitir inline event handlers
// En producción, helmet CSP protege contra ataques
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
} else {
  app.use(helmet.contentSecurityPolicy(false));
  app.use(helmet.xContentTypeOptions());
  app.use(helmet.xFrameOptions());
  app.use(helmet.xXssProtection());
}
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

// Servir archivos estáticos desde la raíz para manifest.json, icons, etc.
app.use(express.static(projectRoot));
app.use('/frontend', express.static(frontendRoot));
app.use('/pages', express.static(pagesRoot));

app.get('/', (req, res) => {
  res.sendFile(path.join(projectRoot, 'index.html'));
});

app.use('/api', apiRoutes);
app.use(notFound);
app.use(errorHandler);

const basePort = Number(process.env.PORT || 5000);

const listenOnPort = (candidatePort, attemptsLeft) =>
  new Promise((resolve, reject) => {
    const server = app.listen(candidatePort, () => resolve({ server, port: candidatePort }));

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE' && attemptsLeft > 0) {
        server.close(() => {
          resolve(listenOnPort(candidatePort + 1, attemptsLeft - 1));
        });
        return;
      }

      reject(error);
    });
  });

const startServer = async () => {
  await connectDB();

  const { port } = await listenOnPort(basePort, 5);
  console.log(`MAIMBAQ ejecutándose en http://localhost:${port}`);
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error('No se pudo iniciar el servidor:', error);
    process.exit(1);
  });
}

module.exports = { app, startServer };
