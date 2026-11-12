
let ordens = [];
let proximoId = 1;

export const ordemServicoModel = {
  listar() {
    return ordens;
  },

  buscarPorId(id) {
    return ordens.find((o) => o.id === id) ?? null;
  },

  listarPorMoto(motoId) {
    return ordens.filter((o) => o.motoId === motoId);
  },

  inserir({ motoId, status }) {
    const novaOrdem = {
      id: proximoId++,
      motoId,
      dataAbertura: new Date().toISOString(),
      status: status ?? 'aberta'
    };

    ordens.push(novaOrdem);
    return novaOrdem;
  },

  atualizar(id, dados) {
    const i = ordens.findIndex((o) => o.id === id);
    if (i === -1) return null;

    ordens[i] = { ...ordens[i], ...dados, id };
    return ordens[i];
  },

  remover(id) {
    const antes = ordens.length;
    ordens = ordens.filter((o) => o.id !== id);
    return ordens.length < antes;
  }
};
