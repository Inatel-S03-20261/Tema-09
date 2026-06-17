import requests


class PokeApiClient:

    BASE_URL = "https://pokeapi.co/api/v2"

    def obter_pokemon_basico(self, pokemon_id):

        try:

            response = requests.get(
                f"{self.BASE_URL}/pokemon/{pokemon_id}",
                timeout=5
            )

            if response.status_code != 200:
                return None

            data = response.json()
            tipos = data["types"]

            tipo_principal = (
                tipos[0]["type"]["name"]
                if len(tipos) > 0
                else None
            )

            tipo_secundario = (
                tipos[1]["type"]["name"]
                if len(tipos) > 1
                else None
            )

            return {
                "id": data["id"],
                "nome": data["name"],
                "tipo_principal": tipo_principal,
                "tipo_secundario": tipo_secundario,
                "imagem_url": self._obter_imagem(data),
                "descricao": None
            }

        except Exception as e:

            print(f"Erro ao consultar PokeAPI: {e}")
            return None

    def obter_detalhes_pokemon(self, pokemon_id):

        try:

            response = requests.get(
                f"{self.BASE_URL}/pokemon/{pokemon_id}",
                timeout=5
            )

            if response.status_code != 200:
                return None

            data = response.json()

            return {
                "id": data["id"],
                "nome": self.formatar_nome(data["name"]),
                "imagem": self._obter_imagem(data),
                "altura": data["height"] / 10,
                "peso": data["weight"] / 10,
                "tipos": [
                    tipo["type"]["name"]
                    for tipo in data["types"]
                ],
                "habilidades": [
                    self.formatar_nome(habilidade["ability"]["name"])
                    for habilidade in data["abilities"]
                ],
                "ataques": [
                    self.formatar_nome(ataque["move"]["name"])
                    for ataque in data["moves"][:10]
                ],
                "stats": [
                    {
                        "nome": stat["stat"]["name"],
                        "valor": stat["base_stat"]
                    }
                    for stat in data["stats"]
                ],
                "descricao": self.obter_descricao_pokemon(pokemon_id)
            }

        except Exception as e:

            print(f"Erro ao consultar PokeAPI: {e}")
            return None

    def obter_descricao_pokemon(self, pokemon_id):

        try:

            response = requests.get(
                f"{self.BASE_URL}/pokemon-species/{pokemon_id}",
                timeout=5
            )

            if response.status_code != 200:
                return "Descrição não encontrada."

            data = response.json()
            entradas = data.get("flavor_text_entries", [])

            entrada = self._buscar_descricao_por_idioma(entradas, "pt-BR")

            if not entrada:
                entrada = self._buscar_descricao_por_idioma(entradas, "pt")

            if not entrada:
                entrada = self._buscar_descricao_por_idioma(entradas, "en")

            if not entrada:
                return "Descrição não encontrada."

            return (
                entrada["flavor_text"]
                .replace("\f", " ")
                .replace("\n", " ")
                .replace("\r", " ")
                .strip()
            )

        except Exception as e:

            print(f"Erro ao consultar descrição na PokeAPI: {e}")
            return "Descrição não encontrada."

    def _buscar_descricao_por_idioma(self, entradas, idioma):

        for entrada in entradas:
            if entrada.get("language", {}).get("name") == idioma:
                return entrada

        return None

    def _obter_imagem(self, data):

        return (
            data.get("sprites", {})
            .get("other", {})
            .get("official-artwork", {})
            .get("front_default")
            or data.get("sprites", {}).get("front_default")
        )

    def formatar_nome(self, texto):

        return texto.replace("-", " ").title()