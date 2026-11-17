
import { motoService } from '../services/motoService.js';

export const motoController = {
  listar(req, res) {
    const motos = motoService.listar();
    return res.status(200).json(motos);
  },

  buscarPorId(req, res) {
    const moto = motoService.buscarPorId(req.params.id);
    return res.status(200).json(moto);
  },

  criar(req, res) {
    const novaMoto = motoService.criar(req.body);
    return res.status(201).json(novaMoto);
  },

  atualizar(req, res) {
    const motoAtualizada = motoService.atualizar(
      req.params.id,
      req.body
    );

    return res.status(200).json(motoAtualizada);
  },

  remover(req, res) {
    motoService.remover(req.params.id);
    return res.status(204).send();
  }
};
