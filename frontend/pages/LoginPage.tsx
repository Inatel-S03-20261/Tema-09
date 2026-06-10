import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const { autenticar } = useAuth();

  return <div>Login</div>;
}

export default LoginPage;