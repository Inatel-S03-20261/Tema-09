import { CartaConhecida } from "./CartaConhecida";

export interface Pokedex {
    id: number;
    totalCartasExistentes: number;
    totalCartasConhecidas: number;
    cartasConhecidas: CartaConhecida[];
}