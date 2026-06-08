import { Pokemon } from "../../../backend/src/models/Pokemon";

export interface IPokemonRepository {
    buscarPorId(idPokemon: number): Promise<Pokemon>;
    listarTodos(): Promise<Pokemon[]>;
}