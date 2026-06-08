import { IJogadorRepository } from "../repositories/IJogadorRepository";

export class AutenticacaoService {
  private jogadorRepository: IJogadorRepository;

  constructor(jogadorRepository: IJogadorRepository) {
    this.jogadorRepository = jogadorRepository;
  }

  public autenticar(login: string, senha: string): Promise<boolean> {
  }

  public validarJogador(id: number): Promise<boolean> {
  }
}