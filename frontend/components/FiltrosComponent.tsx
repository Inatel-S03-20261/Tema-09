interface FiltrosComponentProps {
  tiposDisponiveis: string[];
  filtroTipo: string;
  setFiltroTipo: (tipo: string) => void;
}

function FiltrosComponent({ tiposDisponiveis, filtroTipo, setFiltroTipo }: FiltrosComponentProps) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <button onClick={() => setFiltroTipo('')} style={{ padding: '4px 12px', borderRadius: '20px', border: '1px solid #ccc', background: filtroTipo === '' ? '#cc0000' : 'white', color: filtroTipo === '' ? 'white' : 'black', cursor: 'pointer' }}>
        Todos
      </button>
      {tiposDisponiveis.map(tipo => (
        <button key={tipo} onClick={() => setFiltroTipo(tipo)} style={{ padding: '4px 12px', borderRadius: '20px', border: '1px solid #ccc', background: filtroTipo === tipo ? '#cc0000' : 'white', color: filtroTipo === tipo ? 'white' : 'black', cursor: 'pointer' }}>
          {tipo}
        </button>
      ))}
    </div>
  );
}

export default FiltrosComponent;