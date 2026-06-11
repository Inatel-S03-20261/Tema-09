interface BuscaComponentProps {
  termoBusca: string;
  setTermoBusca: (termo: string) => void;
}

function BuscaComponent({ termoBusca, setTermoBusca }: BuscaComponentProps) {
  return (
    <input
      type="text"
      placeholder="Buscar Pokémon..."
      value={termoBusca}
      onChange={e => setTermoBusca(e.target.value)}
      style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', width: '300px' }}
    />
  );
}

export default BuscaComponent;