from flask import Blueprint, jsonify

from services.pokemon_service import PokemonService
from services.pokedex_service import PokedexService
from services.cartas_service import CartasService
from services.historico_service import HistoricoService

pokedex_bp = Blueprint("pokedex", __name__)

pokemon_service = PokemonService()
pokedex_service = PokedexService()
cartas_service = CartasService()
historico_service = HistoricoService()


@pokedex_bp.route("/pokemon", methods=["GET"])
def listar_pokemon():
    return jsonify(pokemon_service.listar_pokemon())


@pokedex_bp.route("/pokedex", methods=["GET"])
def listar_pokedex():
    return jsonify(pokedex_service.listar_pokedex())


@pokedex_bp.route("/cartas", methods=["GET"])
def listar_cartas():
    return jsonify(cartas_service.listar_cartas_conhecidas())


@pokedex_bp.route("/historico", methods=["GET"])
def listar_historico():
    return jsonify(historico_service.listar_historico())