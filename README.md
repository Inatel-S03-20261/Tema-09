## Execucao local

Para rodar backend e frontend juntos usando MySQL local e arquivos .env, siga o guia COMO_RODAR.md.

---

# AplicaÃ§Ã£o - PokÃ©dex

###### Feito por @JuliaPCaputo @milelaraia @JuliaVicentini @Karolina-Oliveira

Este Ã© um breve resumo de um projeto que envolve a aplicaÃ§Ã£o de frameworks de front-end na pÃ¡gina de gerenciamento de cartas de uma PokÃ©dex. O projeto foi desenvolvido para a disciplina de Arquitetura de Software.

![PokÃ©dex](images/Pokedex.jpg)

## DescriÃ§Ã£o do projeto

ResponsÃ¡vel por gerenciar as cartas conhecidas por cada jogador. A aplicaÃ§Ã£o deve mostrar, por meio de uma interface grÃ¡fica, quantas cartas existem e quantas o jogador jÃ¡ conheceu (jÃ¡ teve em seu baralho). Mesmo que um jogador trocar uma carta, as informaÃ§Ãµes da carta trocada continuam disponÃ­veis na lista.

## Ferramentas a serem utilizadas

* React
* TypeScript
* Python
* Flask
* MySQL
* MySQL Workbench

## ImplementaÃ§Ãµes

O grupo pretende implementar uma interface front-end que lembre a PokÃ©dex apresentada no anime, fazendo uso de formatos e cores utilizados na animaÃ§Ã£o.
HaverÃ¡ um espaÃ§o reservado para todas as cartas que podem ser conquistadas no jogo, porÃ©m, nem todos os espaÃ§os estarÃ£o com informaÃ§Ãµes visÃ­veis ao jogador, pois sÃ³ serÃ£o revelados aqueles PokÃ©mons conhecidos por ele em algum momento ao longo de sua jornada na aplicaÃ§Ã£o. AlÃ©m disso, as cartas reveladas contarÃ£o com informaÃ§Ãµes essenciais sobre aquele PokÃ©mon, visando o acesso rÃ¡pido do jogador Ã  caracterÃ­sticas relevantes sobre ele, que serÃ£o Ãºteis para as batalhas.

AlÃ©m disso, a implementaÃ§Ã£o de filtros permitirÃ¡ ao jogador escolher caracterÃ­sticas relevantes e a aplicaÃ§Ã£o mostrarÃ¡ quais PokÃ©mons de sua coleÃ§Ã£o enquadram-se naqueles quesitos.

## Wireframes

### PÃ¡gina de Login

![Login](images/Login.jpg)

### PÃ¡gina Principal

![Principal](images/Principal.jpg)

### ColeÃ§Ã£o de Cartas

![ColeÃ§Ã£o](images/Colecao.jpg)

### InspeÃ§Ã£o de Cartas

![InspeÃ§Ã£o](images/Inspecao.jpg)

## Diagramas

### Casos de Uso

![Casos de Uso](images/Casos_de_Uso.png)

### Classes

![Classes](images/Classes.png)

## AplicaÃ§Ãµes de SOLID no projeto

A fim de seguir os princÃ­pios SOLID, o diagrama de classes foi alterado.

Para obedecer ao PrincÃ­pio da Responsabilidade Ãšnica (SRP), foram retirados mÃ©todos relacionados a cartas e histÃ³rico da classe PokedexService, sendo estes reorganizados em classes especÃ­ficas para suas respectivas responsabilidades â€” CartasService e HistoricoService. AlÃ©m disso, o prÃ³prio CartasService teve seus mÃ©todos reorganizados: os mÃ©todos relacionados ao rastreamento de estado das cartas, como marcarComoRecebida(), marcarComoTrocada() e manterHistorico(), foram movidos para o HistoricoService, que passa a ser responsÃ¡vel exclusivamente pelo histÃ³rico de aÃ§Ãµes do jogador, enquanto o CartasService mantÃ©m apenas as regras de negÃ³cio relacionadas Ã  consulta, registro e filtragem de cartas. As dependÃªncias entre as classes foram reorganizadas para refletir de forma mais clara a separaÃ§Ã£o entre as camadas de domÃ­nio, serviÃ§o e acesso a dados.

Por fim, visando atender ao PrincÃ­pio da InversÃ£o de DependÃªncia (DIP), foram introduzidas interfaces no package Repository, que definem os contratos de acesso aos dados. As classes concretas de repositÃ³rio passam a implementar essas interfaces, enquanto as classes de serviÃ§o dependem apenas dessas abstraÃ§Ãµes, e nÃ£o das implementaÃ§Ãµes especÃ­ficas.

O mesmo princÃ­pio foi aplicado na comunicaÃ§Ã£o com componentes responsÃ¡veis pela interaÃ§Ã£o com sistemas externos, modelados no diagrama como controllers. Foram definidas interfaces para esses elementos, que sÃ£o implementadas pelas classes concretas responsÃ¡veis pelo acesso Ã s APIs externas. As classes de serviÃ§o passam a depender dessas abstraÃ§Ãµes, promovendo menor acoplamento e maior flexibilidade na substituiÃ§Ã£o ou evoluÃ§Ã£o dessas integraÃ§Ãµes.

