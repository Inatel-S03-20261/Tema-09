import { Jogador } from "../models/Jogador";

export interface IJogadorRepository {
    buscarPorId(id: number): Promise<Jogador>;
}