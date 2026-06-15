from repositories.carta_conhecida_repository import CartaConhecidaRepository

class CartasService:

    def __init__(self):
        self.repository = CartaConhecidaRepository()

    def listar_cartas_conhecidas(self):
        return self.repository.listar_todas()