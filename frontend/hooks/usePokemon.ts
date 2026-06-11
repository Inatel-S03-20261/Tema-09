import { useState, useEffect } from 'react';
import type { PokemonDTO } from '../types/PokemonDTO';

export function usePokemon() {
  const [pokemons, setPokemons] = useState<PokemonDTO[]>([]);
  const [pokemonSelecionado, setPokemonSelecionado] = useState<PokemonDTO | null>(null);
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    buscarPokemon();
  }, []);

  const buscarPokemon = async (): Promise<void> => {
    try {
      setCarregando(true);
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await response.json();
      const detalhes = await Promise.all(
        data.results.map(async (p: { name: string; url: string }) => {
          const res = await fetch(p.url);
          const info = await res.json();
          return {
            nome: info.name,
            tipo: info.types[0].type.name,
            imageUrl: info.sprites.other['official-artwork'].front_default,
          } as PokemonDTO;
        })
      );
      setPokemons(detalhes);
    } catch {
      setErro('Erro ao buscar pokémons');
    } finally {
      setCarregando(false);
    }
  };

  const verDetalhes = (pokemon: PokemonDTO): void => {
    setPokemonSelecionado(pokemon);
  };

  const pokemonsFiltrados = pokemons.filter(p => {
    const buscaOk = p.nome.toLowerCase().includes(termoBusca.toLowerCase());
    const tipoOk = filtroTipo === '' || p.tipo === filtroTipo;
    return buscaOk && tipoOk;
  });

  const tiposDisponiveis = Array.from(new Set(pokemons.map(p => p.tipo))).sort();

  return { pokemons: pokemonsFiltrados, pokemonSelecionado, termoBusca, setTermoBusca, filtroTipo, setFiltroTipo, carregando, erro, buscarPokemon, verDetalhes, tiposDisponiveis };
}