from mocks.mock_auth import MockAuth
# import requests


class AuthServiceClient:

    def autenticar(
        self,
        usuario,
        senha
    ):

        return MockAuth.autenticar(
            usuario,
            senha
        )
    
    def validar_token(
        self,
        token
    ):

        return MockAuth.validar_token(
            token
        )
    
    def obter_jogador(
        self,
        token
    ):

        return MockAuth.obter_jogador(
            token
        )

#
#  Exemplo de chamada para microserviço de autenticação
#

#    response = requests.post(

#             "http://auth-service/auth/login",

#             json={
#                 "usuario": usuario,
#                 "senha": senha
#             }
#         )

#         return response.json()