import { useEffect, useMemo, useState } from 'react';
import type { PokedexDTO } from '../dto/PokedexDTO';
import { PokedexService } from '../services/PokedexService';

type Carta = PokedexDTO['cartas'][number];

interface PokemonPageProps {
  carta?: Carta;
}

export function PokemonPage({ carta }: PokemonPageProps) {
  const service = useMemo(() => new PokedexService(), []);
  const [descricao, setDescricao] = useState('');
  const [carregandoDescricao, setCarregandoDescricao] = useState(false);
  const [erroDescricao, setErroDescricao] = useState('');

  useEffect(() => {
    if (!carta || carta.status === 'nao_conhecida') {
      setDescricao('');
      setErroDescricao('');
      setCarregandoDescricao(false);
      return;
    }

    let componenteAtivo = true;

    async function carregarDescricao() {
      try {
        setCarregandoDescricao(true);
        setErroDescricao('');
        const descricaoPokemon = await service.buscarDescricaoPokemon(carta!.id);

        if (componenteAtivo) {
          setDescricao(descricaoPokemon);
        }
      } catch (error) {
        if (componenteAtivo) {
          setErroDescricao(error instanceof Error ? error.message : 'Erro ao carregar descricao.');
        }
      } finally {
        if (componenteAtivo) {
          setCarregandoDescricao(false);
        }
      }
    }

    void carregarDescricao();

    return () => {
      componenteAtivo = false;
    };
  }, [carta, service]);

  if (!carta) {
    return (
      <aside className="detalhes vazio">
        <h2>Detalhes do Pokemon</h2>
        <p>Selecione uma carta para consultar os dados do Pokemon.</p>
      </aside>
    );
  }

  const bloqueada = carta.status === 'nao_conhecida';
  const hp = carta.stats.find((stat) => stat.nome.toLowerCase() === 'hp')?.valor;

  return (
    <aside className={`detalhes dex-inspection ${bloqueada ? 'detalhes-bloqueada' : ''}`}>
      <div className="dex-inspection-crumb">
        <span>Kanto Region</span>
        <strong>
          {bloqueada ? 'Pokemon desconhecido' : `${carta.nome} #${String(carta.id).padStart(3, '0')}`}
        </strong>
      </div>

      <section className="dex-inspection-grid">
        <div className="dex-inspection-left">
          <div className="dex-portrait-card">
            <img
              className={bloqueada ? 'sprite-bloqueado' : ''}
              src={carta.imagemUrl}
              alt={bloqueada ? 'Silhueta de Pokemon desconhecido' : carta.nome}
            />

            <div className="dex-portrait-info">
              <small>{bloqueada ? 'Dados bloqueados' : 'Pokemon registrado'}</small>
              <h2>{bloqueada ? '???' : carta.nome}</h2>
              <strong>
                #{String(carta.id).padStart(3, '0')}
                {hp ? ` HP ${hp}` : ''}
              </strong>
            </div>
          </div>

          <div className="dex-inspection-chips">
            <div>
              <span className="dex-chip-group-label">Tipos</span>
              <div className="chips">
                <span>{bloqueada ? '???' : carta.tipo}</span>
                {!bloqueada && carta.tipoSecundario && <span>{carta.tipoSecundario}</span>}
              </div>
            </div>

            <div>
              <span className="dex-chip-group-label">Habilidades</span>
              <div className="chips">
                {bloqueada ? (
                  <span>???</span>
                ) : (
                  carta.habilidades.slice(0, 2).map((habilidade) => (
                    <span key={habilidade}>{habilidade}</span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="dex-inspection-right">
          {bloqueada ? (
            <section className="dex-inspection-section">
              <h3 className="dex-inspection-title">
                <span className="dex-inspection-icon">▮</span>
                Dados bloqueados
              </h3>
              <div className="dex-entry-panel">
                <p>
                  Essa carta ainda nao foi registrada no historico do jogador. Os detalhes serao
                  liberados futuramente quando a carta for obtida por batalha, troca ou distribuicao.
                </p>
              </div>
            </section>
          ) : (
            <>
              <section className="dex-inspection-section">
                <h3 className="dex-inspection-title">
                  <span className="dex-inspection-icon">▮</span>
                  Battle Stats
                </h3>

                <div className="stats">
                  {carta.stats.map((stat) => (
                    <div key={stat.nome} className="stat-item">
                      <span>{stat.nome}</span>
                      <strong>{stat.valor}</strong>
                      <div className="stat-bar" aria-hidden="true">
                        <span style={{ width: `${Math.min(100, (stat.valor / 160) * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="dex-inspection-section">
                <h3 className="dex-inspection-title">
                  <span className="dex-inspection-icon">▮</span>
                  Pokedex Entry
                </h3>

                <div className="dex-entry-panel">
                  {carregandoDescricao && <p>Carregando descricao pela PokeAPI...</p>}
                  {erroDescricao && <p className="erro">{erroDescricao}</p>}
                  {!carregandoDescricao && !erroDescricao && <p>{descricao}</p>}
                </div>
              </section>

              <dl className="medidas">
                <div>
                  <dt>Altura</dt>
                  <dd>{carta.altura.toFixed(1)} m</dd>
                </div>
                <div>
                  <dt>Peso</dt>
                  <dd>{carta.peso.toFixed(1)} kg</dd>
                </div>
              </dl>

              <section className="dex-inspection-section">
                <h3 className="dex-inspection-title">
                  <span className="dex-inspection-icon">▮</span>
                  Ataques
                </h3>

                <ul className="dex-attack-list">
                  {carta.ataques.map((ataque) => (
                    <li key={ataque}>{ataque}</li>
                  ))}
                </ul>
              </section>
            </>
          )}
        </div>
      </section>
    </aside>
  );
}
