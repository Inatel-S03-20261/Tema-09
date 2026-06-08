import { IPokemonRepository } from "../repositories/IPokemonRepository";
import { Pokemon } from "../models/Pokemon";

export class PokemonService {
  private pokemonRepository: IPokemonRepository;

  constructor(pokemonRepository: IPokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  public pesquisarPokemon(termo: string) {
    return Promise<Pokemon[]>;
  }

  public visualizarDetalhesPokemon(idPokemon: number) {
    return Promise<Pokemon>;
  }

  public exibirDetalhes() {
    return "Detalhes";
  }
}