Dessa forma, o sistema se torna menos acoplado, permitindo que mudanÃ§as na forma de persistÃªncia ou na integraÃ§Ã£o com serviÃ§os externos sejam realizadas por meio da criaÃ§Ã£o de novas implementaÃ§Ãµes dessas interfaces, sem a necessidade de modificar as classes de serviÃ§o. Isso facilita a manutenÃ§Ã£o, evoluÃ§Ã£o e testabilidade do sistema.

## PadrÃµes Arquiteturais

Os padrÃµes arquiteturais utilizados na aplicaÃ§Ã£o foram Single Page Application (SPA) no frontend e Service-Oriented Architecture (SOA) no backend.

No frontend, foi adotada a arquitetura SPA utilizando React e TypeScript. Nessa abordagem, toda a interface Ã© carregada em uma Ãºnica pÃ¡gina, e a navegaÃ§Ã£o entre funcionalidades ocorre dinamicamente por meio de componentes e pÃ¡ginas, sem a necessidade de recarregamento completo da aplicaÃ§Ã£o. A estrutura foi organizada em Pages (responsÃ¡veis pelas telas principais da aplicaÃ§Ã£o), Components (representando elementos reutilizÃ¡veis da interface), Hooks (que concentram a lÃ³gica de interaÃ§Ã£o com os serviÃ§os), e DTOs (utilizados para a transferÃªncia de dados entre as camadas).

No backend, foi empregada a arquitetura SOA, na qual as funcionalidades do sistema sÃ£o organizadas em serviÃ§os independentes e especializados. Cada serviÃ§o possui uma responsabilidade bem definida, como autenticaÃ§Ã£o de jogadores, gerenciamento da PokÃ©dex, consulta de PokÃ©mon, controle de cartas conhecidas e atualizaÃ§Ã£o de histÃ³rico. Essa divisÃ£o favorece a modularidade, reutilizaÃ§Ã£o de cÃ³digo, manutenÃ§Ã£o e evoluÃ§Ã£o do sistema.

AlÃ©m disso, a arquitetura foi estruturada em camadas:

* Controller, responsÃ¡vel por receber as requisiÃ§Ãµes e intermediar a comunicaÃ§Ã£o com os serviÃ§os;
* Service, responsÃ¡vel pela implementaÃ§Ã£o das regras de negÃ³cio;
* Repository, responsÃ¡vel pelo acesso e persistÃªncia de dados;
* Model, responsÃ¡vel pela representaÃ§Ã£o das entidades do domÃ­nio da aplicaÃ§Ã£o;
* Clients/APIs Externas, responsÃ¡veis pela integraÃ§Ã£o com sistemas externos, como a PokÃ©API, API de Jogadores, API de DistribuiÃ§Ã£o de Cartas e API de Trocas.

A comunicaÃ§Ã£o entre essas camadas ocorre por meio de interfaces e abstraÃ§Ãµes, reduzindo o acoplamento entre os componentes e facilitando a manutenÃ§Ã£o, a testabilidade e a evoluÃ§Ã£o da aplicaÃ§Ã£o.

## Design Patterns

Os padrÃµes de projeto implementados foram Singleton, Facade e Observer.

### Singleton

O padrÃ£o Singleton foi aplicado na classe DatabaseConnection, responsÃ¡vel pelo gerenciamento da conexÃ£o com o banco de dados. Esse padrÃ£o garante que exista apenas uma instÃ¢ncia da conexÃ£o durante toda a execuÃ§Ã£o da aplicaÃ§Ã£o, evitando a criaÃ§Ã£o desnecessÃ¡ria de mÃºltiplas conexÃµes e centralizando o acesso ao banco de dados.

### Facade

O padrÃ£o Facade foi aplicado na classe PokedexService, que atua como uma fachada para os demais serviÃ§os do sistema. Em vez de os controladores acessarem diretamente diversos serviÃ§os especializados, eles interagem apenas com a fachada, que coordena as chamadas necessÃ¡rias internamente. Essa abordagem simplifica o uso da camada de serviÃ§os e reduz o acoplamento entre os componentes da aplicaÃ§Ã£o.

### Observer

O padrÃ£o Observer foi aplicado entre as classes CartasService e HistoricoService. Nesse contexto, CartasService atua como Subject, enquanto HistoricoService atua como Observer. Sempre que uma carta Ã© registrada como recebida ou trocada, o CartasService notifica seus observadores, permitindo que o histÃ³rico seja atualizado automaticamente. Dessa forma, a atualizaÃ§Ã£o do histÃ³rico ocorre de maneira desacoplada, sem que o serviÃ§o de cartas precise conhecer os detalhes da implementaÃ§Ã£o do histÃ³rico.

## Banco de Dados

O banco de dados da aplicaÃ§Ã£o foi modelado utilizando MySQL Workbench e implementado em MySQL.

