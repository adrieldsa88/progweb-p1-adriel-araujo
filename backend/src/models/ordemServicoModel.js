import { db } from '../db.js';

const COLUNAS = 'id, moto_id AS motoId, data_abertura AS dataAbertura, status';

export const ordemServicoModel = {
  listar() {
    return db.prepare(`SELECT ${COLUNAS} FROM ordens_servico ORDER BY id`).all();
  },

  buscarPorId(id) {
    return db
      .prepare(`SELECT ${COLUNAS} FROM ordens_servico WHERE id = ?`)
      .get(id) ?? null;
  },

  listarPorMoto(motoId) {
    return db
      .prepare(`SELECT ${COLUNAS} FROM ordens_servico WHERE moto_id = ? ORDER BY id`)
      .all(motoId);
  },

  inserir({ motoId, status }) {
    const r = db
      .prepare('INSERT INTO ordens_servico (moto_id, data_abertura, status) VALUES (?, ?, ?)')
      .run(Number(motoId), new Date().toISOString(), status ?? 'aberta');
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare('UPDATE ordens_servico SET moto_id = ?, status = ? WHERE id = ?')
      .run(Number(novo.motoId), novo.status, id);
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare('DELETE FROM ordens_servico WHERE id = ?').run(id);
    return r.changes > 0;
  },
};