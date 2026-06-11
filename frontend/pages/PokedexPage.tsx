import { usePokemon } from '../hooks/usePokemon';
import BuscaComponent from '../components/BuscaComponent';
import FiltrosComponent from '../components/FiltrosComponent';

function PokedexPage() {
  const { pokemons, carregando, erro, verDetalhes, termoBusca, setTermoBusca, filtroTipo, setFiltroTipo, tiposDisponiveis } = usePokemon();

  if (carregando) return <div>Carregando...</div>;
  if (erro) return <div>{erro}</div>;

  return (
    <div>
      <h1>Pokédex</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 24px 24px' }}>
        <BuscaComponent termoBusca={termoBusca} setTermoBusca={setTermoBusca} />
        <FiltrosComponent tiposDisponiveis={tiposDisponiveis} filtroTipo={filtroTipo} setFiltroTipo={setFiltroTipo} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '0 24px' }}>
        {pokemons.map(pokemon => (
          <div key={pokemon.nome} onClick={() => verDetalhes(pokemon)} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', cursor: 'pointer', textAlign: 'center' }}>
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