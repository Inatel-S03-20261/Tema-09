import { Pokemon } from "../models/Pokemon";

export class PokeApiClient {
  buscarPokemonPorId(
    id: number
  ): Pokemon {
    throw new Error("Não implementado");
  }

  buscarPokemonPorNome(
    nome: string
  ): Pokemon {
    throw new Error("Não implementado");
  }

  listarPokemons(): Pokemon[] {
    return [];
  }
}