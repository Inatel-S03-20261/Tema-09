from flask import Blueprint
from flask import request
from flask import jsonify

from services.autenticacao_service import AutenticacaoService

auth_bp = Blueprint(
    "auth",
    __name__
)

service = AutenticacaoService()


@auth_bp.route(
    "/auth/login",
    methods=["POST"]
)
def login():

    body = request.get_json()

    usuario = body.get("usuario")
    senha = body.get("senha")

    resultado = service.login(
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

    if token and token.startswith("Bearer "):
        token = token.replace(
            "Bearer ",
            ""
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

    if token and token.startswith("Bearer "):
        token = token.replace(
            "Bearer ",
            ""
        )

    resultado = service.obter_jogador(
        token
    )

    return jsonify(resultado)