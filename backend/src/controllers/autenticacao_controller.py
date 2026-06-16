from flask import Blueprint
from flask import request
from flask import jsonify

from services.pokedex_service import (
    PokedexService
)

auth_bp = Blueprint(
    "auth",
    __name__
)

service = PokedexService()


@auth_bp.route(
    "/auth/login",
    methods=["POST"]
)
def login():

    body = request.get_json()

    usuario = body.get("usuario")
    senha = body.get("senha")

    resultado = service.autenticar(
        usuario,
        senha
    )

    return jsonify(resultado)


@auth_bp.route(
    "/auth/validar",
    methods=["GET"]
)
def validar_token():

    token = request.headers.get(
        "Authorization"
    )

    resultado = service.validar_token(
        token
    )

    return jsonify(resultado)


@auth_bp.route(
    "/auth/jogador",
    methods=["GET"]
)
def obter_jogador():

    token = request.headers.get(
        "Authorization"
    )

    resultado = service.obter_jogador_por_token(
        token
    )

    return jsonify(resultado)
