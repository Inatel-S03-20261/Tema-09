class MockAuth:

    usuarios = [

        {
            "id": 1,
            "usuario": "karol",
            "senha": "karol123",
            "nome": "Karolina Oliveira",
            "email": "karol@exemplo.com"
        },

        {
            "id": 2,
            "usuario": "julia_V",
            "senha": "juliaV123",
            "nome": "Julia Vicentini",
            "email": "julia.vicentini@exemplo.com"
        },
        {
            "id": 3,
            "usuario": "julia_C",
            "senha": "juliaC123",
            "nome": "Julia Caputo",
            "email": "julia.caputo@exemplo.com"
        },


        {
            "id": 4,
            "usuario": "camile",
            "senha": "camile123",
            "nome": "Camile Laraia",
            "email": "camile.laraia@exemplo.com"
        }

    ]

    @staticmethod
    def autenticar(
        usuario,
        senha
    ):

        for user in MockAuth.usuarios:

            if (
                user["usuario"] == usuario
                and
                user["senha"] == senha
            ):

                return {

                    "sucesso": True,

                    "token":
                    f"mock-token-{user['id']}",

                    "usuario": {

                        "id": user["id"],
                        "nome": user["nome"],
                        "email": user["email"]
                    }
                }

        return {

            "sucesso": False,

            "erro":
            "Usuario ou senha invalidos"
        }

    @staticmethod
    def validar_token(
        token
    ):

        if not token:

            return {
                "valido": False
            }

        if token.startswith(
            "mock-token-"
        ):

            return {
                "valido": True
            }

        return {
            "valido": False
        }
    
    @staticmethod
    def obter_jogador(
        token
    ):

        if not token.startswith(
            "mock-token-"
        ):

            return None

        try:

            jogador_id = int(
                token.replace(
                    "mock-token-",
                    ""
                )
            )

            for user in MockAuth.usuarios:

                if user["id"] == jogador_id:

                    return {

                        "id": user["id"],
                        "nome": user["nome"],
                        "email": user["email"]
                    }

        except:

            return None

        return None