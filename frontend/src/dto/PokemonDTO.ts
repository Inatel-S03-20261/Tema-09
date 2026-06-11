export type TipoPokemon = string;

export interface PokemonDTO {
  id: number;
  nome: string;
  tipo: TipoPokemon;
  tipoSecundario?: TipoPokemon;
  descricao?: string;
  imagemUrl: string;
  ataques: string[];
  altura: number;
  peso: number;
  habilidades: string[];
  stats: Array<{
    nome: string;
    valor: number;
  }>;
}
