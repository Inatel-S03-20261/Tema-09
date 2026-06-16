from repositories.pokemon_repository import (
    PokemonRepository
)

from clients.pokeapi_client import (
    PokeApiClient
)


class PokemonService:

    def __init__(self):

        self.repository = (
            PokemonRepository()
        )

        self.client = (
            PokeApiClient()
        )

    def listar_pokemon(self):

        return (
            self.repository
            .listar_todos()
        )

    def obter_ou_criar(
        self,
        pokemon_id
    ):

        pokemon = (
            self.repository
            .buscar_por_id(
                pokemon_id
            )
        )

        if pokemon:

            return pokemon

        pokemon = (
            self.client
            .obter_pokemon_basico(
                pokemon_id
            )
        )

        if not pokemon:

            return None

        self.repository.salvar(
            pokemon
        )

        return pokemon
    
    def obter_detalhes(
        self,
        pokemon_id
    ):

        return (
            self.client
            .obter_detalhes_pokemon(
                pokemon_id
            )
        )
