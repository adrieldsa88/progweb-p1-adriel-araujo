import express from 'express';

import motoRoutes from './routes/motoRoutes.js';
import ordemServicoRoutes from './routes/ordemServicoRoutes.js';

import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

// Middleware de log
app.use(logger);

// Rotas
app.use('/motos', motoRoutes);
app.use('/ordens-servico', ordemServicoRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API MotoManager funcionando!'
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada.'
  });
});

// Tratamento de erros
app.use(errorHandler);

export default app;