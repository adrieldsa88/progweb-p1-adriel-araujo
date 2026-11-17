
let motos = [];
let proximoId = 1;

export const motoModel = {
  listar() {
    return motos;
  },

  buscarPorId(id) {
    return motos.find((m) => m.id === id) ?? null;
  },

  existePlaca(placa) {
    return motos.some(
      (m) => m.placa.toUpperCase() === placa.toUpperCase()
    );
  },

  inserir({ marca, modelo, ano, placa, clienteId }) {
    const novaMoto = {
      id: proximoId++,
      marca,
      modelo,
      ano,
      placa: placa.toUpperCase(),
      clienteId
    };

    motos.push(novaMoto);
    return novaMoto;
  },

  atualizar(id, dados) {
    const i = motos.findIndex((m) => m.id === id);

    if (i === -1) return null;

    motos[i] = {
      ...motos[i],
      ...dados,
      placa: dados.placa
        ? dados.placa.toUpperCase()
        : motos[i].placa,
      id
    };

    return motos[i];
  },

  remover(id) {
    const antes = motos.length;
    motos = motos.filter((m) => m.id !== id);

    return motos.length < antes;
  }
};
