import { usePokedex } from '../hooks/usePokedex';

function PokedexPage() {
  const { carregarPokedex } = usePokedex();

  return <div>Pokedex</div>;
}

export default PokedexPage;