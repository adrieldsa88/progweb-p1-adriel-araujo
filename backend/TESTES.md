
# Testes da API MotoManager

Os testes foram realizados utilizando o Thunder Client.

## 1. Cadastrar moto

**Método:** POST  
**Endpoint:** `/motos`

**Body enviado:**

```json
{
  "marca": "Honda",
  "modelo": "CB 300F",
  "ano": 2025,
  "placa": "ABC1D23",
  "clienteId": 1
}
```

**Resultado esperado:** 201 Created.

**Resultado obtido:**

```json
{
  "id": 1,
  "marca": "Honda",
  "modelo": "CB 300F",
  "ano": 2025,
  "placa": "ABC1D23",
  "clienteId": 1
}
```

## 2. Listar motos

**Método:** GET  
**Endpoint:** `/motos`

**Resultado esperado:** 200 OK.

**Resultado obtido:**

```json
[
  {
    "id": 1,
    "marca": "Honda",
    "modelo": "CB 300F",
    "ano": 2025,
    "placa": "ABC1D23",
    "clienteId": 1
  }
]
```

## 3. Buscar moto por ID

**Método:** GET  
**Endpoint:** `/motos/1`

**Resultado esperado:** 200 OK.

**Resultado obtido:**

```json
{
  "id": 1,
  "marca": "Honda",
  "modelo": "CB 300F",
  "ano": 2025,
  "placa": "ABC1D23",
  "clienteId": 1
}
```

## 4. Cadastrar ordem de serviço

**Método:** POST  
**Endpoint:** `/ordens-servico`

**Body enviado:**

```json
{
  "motoId": 1,
  "status": "aberta"
}
```

**Resultado esperado:** 201 Created.

**Resultado obtido:**

```json
{
  "id": 1,
  "motoId": 1,
  "dataAbertura": "DATA GERADA PELA API",
  "status": "aberta"
}
```

## 5. Listar ordens de serviço

**Método:** GET  
**Endpoint:** `/ordens-servico`

**Resultado esperado:** 200 OK.

**Resultado obtido:**

```json
[
  {
    "id": 1,
    "motoId": 1,
    "dataAbertura": "DATA GERADA PELA API",
    "status": "aberta"
  }
]
```

## 6. Listar ordens de uma moto

**Método:** GET  
**Endpoint:** `/ordens-servico/moto/1`

**Resultado esperado:** 200 OK.

**Resultado obtido:**

```json
[
  {
    "id": 1,
    "motoId": 1,
    "dataAbertura": "DATA GERADA PELA API",
    "status": "aberta"
  }
]
```

## 7. Testar placa duplicada

**Método:** POST  
**Endpoint:** `/motos`

**Body enviado:**

```json
{
  "marca": "Yamaha",
  "modelo": "Fazer 250",
  "ano": 2024,
  "placa": "ABC1D23",
  "clienteId": 2
}
```

**Resultado esperado:** 409 Conflict.

**Resultado obtido:**

```json
{
  "erro": "Já existe uma moto cadastrada com essa placa."
}
```

## 8. Buscar moto inexistente

**Método:** GET  
**Endpoint:** `/motos/999`

**Resultado esperado:** 404 Not Found.

**Resultado obtido:**

```json
{
  "erro": "Moto não encontrada."
}
```

## 9. Cadastrar ordem com moto inexistente

**Método:** POST  
**Endpoint:** `/ordens-servico`

**Body enviado:**

```json
{
  "motoId": 999,
  "status": "aberta"
}
```

**Resultado esperado:** 422 Unprocessable Entity.

**Resultado obtido:**

```json
{
  "erro": "A moto informada não está cadastrada."
}
```

---

## Observações

Os dados são armazenados em memória e perdidos quando o servidor é reiniciado.
