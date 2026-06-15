from repositories.pokemon_repository import PokemonRepository

class PokemonService:

    def __init__(self):
        self.repository = PokemonRepository()

    def listar_pokemon(self):
        return self.repository.listar_todos()