from repositories.pokedex_repository import PokedexRepository

class PokedexService:

    def __init__(self):
        self.repository = PokedexRepository()

    def listar_pokedex(self):
        return self.repository.listar_todas()