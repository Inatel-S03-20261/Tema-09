class MockDistribuicao:

    distribuicoes = {

        1: [
            {
                "pokemon_id": 25,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 4,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 7,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 1,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 133,
                "origem": "Inicial"
            }
        ],

        2: [
            {
                "pokemon_id": 39,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 52,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 54,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 58,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 92,
                "origem": "Inicial"
            }
        ],

        3: [
            {
                "pokemon_id": 16,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 19,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 21,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 23,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 27,
                "origem": "Inicial"
            }
        ],

        4: [
            {
                "pokemon_id": 63,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 66,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 74,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 81,
                "origem": "Inicial"
            },
            {
                "pokemon_id": 86,
                "origem": "Inicial"
            }
        ]
    }

    @staticmethod
    def obter_cartas(jogador_id):

        return MockDistribuicao.distribuicoes.get(
            jogador_id,
            []
        )