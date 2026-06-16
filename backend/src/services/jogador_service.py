from repositories.jogador_repository import (
    JogadorRepository
)

from repositories.pokedex_repository import (
    PokedexRepository
)


class JogadorService:

    def __init__(self):

        self.jogador_repository = (
            JogadorRepository()
        )

        self.pokedex_repository = (
            PokedexRepository()
        )

    def sincronizar_jogador(
            self,
            jogador
        ):

        existe = (
            self.jogador_repository
            .buscar_por_id(
                jogador["id"]
            )
        )

        if not existe:

            self.jogador_repository.salvar(
                jogador
            )

        pokedex = (
            self.pokedex_repository
            .buscar_por_jogador(
                jogador["id"]
            )
        )

        if not pokedex:

            self.pokedex_repository.criar(
                jogador["id"]
            )