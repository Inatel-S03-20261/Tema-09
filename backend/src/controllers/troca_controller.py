from flask import Blueprint
from flask import jsonify
from flask import request

from services.pokedex_service import (
    PokedexService
)

troca_bp = Blueprint(
    "troca",
    __name__
)

service = PokedexService()


@troca_bp.route(
    "/trocas/sincronizar",
    methods=["POST"]
)
def sincronizar():

    token = request.headers.get(
        "Authorization"
    )

    resultado = (
        service.sincronizar_trocas(
            token
        )
    )

    return jsonify(
        resultado
    )
