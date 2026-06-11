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
          setErroDescricao(error instanceof Error ? error.message : 'Erro ao carregar descrição.');
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
        <h2>Detalhes do Pokémon</h2>
        <p>Selecione uma carta para consultar os dados do Pokémon.</p>
      </aside>
    );
  }

  const bloqueada = carta.status === 'nao_conhecida';

  return (
      <aside className={`detalhes ${bloqueada ? 'detalhes-bloqueada' : ''}`}>
          <span className="numero">#{String(carta.id).padStart(3, '0')}</span>

          <img
            className={bloqueada ? 'sprite-bloqueado' : ''}
            src={carta.imagemUrl}
            alt={bloqueada ? 'Silhueta de Pokémon desconhecido' : carta.nome}
          />

          <h2>{bloqueada ? 'Pokémon não conhecido' : carta.nome}</h2>

      {bloqueada ? (
        <p>Essa carta ainda não foi registrada no histórico do jogador. Os detalhes serão liberados futuramente quando a carta for obtida por batalha,
  troca ou distribuição.</p>
      ) : (
        <>
          {carregandoDescricao && <p>Carregando descrição pela PokeAPI...</p>}
          {erroDescricao && <p className="erro">{erroDescricao}</p>}
          {!carregandoDescricao && !erroDescricao && <p>{descricao}</p>}

          <div className="chips">
            <span>{carta.tipo}</span>
            {carta.tipoSecundario && <span>{carta.tipoSecundario}</span>}
          </div>

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

          <h3>Habilidades</h3>
          <ul>
            {carta.habilidades.map((habilidade) => (
              <li key={habilidade}>{habilidade}</li>
            ))}
          </ul>

          <h3>Ataques</h3>
          <ul>
            {carta.ataques.map((ataque) => (
              <li key={ataque}>{ataque}</li>
            ))}
          </ul>

          <h3>Stats</h3>
          <div className="stats">
            {carta.stats.map((stat) => (
              <div key={stat.nome} className="stat-item">
                <span>{stat.nome}</span>
                <strong>{stat.valor}</strong>
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
