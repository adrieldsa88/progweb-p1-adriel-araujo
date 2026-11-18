import { api } from '../api.js';

function preparar({ marca, modelo, ano, placa, clienteId }) {
  if (!clienteId) throw new Error('Selecione o cliente.');
  const dados = {
    marca: (marca ?? '').trim(),
    modelo: (modelo ?? '').trim(),
    ano: Number(ano),
    placa: (placa ?? '').trim().toUpperCase(),
    clienteId: Number(clienteId),
  };

  if (!dados.marca) throw new Error('Informe a marca da moto.');
  if (!dados.modelo) throw new Error('Informe o modelo da moto.');
  if (!ano || Number.isNaN(dados.ano) || dados.ano <= 0) {
    throw new Error('Informe um ano válido.');
  }
  if (!dados.placa) throw new Error('Informe a placa da moto.');

  return dados;
}

export const motoService = {
  listar() {
    return api.get('/motos');
  },
  async criar(dados) {
    return api.post('/motos', preparar(dados));
  },
  async atualizar(id, dados) {
    return api.put(`/motos/${id}`, preparar(dados));
  },
  remover(id) {
    return api.delete(`/motos/${id}`);
  },
};