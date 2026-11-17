
import { motoModel } from '../models/motoModel.js';

function erro(status, mensagem) {
  const e = new Error(mensagem);
  e.status = status;
  return e;
}

export const motoService = {
  listar() {
    return motoModel.listar();
  },

  buscarPorId(id) {
    const moto = motoModel.buscarPorId(Number(id));

    if (!moto) {
      throw erro(404, 'Moto não encontrada.');
    }

    return moto;
  },

  criar(dados) {
    const { marca, modelo, ano, placa, clienteId } = dados;

    if (!marca || !modelo || !ano || !placa || !clienteId) {
      throw erro(400, 'Todos os campos são obrigatórios.');
    }

    if (motoModel.existePlaca(placa)) {
      throw erro(409, 'Já existe uma moto cadastrada com essa placa.');
    }

    return motoModel.inserir({
      marca,
      modelo,
      ano,
      placa,
      clienteId
    });
  },

  atualizar(id, dados) {
    const motoId = Number(id);
    const moto = this.buscarPorId(motoId);

    if (dados.placa) {
      const placaExistente = motoModel.listar().some(
        (m) =>
          m.placa.toUpperCase() === dados.placa.toUpperCase() &&
          m.id !== motoId
      );

      if (placaExistente) {
        throw erro(409, 'Essa placa já pertence a outra moto.');
      }
    }

    return motoModel.atualizar(motoId, dados);
  },

  remover(id) {
    const motoId = Number(id);

    this.buscarPorId(motoId);

    motoModel.remover(motoId);
  }
};
