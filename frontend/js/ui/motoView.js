const el = {
  form: document.querySelector('#form-moto'),
  cliente: document.querySelector('#moto-cliente'),
  salvar: document.querySelector('#moto-salvar'),
  cancelar: document.querySelector('#moto-cancelar'),
  carregando: document.querySelector('#motos-carregando'),
  erro: document.querySelector('#motos-erro'),
  erroMsg: document.querySelector('#motos-erro-msg'),
  recarregar: document.querySelector('#motos-recarregar'),
  vazio: document.querySelector('#motos-vazio'),
  sucesso: document.querySelector('#motos-sucesso'),
  linhas: document.querySelector('#motos-linhas'),
};

let nomeDoCliente = new Map();

function celula(texto, classe = '') {
  const td = document.createElement('td');
  td.textContent = texto;
  td.className = classe;
  return td;
}

function botao(texto, acao, id, classe) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = texto;
  b.className = `btn btn-sm ${classe}`;
  b.dataset.acao = acao;
  b.dataset.id = id;
  return b;
}

function linha(moto, editandoId) {
  const tr = document.createElement('tr');
  if (moto.id === editandoId) tr.className = 'editando';

  const dono = nomeDoCliente.get(moto.clienteId)
    ?? `cliente #${moto.clienteId} (removido)`;

  const acoes = celula('', 'text-end text-nowrap');
  acoes.append(
    botao('Editar', 'editar', moto.id, 'btn-outline-primary me-1'),
    botao('Remover', 'remover', moto.id, 'btn-outline-danger'),
  );

  tr.append(
    celula(moto.id),
    celula(dono),
    celula(`${moto.marca} ${moto.modelo}`),
    celula(moto.ano, 'numero'),
    celula(moto.placa, 'text-nowrap'),
    acoes,
  );
  return tr;
}

export const motoView = {
  preencherClientes(clientes) {
    nomeDoCliente = new Map(clientes.map((c) => [c.id, c.nome]));
    const escolhido = el.cliente.value;

    const opcoes = clientes.map((c) => new Option(`${c.nome} (#${c.id})`, c.id));
    el.cliente.replaceChildren(new Option('Selecione…', ''), ...opcoes);

    if (nomeDoCliente.has(Number(escolhido))) el.cliente.value = escolhido;
  },

  render({ status, motos, erro, editandoId, salvando }) {
    el.carregando.classList.toggle('d-none', status !== 'carregando');
    el.erro.classList.toggle('d-none', status !== 'erro');
    el.vazio.classList.toggle('d-none', status !== 'vazio');
    el.sucesso.classList.toggle('d-none', status !== 'sucesso');

    el.erroMsg.textContent = erro ?? '';
    el.linhas.replaceChildren(...motos.map((m) => linha(m, editandoId)));

    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando
      ? 'Salvando…'
      : editandoId ? 'Salvar alterações' : 'Cadastrar moto';
    el.cancelar.classList.toggle('d-none', !editandoId);
  },

  preencherForm(moto) {
    el.form.clienteId.value = moto.clienteId;
    el.form.marca.value = moto.marca;
    el.form.modelo.value = moto.modelo;
    el.form.ano.value = moto.ano;
    el.form.placa.value = moto.placa;
    el.form.marca.focus();
  },

  limparForm() {
    el.form.reset();
  },

  aoEnviar(fn) {
    el.form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      fn(Object.fromEntries(new FormData(el.form)));
    });
  },

  aoCancelar(fn) {
    el.cancelar.addEventListener('click', fn);
  },

  aoRecarregar(fn) {
    el.recarregar.addEventListener('click', fn);
  },

  aoClicarNaLista({ editar, remover }) {
    el.linhas.addEventListener('click', (evento) => {
      const alvo = evento.target.closest('button[data-acao]');
      if (!alvo) return;
      const id = Number(alvo.dataset.id);
      if (alvo.dataset.acao === 'editar') editar(id);
      if (alvo.dataset.acao === 'remover') remover(id);
    });
  },
};