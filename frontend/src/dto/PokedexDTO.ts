import type { PokemonDTO } from './PokemonDTO';
import type { CartaConhecidaDTO } from './CartaConhecidaDTO';

export interface PokedexDTO {
  jogadorId: number;
  totalCartas: number;
  totalConhecidas: number;
  cartas: Array<PokemonDTO & CartaConhecidaDTO>;
}
