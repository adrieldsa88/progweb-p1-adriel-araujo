let clientes = [];
let proximoId = 1;

export const clienteModel = {
  listar() {
    return clientes;
  },

  buscarPorId(id) {
    return clientes.find((c) => c.id === id) ?? null;
  },

  existeCpf(cpf) {
    return clientes.some((c) => c.cpf === cpf);
  },

  inserir({ nome, cpf, telefone }) {
    const novoCliente = {
      id: proximoId++,
      nome,
      cpf,
      telefone: telefone || null
    };

    clientes.push(novoCliente);
    return novoCliente;
  },

  atualizar(id, dados) {
    const i = clientes.findIndex((c) => c.id === id);
    if (i === -1) return null;

    clientes[i] = {
      ...clientes[i],
      ...dados,
      id
    };

    return clientes[i];
  },

  remover(id) {
    const antes = clientes.length;
    clientes = clientes.filter((c) => c.id !== id);
    return clientes.length < antes;
  }
};