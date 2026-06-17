import { useCallback, useEffect, useMemo, useState } from 'react';
import type { StatusCarta } from '../dto/CartaConhecidaDTO';
import type { PokedexDTO } from '../dto/PokedexDTO';
import type { TipoPokemon } from '../dto/PokemonDTO';
import { PokedexService } from '../services/PokedexService';

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

      const dados = await service.consultarPokedex();

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

  async function atualizarDadosDaApi() {
    try {
      setCarregando(true);
      setErro('');

      await service.sincronizarPokedex();
      await carregarPokedex();
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro inesperado ao sincronizar a Pokédex.');
    } finally {
      setCarregando(false);
    }
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
    atualizarDadosDaApi,
  };
}