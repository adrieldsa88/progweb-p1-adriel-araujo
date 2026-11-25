# Telas do Projeto 1 — MotoManager (S4)

Front: `npx http-server -p 5500 -c-1` em `frontend/` · API: `npm run dev` em `backend/`

| Lista | Estado | Como provocar | O que aparece |
|---|---|---|---|
| Clientes | carregando | Network → throttling 3G → F5 | spinner "Carregando clientes…" |
| Clientes | vazio | API recém-iniciada | "Nenhum cliente ainda. Cadastre o primeiro no formulário." |
| Clientes | erro | Ctrl+C na API → F5 | "Não consegui falar com a API. Ela está rodando?" + Tentar de novo |
| Clientes | sucesso | Cadastrar "João Silva" com CPF válido | Tabela com 1 linha e botões Editar/Remover |
| Motos | vazio | Sem motos cadastradas | "Nenhuma moto ainda. Cadastre um cliente e depois a primeira moto." |
| Motos | erro de regra | Cadastrar moto com placa já existente | Aviso vermelho "Já existe uma moto cadastrada com essa placa." (409) |
| Ordens de Serviço | vazio | Sem ordens cadastradas | "Nenhuma ordem de serviço ainda. Cadastre uma moto e abra a primeira." |
| Ordens de Serviço | sucesso | Selecionar a moto no `<select>` e abrir ordem | Tabela exibindo moto, data/hora de abertura e status |

## Camadas
- api: `js/api.js` · services: `js/services/` · state: `js/state/store.js` · ui: `js/ui/`