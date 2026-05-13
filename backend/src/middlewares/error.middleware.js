const { AppError } = require('../utils/AppError');

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  let statusCode = error.statusCode || 500;
  let message = error.message || 'Error interno del servidor';

  if (error.name === 'CastError') {
    statusCode = 400;
    message = 'ID inválido.';
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = 'Ya existe un registro con ese valor único.';
  }

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
  });
};

module.exports = { errorHandler };
