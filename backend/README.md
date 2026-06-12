# Backend - Pokedex Microservice

## Sobre o Projeto

Este repositório contém o backend do microserviço da Pokédex desenvolvido para a disciplina de Arquitetura de Software.

O objetivo deste microserviço é gerenciar as cartas conhecidas pelos jogadores, permitindo que outros sistemas consultem a Pokédex e obtenham informações sobre os Pokémon já registrados.

 

Atualmente foi implementado o módulo de autenticação utilizando um serviço mockado, que será substituído futuramente pelo microserviço real de autenticação desenvolvido por outro grupo.

---

# Tecnologias Utilizadas

* Python 3.12+
* Flask
* Flask-CORS
* REST API
* JSON

---

# Estrutura do Projeto

```text
src/

├── app.py

├── controllers/
│   └── autenticacao_controller.py

├── services/
│   └── autenticacao_service.py

├── clients/
│   └── auth_service_client.py

├── mocks/
│   └── mock_auth.py

├── models/

├── repositories/

```

---

# Arquitetura

O backend segue o padrão SOA.

## Controller

Responsável por receber requisições HTTP.

Exemplo:

```text
POST /auth/login
```

Arquivo:

```text
controllers/autenticacao_controller.py
```

---

## Service

Responsável pelas regras de negócio e validações.

Exemplo:

* Validar campos obrigatórios
* Validar formato dos dados
* Chamar APIs externas

Arquivo:

```text
services/autenticacao_service.py
```

---

## Client

Responsável por realizar chamadas para sistemas externos.

Atualmente utiliza um Mock.

Futuramente será responsável por chamar o microserviço de autenticação.

Arquivo:

```text
clients/auth_service_client.py
```

---

## Mock

Simula o comportamento do microserviço de autenticação enquanto ele não está disponível.

Arquivo:

```text
mocks/mock_auth.py
```

---

# Fluxo da Autenticação

```text
Frontend React
        ↓
AutenticacaoController
        ↓
AutenticacaoService
        ↓
AuthServiceClient
        ↓
MockAuth
```

Quando o microserviço real estiver disponível:

```text
Frontend React
        ↓
AutenticacaoController
        ↓
AutenticacaoService
        ↓
AuthServiceClient
        ↓
Microserviço de Autenticação
```

Nenhuma alteração será necessária no Controller ou Service.

---

# Configuração do Ambiente

## Criar ambiente virtual

Windows

```bash
python -m venv venv
```

---

## Ativar ambiente virtual

Windows

```bash
venv\Scripts\activate
```

---

## Instalar dependências a partir do requirements.txt

```bash
pip install -r requirements.txt
```

---

# Executando a Aplicação

Entrar na pasta:

```bash
cd src
```

Executar:

```bash
python app.py
```

Saída esperada:

```text
* Running on http://127.0.0.1:5000
```

---

# Usuários Mockados

## Karolina Oliveira

```text
Usuário: karol
Senha: karol123
```

---

## Julia Vicentini

```text
Usuário: julia_V
Senha: juliaV123
```

---

## Julia Caputo

```text
Usuário: julia_C
Senha: juliaC123
```

---

## Camile Laraia

```text
Usuário: camile
Senha: camile123
```

---

# Endpoints Disponíveis

---

## Login

Realiza autenticação do usuário.

### Endpoint

```http
POST /auth/login
```

### Request

```json
{
  "usuario": "karol",
  "senha": "karol123"
}
```

### Response

```json
{
  "sucesso": true,
  "token": "mock-token-1",
  "usuario": {
    "id": 1,
    "nome": "Karolina Oliveira",
    "email": "karol@exemplo.com"
  }
}
```

---

## Validar Token

Valida se um token é válido.

### Endpoint

```http
GET /auth/validar
```

### Header

```http
Authorization: Bearer mock-token-1
```

### Response

```json
{
  "valido": true
}
```

---

## Obter Jogador

Retorna os dados do jogador associado ao token.

### Endpoint

```http
GET /auth/jogador
```

### Header

```http
Authorization: Bearer mock-token-1
```

### Response

```json
{
  "id": 1,
  "nome": "Karolina Oliveira",
  "email": "karol@exemplo.com"
}
```

---

# Integração com o Frontend

Exemplo utilizando Axios:

```typescript
const response = await axios.post(
  "http://localhost:5000/auth/login",
  {
    usuario,
    senha
  }
);

localStorage.setItem(
  "token",
  response.data.token
);
```

---

# Próximos Módulos

Após a integração da autenticação, serão implementados:

## Integração com PokeAPI

Consulta de informações dos Pokémon.

---

## Pokédex

Consulta de cartas conhecidas pelo jogador.

---

## Integração com Sistema de Distribuição

Recebimento das cartas iniciais dos jogadores.

---

## Integração com Sistema de Trocas

Recebimento de eventos via MOM para atualização automática da Pokédex.

---

# Responsabilidade do Microserviço

Este microserviço é responsável exclusivamente por:

* Gerenciar a Pokédex dos jogadores
* Consultar informações dos Pokémon
* Expor cartas conhecidas dos jogadores
* Receber atualizações provenientes de trocas
* Integrar-se aos demais microserviços do sistema

Não é responsabilidade deste serviço:

* Autenticação de usuários
* Cadastro de usuários
* Distribuição de cartas
* Gerenciamento de trocas
