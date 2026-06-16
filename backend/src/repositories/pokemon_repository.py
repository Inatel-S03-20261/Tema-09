from database import get_connection


class PokemonRepository:

    def listar_todos(self):

        conn = get_connection()

        cursor = conn.cursor(
            dictionary=True
        )

        cursor.execute(
            """
            SELECT *
            FROM pokemon
            ORDER BY idpokemon
            """
        )

        pokemon = cursor.fetchall()

        cursor.close()

        return pokemon

    def buscar_por_id(
        self,
        pokemon_id
    ):

        conn = get_connection()

        cursor = conn.cursor(
            dictionary=True
        )

        cursor.execute(
            """
            SELECT *
            FROM pokemon
            WHERE idpokemon = %s
            """,
            (pokemon_id,)
        )

        pokemon = cursor.fetchone()

        cursor.close()

        return pokemon


    def salvar(
        self,
        pokemon
    ):

        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO pokemon
            (
                idpokemon,
                nome,
                tipo_principal,
                tipo_secundario,
                imagem_url,
                descricao
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s,
                %s,
                %s
            )
            """,
            (
                pokemon["id"],
                pokemon["nome"],
                pokemon["tipo_principal"],
                pokemon["tipo_secundario"],
                pokemon["imagem_url"],
                pokemon["descricao"]
            )
        )

        conn.commit()

        cursor.close()
