import { CartaConhecida } from "../models/CartaConhecida";

export interface ICartaConhecidaRepository {
    listarPorJogador(idJogador: number): Promise<CartaConhecida[]>;
    buscarPorJogadorEPokemon(idJogador: number, idPokemon: number): Promise<CartaConhecida>;
    salvar(carta: CartaConhecida): Promise<void>;
}