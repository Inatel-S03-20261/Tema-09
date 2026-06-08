import { Pokedex } from "../../../backend/src/models/Pokedex";

export interface IPokedexRepository {
    buscarPorJogador(idJogador: number): Promise<Pokedex>;
    salvar(pokedex: Pokedex): Promise<void>;
}