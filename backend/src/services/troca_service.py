from services.pokemon_service import (
    PokemonService
)

from services.cartas_service import (
    CartasService
)

from factories.client_factory import (
    ClientFactory
)


class TrocaService:

    def __init__(self):

        self.pokemon_service = (
            PokemonService()
        )

        self.cartas_service = (
            CartasService()
        )

        self.trocas_client = (
            ClientFactory
            .create_troca_client()
        )

    def registrar_troca(
        self,
        jogador_id,
        pokemon_entregue,
        pokemon_recebido
    ):

        possui = (
            self.cartas_service
            .possui_carta(
                jogador_id,
                pokemon_entregue
            )
        )

        if not possui:

            return {
                "sucesso": False,
                "erro": "Jogador nao possui esta carta"
            }

        pokemon = (
            self.pokemon_service
            .obter_ou_criar(
                pokemon_recebido
            )
        )

        if not pokemon:

            return {
                "sucesso": False,
                "erro": "Pokemon recebido nao encontrado"
            }

        self.cartas_service.registrar_troca_cartas(
            jogador_id,
            pokemon_entregue,
            pokemon_recebido
        )

        return {
            "sucesso": True,
            "mensagem": "Troca registrada com sucesso"
        }

    def sincronizar_trocas(
        self
    ):

        trocas = (
            self.trocas_client
            .obter_trocas_pendentes()
        )

        resultados = []

        for troca in trocas:

            resultado = (
                self.registrar_troca(
                    troca["jogador_id"],
                    troca["pokemon_entregue"],
                    troca["pokemon_recebido"]
                )
            )

            resultados.append(
                resultado
            )

        return resultados
