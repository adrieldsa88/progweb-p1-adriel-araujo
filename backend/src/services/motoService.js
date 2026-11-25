import { motoModel } from '../models/motoModel.js';
import { clienteModel } from '../models/clienteModel.js';

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

    if (!clienteModel.buscarPorId(Number(clienteId))) {
      throw erro(422, 'O cliente informado não está cadastrado.');
    }

    if (motoModel.existePlaca(placa)) {
      throw erro(409, 'Já existe uma moto cadastrada com essa placa.');
    }

    return motoModel.inserir({
      marca,
      modelo,
      ano,
      placa,
      clienteId: Number(clienteId)
    });
  },

  atualizar(id, dados) {
    const motoId = Number(id);
    this.buscarPorId(motoId);

    if (dados.clienteId !== undefined) {
      const clienteId = Number(dados.clienteId);
      if (!clienteModel.buscarPorId(clienteId)) {
        throw erro(422, 'O cliente informado não está cadastrado.');
      }
      dados.clienteId = clienteId;
    }

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