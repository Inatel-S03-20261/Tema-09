import type { StatusCarta } from '../dto/CartaConhecidaDTO';
import type { PokedexDTO } from '../dto/PokedexDTO';

type Carta = PokedexDTO['cartas'][number];

interface PokemonCardProps {
  carta: Carta;
  selecionada: boolean;
  onSelecionar: (id: number) => void;
}

const statusTexto: Record<StatusCarta, string> = {
  conhecida: 'Conhecida',
  trocada: 'Trocada',
  nao_conhecida: 'Não conhecida',
};

export function PokemonCard({ carta, selecionada, onSelecionar }: PokemonCardProps) {
  const bloqueada = carta.status === 'nao_conhecida';

  return (
    <article className={`pokemon-card ${selecionada ? 'selecionada' : ''} ${bloqueada ? 'bloqueada' : ''}`}>
      <button className="card-conteudo" onClick={() => onSelecionar(carta.id)}>
        <span className="numero">#{String(carta.id).padStart(3, '0')}</span>

        <img
          src={carta.imagemUrl}
          alt={bloqueada ? 'Silhueta de Pokémon desconhecido' : carta.nome}
        />

        <h3>{bloqueada ? '???' : carta.nome}</h3>

        <p>
          {bloqueada
            ? 'Dados bloqueados'
            : `${carta.tipo}${carta.tipoSecundario ? ` / ${carta.tipoSecundario}` : ''}`}
        </p>

        <strong>{statusTexto[carta.status]}</strong>
      </button>
    </article>
  );
}