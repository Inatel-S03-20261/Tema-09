from repositories.jogador_repository import JogadorRepository

class JogadorService:

    def __init__(self):
        self.repository = JogadorRepository()

    def listar_jogadores(self):
        return self.repository.listar_todos()