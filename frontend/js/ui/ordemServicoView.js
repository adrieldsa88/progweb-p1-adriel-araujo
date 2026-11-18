const el = {
  form: document.querySelector('#form-ordem'),
  moto: document.querySelector('#os-moto'),
  salvar: document.querySelector('#os-salvar'),
  cancelar: document.querySelector('#os-cancelar'),
  carregando: document.querySelector('#ordens-carregando'),
  erro: document.querySelector('#ordens-erro'),
  erroMsg: document.querySelector('#ordens-erro-msg'),
  recarregar: document.querySelector('#ordens-recarregar'),
  vazio: document.querySelector('#ordens-vazio'),
  sucesso: document.querySelector('#ordens-sucesso'),
  linhas: document.querySelector('#ordens-linhas'),
};

const NOME_STATUS = {
  aberta: 'Aberta',
  em_andamento: 'Em andamento',
  concluida: 'Concluída',
  cancelada: 'Cancelada',
};

let descricaoDaMoto = new Map();

function formatarData(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

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

function linha(ordem, editandoId) {
  const tr = document.createElement('tr');
  if (ordem.id === editandoId) tr.className = 'editando';

  const motoLabel = descricaoDaMoto.get(ordem.motoId)
    ?? `moto #${ordem.motoId} (removida)`;

  const acoes = celula('', 'text-end text-nowrap');
  acoes.append(
    botao('Editar', 'editar', ordem.id, 'btn-outline-primary me-1'),
    botao('Remover', 'remover', ordem.id, 'btn-outline-danger'),
  );

  tr.append(
    celula(ordem.id),
    celula(motoLabel),
    celula(formatarData(ordem.dataAbertura), 'numero text-nowrap'),
    celula(NOME_STATUS[ordem.status] ?? ordem.status),
    acoes,
  );
  return tr;
}

export const ordemServicoView = {
  preencherMotos(motos) {
    descricaoDaMoto = new Map(
      motos.map((m) => [m.id, `${m.marca} ${m.modelo} (${m.placa})`])
    );
    const escolhido = el.moto.value;

    const opcoes = motos.map(
      (m) => new Option(`${m.marca} ${m.modelo} · ${m.placa} (#${m.id})`, m.id)
    );
    el.moto.replaceChildren(new Option('Selecione…', ''), ...opcoes);

    if (descricaoDaMoto.has(Number(escolhido))) el.moto.value = escolhido;
  },

  render({ status, ordens, erro, editandoId, salvando }) {
    el.carregando.classList.toggle('d-none', status !== 'carregando');
    el.erro.classList.toggle('d-none', status !== 'erro');
    el.vazio.classList.toggle('d-none', status !== 'vazio');
    el.sucesso.classList.toggle('d-none', status !== 'sucesso');

    el.erroMsg.textContent = erro ?? '';
    el.linhas.replaceChildren(...ordens.map((o) => linha(o, editandoId)));

    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando
      ? 'Salvando…'
      : editandoId ? 'Salvar alterações' : 'Abrir ordem';
    el.cancelar.classList.toggle('d-none', !editandoId);
  },

  preencherForm(ordem) {
    el.form.motoId.value = ordem.motoId;
    el.form.status.value = ordem.status;
    el.form.status.focus();
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