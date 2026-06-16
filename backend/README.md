# Tema-09 – Backend Pokédex

## Descrição

O Tema-09 é um microsserviço desenvolvido em Python e Flask responsável pelo gerenciamento da Pokédex dos jogadores.

O sistema realiza autenticação, sincronização de jogadores, gerenciamento de cartas conhecidas, histórico de eventos, integração com a PokeAPI e atualização das estatísticas da Pokédex.

Este microsserviço **não executa trocas diretamente**. As trocas são realizadas por outro microsserviço e este backend apenas recebe as informações das trocas, atualiza as cartas do jogador, registra o histórico e recalcula as estatísticas da Pokédex.

---

# Tecnologias Utilizadas

* Python 3.11+
* Flask
* Flask-CORS
* MySQL
* Requests
* PokeAPI

---

# Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

* Python 3.11 ou superior
* MySQL 8 ou superior
* Git
* Pip

Verifique as versões instaladas:

```bash
python --version
```

```bash
pip --version
```

```bash
mysql --version
```

---

# Padrões de Projeto

## Singleton

Classe:

```text
DatabaseConnection
```

Responsável por manter uma única conexão com o banco de dados durante toda a execução da aplicação.

Benefícios:

* Evita múltiplas conexões desnecessárias.
* Centraliza o acesso ao banco.
* Facilita o gerenciamento da conexão.

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
CartasService (Subject)
PokemonService
HistoricoService (Observer)
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
backend
│
├── database
│   └── pokedex_db.sql
│
├── src
│   ├── clients
│   ├── controllers
│   ├── factories
│   ├── mocks
│   ├── models
│   ├── patterns
│   ├── repositories
│   ├── services
│   ├── database.py
│   └── app.py
│
└── requirements.txt
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

Utilizada para obtenção de informações dos Pokémon.

Site oficial:

https://pokeapi.co

---

# Serviços Mockados

## MockAuth

Simula o serviço de autenticação.

Retorna um token válido para testes.

---

## MockDistribuicao

Simula a distribuição inicial de cartas.

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

Simula trocas realizadas por outro microsserviço.

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

# Configuração do Banco de Dados

## 1. Instalar o MySQL

Baixe e instale o MySQL Server:

https://dev.mysql.com/downloads/mysql/

Durante a instalação configure:

```text
Usuário: root
Senha: root
```

Caso utilize credenciais diferentes, altere o arquivo:

```text
backend/src/database.py
```

---

## 2. Criar o banco

Acesse o MySQL:

```bash
mysql -u root -p
```

Crie o banco:

```sql
CREATE DATABASE pokedex_db;
```

Verifique:

```sql
SHOW DATABASES;
```

---

## 3. Importar a estrutura do banco

Na raiz do projeto execute:

```bash
mysql -u root -p pokedex_db < backend/database/pokedex_db.sql
```

Digite a senha quando solicitado.

---

## 4. Verificar as tabelas

Acesse novamente o MySQL:

```bash
mysql -u root -p
```

Selecione o banco:

```sql
USE pokedex_db;
```

Liste as tabelas:

```sql
SHOW TABLES;
```

Resultado esperado:

```text
cartaconhecida
historicocarta
jogador
pokedex
pokemon
```

---

# Instalação do Projeto

## 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

```bash
cd Tema-09/backend
```

---

## 2. Criar ambiente virtual

```bash
python -m venv venv
```

---

## 3. Ativar ambiente virtual

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

---

## 4. Instalar dependências

```bash
pip install -r requirements.txt
```

---

# Executando a Aplicação

Execute:

```bash
python src/app.py
```

Resultado esperado:

```text
* Running on http://127.0.0.1:5000
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

Header:

```http
Authorization: Bearer mock-token-1
```

---

## Pokémon

### Listar Pokémon

```http
GET /pokemon
```

---

### Detalhes de um Pokémon

```http
GET /pokemon/{id}
```

Exemplo:

```http
GET /pokemon/25
```

---

## Pokédex

### Visualizar Pokédex

```http
GET /pokedex
```

Header:

```http
Authorization: Bearer mock-token-1
```

---

### Listar Cartas

```http
GET /cartas
```

Header:

```http
Authorization: Bearer mock-token-1
```

Primeira execução:

* Consulta o banco de dados.
* Consulta o MockDistribuicao.
* Busca os dados dos Pokémon na PokeAPI.
* Persiste os Pokémon.
* Persiste as cartas conhecidas.
* Registra eventos de histórico.
* Atualiza as estatísticas da Pokédex.

---

### Consultar Histórico

```http
GET /historico
```

Header:

```http
Authorization: Bearer mock-token-1
```

---

## Trocas

### Sincronizar Trocas

```http
POST /trocas/sincronizar
```

Header:

```http
Authorization: Bearer mock-token-1
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

# Fluxo Completo de Teste

## 1. Fazer Login

```http
POST /auth/login
```

Resposta esperada:

```json
{
  "token": "mock-token-1"
}
```

---

## 2. Buscar Cartas

```http
GET /cartas
```

Após essa chamada:

```sql
SELECT * FROM pokemon;
SELECT * FROM cartaconhecida;
SELECT * FROM historicocarta;
```

Os registros devem ter sido criados automaticamente.

---

## 3. Visualizar Pokédex

```http
GET /pokedex
```

---

## 4. Consultar Histórico

```http
GET /historico
```

---

## 5. Sincronizar Trocas

```http
POST /trocas/sincronizar
```

---

## 6. Consultar Histórico Novamente

```http
GET /historico
```

Devem existir eventos:

```text
DISTRIBUICAO
TROCA_ENVIADA
TROCA_RECEBIDA
```

---

# Consultando os Dados do Banco

Acesse o MySQL:

```bash
mysql -u root -p
```

Selecione o banco:

```sql
USE pokedex_db;
```

Visualizar jogadores:

```sql
SELECT * FROM jogador;
```

Visualizar Pokédex:

```sql
SELECT * FROM pokedex;
```

Visualizar Pokémon:

```sql
SELECT * FROM pokemon;
```

Visualizar cartas:

```sql
SELECT * FROM cartaconhecida;
```

Visualizar histórico:

```sql
SELECT * FROM historicocarta;
```

---

# Resetando o Banco

Para repetir os testes:

```sql
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE historicocarta;
TRUNCATE TABLE cartaconhecida;
TRUNCATE TABLE pokedex;
TRUNCATE TABLE jogador;
TRUNCATE TABLE pokemon;

SET FOREIGN_KEY_CHECKS = 1;
```

Isso remove todos os dados e reinicia os identificadores das tabelas.

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
