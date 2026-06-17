from mocks.mock_distribuicao import MockDistribuicao


class DistribuicaoClient:

    def obter_cartas(
        self,
        jogador_id
    ):

        return MockDistribuicao.obter_cartas(
            jogador_id
        )