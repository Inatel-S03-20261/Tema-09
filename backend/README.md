## Execucao local com .env

Para rodar este backend junto com o frontend usando MySQL local, veja COMO_RODAR.md na raiz do projeto. As credenciais do banco ficam em backend/.env.

---

# Tema-09 â€“ Backend PokÃ©dex

## DescriÃ§Ã£o

O Tema-09 Ã© um microsserviÃ§o desenvolvido em Python e Flask responsÃ¡vel pelo gerenciamento da PokÃ©dex dos jogadores.

O sistema realiza autenticaÃ§Ã£o, sincronizaÃ§Ã£o de jogadores, gerenciamento de cartas conhecidas, histÃ³rico de eventos, integraÃ§Ã£o com a PokeAPI e atualizaÃ§Ã£o das estatÃ­sticas da PokÃ©dex.

Este microsserviÃ§o **nÃ£o executa trocas diretamente**. As trocas sÃ£o realizadas por outro microsserviÃ§o e este backend apenas recebe as informaÃ§Ãµes das trocas, atualiza as cartas do jogador, registra o histÃ³rico e recalcula as estatÃ­sticas da PokÃ©dex.

---

# Tecnologias Utilizadas

* Python 3.11+
* Flask
* Flask-CORS
* MySQL
* Requests
* PokeAPI

---

# PrÃ©-requisitos

Antes de executar o projeto, Ã© necessÃ¡rio possuir instalado:

* Python 3.11 ou superior
* MySQL 8 ou superior
* Git
* Pip

Verifique as versÃµes instaladas:

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

# PadrÃµes de Projeto

## Singleton

Classe:

```text
DatabaseConnection
```

ResponsÃ¡vel por manter uma Ãºnica conexÃ£o com o banco de dados durante toda a execuÃ§Ã£o da aplicaÃ§Ã£o.

BenefÃ­cios:

* Evita mÃºltiplas conexÃµes desnecessÃ¡rias.
* Centraliza o acesso ao banco.
* Facilita o gerenciamento da conexÃ£o.

---

## Facade

Classe:

```text
PokedexService
```

Centraliza o acesso Ã s funcionalidades do sistema:

* AutenticaÃ§Ã£o
* Cartas
* PokÃ©dex
* HistÃ³rico
* PokÃ©mon
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

Sempre que uma carta Ã© recebida ou trocada, o histÃ³rico Ã© atualizado automaticamente.

---

# Arquitetura

```text
Controller
    â†“
PokedexService (Facade)
    â†“
AutenticacaoService
CartasService (Subject)
PokemonService
HistoricoService (Observer)
TrocaService
    â†“
Clients
    â†“
Repositories
    â†“
DatabaseConnection (Singleton)
    â†“
MySQL
```

---

# Estrutura do Projeto

```text
backend
â”‚
â”œâ”€â”€ database
â”‚   â””â”€â”€ pokedex_db.sql
â”‚
â”œâ”€â”€ src
â”‚   â”œâ”€â”€ clients
â”‚   â”œâ”€â”€ controllers
â”‚   â”œâ”€â”€ factories
â”‚   â”œâ”€â”€ mocks
â”‚   â”œâ”€â”€ models
â”‚   â”œâ”€â”€ patterns
â”‚   â”œâ”€â”€ repositories
â”‚   â”œâ”€â”€ services
â”‚   â”œâ”€â”€ database.py
â”‚   â””â”€â”€ app.py
â”‚
â””â”€â”€ requirements.txt
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

Utilizada para obtenÃ§Ã£o de informaÃ§Ãµes dos PokÃ©mon.

Site oficial:

https://pokeapi.co

---

# ServiÃ§os Mockados

## MockAuth

Simula o serviÃ§o de autenticaÃ§Ã£o.

Retorna um token vÃ¡lido para testes.

---

## MockDistribuicao

Simula a distribuiÃ§Ã£o inicial de cartas.

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

Simula trocas realizadas por outro microsserviÃ§o.

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

# ConfiguraÃ§Ã£o do Banco de Dados

## 1. Instalar o MySQL

Baixe e instale o MySQL Server:

https://dev.mysql.com/downloads/mysql/

Durante a instalaÃ§Ã£o configure:

```text
UsuÃ¡rio: root
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

# InstalaÃ§Ã£o do Projeto

## 1. Clonar o repositÃ³rio

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

## 4. Instalar dependÃªncias

```bash
pip install -r requirements.txt
```

---

# Executando a AplicaÃ§Ã£o

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

## AutenticaÃ§Ã£o

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

## PokÃ©mon

### Listar PokÃ©mon

```http
GET /pokemon
```

---

### Detalhes de um PokÃ©mon

```http
GET /pokemon/{id}
```

Exemplo:

```http
GET /pokemon/25
```

---

## PokÃ©dex

### Visualizar PokÃ©dex

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

Primeira execuÃ§Ã£o:

* Consulta o banco de dados.
* Consulta o MockDistribuicao.
* Busca os dados dos PokÃ©mon na PokeAPI.
* Persiste os PokÃ©mon.
* Persiste as cartas conhecidas.
* Registra eventos de histÃ³rico.
* Atualiza as estatÃ­sticas da PokÃ©dex.

---

### Consultar HistÃ³rico

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
â†“
TrocaService
â†“
CartasService
â†“
Observer
â†“
HistoricoService
â†“
AtualizaÃ§Ã£o da PokÃ©dex
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

ApÃ³s essa chamada:

```sql
SELECT * FROM pokemon;
SELECT * FROM cartaconhecida;
SELECT * FROM historicocarta;
```

Os registros devem ter sido criados automaticamente.

---

## 3. Visualizar PokÃ©dex

```http
GET /pokedex
```

---

## 4. Consultar HistÃ³rico

```http
GET /historico
```

---

## 5. Sincronizar Trocas

```http
POST /trocas/sincronizar
```

---

## 6. Consultar HistÃ³rico Novamente

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

Visualizar PokÃ©dex:

```sql
SELECT * FROM pokedex;
```

Visualizar PokÃ©mon:

```sql
SELECT * FROM pokemon;
```

Visualizar cartas:

```sql
SELECT * FROM cartaconhecida;
```

Visualizar histÃ³rico:

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

# Regras de NegÃ³cio

## total_cartas_conhecidas

Conta todas as cartas que o jogador jÃ¡ conheceu.

---

## total_cartas_atualmente

Conta apenas cartas onde:

```text
possui_atualmente = TRUE
```

---

## HistÃ³rico

Eventos registrados:

```text
DISTRIBUICAO
TROCA_ENVIADA
TROCA_RECEBIDA
```

---

# Autores

Projeto acadÃªmico desenvolvido para a disciplina de Arquitetura de Software e MicrosserviÃ§os â€“ INATEL.

