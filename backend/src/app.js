
import express from 'express';
import cors from 'cors';

import clienteRoutes from './routes/clienteRoutes.js';
import motoRoutes from './routes/motoRoutes.js';
import ordemServicoRoutes from './routes/ordemServicoRoutes.js';

import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

const origensExtras = (process.env.CORS_ORIGIN ?? '')
  .split(',')
  .map((origem) => origem.trim())
  .filter(Boolean);

const origemPermitida = /^https:\/\/progweb-p1-adriel-araujo-frontend(?:-[a-z0-9-]+)?\.vercel\.app$/;

app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      origemPermitida.test(origin) ||
      origensExtras.includes(origin) ||
      origin === 'http://localhost:5500' ||
      origin === 'http://127.0.0.1:5500'
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  }
}));

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
