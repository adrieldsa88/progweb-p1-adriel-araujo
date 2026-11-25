
# Testes da API — MotoManager (S3)

API: MotoManager · entidades: Moto e OrdemServico · servidor: `npm run dev` em http://localhost:3000

| # | Método | URL | Body | Status obtido | Observação |
|---|---|---|---|---|---|
| 1 | POST | /motos | {"marca":"Honda","modelo":"CB 300F","ano":2025,"placa":"ABC1D23","clienteId":1} | 201 | Moto cadastrada |
| 2 | GET | /motos | — | 200 | Listagem de motos |
| 3 | GET | /motos/1 | — | 200 | Busca por ID |
| 4 | POST | /ordens-servico | {"motoId":1,"status":"aberta"} | 201 | Ordem de serviço cadastrada |
| 5 | GET | /ordens-servico | — | 200 | Listagem de ordens |
| 6 | GET | /ordens-servico/moto/1 | — | 200 | Filtro 1:N por moto |
| 7 | POST | /motos | {"marca":"Yamaha","modelo":"Fazer 250","ano":2024,"placa":"ABC1D23","clienteId":2} | 409 | Regra: placa única |
| 8 | GET | /motos/999 | — | 404 | Moto não encontrada |
| 9 | POST | /ordens-servico | {"motoId":999,"status":"aberta"} | 422 | Moto não existe |
