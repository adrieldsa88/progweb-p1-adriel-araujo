import express from 'express';
import cors from 'cors';

import clienteRoutes from './routes/clienteRoutes.js';
import motoRoutes from './routes/motoRoutes.js';
import ordemServicoRoutes from './routes/ordemServicoRoutes.js';

import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
}));

app.use(express.json());
app.use(logger);

app.use('/clientes', clienteRoutes);
app.use('/motos', motoRoutes);
app.use('/ordens-servico', ordemServicoRoutes);

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API MotoManager funcionando!'
  });
});

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada.'
  });
});

app.use(errorHandler);

export default app;