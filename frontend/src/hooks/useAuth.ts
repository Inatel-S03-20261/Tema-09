import { useMemo, useState } from 'react';
import { PokedexService } from '../services/PokedexService';

const STORAGE_TOKEN_KEY = 'pokedex-token';
const STORAGE_JOGADOR_KEY = 'pokedex-jogador';

export function useAuth() {
  const service = useMemo(() => new PokedexService(), []);

  const [jogador, setJogador] = useState(() => localStorage.getItem(STORAGE_JOGADOR_KEY) ?? '');
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_TOKEN_KEY) ?? '');

  async function autenticar(usuario: string, senha: string) {
    if (!usuario.trim() || !senha.trim()) {
      return false;
    }

    const resultado = await service.login(usuario.trim(), senha.trim());

    if (!resultado.sucesso || !resultado.token || !resultado.usuario) {
      return false;
    }

    localStorage.setItem(STORAGE_TOKEN_KEY, resultado.token);
    localStorage.setItem(STORAGE_JOGADOR_KEY, resultado.usuario.nome);

    setToken(resultado.token);
    setJogador(resultado.usuario.nome);

    return true;
  }

  function sair() {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    localStorage.removeItem(STORAGE_JOGADOR_KEY);

    setToken('');
    setJogador('');
  }

  return {
    jogador,
    token,
    autenticado: Boolean(token),
    autenticar,
    sair,
  };
}