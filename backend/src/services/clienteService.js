import { clienteModel } from '../models/clienteModel.js';
import { motoModel } from '../models/motoModel.js';

function erro(status, mensagem) {
  const e = new Error(mensagem);
  e.status = status;
  return e;
}

export const clienteService = {
  listar() {
    return clienteModel.listar();
  },

  buscarPorId(id) {
    const cliente = clienteModel.buscarPorId(Number(id));
    if (!cliente) {
      throw erro(404, 'Cliente não encontrado.');
    }
    return cliente;
  },

  criar(dados) {
    const { nome, cpf, telefone } = dados;

    if (!nome || !cpf) {
      throw erro(400, 'Nome e CPF são obrigatórios.');
    }

    if (clienteModel.existeCpf(cpf)) {
      throw erro(409, 'Já existe um cliente cadastrado com esse CPF.');
    }

    return clienteModel.inserir({ nome, cpf, telefone });
  },

  atualizar(id, dados) {
    const clienteId = Number(id);
    this.buscarPorId(clienteId);

    if (dados.cpf) {
      const cpfExistente = clienteModel.listar().some(
        (c) => c.cpf === dados.cpf && c.id !== clienteId
      );

      if (cpfExistente) {
        throw erro(409, 'Esse CPF já pertence a outro cliente.');
      }
    }

    return clienteModel.atualizar(clienteId, dados);
  },

  remover(id) {
    const clienteId = Number(id);
    this.buscarPorId(clienteId);

    if (motoModel.listarPorCliente(clienteId).length > 0) {
      throw erro(409, 'Cliente possui motos cadastradas. Remova as motos primeiro.');
    }

    clienteModel.remover(clienteId);
  }
};