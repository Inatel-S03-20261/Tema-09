class Pokemon:

    def __init__(
        self,
        idpokemon,
        nome,
        tipo_principal,
        tipo_secundario,
        imagem_url,
        descricao
    ):
        self.idpokemon = idpokemon
        self.nome = nome
        self.tipo_principal = tipo_principal
        self.tipo_secundario = tipo_secundario
        self.imagem_url = imagem_url
        self.descricao = descricao