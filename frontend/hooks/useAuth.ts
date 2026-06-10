export function useAuth() {
  const autenticar = (): boolean => false;
  const validarToken = (): boolean => false;

  return { autenticar, validarToken };
}