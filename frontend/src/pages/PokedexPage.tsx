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

const estilosPokedex = `
  .pokedex-console-page {
    min-height: 100vh;
    padding: 28px;
    background:
      radial-gradient(circle at 20% 10%, rgba(255, 23, 68, 0.18), transparent 28%),
      radial-gradient(circle at 80% 20%, rgba(255, 203, 5, 0.08), transparent 24%),
      linear-gradient(135deg, #1b0b0f 0%, #2a0d12 42%, #090407 100%);
    color: #ffffff;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .pokedex-console-page .detalhes-bloqueada img,
  .pokedex-console-page .detalhes img.sprite-bloqueado {
    filter:
      brightness(0)
      invert(38%)
      drop-shadow(0 18px 18px rgba(0, 0, 0, 0.45));
    opacity: 0.7;
  }

  .pokedex-console-page .detalhes-bloqueada h2 {
    color: #94a3b8;
  }

  .dex-console {
    width: min(1380px, 100%);
    margin: 0 auto;
    border-radius: 32px;
    overflow: hidden;
    background: #e8062f;
    box-shadow:
      0 30px 110px rgba(232, 6, 47, 0.30),
      inset 0 0 0 2px rgba(255, 255, 255, 0.08);
  }

  .dex-topbar {
    min-height: 92px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 22px 32px;
    background: #f00635;
    border-bottom: 4px solid rgba(80, 0, 16, 0.22);
  }

  .dex-lights {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .dex-camera {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background:
      radial-gradient(circle at 35% 32%, #ffffff 0 9%, transparent 10%),
      radial-gradient(circle, #7ac6ff 0 38%, #ffffff 39% 55%, #a5e0ff 56% 70%, #d9f4ff 71%);
    border: 4px solid rgba(255, 255, 255, 0.85);
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.12);
  }

  .dex-light {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    box-shadow: inset 0 -2px 3px rgba(0, 0, 0, 0.35);
  }

  .dex-light.red {
    background: #8b1021;
  }

  .dex-light.yellow {
    background: #ffd23f;
  }

  .dex-light.green {
    background: #23c967;
  }

  .dex-user-area {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .dex-user-chip {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 999px;
    color: #ffffff;
    background: rgba(17, 24, 39, 0.35);
    font-size: 0.85rem;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .dex-user-chip strong {
    color: #ffcb05;
  }

  .dex-exit-button,
  .dex-action-button,
  .pokedex-console-page .acoes-card button {
    border: 0;
    border-radius: 16px;
    color: #ffffff;
    background: #111827;
    font-weight: 900;
    text-transform: uppercase;
    box-shadow: 0 6px 0 rgba(0, 0, 0, 0.34);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .dex-exit-button {
    padding: 13px 18px;
  }

  .dex-action-button {
    padding: 13px 16px;
  }

  .dex-exit-button:hover,
  .dex-action-button:hover,
  .pokedex-console-page .acoes-card button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 0 rgba(0, 0, 0, 0.34);
  }

  .dex-exit-button:active,
  .dex-action-button:active,
  .pokedex-console-page .acoes-card button:active {
    transform: translateY(3px);
    box-shadow: 0 3px 0 rgba(0, 0, 0, 0.34);
  }

  .dex-body {
    display: grid;
    grid-template-columns: 320px 1fr;
    min-height: calc(100vh - 210px);
  }

  .dex-side-panel {
    padding: 30px 24px;
    background: linear-gradient(90deg, #f00635 0%, #e8062f 100%);
    border-right: 4px solid rgba(80, 0, 16, 0.16);
  }

  .dex-screen {
    min-height: 280px;
    padding: 24px;
    border-radius: 22px;
    background:
      linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(2, 6, 23, 0.98));
    border: 5px solid #1f2937;
    box-shadow:
      inset 0 0 40px rgba(0, 0, 0, 0.7),
      0 12px 24px rgba(0, 0, 0, 0.22);
  }

  .dex-screen-title {
    margin: 0 0 18px;
    color: #ff1744;
    font-size: 1rem;
    letter-spacing: 4px;
    text-transform: uppercase;
  }

  .dex-stat-card {
    padding: 16px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .dex-stat-card + .dex-stat-card {
    margin-top: 14px;
  }

  .dex-stat-card span {
    display: block;
    color: #94a3b8;
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .dex-stat-card strong {
    display: block;
    margin-top: 6px;
    color: #ffffff;
    font-size: 2rem;
    line-height: 1;
  }

  .dex-status-list {
    display: grid;
    gap: 10px;
    margin-top: 18px;
  }

  .dex-status-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: #cbd5e1;
    font-size: 0.82rem;
    font-weight: 800;
  }

  .dex-status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #23c967;
    box-shadow: 0 0 12px rgba(35, 201, 103, 0.75);
  }

  .dex-controls-game {
    margin-top: 28px;
    display: grid;
    gap: 22px;
  }

  .dex-dpad-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .dex-dpad {
    position: relative;
    width: 92px;
    height: 92px;
  }

  .dex-dpad::before,
  .dex-dpad::after {
    content: "";
    position: absolute;
    background: #111827;
    border-radius: 6px;
    box-shadow: 0 6px 0 rgba(0, 0, 0, 0.25);
  }

  .dex-dpad::before {
    width: 30px;
    height: 92px;
    left: 31px;
    top: 0;
  }

  .dex-dpad::after {
    width: 92px;
    height: 30px;
    left: 0;
    top: 31px;
  }

  .dex-round-buttons {
    display: flex;
    gap: 14px;
  }

  .dex-round-button {
    width: 52px;
    height: 52px;
    border: 0;
    border-radius: 50%;
    color: #ffffff;
    background: #111827;
    font-weight: 900;
    box-shadow: 0 7px 0 rgba(0, 0, 0, 0.35);
  }

  .dex-action-group {
    display: grid;
    gap: 12px;
  }

  .dex-main-panel {
    padding: 30px;
    background: rgba(151, 0, 31, 0.22);
  }

  .dex-title-area {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 22px;
    margin-bottom: 24px;
  }

  .dex-title-area h1 {
    margin: 0 0 8px;
    color: #ffffff;
    font-size: clamp(2rem, 4vw, 3.4rem);
    line-height: 1;
  }

  .dex-title-area p {
    max-width: 720px;
    margin: 0;
    color: rgba(255, 255, 255, 0.72);
    line-height: 1.6;
  }

  .dex-badge {
    display: inline-flex;
    margin-bottom: 12px;
    padding: 7px 12px;
    border-radius: 999px;
    color: #ffcb05;
    background: rgba(17, 24, 39, 0.36);
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .dex-mini-screen {
    min-width: 190px;
    padding: 18px;
    border-radius: 20px;
    color: #dbeafe;
    background: #111827;
    border: 3px solid #1f2937;
    box-shadow: inset 0 0 28px rgba(0, 0, 0, 0.48);
    text-align: center;
  }

  .dex-mini-screen strong {
    display: block;
    color: #ff1744;
    font-size: 1.7rem;
  }

  .dex-mini-screen span {
    color: #94a3b8;
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .pokedex-console-page .controles {
    width: 100%;
    margin: 0 0 24px;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 18px;
    border: 0;
    border-radius: 24px;
    background: rgba(17, 24, 39, 0.82);
    box-shadow:
      inset 0 0 0 2px rgba(255, 255, 255, 0.05),
      0 16px 40px rgba(0, 0, 0, 0.18);
  }

  .pokedex-console-page .filtros {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .pokedex-console-page .campo {
    display: grid;
    gap: 9px;
    color: rgba(255, 255, 255, 0.82);
    font-size: 0.76rem;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .pokedex-console-page .campo input,
  .pokedex-console-page .campo select {
    height: 54px;
    border: 0;
    outline: 0;
    border-radius: 18px;
    padding: 0 16px;
    color: #ffffff;
    background: #8f1734;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.16);
    font-weight: 800;
    text-transform: none;
    letter-spacing: 0;
  }

  .pokedex-console-page .campo input::placeholder {
    color: rgba(255, 255, 255, 0.45);
  }

  .dex-warning {
    margin: 0 0 18px;
    padding: 14px 16px;
    border-radius: 16px;
    color: #ffffff;
    background: rgba(255, 203, 5, 0.18);
    border: 1px solid rgba(255, 203, 5, 0.22);
    font-weight: 900;
  }

  .pokedex-console-page .conteudo {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: 22px;
    align-items: start;
  }

  .pokedex-console-page .grade-cartas {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    gap: 16px;
  }

  .pokedex-console-page .pokemon-card {
    overflow: hidden;
    border: 0;
    border-radius: 22px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 238, 243, 0.95));
    box-shadow:
      0 16px 36px rgba(0, 0, 0, 0.20),
      inset 0 0 0 2px rgba(255, 255, 255, 0.55);
    transition: transform 0.16s ease, box-shadow 0.16s ease;
  }

  .pokedex-console-page .pokemon-card:hover {
    transform: translateY(-4px);
    box-shadow:
      0 22px 42px rgba(0, 0, 0, 0.26),
      inset 0 0 0 2px rgba(255, 255, 255, 0.60);
  }

  .pokedex-console-page .pokemon-card.selecionada {
    outline: 4px solid #ffcb05;
    box-shadow:
      0 0 0 7px rgba(255, 203, 5, 0.18),
      0 22px 42px rgba(0, 0, 0, 0.26);
  }

  .pokedex-console-page .card-conteudo {
    width: 100%;
    border: 0;
    padding: 18px 16px 14px;
    color: #111827;
    background:
      radial-gradient(circle at 50% 35%, rgba(255, 23, 68, 0.12), transparent 36%),
      transparent;
    text-align: center;
  }

  .pokedex-console-page .card-conteudo img {
    width: 112px;
    height: 112px;
    object-fit: contain;
    image-rendering: auto;
    filter: drop-shadow(0 12px 14px rgba(0, 0, 0, 0.22));
  }

  .pokedex-console-page .pokemon-card.bloqueada img {
    filter: brightness(0) drop-shadow(0 12px 14px rgba(0, 0, 0, 0.22));
    opacity: 0.45;
  }

  .pokedex-console-page .numero {
    display: inline-flex;
    padding: 5px 9px;
    border-radius: 999px;
    color: #ffffff;
    background: #111827;
    font-size: 0.75rem;
    font-weight: 900;
  }

  .pokedex-console-page .card-conteudo h3 {
    margin: 10px 0 4px;
    color: #111827;
    text-transform: capitalize;
  }

  .pokedex-console-page .card-conteudo p {
    min-height: 40px;
    margin: 0;
    color: #64748b;
    text-transform: capitalize;
    font-size: 0.9rem;
    font-weight: 700;
  }

  .pokedex-console-page .card-conteudo strong {
    display: inline-flex;
    margin-top: 10px;
    padding: 7px 11px;
    border-radius: 999px;
    color: #ffffff;
    background: #e8062f;
    font-size: 0.72rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .pokedex-console-page .acoes-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 0 12px 12px;
  }

  .pokedex-console-page .acoes-card button {
    min-height: 40px;
    padding: 9px 7px;
    font-size: 0.72rem;
  }

  .pokedex-console-page .detalhes {
    position: sticky;
    top: 22px;
    max-height: calc(100vh - 70px);
    overflow: auto;
    padding: 24px;
    border: 5px solid #1f2937;
    border-radius: 24px;
    color: #dbeafe;
    background:
      linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(2, 6, 23, 0.98));
    box-shadow:
      inset 0 0 45px rgba(0, 0, 0, 0.65),
      0 18px 42px rgba(0, 0, 0, 0.20);
  }

  .pokedex-console-page .detalhes.vazio {
    min-height: 300px;
  }

  .pokedex-console-page .detalhes img {
    display: block;
    width: 150px;
    height: 150px;
    object-fit: contain;
    margin: 14px auto;
    filter: drop-shadow(0 18px 18px rgba(0, 0, 0, 0.45));
  }

  .pokedex-console-page .detalhes h2 {
    margin: 8px 0 10px;
    color: #ffffff;
    text-transform: capitalize;
  }

  .pokedex-console-page .detalhes h3 {
    margin: 20px 0 10px;
    color: #ffcb05;
    font-size: 0.92rem;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .pokedex-console-page .detalhes p,
  .pokedex-console-page .detalhes li,
  .pokedex-console-page .detalhes small {
    color: #cbd5e1;
    line-height: 1.55;
  }

  .pokedex-console-page .detalhes ul {
    padding-left: 18px;
  }

  .pokedex-console-page .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 16px 0;
  }

  .pokedex-console-page .chips span {
    padding: 7px 11px;
    border-radius: 999px;
    color: #ffffff;
    background: #e8062f;
    text-transform: capitalize;
    font-weight: 900;
  }

  .pokedex-console-page .medidas {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 16px 0;
  }

  .pokedex-console-page .medidas div,
  .pokedex-console-page .stat-item {
    padding: 12px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .pokedex-console-page .medidas dt {
    color: #94a3b8;
    font-size: 0.75rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .pokedex-console-page .medidas dd {
    margin: 5px 0 0;
    color: #ffffff;
    font-weight: 900;
  }

  .pokedex-console-page .stats {
    display: grid;
    gap: 8px;
    margin-bottom: 16px;
  }

  .pokedex-console-page .stat-item {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-size: 0.9rem;
  }

  .pokedex-console-page .stat-item span {
    color: #cbd5e1;
    text-transform: capitalize;
  }

  .pokedex-console-page .stat-item strong {
    color: #ffcb05;
  }

  .pokedex-console-page .sem-resultados {
    grid-column: 1 / -1;
    padding: 28px;
    border-radius: 22px;
    color: #ffffff;
    background: rgba(17, 24, 39, 0.82);
    text-align: center;
    font-weight: 800;
  }

  .dex-footer {
    min-height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    border-top: 4px solid rgba(80, 0, 16, 0.22);
    background: #f00635;
  }

  .dex-footer-lines {
    display: flex;
    gap: 14px;
  }

  .dex-footer-lines span {
    width: 56px;
    height: 8px;
    border-radius: 999px;
    background: rgba(80, 0, 16, 0.38);
  }

  .dex-footer-lines span:nth-child(2) {
    width: 36px;
  }

  .dex-footer-circle {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 3px solid rgba(80, 0, 16, 0.38);
  }

  .dex-state-page {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 28px;
    background:
      radial-gradient(circle at center, rgba(232, 6, 47, 0.18), transparent 38%),
      linear-gradient(135deg, #1b0b0f 0%, #2a0d12 45%, #10070a 100%);
  }

  .dex-state-card {
    width: min(520px, 100%);
    padding: 34px;
    border-radius: 28px;
    color: #ffffff;
    background: #e8062f;
    box-shadow: 0 28px 90px rgba(232, 6, 47, 0.35);
  }

  .dex-state-card h1 {
    margin: 12px 0 8px;
    color: #ffffff;
  }

  .dex-state-card p {
    color: rgba(255, 255, 255, 0.76);
    line-height: 1.6;
  }

  .dex-state-card .erro {
    color: #ffffff;
    padding: 12px 14px;
    border-radius: 14px;
    background: rgba(17, 24, 39, 0.35);
    font-weight: 800;
  }

  .dex-state-button {
    margin-top: 12px;
    border: 0;
    border-radius: 16px;
    padding: 13px 18px;
    color: #ffffff;
    background: #111827;
    font-weight: 900;
    text-transform: uppercase;
    box-shadow: 0 6px 0 rgba(0, 0, 0, 0.34);
  }

  @media (max-width: 1120px) {
    .dex-body {
      grid-template-columns: 1fr;
    }

    .dex-side-panel {
      border-right: 0;
      border-bottom: 4px solid rgba(80, 0, 16, 0.16);
    }

    .dex-controls-game {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }

    .pokedex-console-page .conteudo {
      grid-template-columns: 1fr;
    }

    .pokedex-console-page .detalhes {
      position: static;
      max-height: none;
    }
  }

  @media (max-width: 760px) {
    .pokedex-console-page {
      padding: 14px;
    }

    .dex-topbar,
    .dex-title-area,
    .dex-user-area {
      align-items: flex-start;
      flex-direction: column;
    }

    .dex-body,
    .pokedex-console-page .controles,
    .pokedex-console-page .filtros,
    .dex-controls-game {
      grid-template-columns: 1fr;
    }

    .dex-main-panel,
    .dex-side-panel {
      padding: 22px;
    }

    .dex-mini-screen {
      width: 100%;
    }

    .pokedex-console-page .grade-cartas {
      grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
    }
  }
`;

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
        <style>{estilosPokedex}</style>

        <section className="dex-state-card">
          <span className="dex-badge">Integração com PokeAPI</span>
          <h1>Carregando Pokédex</h1>
          <p>
            Buscando os 100 primeiros Pokémon. Depois do primeiro carregamento,
            os dados ficam em cache no navegador.
          </p>
        </section>
      </main>
    );
  }

  if (erro || !pokedex) {
    return (
      <main className="dex-state-page">
        <style>{estilosPokedex}</style>

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
      <style>{estilosPokedex}</style>

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
          <aside className="dex-side-panel">
            <section className="dex-screen">
              <h2 className="dex-screen-title">Pokédex System</h2>

              <div className="dex-stat-card">
                <span>Cartas conhecidas</span>
                <strong>{pokedex.totalConhecidas}</strong>
              </div>

              <div className="dex-stat-card">
                <span>Cartas carregadas</span>
                <strong>{pokedex.totalCartas}</strong>
              </div>
            </section>

            <section className="dex-controls-game">
              <div className="dex-dpad-area">
                <div className="dex-dpad" />

                <div className="dex-round-buttons">
                  <button className="dex-round-button" type="button">A</button>
                  <button className="dex-round-button" type="button">B</button>
                </div>
              </div>

              <div className="dex-action-group">
                <button className="dex-action-button" onClick={atualizarDadosDaApi}>
                  Sincronizar Pokédex
                </button>
              </div>
            </section>
          </aside>

          <section className="dex-main-panel">
            <section className="dex-title-area">
              <div>
                <span className="dex-badge">Game Collection Interface</span>
                <h1>Pokédex</h1>
              </div>

              <div className="dex-mini-screen">
                <strong>{cartasFiltradas.length}</strong>
                <span>resultados na tela</span>
              </div>
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

              <PokemonPage carta={cartaSelecionada} />
            </section>
          </section>
        </div>

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