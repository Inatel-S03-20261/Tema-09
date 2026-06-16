from factories.client_factory import (
    ClientFactory
)

from services.jogador_service import (
    JogadorService
)


class AutenticacaoService:

    def __init__(self):

        self.client = (
            ClientFactory.create_auth_client()
        )

        self.jogador_service = (
            JogadorService()
        )

    def login(
        self,
        usuario,
        senha
    ):

        #
        # Validações
        #

        if not usuario or not usuario.strip():

            return {
                "sucesso": False,
                "erro": "Usuário é obrigatório"
            }

        if len(usuario) < 3:

            return {
                "sucesso": False,
                "erro":
                "Usuário deve possuir pelo menos 3 caracteres"
            }

        if not senha or not senha.strip():

            return {
                "sucesso": False,
                "erro": "Senha é obrigatória"
            }

        if len(senha) < 6:

            return {
                "sucesso": False,
                "erro":
                "Senha deve possuir pelo menos 6 caracteres"
            }

        #
        # Autenticação
        #

        resultado = self.client.autenticar(
            usuario,
            senha
        )

        print(
            "Resultado autenticação:"
        )

        print(resultado)

        #
        # Login realizado
        #

        if resultado.get("sucesso"):

            print(
                "Sincronizando jogador..."
            )

            self.jogador_service.sincronizar_jogador(
                resultado["usuario"]
            )

        return resultado

    def validar_token(
        self,
        token
    ):

        token = self._normalizar_token(
            token
        )

        if not token:

            return {
                "valido": False
            }

        return self.client.validar_token(
            token
        )

    def obter_jogador(
        self,
        token
    ):

        return self.obter_jogador_por_token(
            token
        )

    def obter_jogador_por_token(
        self,
        token
    ):

        token = self._normalizar_token(
            token
        )

        if not token:

            return None

        return self.client.obter_jogador(
            token
        )

    def _normalizar_token(
        self,
        token
    ):

        if not token:

            return None

        if token.startswith(
            "Bearer "
        ):

            return token.replace(
                "Bearer ",
                ""
            )

        return token
