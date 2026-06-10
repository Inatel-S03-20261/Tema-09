import { PokedexDTO } from '../types/PokedexDTO';

function ProgressoComponent() {
  const consultarProgresso = (jogadorId: number): PokedexDTO => ({
    totalConhecidas: 0,
    totalExistente: 0,
    percentual: 0
  });
  const calcularPorcentagem = (): number => 0;

  return <div>Progresso</div>;
}

export default ProgressoComponent;