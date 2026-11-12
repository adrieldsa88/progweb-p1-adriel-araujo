export function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  console.error(err.message);

  res.status(status).json({
    erro: err.message || 'Erro interno do servidor.'
  });
}