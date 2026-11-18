import { clienteService } from '../services/clienteService.js';

export const clienteController = {
  listar(req, res) {
    return res.status(200).json(clienteService.listar());
  },

  buscarPorId(req, res) {
    const cliente = clienteService.buscarPorId(req.params.id);
    return res.status(200).json(cliente);
  },

  criar(req, res) {
    const novoCliente = clienteService.criar(req.body);
    return res.status(201).json(novoCliente);
  },

  atualizar(req, res) {
    const clienteAtualizado = clienteService.atualizar(
      req.params.id,
      req.body
    );
    return res.status(200).json(clienteAtualizado);
  },

  remover(req, res) {
    clienteService.remover(req.params.id);
    return res.status(204).send();
  }
};