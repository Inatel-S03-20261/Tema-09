from flask import Blueprint, jsonify

from services.jogador_service import JogadorService

jogador_bp = Blueprint("jogador", __name__)

service = JogadorService()

@jogador_bp.route("/jogadores", methods=["GET"])
def listar_jogadores():
    return jsonify(service.listar_jogadores())