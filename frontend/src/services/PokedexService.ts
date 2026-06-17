import type { CartaConhecidaDTO, StatusCarta } from '../dto/CartaConhecidaDTO';
import type { PokedexDTO } from '../dto/PokedexDTO';
import type { PokemonDTO, TipoPokemon } from '../dto/PokemonDTO';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

type BackendLoginResponse = {
  sucesso: boolean;
  token?: string;
  usuario?: {
    id: number;
    nome: string;
    email: string;
  };
  erro?: string;
};

type BackendPokedexResponse = {
  idpokedex?: number;
  total_cartas_atualmente?: number | null;
  total_cartas_conhecidas?: number | null;
  jogador_idjogador?: number;
};

type BackendCartaResponse = {
  idcartaConhecida: number;
  data_primeiro_contato?: string;
  origem?: string;
  ja_possui?: boolean | number;
  possui_atualmente?: boolean | number;
  data_ultima_atualizacao?: string;
  pokedex_idpokedex: number;
  pokemon_idpokemon: number;
  pokemon_nome: string;
  tipo_principal?: string | null;
  tipo_secundario?: string | null;
  imagem_url?: string | null;
};

type BackendDetalhesPokemonResponse = {
  id: number;
  nome: string;
  imagem?: string | null;
  imagem_url?: string | null;
  altura?: number;
  peso?: number;
  tipos?: string[];
  habilidades?: string[];
  ataques?: string[];
  stats?: Array<{
    nome: string;
    valor: number;
  }>;
  descricao?: string | null;
};

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

export class PokedexService {
  async login(usuario: string, senha: string): Promise<BackendLoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, senha }),
    });

    const data = (await response.json()) as BackendLoginResponse;

    if (!response.ok) {
      throw new Error(data.erro ?? 'Não foi possível autenticar no backend.');
    }

    return data;
  }

  async consultarPokedex(): Promise<PokedexDTO> {
    const token = this.obterToken();

    const [pokedexBackend, cartasBackend] = await Promise.all([
      this.requisitarComToken<BackendPokedexResponse>('/pokedex', token),
      this.requisitarComToken<BackendCartaResponse[]>('/cartas', token),
    ]);

    const cartas = await Promise.all(
      cartasBackend.map(async (cartaBackend) => {
        const cartaBase = this.formatarCartaBackend(cartaBackend);

        try {
          const detalhes = await this.buscarDetalhesPokemon(cartaBase.id);

          return {
            ...cartaBase,
            ...detalhes,
            pokemonId: cartaBase.id,
            status: cartaBase.status,
            dataUltimaAtualizacao: cartaBase.dataUltimaAtualizacao,
          };
        } catch {
          return cartaBase;
        }
      }),
    );

    return {
      jogadorId: pokedexBackend.jogador_idjogador ?? 0,
      totalCartas: pokedexBackend.total_cartas_atualmente ?? cartas.length,
      totalConhecidas: pokedexBackend.total_cartas_conhecidas ?? cartas.length,
      cartas,
    };
  }

  async buscarDetalhesPokemon(pokemonId: number): Promise<PokemonDTO & { descricao?: string }> {
    const token = this.obterToken();

    const detalhes = await this.requisitarComToken<BackendDetalhesPokemonResponse>(
      `/pokemon/${pokemonId}`,
      token,
    );

    return this.formatarDetalhesBackend(detalhes);
  }

  async buscarDescricaoPokemon(pokemonId: number): Promise<string> {
    const detalhes = await this.buscarDetalhesPokemon(pokemonId);

    return detalhes.descricao ?? 'Descrição não disponível no backend.';
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

      const correspondeTipo =
        tipo === 'todos' ||
        carta.tipo === tipo ||
        carta.tipoSecundario === tipo;

      return correspondeBusca && correspondeStatus && correspondeTipo;
    });
  }

  async sincronizarPokedex() {
    const token = this.obterToken();

    await this.requisitarComToken('/trocas/sincronizar', token, {
      method: 'POST',
    });
  }

  private async requisitarComToken<T>(
    path: string,
    token: string,
    options: RequestInit = {},
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',

        // Importante:
        // O backend atual espera o token puro, exemplo: mock-token-4.
        // Por isso NÃO use "Bearer".
        Authorization: token,

        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const mensagem = data?.erro ?? data?.message ?? 'Erro ao consultar o backend.';
      throw new Error(mensagem);
    }

    if (data?.erro) {
      throw new Error(data.erro);
    }

    return data as T;
  }

  private obterToken() {
    const token = localStorage.getItem('pokedex-token');

    if (!token) {
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    return token;
  }

  private formatarCartaBackend(carta: BackendCartaResponse): PokemonDTO & CartaConhecidaDTO {
    const pokemonId = Number(carta.pokemon_idpokemon);
    const origem = carta.origem?.toLowerCase() ?? '';
    const possuiAtualmente = Boolean(carta.possui_atualmente);

    let status: StatusCarta = 'conhecida';

    if (origem.includes('troca') || !possuiAtualmente) {
      status = 'trocada';
    }

    return {
      id: pokemonId,
      pokemonId,
      nome: this.formatarNome(carta.pokemon_nome),
      tipo: this.traduzirTipo(carta.tipo_principal ?? 'desconhecido'),
      tipoSecundario: carta.tipo_secundario
        ? this.traduzirTipo(carta.tipo_secundario)
        : undefined,
      imagemUrl: carta.imagem_url ?? this.montarSpriteFallback(pokemonId),
      ataques: [],
      altura: 0,
      peso: 0,
      habilidades: [],
      stats: [],
      status,
      dataUltimaAtualizacao: carta.data_ultima_atualizacao,
    };
  }

  private formatarDetalhesBackend(
    detalhes: BackendDetalhesPokemonResponse,
  ): PokemonDTO & { descricao?: string } {
    const tipos = detalhes.tipos?.map((tipo) => this.traduzirTipo(tipo)) ?? [];

    return {
      id: detalhes.id,
      nome: this.formatarNome(detalhes.nome),
      tipo: tipos[0] ?? 'desconhecido',
      tipoSecundario: tipos[1],
      imagemUrl: detalhes.imagem ?? detalhes.imagem_url ?? this.montarSpriteFallback(detalhes.id),
      altura: detalhes.altura ?? 0,
      peso: detalhes.peso ?? 0,
      habilidades: detalhes.habilidades ?? [],
      ataques: detalhes.ataques?.slice(0, 4) ?? [],
      stats:
        detalhes.stats?.map((stat) => ({
          nome: statTraduzido[stat.nome] ?? this.formatarNome(stat.nome),
          valor: stat.valor,
        })) ?? [],
      descricao: detalhes.descricao ?? undefined,
    };
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

  private montarSpriteFallback(pokemonId: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  }
}