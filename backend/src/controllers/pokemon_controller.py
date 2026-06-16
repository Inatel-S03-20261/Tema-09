from flask import Blueprint
from flask import jsonify
from flask import request

from services.pokedex_service import (
    PokedexService
)

pokemon_bp = Blueprint(
    "pokemon",
    __name__
)

service = PokedexService()


@pokemon_bp.route(
    "/pokemon/<int:pokemon_id>",
    methods=["GET"]
)
def obter_detalhes_pokemon(
    pokemon_id
):

    token = request.headers.get(
        "Authorization"
    )

    pokemon = (
        service.obter_detalhes_pokemon(
            token,
            pokemon_id
        )
    )

    return jsonify(
        pokemon
    )
