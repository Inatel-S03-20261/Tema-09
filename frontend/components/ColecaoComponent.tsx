import { CartaConhecidaDTO } from '../types/CartaConhecidaDTO';
import { PokemonDTO } from '../types/PokemonDTO';

function ColeçãoComponent() {
  const listarCartasConhecidas = (jogadorId: number): CartaConhecidaDTO[] => [];
  const listarCartasNaoConhecidas = (jogadorId: number): PokemonDTO[] => [];

  return <div>Coleção</div>;
}

export default ColeçãoComponent;