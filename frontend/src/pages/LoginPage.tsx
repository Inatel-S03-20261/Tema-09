import { FormEvent, useState } from 'react';

interface LoginPageProps {
  onLogin: (nome: string, senha: string) => Promise<boolean>;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function autenticar(event: FormEvent) {
    event.preventDefault();

    try {
      setCarregando(true);
      setErro('');

      const sucesso = await onLogin(nome, senha);

      if (!sucesso) {
        setErro('Usuario ou senha invalidos.');
        return;
      }
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao conectar com o backend.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="login-console-page">
      <section className="login-console">
        <div className="console-header">
          <div className="camera" />
          <span className="light red" />
          <span className="light yellow" />
          <span className="light green" />
        </div>

        <div className="console-body">
          <aside className="console-left">
            <div>
              <div className="screen">
                <div className="pokeball" />
                <h2>Pokédex V2.0</h2>
                <p>Escaneando sinal do treinador...</p>
              </div>

              <div className="controls">
                <div className="dpad" />
                <div className="round-buttons">
                  <button className="round-button" type="button">≡</button>
                  <button className="round-button" type="button">i</button>
                </div>
              </div>
            </div>
          </aside>

          <section className="console-right">
            <div className="login-panel">
              <h1>Bem vindo, Treinador!</h1>
              <p className="subtitle">
                Inicialize sua sessão na Pokédex.
              </p>

              <form className="login-form" onSubmit={autenticar}>
                <label className="field">
                  <span>Login do Treinador</span>
                  <div className="input-wrap">
                    <strong>♟</strong>
                    <input
                      value={nome}
                      placeholder="#####-####-####"
                      onChange={(event) => setNome(event.target.value)}
                    />
                  </div>
                </label>

                <label className="field">
                  <span>Senha</span>
                  <div className="input-wrap">
                    <strong>🔒</strong>
                    <input
                      type="password"
                      value={senha}
                      placeholder="••••••••"
                      onChange={(event) => setSenha(event.target.value)}
                    />
                  </div>
                </label>

                <div className="extra-row">
                  <label className="remember">
                    <input
                      type="checkbox"
                      checked={lembrar}
                      onChange={(event) => setLembrar(event.target.checked)}
                    />
                    Lembrar de mim
                  </label>

                  <span className="forgot">Esqueceu o ID?</span>
                </div>

                {erro && <p className="login-error">{erro}</p>}

                <button className="login-button" type="submit">
                  Log in na Pokédex →
                </button>
              </form>

              <div className="divider" />

              <div className="register-area">
                <p>Novo treinador na região?</p>
                <button className="register-button" type="button" disabled>
                  Registrar como Treinador
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="console-footer">
          <div className="footer-lines">
            <span />
            <span />
          </div>

          <div className="footer-circle" />
        </div>
      </section>
    </main>
  );
}