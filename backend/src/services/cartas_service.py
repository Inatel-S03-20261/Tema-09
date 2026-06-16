from repositories.carta_conhecida_repository import (
    CartaConhecidaRepository
)

from clients.distribuicao_client import (
    DistribuicaoClient
)
from services.pokemon_service import (
    PokemonService
)

from repositories.pokedex_repository import (
    PokedexRepository
)

from patterns.observer import (
    Subject
)

from services.historico_service import (
    HistoricoService
)


class CartasService(Subject):

    def __init__(self):

        super().__init__()

        self.repository = (
            CartaConhecidaRepository()
        )

        self.distribuicao_client = (
            DistribuicaoClient()
        )

        self.pokemon_service = (
            PokemonService()
        )
        self.pokedex_repository = (
            PokedexRepository()
        )

        self.registrar_observer(
            HistoricoService()
        )

    def listar_cartas_conhecidas(
        self,
        jogador_id
    ):

        #
        # 1 - Procura no banco
        #

        cartas = (
            self.repository
            .listar_por_jogador(
                jogador_id
            )
        )

        #
        # 2 - Encontrou?
        #

        if cartas:

            self.pokedex_repository.atualizar_estatisticas(
                jogador_id
            )

            return cartas

        print(
            f"Nenhuma carta encontrada para "
            f"o jogador {jogador_id}"
        )

        #
        # 3 - Consulta Distribuição
        #

        cartas_recebidas = (
            self.distribuicao_client
            .obter_cartas(
                jogador_id
            )
        )

        #
        # 4 - Salva no banco
        #

        for carta in cartas_recebidas:

            pokemon = (
                self.pokemon_service
                .obter_ou_criar(
                    carta["pokemon_id"]
                )
            )

            if not pokemon:

                raise Exception(
                    f"Pokemon {carta['pokemon_id']} não encontrado"
                )

        self.repository.salvar_cartas(
            jogador_id,
            cartas_recebidas
        )

        for carta in cartas_recebidas:

            self.notificar_observers(
                {
                    "jogador_id": jogador_id,
                    "pokemon_id": carta["pokemon_id"],
                    "tipo_evento": "DISTRIBUICAO",
                    "origem": "Inicial",
                    "observacao":
                    "Carta recebida pela distribuição inicial"
                }
            )

        self.pokedex_repository.atualizar_estatisticas(
            jogador_id
        )

        #
        # 5 - Busca novamente
        #

        cartas = (
            self.repository
            .listar_por_jogador(
                jogador_id
            )
        )

        #
        # 6 - Retorna
        #

        return cartas

    def possui_carta(
        self,
        jogador_id,
        pokemon_id
    ):

        return self.repository.possui_carta(
            jogador_id,
            pokemon_id
        )

    def registrar_troca_cartas(
        self,
        jogador_id,
        pokemon_entregue,
        pokemon_recebido
    ):

        self.repository.remover_posse(
            jogador_id,
            pokemon_entregue
        )

        self.notificar_observers(
            {
                "jogador_id": jogador_id,
                "pokemon_id": pokemon_entregue,
                "tipo_evento": "TROCA_ENVIADA",
                "origem": "Troca",
                "observacao": "Carta enviada em troca"
            }
        )

        self.repository.adicionar_posse(
            jogador_id,
            pokemon_recebido
        )

        self.notificar_observers(
            {
                "jogador_id": jogador_id,
                "pokemon_id": pokemon_recebido,
                "tipo_evento": "TROCA_RECEBIDA",
                "origem": "Troca",
                "observacao": "Carta recebida em troca"
            }
        )

        self.pokedex_repository.atualizar_estatisticas(
            jogador_id
        )

    def registrar_troca_entre_jogadores(
        self,
        jogador_origem,
        jogador_destino,
        pokemon_entregue,
        pokemon_recebido
    ):

        self.repository.remover_posse(
            jogador_origem,
            pokemon_entregue
        )

        self.notificar_observers(
            {
                "jogador_id": jogador_origem,
                "pokemon_id": pokemon_entregue,
                "tipo_evento": "TROCA_ENVIADA",
                "origem": "Troca",
                "observacao": "Carta enviada em troca"
            }
        )

        self.repository.adicionar_posse(
            jogador_origem,
            pokemon_recebido
        )

        self.notificar_observers(
            {
                "jogador_id": jogador_origem,
                "pokemon_id": pokemon_recebido,
                "tipo_evento": "TROCA_RECEBIDA",
                "origem": "Troca",
                "observacao": "Carta recebida em troca"
            }
        )

        self.repository.remover_posse(
            jogador_destino,
            pokemon_recebido
        )

        self.notificar_observers(
            {
                "jogador_id": jogador_destino,
                "pokemon_id": pokemon_recebido,
                "tipo_evento": "TROCA_ENVIADA",
                "origem": "Troca",
                "observacao": "Carta enviada em troca"
            }
        )

        self.repository.adicionar_posse(
            jogador_destino,
            pokemon_entregue
        )

        self.notificar_observers(
            {
                "jogador_id": jogador_destino,
                "pokemon_id": pokemon_entregue,
                "tipo_evento": "TROCA_RECEBIDA",
                "origem": "Troca",
                "observacao": "Carta recebida em troca"
            }
        )

        self.pokedex_repository.atualizar_estatisticas(
            jogador_origem
        )

        self.pokedex_repository.atualizar_estatisticas(
            jogador_destino
        )
