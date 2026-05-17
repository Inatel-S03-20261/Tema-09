import { Pokemon } from "./Pokemon";

export interface CartaConhecida {
    id: number;
    dataPrimeiroContato: Date;
    origem: string;
    jaPossui: boolean;
    possuiAtualmente: boolean;
    dataUltimaAtualizacao: Date;
    pokemon: Pokemon;
}