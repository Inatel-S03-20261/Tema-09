import { useState } from 'react';

export function useAuth() {
  const [jogador, setJogador] = useState(() => localStorage.getItem('pokedex-jogador') ?? '');

  function autenticar(nome: string, senha: string) {
    if (!nome.trim() || !senha.trim()) {
      return false;
    }

    localStorage.setItem('pokedex-jogador', nome.trim());
    setJogador(nome.trim());
    return true;
  }

  function sair() {
    localStorage.removeItem('pokedex-jogador');
    setJogador('');
  }

  return {
    jogador,
    autenticado: Boolean(jogador),
    autenticar,
    sair,
  };
}
