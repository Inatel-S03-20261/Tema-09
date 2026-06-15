from repositories.carta_conhecida_repository import CartaConhecidaRepository

class HistoricoService:

    def __init__(self):
        self.repository = CartaConhecidaRepository()

    def listar_historico(self):
        return self.repository.listar_todas()