import { api } from '../api.js';

const STATUS_VALIDOS = ['aberta', 'em_andamento', 'concluida', 'cancelada'];

function preparar({ motoId, status }) {
  if (!motoId) throw new Error('Selecione a moto.');
  if (!STATUS_VALIDOS.includes(status)) throw new Error('Status inválido.');

  return {
    motoId: Number(motoId),
    status,
  };
}

export const ordemServicoService = {
  listar() {
    return api.get('/ordens-servico');
  },
  async criar(dados) {
    return api.post('/ordens-servico', preparar(dados));
  },
  async atualizar(id, dados) {
    return api.put(`/ordens-servico/${id}`, preparar(dados));
  },
  remover(id) {
    return api.delete(`/ordens-servico/${id}`);
  },
};