from clients.auth_service_client import AuthServiceClient

class AutenticacaoService:

    def __init__(self):

        self.client = AuthServiceClient()

    def login(
        self,
        usuario,
        senha
    ):

        if not usuario or not usuario.strip():

            return {
                "erro":
                "Usuário é obrigatório"
            }

        if len(usuario) < 3:

            return {
                "erro":
                "Usuário deve possuir pelo menos 3 caracteres"
            }

        if not senha or not senha.strip():

            return {
                "erro":
                "Senha é obrigatória"
            }

        if len(senha) < 6:

            return {
                "erro":
                "Senha deve possuir pelo menos 6 caracteres"
            }

        return self.client.autenticar(
            usuario,
            senha
        )
    
    def validar_token(
        self,
        token
    ):

        return self.client.validar_token(
            token
        )

    def obter_jogador(
        self,
        token
     ):

        return self.client.obter_jogador(
            token
        )
    