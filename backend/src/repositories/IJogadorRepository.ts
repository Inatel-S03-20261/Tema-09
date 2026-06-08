import { Jogador } from "../../../backend/src/models/Jogador";

export interface IJogadorRepository {
    buscarPorId(id: number): Promise<Jogador>;
}