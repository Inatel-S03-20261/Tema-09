import './App.css';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/LoginPage';
import { PokedexPage } from './pages/PokedexPage';

function App() {
  const { jogador, autenticado, autenticar, sair } = useAuth();

  if (!autenticado) {
    return <LoginPage onLogin={autenticar} />;
  }

  return <PokedexPage jogador={jogador} onSair={sair} />;
}

export default App;
