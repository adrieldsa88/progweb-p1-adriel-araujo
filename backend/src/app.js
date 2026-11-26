import express from 'express';
import cors from 'cors';

import clienteRoutes from './routes/clienteRoutes.js';
import motoRoutes from './routes/motoRoutes.js';
import ordemServicoRoutes from './routes/ordemServicoRoutes.js';

import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Em produção, a origem do front vem da variável CORS_ORIGIN.
const origens = (process.env.CORS_ORIGIN
  ?? 'http://localhost:5500,http://127.0.0.1:5500').split(',');
app.use(cors({ origin: origens }));

app.use(express.json());
app.use(logger);

// Rotas
app.use('/clientes', clienteRoutes);
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