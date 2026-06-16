from mocks.mock_distribuicao import (
    MockDistribuicao
)


class DistribuicaoClient:

    def obter_cartas_iniciais(
        self,
        jogador_id
    ):

        return (
            MockDistribuicao
            .obter_cartas_iniciais(
                jogador_id
            )
        )