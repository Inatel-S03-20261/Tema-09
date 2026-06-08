export class AutenticacaoController {
  private authClient: AutenticacaoService;

  constructor(authClient: AutenticacaoService) {
    this.authClient = authClient;
  }

  public validarToken(token: string): boolean {
    // implementar lógica
    return true;
  }

  public obterJogador(token: string): number {
     // implementar lógica
    return 0;
  }
}