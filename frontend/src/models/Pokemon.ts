export interface Pokemon {
    idPokemon: number;
    nome: string;
    tipoPrincipal: string;
    tipoSecundario?: string; // opcional
    imagemUrl: string;
    descricao: string;
}