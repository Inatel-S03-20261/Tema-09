export class PokedexController {
  private pokedexService: PokedexService;

  constructor(pokedexService: PokedexService) {
    this.pokedexService = pokedexService;
  }

  public listarCartasConhecidas(id: number) {
    return this.pokedexService.listarCartasConhecidas(id);
  }

  public buscarPokemon(id: number) {
    return this.pokedexService.buscarPokemon(id);
  }

  public pesquisarPokemon(id: number) {
    return this.pokedexService.pesquisarPokemon(id);
  }
}