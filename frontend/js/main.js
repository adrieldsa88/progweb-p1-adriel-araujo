import { criarStore } from './state/store.js';
import { clienteService } from './services/clienteService.js';
import { clienteView } from './ui/clienteView.js';
import { motoService } from './services/motoService.js';
import { motoView } from './ui/motoView.js';
import { ordemServicoService } from './services/ordemServicoService.js';
import { ordemServicoView } from './ui/ordemServicoView.js';
import { aviso } from './ui/aviso.js';

// ===================== CLIENTES =====================
const clientes = criarStore({
  status: 'carregando',
  clientes: [],
  erro: null,
  editandoId: null,
  salvando: false,
});

clientes.assinar(clienteView.render);

async function carregarClientes() {
  clientes.set({ status: 'carregando', erro: null });
  try {
    const lista = await clienteService.listar();
    clientes.set({ status: lista.length ? 'sucesso' : 'vazio', clientes: lista });
  } catch (e) {
    clientes.set({ status: 'erro', erro: e.message });
  }
}

async function salvarCliente(dados) {
  const { editandoId } = clientes.get();
  aviso.limpar();
  clientes.set({ salvando: true });
  try {
    if (editandoId) await clienteService.atualizar(editandoId, dados);
    else await clienteService.criar(dados);

    aviso.sucesso(editandoId ? 'Cliente atualizado.' : 'Cliente cadastrado.');
    clienteView.limparForm();
    clientes.set({ editandoId: null });
    await carregarClientes();
  } catch (e) {
    aviso.erro(e.message);
  } finally {
    clientes.set({ salvando: false });
  }
}

function editarCliente(id) {
  const cliente = clientes.get().clientes.find((c) => c.id === id);
  clienteView.preencherForm(cliente);
  clientes.set({ editandoId: id });
}

function cancelarEdicaoCliente() {
  clienteView.limparForm();
  clientes.set({ editandoId: null });
}

async function removerCliente(id) {
  if (!confirm(`Remover o cliente #${id}?`)) return;
  aviso.limpar();
  try {
    await clienteService.remover(id);
    aviso.sucesso('Cliente removido.');
    if (clientes.get().editandoId === id) cancelarEdicaoCliente();
    await carregarClientes();
  } catch (e) {
    aviso.erro(e.message);
  }
}

clienteView.aoEnviar(salvarCliente);
clienteView.aoCancelar(cancelarEdicaoCliente);
clienteView.aoRecarregar(carregarClientes);
clienteView.aoClicarNaLista({ editar: editarCliente, remover: removerCliente });

// ===================== MOTOS =====================
const motos = criarStore({
  status: 'carregando',
  motos: [],
  erro: null,
  editandoId: null,
  salvando: false,
});

motos.assinar(motoView.render);

// Motos dependem de Clientes: atualiza <select> e nomes na tabela
clientes.assinar((estado) => {
  motoView.preencherClientes(estado.clientes);
  motoView.render(motos.get());
});

async function carregarMotos() {
  motos.set({ status: 'carregando', erro: null });
  try {
    const lista = await motoService.listar();
    motos.set({ status: lista.length ? 'sucesso' : 'vazio', motos: lista });
  } catch (e) {
    motos.set({ status: 'erro', erro: e.message });
  }
}

async function salvarMoto(dados) {
  const { editandoId } = motos.get();
  aviso.limpar();
  motos.set({ salvando: true });
  try {
    if (editandoId) await motoService.atualizar(editandoId, dados);
    else await motoService.criar(dados);

    aviso.sucesso(editandoId ? 'Moto atualizada.' : 'Moto cadastrada.');
    motoView.limparForm();
    motos.set({ editandoId: null });
    await carregarMotos();
  } catch (e) {
    aviso.erro(e.message);
  } finally {
    motos.set({ salvando: false });
  }
}

function editarMoto(id) {
  const moto = motos.get().motos.find((m) => m.id === id);
  motoView.preencherForm(moto);
  motos.set({ editandoId: id });
}

function cancelarEdicaoMoto() {
  motoView.limparForm();
  motos.set({ editandoId: null });
}

async function removerMoto(id) {
  if (!confirm(`Remover a moto #${id}?`)) return;
  aviso.limpar();
  try {
    await motoService.remover(id);
    aviso.sucesso('Moto removida.');
    if (motos.get().editandoId === id) cancelarEdicaoMoto();
    await carregarMotos();
  } catch (e) {
    aviso.erro(e.message);
  }
}

motoView.aoEnviar(salvarMoto);
motoView.aoCancelar(cancelarEdicaoMoto);
motoView.aoRecarregar(carregarMotos);
motoView.aoClicarNaLista({ editar: editarMoto, remover: removerMoto });

// ===================== ORDENS DE SERVIÇO =====================
const ordens = criarStore({
  status: 'carregando',
  ordens: [],
  erro: null,
  editandoId: null,
  salvando: false,
});

ordens.assinar(ordemServicoView.render);

// Ordens dependem de Motos: atualiza <select> e descrição na tabela
motos.assinar((estado) => {
  ordemServicoView.preencherMotos(estado.motos);
  ordemServicoView.render(ordens.get());
});

async function carregarOrdens() {
  ordens.set({ status: 'carregando', erro: null });
  try {
    const lista = await ordemServicoService.listar();
    ordens.set({ status: lista.length ? 'sucesso' : 'vazio', ordens: lista });
  } catch (e) {
    ordens.set({ status: 'erro', erro: e.message });
  }
}

async function salvarOrdem(dados) {
  const { editandoId } = ordens.get();
  aviso.limpar();
  ordens.set({ salvando: true });
  try {
    if (editandoId) await ordemServicoService.atualizar(editandoId, dados);
    else await ordemServicoService.criar(dados);

    aviso.sucesso(editandoId ? 'Ordem de serviço atualizada.' : 'Ordem de serviço aberta.');
    ordemServicoView.limparForm();
    ordens.set({ editandoId: null });
    await carregarOrdens();
  } catch (e) {
    aviso.erro(e.message);
  } finally {
    ordens.set({ salvando: false });
  }
}

function editarOrdem(id) {
  const ordem = ordens.get().ordens.find((o) => o.id === id);
  ordemServicoView.preencherForm(ordem);
  ordens.set({ editandoId: id });
}

function cancelarEdicaoOrdem() {
  ordemServicoView.limparForm();
  ordens.set({ editandoId: null });
}

async function removerOrdem(id) {
  if (!confirm(`Remover a ordem de serviço #${id}?`)) return;
  aviso.limpar();
  try {
    await ordemServicoService.remover(id);
    aviso.sucesso('Ordem de serviço removida.');
    if (ordens.get().editandoId === id) cancelarEdicaoOrdem();
    await carregarOrdens();
  } catch (e) {
    aviso.erro(e.message);
  }
}

ordemServicoView.aoEnviar(salvarOrdem);
ordemServicoView.aoCancelar(cancelarEdicaoOrdem);
ordemServicoView.aoRecarregar(carregarOrdens);
ordemServicoView.aoClicarNaLista({ editar: editarOrdem, remover: removerOrdem });

// ===================== INÍCIO =====================
carregarClientes();
carregarMotos();
carregarOrdens();