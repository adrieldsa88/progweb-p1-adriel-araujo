
import { ordemServicoService } from '../services/ordemServicoService.js';

export const ordemServicoController = {
  listar(req, res) {
    return res.status(200).json(ordemServicoService.listar());
  },

  buscarPorId(req, res) {
    const ordem = ordemServicoService.buscarPorId(req.params.id);
    return res.status(200).json(ordem);
  },

  listarPorMoto(req, res) {
    const ordens = ordemServicoService.listarPorMoto(req.params.motoId);
    return res.status(200).json(ordens);
  },

  criar(req, res) {
    const ordem = ordemServicoService.criar(req.body);
    return res.status(201).json(ordem);
  },

  atualizar(req, res) {
    const ordem = ordemServicoService.atualizar(
      req.params.id,
      req.body
    );
    return res.status(200).json(ordem);
  },

  remover(req, res) {
    ordemServicoService.remover(req.params.id);
    return res.status(204).send();
  }
};
