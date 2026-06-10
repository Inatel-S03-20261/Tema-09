import { usePokemon } from '../hooks/usePokemon';
import type { PokemonDTO } from '../types/PokemonDTO';

function PokedexPage() {
  const { pokemons, carregando, erro, verDetalhes } = usePokemon();

  if (carregando) return <div>Carregando...</div>;
  if (erro) return <div>{erro}</div>;

  return (
    <div>
      <h1>Pokédex</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '24px' }}>
        {pokemons.map(pokemon => (
          <div
            key={pokemon.nome}
            onClick={() => verDetalhes(pokemon)}
            style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', cursor: 'pointer', textAlign: 'center' }}
          >
            <img src={pokemon.imageUrl} alt={pokemon.nome} style={{ width: '100px' }} />
            <p>{pokemon.nome}</p>
            <p style={{ color: '#666', fontSize: '12px' }}>{pokemon.tipo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokedexPage;