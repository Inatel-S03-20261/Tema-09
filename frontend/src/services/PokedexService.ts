import type { CartaConhecidaDTO, StatusCarta } from '../dto/CartaConhecidaDTO';
import type { PokedexDTO } from '../dto/PokedexDTO';
import type { PokemonDTO, TipoPokemon } from '../dto/PokemonDTO';

const STORAGE_HISTORICO_KEY = 'pokedex-cartas-conhecidas';
const STORAGE_POKEMONS_CACHE_KEY = 'pokedex-pokeapi-cache-v1';
const STORAGE_DESCRICOES_CACHE_KEY = 'pokedex-pokeapi-descricoes-v1';
const CACHE_DURATION_MS = 1000 * 60 * 60 * 24;
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

const historicoInicial: CartaConhecidaDTO[] = [
  { pokemonId: 1, status: 'conhecida', dataUltimaAtualizacao: 'demo inicial' },
  { pokemonId: 4, status: 'conhecida', dataUltimaAtualizacao: 'demo inicial' },
  { pokemonId: 7, status: 'conhecida', dataUltimaAtualizacao: 'demo inicial' },
  { pokemonId: 25, status: 'trocada', dataUltimaAtualizacao: 'demo inicial' },
];

const tipoTraduzido: Record<string, string> = {
  normal: 'normal',
  fire: 'fogo',
  water: 'água',
  electric: 'elétrico',
  grass: 'grama',
  ice: 'gelo',
  fighting: 'lutador',
  poison: 'venenoso',
  ground: 'terra',
  flying: 'voador',
  psychic: 'psíquico',
  bug: 'inseto',
  rock: 'pedra',
  ghost: 'fantasma',
  dragon: 'dragão',
  dark: 'sombrio',
  steel: 'aço',
  fairy: 'fada',
};

const statTraduzido: Record<string, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Ataque especial',
  'special-defense': 'Defesa especial',
  speed: 'Velocidade',
};

interface PokeApiListResponse {
  results: Array<{
    name: string;
    url: string;
  }>;
}

interface PokeApiPokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

interface PokeApiSpeciesResponse {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}

interface PokemonsCache {
  createdAt: number;
  limit: number;
  pokemons: PokemonDTO[];
}

type DescricoesCache = Record<number, string>;

export class PokedexService {
  async consultarPokedex(jogadorId: number, limit = 100): Promise<PokedexDTO> {
    const pokemons = await this.listarPokemonsDaApi(limit);
    const historico = this.carregarHistorico();

    const cartas = pokemons.map((pokemon) => {
      const registro = historico.find((item) => item.pokemonId === pokemon.id);

      return {
        ...pokemon,
        pokemonId: pokemon.id,
        status: registro?.status ?? 'nao_conhecida',
        dataUltimaAtualizacao: registro?.dataUltimaAtualizacao,
      };
    });

    return {
      jogadorId,
      totalCartas: cartas.length,
      totalConhecidas: cartas.filter((carta) => carta.status !== 'nao_conhecida').length,
      cartas,
    };
  }

  async buscarDescricaoPokemon(pokemonId: number): Promise<string> {
    const cache = this.carregarCacheDescricoes();

    if (cache[pokemonId]) {
      return cache[pokemonId];
    }

    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${pokemonId}`);

    if (!response.ok) {
      throw new Error('Não foi possível buscar a descrição na PokeAPI.');
    }

    const speciesData = (await response.json()) as PokeApiSpeciesResponse;
    const descricao = this.extrairDescricao(speciesData);

    cache[pokemonId] = descricao;
    localStorage.setItem(STORAGE_DESCRICOES_CACHE_KEY, JSON.stringify(cache));

    return descricao;
  }

  atualizarHistorico(pokemonId: number, status: StatusCarta) {
    const historico = this.carregarHistorico();
    const dataAtualizacao = new Date().toLocaleString('pt-BR');
    const itemExistente = historico.find((item) => item.pokemonId === pokemonId);

    if (itemExistente) {
      itemExistente.status = status;
      itemExistente.dataUltimaAtualizacao = dataAtualizacao;
    } else {
      historico.push({
        pokemonId,
        status,
        dataUltimaAtualizacao: dataAtualizacao,
      });
    }

    localStorage.setItem(STORAGE_HISTORICO_KEY, JSON.stringify(historico));
  }

  listarTipos(cartas: PokedexDTO['cartas']): TipoPokemon[] {
    const tipos = new Set<TipoPokemon>();

    cartas.forEach((carta) => {
      tipos.add(carta.tipo);
      if (carta.tipoSecundario) {
        tipos.add(carta.tipoSecundario);
      }
    });

    return Array.from(tipos).sort((a, b) => a.localeCompare(b));
  }

  filtrarCartas(
    cartas: PokedexDTO['cartas'],
    busca: string,
    status: StatusCarta | 'todas',
    tipo: TipoPokemon | 'todos',
  ) {
    const termo = busca.trim().toLowerCase();

    return cartas.filter((carta) => {
      const correspondeBusca =
        !termo ||
        carta.nome.toLowerCase().includes(termo) ||
        String(carta.id).includes(termo);
      const correspondeStatus = status === 'todas' || carta.status === status;
      const correspondeTipo = tipo === 'todos' || carta.tipo === tipo || carta.tipoSecundario === tipo;

      return correspondeBusca && correspondeStatus && correspondeTipo;
    });
  }

  resetarDemo() {
    localStorage.setItem(STORAGE_HISTORICO_KEY, JSON.stringify(historicoInicial));
  }

  limparCacheApi() {
    localStorage.removeItem(STORAGE_POKEMONS_CACHE_KEY);
    localStorage.removeItem(STORAGE_DESCRICOES_CACHE_KEY);
  }

  private async listarPokemonsDaApi(limit: number): Promise<PokemonDTO[]> {
    const cache = this.carregarCachePokemons();

    if (cache && cache.limit >= limit && Date.now() - cache.createdAt < CACHE_DURATION_MS) {
      return cache.pokemons.slice(0, limit);
    }

    const listaResponse = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}`);

