export class PokedexService {
  private pokedexRepository: IPokedexRepository;

  constructor(pokedexRepository: IPokedexRepository) {
    this.pokedexRepository = pokedexRepository;
  }

  public visualizarPokedex(jogadorId: number) {
    return Pokedex;
  }
}