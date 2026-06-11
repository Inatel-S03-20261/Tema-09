import { useCallback, useEffect, useMemo, useState } from 'react';
import type { StatusCarta } from '../dto/CartaConhecidaDTO';
import type { PokedexDTO } from '../dto/PokedexDTO';
import type { TipoPokemon } from '../dto/PokemonDTO';
import { PokedexService } from '../services/PokedexService';

const LIMITE_POKEMONS = 100;

export function usePokedex() {
  const service = useMemo(() => new PokedexService(), []);
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState<StatusCarta | 'todas'>('todas');
  const [tipo, setTipo] = useState<TipoPokemon | 'todos'>('todos');
  const [pokedex, setPokedex] = useState<PokedexDTO | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregarPokedex = useCallback(async () => {
    try {
      setCarregando(true);
      setErro('');
      const dados = await service.consultarPokedex(1, LIMITE_POKEMONS);
      setPokedex(dados);
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro inesperado ao carregar a Pokédex.');
    } finally {
      setCarregando(false);
    }
  }, [service]);

  useEffect(() => {
    void carregarPokedex();
  }, [carregarPokedex]);

  const cartasFiltradas = useMemo(() => {
    if (!pokedex) {
      return [];
    }

    return service.filtrarCartas(pokedex.cartas, busca, status, tipo);
  }, [busca, pokedex, service, status, tipo]);

  const tipos = useMemo(() => {
    if (!pokedex) {
      return [];
    }

    return service.listarTipos(pokedex.cartas);
  }, [pokedex, service]);

  async function atualizarCarta(pokemonId: number, novoStatus: StatusCarta) {
    service.atualizarHistorico(pokemonId, novoStatus);
    await carregarPokedex();
  }

  async function resetarDemo() {
    service.resetarDemo();
    await carregarPokedex();
  }

  async function atualizarDadosDaApi() {
    service.limparCacheApi();
    await carregarPokedex();
  }

  return {
    busca,
    setBusca,
    status,
    setStatus,
    tipo,
    setTipo,
    tipos,
    pokedex,
    cartasFiltradas,
    carregando,
    erro,
    atualizarCarta,
    resetarDemo,
    atualizarDadosDaApi,
  };
}
