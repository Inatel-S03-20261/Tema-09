# Aplicação - Pokédex

###### Feito por @JuliaPCaputo @milelaraia @JuliaVicentini @DonattoPieve @Karolina-Oliveira

Este é um breve resumo de um projeto que envolve a aplicação de frameworks de front-end na página de gerenciamento de cartas de uma Pokédex. O projeto foi desenvolvido para a disciplina de Arquitetura de Software.

[![Whats-App-Image-2026-03-16-at-23-35-59.jpg](https://i.postimg.cc/4yKVwykT/Whats-App-Image-2026-03-16-at-23-35-59.jpg)](https://postimg.cc/MfSnpWps)

## Descrição do projeto

Responsável por gerenciar as cartas conhecidas por cada jogador. A aplicação deve mostrar, por meio de uma interface gráfica, quantas cartas existem e quantas o jogador já conheceu (já teve em seu baralho). Mesmo que um jogador trocar uma carta, as informações da carta trocada continuam disponíveis na lista.

## Ferramentas a serem utilizadas
* React
* JavaScript

## Implementações

O grupo pretende implementar uma interface front-end que lembre a Pokédex apresentada no anime, fazendo uso de formatos e cores utilizados na animação.
Haverá um espaço reservado para todas as cartas que podem ser conquistadas no jogo, porém, nem todos os espaços estarão com informações visíveis ao jogador, pois só serão revelados aqueles Pokémons conhecidos por ele em algum momento ao longo de sua jornada na aplicação. Além disso, as cartas reveladas contarão com informações essenciais sobre aquele Pokémon, visando o acesso rápido do jogador à características relevantes sobre ele, que serão úteis para as batalhas.

Além disso, a implementação de filtros permitirá ao jogador escolher características relevantes e a aplicação mostrará quais Pokémons de sua coleção enquadram-se naqueles quesitos.

## Wireframes

### Página de Login

[![Whats-App-Image-2026-03-17-at-08-37-20.jpg](https://i.postimg.cc/R0sx1b6H/Whats-App-Image-2026-03-17-at-08-37-20.jpg)](https://postimg.cc/sBhLsmJj)

### Página Principal

[![Whats-App-Image-2026-03-17-at-08-37-20-(2).jpg](https://i.postimg.cc/50K902qZ/Whats-App-Image-2026-03-17-at-08-37-20-(2).jpg)](https://postimg.cc/XGF613P8)

### Coleção de Cartas

[![Whats-App-Image-2026-03-17-at-08-37-21.jpg](https://i.postimg.cc/c1VgMFwB/Whats-App-Image-2026-03-17-at-08-37-21.jpg)](https://postimg.cc/237SCFH1)

### Inspeção de Cartas

[![Whats-App-Image-2026-03-17-at-08-37-20-(1).jpg](https://i.postimg.cc/FRd8yFXM/Whats-App-Image-2026-03-17-at-08-37-20-(1).jpg)](https://postimg.cc/YG7dkH9R)

## Diagramas

### Casos de Uso

[![casos-de-uso.jpg](https://i.postimg.cc/bYCsWMG0/casos-de-uso.jpg)](https://postimg.cc/Sj9Szgfj)

### Classes

[![classes.jpg](https://i.postimg.cc/0NPkbdMw/classes.jpg)](https://postimg.cc/K1pSWT5G)

## Aplicações de SOLID no projeto

A fim de seguir os princípios SOLID, o diagrama de classes foi alterado.
Para obedecer ao Princípio da Responsabilidade Única, foram retirados métodos relacionados a cartas e histórico da classe PokedexService, sendo estes reorganizados em classes relacionadas a suas respectivas funcionalidades - CartasService e HistoricoService, respectivamente. Além disso, houve a reorganização para que as dependências entre classes (mais especificamente entre as localizadas no package Domain e Control) fossem explicitadas e correspondessem fielmente à intenção de desenvolvimento.
Por fim, no intuito de obedecer ao Princípio Aberto/Fechado, foram inseridas Interfaces no package Repository, que serão implementadas pelas classes que se conectam com os serviços. Isso se deve ao fato de que, utilizando interfaces, caso haja alguma alteração nos bancos de dados, novas implementações podem ser realizadas diretamente na interface, sem a necessidade de alteração do sistema, facilitando sua evolução.
