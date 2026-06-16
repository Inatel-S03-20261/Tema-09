from repositories.pokedex_repository import (
    PokedexRepository
)

from services.autenticacao_service import (
    AutenticacaoService
)

from services.cartas_service import (
    CartasService
)

from services.historico_service import (
    HistoricoService
)

from services.pokemon_service import (
    PokemonService
)

from services.troca_service import (
    TrocaService
)


class PokedexService:

    def __init__(self):

        self.repository = (
            PokedexRepository()
        )

        self.autenticacao_service = (
            AutenticacaoService()
        )

        self.cartas_service = (
            CartasService()
        )

        self.historico_service = (
            HistoricoService()
        )

        self.pokemon_service = (
            PokemonService()
        )

        self.troca_service = (
            TrocaService()
        )

    def autenticar(
        self,
        usuario,
        senha
    ):

        return self.autenticacao_service.login(
            usuario,
            senha
        )

    def validar_token(
        self,
        token
    ):

        return self.autenticacao_service.validar_token(
            token
        )

    def obter_jogador_por_token(
        self,
        token
    ):

        return (
            self.autenticacao_service
            .obter_jogador_por_token(
                token
            )
        )

    def listar_pokemon(self):

        return (
            self.pokemon_service
            .listar_pokemon()
        )

    def listar_pokedex(
        self,
        jogador_id
    ):

        return (
            self.repository
            .buscar_por_jogador(
                jogador_id
            )
        )

    def visualizar_pokedex(
        self,
        token
    ):

        jogador = self.obter_jogador_por_token(
            token
        )

        if not jogador:

            return {
                "erro": "Token invalido"
            }, 401

        return self.listar_pokedex(
            jogador["id"]
        )

    def listar_cartas(
        self,
        token
    ):

        jogador = self.obter_jogador_por_token(
            token
        )

        if not jogador:

            return {
                "erro": "Token invalido"
            }, 401

        return (
            self.cartas_service
            .listar_cartas_conhecidas(
                jogador["id"]
            )
        )

    def listar_historico(
        self,
        token
    ):

        jogador = self.obter_jogador_por_token(
            token
        )

        if not jogador:

            return {
                "erro": "Token invalido"
            }, 401

        return (
            self.historico_service
            .listar_historico(
                jogador["id"]
            )
        )

    def obter_detalhes_pokemon(
        self,
        token,
        pokemon_id
    ):

        return (
            self.pokemon_service
            .obter_detalhes(
                pokemon_id
            )
        )

    def sincronizar_trocas(
        self,
        token=None
    ):

        return (
            self.troca_service
            .sincronizar_trocas()
        )