    if (!listaResponse.ok) {
      throw new Error('Não foi possível carregar a lista de Pokémon da PokeAPI.');
    }

    const lista = (await listaResponse.json()) as PokeApiListResponse;
    const pokemons = await Promise.all(
      lista.results.map(async (item) => {
        const pokemonResponse = await fetch(item.url);

        if (!pokemonResponse.ok) {
          throw new Error(`Não foi possível carregar ${item.name}.`);
        }

        const pokemonData = (await pokemonResponse.json()) as PokeApiPokemonResponse;
        return this.formatarPokemon(pokemonData);
      }),
    );

    localStorage.setItem(
      STORAGE_POKEMONS_CACHE_KEY,
      JSON.stringify({
        createdAt: Date.now(),
        limit,
        pokemons,
      } satisfies PokemonsCache),
    );

    return pokemons;
  }

  private carregarHistorico(): CartaConhecidaDTO[] {
    const historicoSalvo = localStorage.getItem(STORAGE_HISTORICO_KEY);

    if (!historicoSalvo) {
      localStorage.setItem(STORAGE_HISTORICO_KEY, JSON.stringify(historicoInicial));
      return historicoInicial;
    }

    try {
      return JSON.parse(historicoSalvo) as CartaConhecidaDTO[];
    } catch {
      localStorage.setItem(STORAGE_HISTORICO_KEY, JSON.stringify(historicoInicial));
      return historicoInicial;
    }
  }

  private carregarCachePokemons(): PokemonsCache | null {
    const cacheSalvo = localStorage.getItem(STORAGE_POKEMONS_CACHE_KEY);

    if (!cacheSalvo) {
      return null;
    }

    try {
      return JSON.parse(cacheSalvo) as PokemonsCache;
    } catch {
      localStorage.removeItem(STORAGE_POKEMONS_CACHE_KEY);
      return null;
    }
  }

  private carregarCacheDescricoes(): DescricoesCache {
    const cacheSalvo = localStorage.getItem(STORAGE_DESCRICOES_CACHE_KEY);

    if (!cacheSalvo) {
      return {};
    }

    try {
      return JSON.parse(cacheSalvo) as DescricoesCache;
    } catch {
      localStorage.removeItem(STORAGE_DESCRICOES_CACHE_KEY);
      return {};
    }
  }

  private formatarPokemon(pokemonData: PokeApiPokemonResponse): PokemonDTO {
    const tipos = pokemonData.types.map((tipo) => this.traduzirTipo(tipo.type.name));
    const imagemUrl =
      pokemonData.sprites.other?.['official-artwork']?.front_default ??
      pokemonData.sprites.front_default ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;

    return {
      id: pokemonData.id,
      nome: this.formatarNome(pokemonData.name),
      tipo: tipos[0] ?? 'desconhecido',
      tipoSecundario: tipos[1],
      imagemUrl,
      ataques: pokemonData.moves.slice(0, 4).map((move) => this.formatarNome(move.move.name)),
      altura: pokemonData.height / 10,
      peso: pokemonData.weight / 10,
      habilidades: pokemonData.abilities.map((ability) => this.formatarNome(ability.ability.name)),
      stats: pokemonData.stats.map((stat) => ({
        nome: statTraduzido[stat.stat.name] ?? this.formatarNome(stat.stat.name),
        valor: stat.base_stat,
      })),
    };
  }

  private extrairDescricao(speciesData: PokeApiSpeciesResponse): string {
    const entrada =
      speciesData.flavor_text_entries.find((item) => item.language.name === 'pt-BR') ??
      speciesData.flavor_text_entries.find((item) => item.language.name === 'pt') ??
      speciesData.flavor_text_entries.find((item) => item.language.name === 'en');

    return entrada
      ? entrada.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
      : 'Descrição não encontrada na PokeAPI.';
  }

  private traduzirTipo(tipo: string): string {
    return tipoTraduzido[tipo] ?? tipo;
  }

  private formatarNome(valor: string): string {
    return valor
      .split('-')
      .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
      .join(' ');
  }
}
