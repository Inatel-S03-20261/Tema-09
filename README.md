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

[![CASO-DE-USO-Casos-de-uso-Principios-SOLID-drawio.png](https://i.postimg.cc/J7dSX4XL/CASO-DE-USO-Casos-de-uso-Principios-SOLID-drawio.png)](https://postimg.cc/fkmHns52)

### Classes

[![CASO-DE-USO-Diagrama-de-classes-Principios-SOLID-drawio.png](https://i.postimg.cc/ZKB2xtP8/CASO-DE-USO-Diagrama-de-classes-Principios-SOLID-drawio.png)](https://postimg.cc/BX3mJzVb)

## Aplicações de SOLID no projeto

As mudanças para incluir os princípios SOLID foram focadas principalmente na separação de responsabilidades, redução de acoplamento e melhoria na comunicação entre camadas.

O princípio da responsabilidade única (SRP) foi aplicado ao dividir a antiga `PokedexService`, que concentrava múltiplas funções, em serviços mais específicos. As responsabilidades relacionadas a cartas e histórico foram extraídas para `CartasService` e `HistoricoService`, permitindo que cada classe tenha um propósito bem definido e reduzindo o impacto de alterações futuras.

O princípio aberto/fechado (OCP) foi atendido por meio da introdução de interfaces para os repositórios e clientes externos, como `IPokedexRepository`, `IPokemonRepository` e `IPokeApiClient`. Com isso, novas implementações podem ser adicionadas sem a necessidade de modificar o código existente, facilitando a evolução do sistema.

O princípio da substituição de Liskov (LSP) é garantido ao assegurar que todas as implementações respeitam os contratos definidos pelas interfaces. Assim, qualquer implementação concreta pode ser utilizada no lugar da abstração sem alterar o comportamento esperado do sistema.

O princípio da segregação de interfaces (ISP) foi aplicado ao criar interfaces específicas para cada contexto, evitando que classes dependam de métodos que não utilizam. Isso resultou em contratos mais enxutos e coesos, como a separação entre repositórios e clientes de API.

Por fim, o princípio da inversão de dependência (DIP) foi implementado ao fazer com que os serviços dependam de abstrações, e não de implementações concretas. Dessa forma, `PokedexService`, `PokemonService` e outros serviços interagem apenas com interfaces, o que reduz o acoplamento e facilita testes e substituições de componentes.

A arquitetura resultante segue o fluxo Service → Interface → Implementação, com uma separação clara entre as camadas de controle, repositório e integração externa. Além disso, a camada de domínio permanece isolada de detalhes de infraestrutura, sendo acessada apenas por meio da camada de controle.

Como resultado, o sistema se torna mais modular, testável e preparado para mudanças futuras, atendendo às boas práticas de engenharia de software.