A modelagem foi desenvolvida com base nas entidades presentes no diagrama de classes da aplicaÃ§Ã£o, permitindo o gerenciamento dos jogadores, PokÃ©mons conhecidos e informaÃ§Ãµes da PokÃ©dex.

Foram criadas as seguintes tabelas:

* jogador
* pokemon
* pokedex
* cartaconhecida

A modelagem do banco encontra-se no arquivo:

```text
backend/database/pokedex.mwb
```
O script SQL utilizado para criaÃ§Ã£o do banco e das tabelas encontra-se em:
```text
backend/database/pokedex_db.sql
```
A conexÃ£o entre o backend e o banco de dados foi implementada no arquivo:
```text
backend/src/database.py
```
O acesso aos dados foi organizado utilizando o padrÃ£o Repository, por meio das classes:

JogadorRepository
PokemonRepository
PokedexRepository
CartaConhecidaRepository

Os repositories sÃ£o responsÃ¡veis por realizar as consultas e operaÃ§Ãµes de persistÃªncia no banco de dados, mantendo a separaÃ§Ã£o entre as regras de negÃ³cio e o acesso aos dados.

## Estrutura de Pastas

```text
pokedex/
â”‚
â”œâ”€â”€ frontend/
â”‚   â””â”€â”€ src/
â”‚       â”‚
â”‚       â”œâ”€â”€ pages/
â”‚       â”‚   â”œâ”€â”€ PokedexPage.tsx
â”‚       â”‚   â”œâ”€â”€ PokemonPage.tsx
â”‚       â”‚   â””â”€â”€ LoginPage.tsx
â”‚       â”‚
â”‚       â”œâ”€â”€ components/
â”‚       â”‚   â”œâ”€â”€ BuscaComponent.tsx
â”‚       â”‚   â””â”€â”€ FiltrosComponent.tsx
â”‚       â”‚
â”‚       â”œâ”€â”€ hooks/
â”‚       â”‚   â”œâ”€â”€ usePokemon.ts
â”‚       â”‚   â”œâ”€â”€ usePokedex.ts
â”‚       â”‚   â””â”€â”€ useAuth.ts
â”‚       â”‚
â”‚       â”œâ”€â”€ dto/
â”‚       â”‚   â”œâ”€â”€ PokemonDTO.ts
â”‚       â”‚   â”œâ”€â”€ CartaConhecidaDTO.ts
â”‚       â”‚   â””â”€â”€ PokedexDTO.ts
â”‚       â”‚
â”‚       â””â”€â”€ App.tsx
â”‚
â”œâ”€â”€ backend/
â”‚   â”œâ”€â”€ database/
â”‚   â”‚   â”œâ”€â”€ pokedex.mwb
â”‚   â”‚   â””â”€â”€ pokedex_db.sql
â”‚   â”‚
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ clients/
â”‚   â”‚   â”‚   â””â”€â”€ auth_service_client.py
â”‚   â”‚   â”‚
â”‚   â”‚   â”œâ”€â”€ controllers/
â”‚   â”‚   â”‚   â”œâ”€â”€ autenticacao_controller.py
â”‚   â”‚   â”‚   â””â”€â”€ pokedex_controller.py
â”‚   â”‚   â”‚
â”‚   â”‚   â”œâ”€â”€ models/
â”‚   â”‚   â”‚   â”œâ”€â”€ jogador.py
â”‚   â”‚   â”‚   â”œâ”€â”€ pokemon.py
â”‚   â”‚   â”‚   â”œâ”€â”€ pokedex.py
â”‚   â”‚   â”‚   â””â”€â”€ carta_conhecida.py
â”‚   â”‚   â”‚
â”‚   â”‚   â”œâ”€â”€ repositories/
â”‚   â”‚   â”‚   â”œâ”€â”€ jogador_repository.py
â”‚   â”‚   â”‚   â”œâ”€â”€ pokemon_repository.py
â”‚   â”‚   â”‚   â”œâ”€â”€ pokedex_repository.py
â”‚   â”‚   â”‚   â””â”€â”€ carta_conhecida_repository.py
â”‚   â”‚   â”‚
â”‚   â”‚   â”œâ”€â”€ services/
â”‚   â”‚   â”‚   â”œâ”€â”€ autenticacao_service.py
â”‚   â”‚   â”‚   â”œâ”€â”€ pokemon_service.py
â”‚   â”‚   â”‚   â”œâ”€â”€ pokedex_service.py
â”‚   â”‚   â”‚   â”œâ”€â”€ cartas_service.py
â”‚   â”‚   â”‚   â””â”€â”€ historico_service.py
â”‚   â”‚   â”‚
â”‚   â”‚   â”œâ”€â”€ app.py
â”‚   â”‚   â””â”€â”€ database.py
â”‚   â”‚
â”‚   â”œâ”€â”€ README.md
â”‚   â””â”€â”€ requirements.txt
â”‚
â””â”€â”€ docs/
    â”œâ”€â”€ diagrama_classes/
    â”œâ”€â”€ casos_de_uso/
    â””â”€â”€ arquitetura/
```

