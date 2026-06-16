from repositories.historico_repository import (
    HistoricoRepository
)

from patterns.observer import (
    Observer
)


class HistoricoService(Observer):

    def __init__(self):

        self.repository = (
            HistoricoRepository()
        )

    def atualizar(
        self,
        evento
    ):

        self.repository.registrar(
            jogador_id=evento["jogador_id"],
            pokemon_id=evento["pokemon_id"],
            tipo_evento=evento["tipo_evento"],
            origem=evento["origem"],
            observacao=evento.get(
                "observacao",
                self._obter_observacao_padrao(
                    evento["tipo_evento"]
                )
            )
        )

    def listar_historico(
        self,
        jogador_id
    ):

        return (
            self.repository
            .listar_por_jogador(
                jogador_id
            )
        )

    def _obter_observacao_padrao(
        self,
        tipo_evento
    ):

        observacoes = {
            "DISTRIBUICAO":
            "Carta recebida pela distribuição inicial",

            "TROCA_ENVIADA":
            "Carta enviada em troca",

            "TROCA_RECEBIDA":
            "Carta recebida em troca"
        }

        return observacoes.get(
            tipo_evento,
            "Evento registrado no histórico"
        )
