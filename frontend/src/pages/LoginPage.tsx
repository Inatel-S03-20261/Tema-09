import { FormEvent, useState } from 'react';

interface LoginPageProps {
  onLogin: (nome: string, senha: string) => boolean;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const [erro, setErro] = useState('');

  function autenticar(event: FormEvent) {
    event.preventDefault();

    const sucesso = onLogin(nome, senha);

    if (!sucesso) {
      setErro('Preencha o ID do treinador e a senha para acessar a Pokédex.');
      return;
    }

    setErro('');
  }

  return (
    <main className="login-console-page">
      <style>
        {`
          .login-console-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 32px;
            background:
              radial-gradient(circle at center, rgba(220, 20, 60, 0.18), transparent 38%),
              linear-gradient(135deg, #1b0b0f 0%, #2a0d12 45%, #10070a 100%);
            color: #ffffff;
            font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }

          .login-console {
            width: min(920px, 100%);
            border-radius: 28px;
            overflow: hidden;
            background: #e8062f;
            box-shadow:
              0 28px 90px rgba(232, 6, 47, 0.35),
              inset 0 0 0 2px rgba(255, 255, 255, 0.08);
          }

          .console-header {
            height: 96px;
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 0 32px;
            border-bottom: 4px solid rgba(120, 0, 20, 0.18);
            background: #f00635;
          }

          .camera {
            width: 54px;
            height: 54px;
            border-radius: 50%;
            background:
              radial-gradient(circle at 36% 32%, #ffffff 0 9%, transparent 10%),
              radial-gradient(circle, #7ac6ff 0 38%, #ffffff 39% 55%, #a5e0ff 56% 70%, #d9f4ff 71%);
            border: 4px solid rgba(255, 255, 255, 0.85);
            box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.12);
          }

          .light {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            box-shadow: inset 0 -2px 3px rgba(0, 0, 0, 0.35);
          }

          .light.red {
            background: #8b1021;
          }

          .light.yellow {
            background: #ffd23f;
          }

          .light.green {
            background: #23c967;
          }

          .console-body {
            display: grid;
            grid-template-columns: 1.05fr 1fr;
            min-height: 520px;
          }

          .console-left {
            padding: 40px 36px;
            background: linear-gradient(90deg, #f00635 0%, #e8062f 100%);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .screen {
            border-radius: 18px;
            padding: 34px 24px;
            background: #111827;
            border: 5px solid #1f2937;
            box-shadow:
              inset 0 0 35px rgba(0, 0, 0, 0.55),
              0 10px 24px rgba(0, 0, 0, 0.18);
            text-align: center;
          }

          .pokeball {
            position: relative;
            width: 160px;
            height: 160px;
            margin: 0 auto 24px;
            border-radius: 50%;
            background:
              linear-gradient(to bottom, #ef233c 0 48%, #111827 49% 52%, #e5e7eb 53% 100%);
            box-shadow:
              inset -18px -18px 34px rgba(0, 0, 0, 0.35),
              inset 12px 12px 22px rgba(255, 255, 255, 0.28),
              0 18px 35px rgba(0, 0, 0, 0.3);
          }

          .pokeball::before {
            content: "";
            position: absolute;
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background: #f8fafc;
            border: 12px solid #111827;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .pokeball::after {
            content: "";
            position: absolute;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #94a3b8;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .screen h2 {
            margin: 0;
            color: #ff1744;
            letter-spacing: 5px;
            font-size: 1.35rem;
            text-transform: uppercase;
          }

          .screen p {
            margin: 12px 0 0;
            color: #94a3b8;
            font-size: 0.78rem;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 34px;
          }

          .dpad {
            position: relative;
            width: 96px;
            height: 96px;
          }

          .dpad::before,
          .dpad::after {
            content: "";
            position: absolute;
            background: #111827;
            border-radius: 6px;
            box-shadow: 0 6px 0 rgba(0, 0, 0, 0.25);
          }

          .dpad::before {
            width: 32px;
            height: 96px;
            left: 32px;
            top: 0;
          }

          .dpad::after {
            width: 96px;
            height: 32px;
            left: 0;
            top: 32px;
          }

          .round-buttons {
            display: flex;
            gap: 18px;
          }

          .round-button {
            width: 54px;
            height: 54px;
            border-radius: 50%;
            border: 0;
            color: white;
            background: #111827;
            font-size: 1.3rem;
            font-weight: 900;
            box-shadow: 0 7px 0 rgba(0, 0, 0, 0.35);
          }

          .console-right {
            padding: 42px 42px 36px;
            background: rgba(151, 0, 31, 0.26);
            border-left: 4px solid rgba(120, 0, 20, 0.12);
            display: flex;
            align-items: center;
          }

          .login-panel {
            width: 100%;
          }

          .login-panel h1 {
            margin: 0 0 10px;
            color: #ffffff;
            font-size: clamp(2rem, 4vw, 2.8rem);
            line-height: 1;
          }

          .login-panel .subtitle {
            margin: 0 0 34px;
            color: rgba(255, 255, 255, 0.74);
            font-size: 1.05rem;
            line-height: 1.5;
          }

          .login-form {
            display: grid;
            gap: 22px;
          }

          .field {
            display: grid;
            gap: 9px;
          }

          .field span {
            color: rgba(255, 255, 255, 0.82);
            font-size: 0.76rem;
            font-weight: 900;
            letter-spacing: 3px;
            text-transform: uppercase;
          }

          .input-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 0 18px;
            border-radius: 22px;
            background: #8f1734;
            box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.15);
          }

          .input-wrap strong {
            color: #ff1744;
            font-size: 1.2rem;
          }

          .input-wrap input {
            width: 100%;
            height: 60px;
            border: 0;
            outline: 0;
            color: #ffffff;
            background: transparent;
            font-weight: 700;
          }

          .input-wrap input::placeholder {
            color: rgba(255, 255, 255, 0.42);
          }

          .extra-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-top: -4px;
            color: rgba(255, 255, 255, 0.78);
            font-size: 0.92rem;
          }

          .remember {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
          }

          .remember input {
            width: 17px;
            height: 17px;
            accent-color: #111827;
          }

          .forgot {
            color: rgba(255, 255, 255, 0.28);
            font-weight: 700;
          }

          .login-error {
            margin: 0;
            padding: 12px 14px;
            border-radius: 14px;
            color: #fff;
            background: rgba(17, 24, 39, 0.28);
            font-weight: 700;
          }

          .login-button {
            height: 64px;
            border: 0;
            border-radius: 22px;
            color: #ffffff;
            background: #111827;
            font-size: 1rem;
            font-weight: 900;
            text-transform: uppercase;
            box-shadow: 0 8px 0 rgba(0, 0, 0, 0.35);
            transition: transform 0.15s ease, box-shadow 0.15s ease;
          }

          .login-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 0 rgba(0, 0, 0, 0.35);
          }

          .login-button:active {
            transform: translateY(4px);
            box-shadow: 0 4px 0 rgba(0, 0, 0, 0.35);
          }

          .divider {
            height: 1px;
            margin: 34px 0;
            background: rgba(255, 255, 255, 0.14);
          }

          .register-area {
            text-align: center;
            color: rgba(255, 255, 255, 0.72);
          }

          .register-area p {
            margin: 0 0 16px;
          }

          .register-button {
            min-width: 240px;
            height: 48px;
            border-radius: 999px;
            border: 2px solid rgba(255, 255, 255, 0.13);
            color: rgba(255, 255, 255, 0.18);
            background: transparent;
            font-weight: 900;
            text-transform: uppercase;
            cursor: not-allowed;
          }

          .console-footer {
            height: 74px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 32px;
            border-top: 4px solid rgba(120, 0, 20, 0.18);
            background: #f00635;
          }

          .footer-lines {
            display: flex;
            gap: 14px;
          }

          .footer-lines span {
            width: 56px;
            height: 8px;
            border-radius: 999px;
            background: rgba(80, 0, 16, 0.38);
          }

          .footer-lines span:nth-child(2) {
            width: 36px;
          }

          .footer-circle {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            border: 3px solid rgba(80, 0, 16, 0.38);
          }

          @media (max-width: 820px) {
            .console-body {
              grid-template-columns: 1fr;
            }

            .console-left {
              padding-bottom: 24px;
            }

            .console-right {
              border-left: 0;
              border-top: 4px solid rgba(120, 0, 20, 0.12);
            }
          }

          @media (max-width: 520px) {
            .login-console-page {
              padding: 16px;
            }

            .console-header,
            .console-footer {
              padding-left: 20px;
              padding-right: 20px;
            }

            .console-left,
            .console-right {
              padding: 28px 22px;
            }

            .screen {
              padding: 26px 18px;
            }

            .pokeball {
              width: 128px;
              height: 128px;
            }

            .extra-row {
              align-items: flex-start;
              flex-direction: column;
            }
          }
        `}
      </style>

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