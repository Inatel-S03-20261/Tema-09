import { useState } from 'react';
import { BuscaComponent } from '../components/BuscaComponent';
import { FiltrosComponent } from '../components/FiltrosComponent';
import { PokemonCard } from '../components/PokemonCard';
import { usePokedex } from '../hooks/usePokedex';
import { PokemonPage } from './PokemonPage';

interface PokedexPageProps {
  jogador: string;
  onSair: () => void;
}

export function PokedexPage({ jogador, onSair }: PokedexPageProps) {
  const [pokemonSelecionadoId, setPokemonSelecionadoId] = useState<number | undefined>();

  const {
    busca,
    setBusca,
    status,
    setStatus,
    tipo,
    setTipo,
    tipos,
    pokedex,
    cartasFiltradas,
    carregando,
    erro,
    atualizarDadosDaApi,
  } = usePokedex();

  if (carregando && !pokedex) {
    return (
      <main className="dex-state-page">
        <section className="dex-state-card">
          <h1>Carregando Pokédex</h1>
          <p>
            Buscando os 100 primeiros Pokémon. 
          </p>
        </section>
      </main>
    );
  }

  if (erro || !pokedex) {
    return (
      <main className="dex-state-page">
        <section className="dex-state-card">
          <span className="dex-badge">Erro de integração</span>
          <h1>Não foi possível carregar</h1>
          <p className="erro">{erro || 'Erro inesperado.'}</p>
          <button className="dex-state-button" onClick={atualizarDadosDaApi}>
            Tentar novamente
          </button>
        </section>
      </main>
    );
  }

  const cartaSelecionada = pokedex.cartas.find((carta) => carta.id === pokemonSelecionadoId);

  return (
    <main className="pokedex-page pokedex-console-page">
      <section className="dex-console">
        <header className="dex-topbar">
          <div className="dex-lights">
            <div className="dex-camera" />
            <span className="dex-light red" />
            <span className="dex-light yellow" />
            <span className="dex-light green" />
          </div>

          <div className="dex-user-area">
            <span className="dex-user-chip">
              Trainer: <strong>{jogador}</strong>
            </span>

            <button className="dex-exit-button" onClick={onSair}>
              Sair
            </button>
          </div>
        </header>

        <div className="dex-body">
          <section className="dex-main-panel">
            <section className="dex-title-area">
              <div>
                <span className="dex-badge">Game Collection Interface</span>
                <h1>Pokédex</h1>
              </div>

              <section className="dex-controls-game">
              <div className="dex-mini-screen">
                <span>Cartas conhecidas</span>
                <strong>{pokedex.totalConhecidas}</strong>
              </div>
            </section>
            </section>

            <section className="controles">
              <BuscaComponent busca={busca} onBuscaChange={setBusca} />
              <FiltrosComponent
                status={status}
                tipo={tipo}
                tipos={tipos}
                onStatusChange={setStatus}
                onTipoChange={setTipo}
              />
            </section>

            {carregando && (
              <p className="dex-warning">
                Atualizando dados da PokeAPI...
              </p>
            )}

            <section className="conteudo">
              <div className="grade-cartas">
                {cartasFiltradas.map((carta) => (
                  <PokemonCard
                    key={carta.id}
                    carta={carta}
                    selecionada={carta.id === pokemonSelecionadoId}
                    onSelecionar={setPokemonSelecionadoId}
                  />
                ))}

                {cartasFiltradas.length === 0 && (
                  <div className="sem-resultados">
                    <h3>Nenhuma carta encontrada</h3>
                    <p>Altere a busca ou os filtros para consultar outras cartas.</p>
                  </div>
                )}
              </div>
            </section>
          </section>
        </div>

        {cartaSelecionada && (
          <div
            className="dex-modal-backdrop"
            role="presentation"
            onClick={() => setPokemonSelecionadoId(undefined)}
          >
            <section
              className="dex-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`Detalhes de ${cartaSelecionada.nome}`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="dex-modal-close"
                type="button"
                aria-label="Fechar detalhes"
                onClick={() => setPokemonSelecionadoId(undefined)}
              >
                ×
              </button>

              <PokemonPage carta={cartaSelecionada} />
            </section>
          </div>
        )}

        <footer className="dex-footer">
          <div className="dex-footer-lines">
            <span />
            <span />
          </div>

          <div className="dex-footer-circle" />
        </footer>
      </section>
    </main>
  );
}
