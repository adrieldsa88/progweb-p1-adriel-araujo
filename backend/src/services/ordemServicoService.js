
import { ordemServicoModel } from '../models/ordemServicoModel.js';
import { motoModel } from '../models/motoModel.js';

function erro(status, mensagem) {
  const e = new Error(mensagem);
  e.status = status;
  return e;
}

const statusValidos = [
  'aberta',
  'em_andamento',
  'concluida',
  'cancelada'
];

export const ordemServicoService = {
  listar() {
    return ordemServicoModel.listar();
  },

  buscarPorId(id) {
    const ordem = ordemServicoModel.buscarPorId(Number(id));

    if (!ordem) {
      throw erro(404, 'Ordem de serviço não encontrada.');
    }

    return ordem;
  },

  listarPorMoto(motoId) {
    motoId = Number(motoId);

    if (!motoModel.buscarPorId(motoId)) {
      throw erro(404, 'Moto não encontrada.');
    }

    return ordemServicoModel.listarPorMoto(motoId);
  },

  criar(dados) {
    const motoId = Number(dados.motoId);
    const status = dados.status ?? 'aberta';

    if (!dados.motoId) {
      throw erro(400, 'O campo motoId é obrigatório.');
    }

    if (!motoModel.buscarPorId(motoId)) {
      throw erro(422, 'A moto informada não está cadastrada.');
    }

    if (!statusValidos.includes(status)) {
      throw erro(400, 'Status inválido.');
    }

    return ordemServicoModel.inserir({ motoId, status });
  },

  atualizar(id, dados) {
    const ordem = this.buscarPorId(id);

    if (dados.motoId !== undefined) {
      const motoId = Number(dados.motoId);

      if (!motoModel.buscarPorId(motoId)) {
        throw erro(422, 'A moto informada não está cadastrada.');
      }

      dados.motoId = motoId;
    }

    if (dados.status && !statusValidos.includes(dados.status)) {
      throw erro(400, 'Status inválido.');
    }

    return ordemServicoModel.atualizar(ordem.id, dados);
  },

  remover(id) {
    const ordem = this.buscarPorId(id);
    ordemServicoModel.remover(ordem.id);
  }
};
