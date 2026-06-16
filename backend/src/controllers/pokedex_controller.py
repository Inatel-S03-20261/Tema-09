from flask import Blueprint
from flask import jsonify
from flask import request

from services.pokedex_service import (
    PokedexService
)


pokedex_bp = Blueprint(
    "pokedex",
    __name__
)

service = PokedexService()


def responder(
    resultado
):

    if isinstance(
        resultado,
        tuple
    ):

        corpo, status = resultado

        return jsonify(corpo), status

    return jsonify(resultado)


@pokedex_bp.route(
    "/pokemon",
    methods=["GET"]
)
def listar_pokemon():

    return responder(
        service.listar_pokemon()
    )


@pokedex_bp.route(
    "/pokedex",
    methods=["GET"]
)
def listar_pokedex():

    token = request.headers.get(
        "Authorization"
    )

    return responder(
        service.visualizar_pokedex(
            token
        )
    )


@pokedex_bp.route(
    "/cartas",
    methods=["GET"]
)
def listar_cartas():

    token = request.headers.get(
        "Authorization"
    )

    return responder(
        service.listar_cartas(
            token
        )
    )


@pokedex_bp.route(
    "/historico",
    methods=["GET"]
)
def listar_historico():

    token = request.headers.get(
        "Authorization"
    )

    return responder(
        service.listar_historico(
            token
        )
    )
