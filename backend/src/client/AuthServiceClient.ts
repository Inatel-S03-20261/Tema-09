import { Jogador } from "../models/Jogador";

export class AuthServiceClient {
  validarCredenciais(
    login: string,
    senha: string
  ): boolean {
    return true;
  }

  buscarJogadorPorId(
    id: number
  ): Jogador {
    throw new Error("Não implementado");
  }
}