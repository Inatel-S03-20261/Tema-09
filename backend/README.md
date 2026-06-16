# Tema-09 – Backend Pokédex

## Descrição

Microsserviço responsável pela autenticação, gerenciamento da Pokédex do jogador, cartas conhecidas, histórico de eventos e integração com a PokeAPI.

Este serviço não executa trocas diretamente.

As trocas são realizadas por outro microsserviço e este backend apenas recebe as informações da troca, atualiza as cartas do jogador, registra o histórico e recalcula as estatísticas da Pokédex.

---

# Tecnologias Utilizadas

* Python 3.11+
* Flask
* Flask-CORS
* MySQL
* Requests
* PokeAPI

---

# Padrões de Projeto

## Singleton

Classe:

```text
DatabaseConnection
```

Responsável por manter uma única conexão com o banco de dados durante a execução da aplicação.

---

## Facade

Classe:

```text
PokedexService
```

Centraliza o acesso às funcionalidades do sistema:

* Autenticação
* Cartas
* Pokédex
* Histórico
* Pokémon
* Trocas

Os Controllers dependem apenas da Facade.

---

## Observer

Subject:

```text
CartasService
```

Observer:

```text
HistoricoService
```

Eventos monitorados:

* DISTRIBUICAO
* TROCA_ENVIADA
* TROCA_RECEBIDA

Sempre que uma carta é recebida ou trocada, o histórico é atualizado automaticamente.

---

# Arquitetura

```text
Controller
    ↓
PokedexService (Facade)
    ↓
AutenticacaoService
CartasService
PokemonService
HistoricoService
TrocaService
    ↓
Clients
    ↓
Repositories
    ↓
DatabaseConnection (Singleton)
    ↓
MySQL
```

---

# Estrutura do Projeto

```text
src
├── clients
├── controllers
├── factories
├── mocks
├── models
├── patterns
├── repositories
├── services
├── database.py
└── app.py
```

---

# Banco de Dados

## jogador

```text
idjogador
nome
email
```

## pokedex

```text
idpokedex
total_cartas_atualmente
total_cartas_conhecidas
jogador_idjogador
```

## pokemon

```text
idpokemon
nome
tipo_principal
tipo_secundario
imagem_url
descricao
```

## cartaconhecida

```text
idcartaConhecida
data_primeiro_contato
origem
ja_possui
possui_atualmente
data_ultima_atualizacao
pokedex_idpokedex
pokemon_idpokemon
```

## historicocarta

```text
idhistorico
data_evento
tipo_evento
origem
observacao
jogador_idjogador
pokemon_idpokemon
```

---

# APIs Externas

## PokeAPI

Utilizada para obtenção dos dados dos Pokémon.

Site:

https://pokeapi.co

---

# Mocks

## MockAuth

Simula autenticação.

Retorna token de acesso.

---

## MockDistribuicao

Simula distribuição inicial de cartas.

Exemplo:

```json
[
  {
    "pokemon_id": 25,
    "origem": "Inicial"
  },
  {
    "pokemon_id": 4,
    "origem": "Inicial"
  }
]
```

---

## MockTrocas

Simula trocas realizadas em outro microsserviço.

Exemplo:

```json
[
  {
    "jogador_id": 1,
    "pokemon_entregue": 25,
    "pokemon_recebido": 7
  }
]
```

---

# Endpoints

## Autenticação

### Login

```http
POST /auth/login
```

Body:

```json
{
  "usuario": "ash",
  "senha": "123"
}
```

---

### Validar Token

```http
GET /auth/validar
```

Header:

```http
Authorization: Bearer mock-token-1
```

---

### Obter Jogador

```http
GET /auth/jogador
```

---

## Pokémon

### Listar Pokémon

```http
GET /pokemon
```

### Detalhes de Pokémon

```http
GET /pokemon/{id}
```

---

## Pokédex

### Visualizar Pokédex

```http
GET /pokedex
```

---

### Listar Cartas

```http
GET /cartas
```

Primeira execução:

* consulta banco
* consulta distribuição
* persiste cartas
* registra histórico
* atualiza Pokédex

---

### Histórico

```http
GET /historico
```

---

## Trocas

### Sincronizar Trocas

```http
POST /trocas/sincronizar
```

Fluxo:

```text
MockTrocas
↓
TrocaService
↓
CartasService
↓
Observer
↓
HistoricoService
↓
Atualização da Pokédex
```

---

# Como Executar

## Criar ambiente virtual

```bash
python -m venv venv
```

## Ativar ambiente

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

## Instalar dependências

```bash
pip install -r requirements.txt
```

## Configurar banco MySQL

Criar banco:

```sql
CREATE DATABASE pokedex_db;
```

Ajustar credenciais em:

```text
src/database.py
```

---

## Executar aplicação

```bash
python src/app.py
```

Aplicação disponível em:

```text
http://localhost:5000
```

---

# Regras de Negócio

## total_cartas_conhecidas

Conta todas as cartas que o jogador já conheceu.

---

## total_cartas_atualmente

Conta apenas cartas onde:

```text
possui_atualmente = TRUE
```

---

## Histórico

Eventos registrados:

```text
DISTRIBUICAO
TROCA_ENVIADA
TROCA_RECEBIDA
```

---

# Autores

Projeto acadêmico desenvolvido para a disciplina de Arquitetura de Software e Microsserviços – INATEL.
