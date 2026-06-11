export type StatusCarta = 'conhecida' | 'trocada' | 'nao_conhecida';

export interface CartaConhecidaDTO {
  pokemonId: number;
  status: StatusCarta;
  dataUltimaAtualizacao?: string;
}
