import { db } from '../db.js';

const COLUNAS = 'id, marca, modelo, ano, placa, cliente_id AS clienteId';

export const motoModel = {
  listar() {
    return db.prepare(`SELECT ${COLUNAS} FROM motos ORDER BY id`).all();
  },

  listarPorCliente(clienteId) {
    return db
      .prepare(`SELECT ${COLUNAS} FROM motos WHERE cliente_id = ? ORDER BY id`)
      .all(clienteId);
  },

  buscarPorId(id) {
    return db
      .prepare(`SELECT ${COLUNAS} FROM motos WHERE id = ?`)
      .get(id) ?? null;
  },

  existePlaca(placa) {
    const linha = db
      .prepare('SELECT 1 FROM motos WHERE UPPER(placa) = UPPER(?)')
      .get(placa);
    return linha !== undefined;
  },

  inserir({ marca, modelo, ano, placa, clienteId }) {
    const r = db
      .prepare('INSERT INTO motos (marca, modelo, ano, placa, cliente_id) VALUES (?, ?, ?, ?, ?)')
      .run(marca, modelo, Number(ano), placa.toUpperCase(), Number(clienteId));
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = {
      ...atual,
      ...dados,
      placa: dados.placa ? dados.placa.toUpperCase() : atual.placa,
    };
    db.prepare('UPDATE motos SET marca = ?, modelo = ?, ano = ?, placa = ?, cliente_id = ? WHERE id = ?')
      .run(novo.marca, novo.modelo, Number(novo.ano), novo.placa, Number(novo.clienteId), id);
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare('DELETE FROM motos WHERE id = ?').run(id);
    return r.changes > 0;
  },
};