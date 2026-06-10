import { usePokemon } from '../hooks/usePokemon';

function PokemonPage() {
  const { verDetalhes } = usePokemon();

  return <div>Pokemon</div>;
}

export default PokemonPage;