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
        jogador_origem,
        jogador_destino,
        pokemon_entregue,
        pokemon_recebido
    ):

        origem_possui = (
            self.cartas_service
            .possui_carta(
                jogador_origem,
                pokemon_entregue
            )
        )

        if not origem_possui:

            return {
                "sucesso": False,
                "erro": "Jogador de origem nao possui esta carta"
            }

        destino_possui = (
            self.cartas_service
            .possui_carta(
                jogador_destino,
                pokemon_recebido
            )
        )

        if not destino_possui:

            return {
                "sucesso": False,
                "erro": "Jogador de destino nao possui esta carta"
            }

        pokemon_origem = (
            self.pokemon_service
            .obter_ou_criar(
                pokemon_entregue
            )
        )

        if not pokemon_origem:

            return {
                "sucesso": False,
                "erro": "Pokemon entregue nao encontrado"
            }

        pokemon_destino = (
            self.pokemon_service
            .obter_ou_criar(
                pokemon_recebido
            )
        )

        if not pokemon_destino:

            return {
                "sucesso": False,
                "erro": "Pokemon recebido nao encontrado"
            }

        self.cartas_service.registrar_troca_entre_jogadores(
            jogador_origem,
            jogador_destino,
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
                    troca["jogador_origem"],
                    troca["jogador_destino"],
                    troca["pokemon_entregue"],
                    troca["pokemon_recebido"]
                )
            )

            resultados.append(
                resultado
            )

        return resultados
