# Pokédex híbrida com PokeAPI

Projeto React + Vite pronto para rodar localmente, sem alterar o repositório original no GitHub.

## O que esta versão faz

- Login simples do jogador para simular autenticação.
- Busca os 100 primeiros Pokémon pela PokeAPI.
- Carrega nome, número, tipos, imagem, habilidades, ataques, altura, peso e stats pelo endpoint `/pokemon`.
- Busca a descrição apenas quando o usuário abre os detalhes de um Pokémon, usando o endpoint `/pokemon-species`.
- Salva o histórico de cartas conhecidas/trocadas no `localStorage`.
- Salva cache dos dados da API no `localStorage`, para não fazer todas as requisições toda vez que abrir a página.
- Permite busca, filtros por tipo/status, atualização de carta recebida/trocada e reset da demo.

## Como rodar

```bash
npm install
npm run dev
```

Depois abra o link mostrado no terminal, geralmente:

```text
http://localhost:5173/
```

Na tela de login, digite qualquer nome de jogador e qualquer senha.

## Observação para apresentação

Essa versão é híbrida porque os dados dos Pokémon vêm de uma API externa, mas o progresso do jogador ainda é salvo localmente. Em uma versão final, o histórico de cartas poderia ir para o backend/banco de dados do projeto.
