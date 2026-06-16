from mocks.mock_trocas import (
    MockTrocas
)


class TrocaClient:

    def obter_trocas_pendentes(
        self
    ):

        return (
            MockTrocas
            .obter_trocas_pendentes()
        )