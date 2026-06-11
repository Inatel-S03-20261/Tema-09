import type { StatusCarta } from '../dto/CartaConhecidaDTO';
import type { TipoPokemon } from '../dto/PokemonDTO';

interface FiltrosComponentProps {
  status: StatusCarta | 'todas';
  tipo: TipoPokemon | 'todos';
  tipos: TipoPokemon[];
  onStatusChange: (valor: StatusCarta | 'todas') => void;
  onTipoChange: (valor: TipoPokemon | 'todos') => void;
}

export function FiltrosComponent({
  status,
  tipo,
  tipos,
  onStatusChange,
  onTipoChange,
}: FiltrosComponentProps) {
  return (
    <div className="filtros">
      <label className="campo">
        Status da carta
        <select value={status} onChange={(event) => onStatusChange(event.target.value as StatusCarta | 'todas')}>
          <option value="todas">Todas</option>
          <option value="conhecida">Conhecidas</option>
          <option value="trocada">Trocadas</option>
          <option value="nao_conhecida">Não conhecidas</option>
        </select>
      </label>

      <label className="campo">
        Tipo
        <select value={tipo} onChange={(event) => onTipoChange(event.target.value as TipoPokemon | 'todos')}>
          <option value="todos">Todos</option>
          {tipos.map((tipoPokemon) => (
            <option key={tipoPokemon} value={tipoPokemon}>
              {tipoPokemon}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
