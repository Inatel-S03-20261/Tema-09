import { Pokemon } from "../models/Pokemon";

export interface IPokemonRepository {
    buscarPorId(idPokemon: number): Promise<Pokemon>;
    listarTodos(): Promise<Pokemon[]>;
}