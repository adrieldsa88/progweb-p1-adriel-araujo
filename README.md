# MotoManager

Sistema web para gerenciamento de oficina de motocicletas, permitindo o cadastro de clientes, controle de frota (motos vinculadas a proprietários) e acompanhamento de ordens de serviço.
Projeto 1 da disciplina Programação Web (UEPB, 2026.2).

- **Aplicação:** https://progweb-p1-adriel-araujo-frontend-b5gg42o7d-asura-5ed2.vercel.app/
- **API:** https://progweb-p1-adriel-araujo-motomanager-api.onrender.com
- **Vídeo de apresentação:** (link)

> A API está no plano grátis do Render: o primeiro acesso pode levar cerca de
> um minuto, e os dados voltam aos de exemplo a cada reinício do serviço.

## Tecnologias

- **Backend:** Node.js 22+, Express 5, SQLite (`node:sqlite`, SQL puro), CORS
- **Frontend:** HTML5 semântico, CSS3, Bootstrap 5.3.8 (CDN com SRI), Vanilla JavaScript (ES Modules, `fetch`)

## Como rodar localmente

Pré-requisito: Node.js 22 ou superior.

```bash
# 1. API
cd backend
npm install
cp .env.example .env
npm run dev                      # http://localhost:3001

# 2. Frontend (em outro terminal)
cd frontend
npx http-server -p 5500 -c-1     # http://localhost:5500
```

## Rotas da API

| Método | Rota | O que faz | Respostas |
|---|---|---|---|
| GET | `/` | Health check da API | 200 |
| GET | `/clientes` | Lista todos os clientes | 200 |
| GET | `/clientes/:id` | Busca um cliente por ID | 200, 404 |
| POST | `/clientes` | Cadastra um cliente | 201, 400, 409 |
| PUT | `/clientes/:id` | Atualiza um cliente | 200, 404, 409 |
| DELETE | `/clientes/:id` | Remove um cliente | 204, 404, 409 |
| GET | `/motos` | Lista todas as motos | 200 |
| GET | `/motos/:id` | Busca uma moto por ID | 200, 404 |
| POST | `/motos` | Cadastra uma moto | 201, 400, 409, 422 |
| PUT | `/motos/:id` | Atualiza uma moto | 200, 404, 409, 422 |
| DELETE | `/motos/:id` | Remove uma moto | 204, 404, 409 |
| GET | `/ordens-servico` | Lista todas as ordens de serviço | 200 |
| GET | `/ordens-servico/:id` | Busca uma ordem por ID | 200, 404 |
| GET | `/ordens-servico/moto/:motoId` | Lista ordens de uma moto | 200, 404 |
| POST | `/ordens-servico` | Abre uma ordem de serviço | 201, 400, 422 |
| PUT | `/ordens-servico/:id` | Atualiza uma ordem de serviço | 200, 400, 404, 422 |
| DELETE | `/ordens-servico/:id` | Remove uma ordem de serviço | 204, 404 |

Erros seguem o formato `{ "erro": "mensagem" }`.

## Regras de negócio

- **CPF único:** não permite cadastrar ou atualizar cliente com CPF já existente (`409 Conflict`).
- **Integridade cliente → motos:** impede remover cliente que possui motos cadastradas (`409 Conflict`).
- **Placa única e cliente existente:** exige placa única (`409 Conflict`) e cliente válido (`422 Unprocessable Entity`) ao cadastrar ou atualizar moto.
- **Integridade moto → ordens:** impede remover moto que possui ordens de serviço vinculadas (`409 Conflict`).
- **Ordem de serviço válida:** exige moto cadastrada (`422 Unprocessable Entity`) e status dentro de `aberta`, `em_andamento`, `concluida` ou `cancelada` (`400 Bad Request`).

## Estrutura

```text
backend/
  src/
    routes/        mapeia URL → controller
    controllers/   lê a requisição, chama o service, responde
    services/      regras de negócio e validações
    models/        acesso ao banco (SQLite com prepared statements)
    middleware/    logger e tratamento de erros
    db.js          conexão, schema SQLite e dados de exemplo
    app.js         configuração do Express e CORS
    server.js      inicialização do servidor HTTP
frontend/
  css/             ajustes visuais sobre o Bootstrap
  js/
    api.js         camada HTTP (fetch)
    config.js      endereço da API (local / produção)
    services/      preparação e validação dos dados da tela
    state/         gerenciamento reativo de estado (Observer)
    ui/            manipulação segura do DOM (textContent)
    main.js        integração entre store, services e views
MODELAGEM.md       modelagem de classes (S2)
s1/ … s4/          exercícios das semanas
```

## Autor

Adriel da Silva Araújo · Ciência da Computação · UEPB