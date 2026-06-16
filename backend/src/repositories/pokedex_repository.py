from database import get_connection


class PokedexRepository:

    def buscar_por_jogador(
        self,
        jogador_id
    ):

        conn = get_connection()

        cursor = conn.cursor(
            dictionary=True
        )

        cursor.execute(
            """
            SELECT *
            FROM pokedex
            WHERE jogador_idjogador = %s
            """,
            (jogador_id,)
        )

        pokedex = cursor.fetchone()

        cursor.close()

        return pokedex


    def criar(
        self,
        jogador_id
    ):

        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO pokedex
            (
                idpokedex,
                jogador_idjogador
            )
            VALUES
            (
                %s,
                %s
            )
            """,
            (
                jogador_id,
                jogador_id
            )
        )

        conn.commit()

        cursor.close()

    def atualizar_estatisticas(
        self,
        jogador_id
    ):

        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT COUNT(DISTINCT cc.pokemon_idpokemon)
            FROM cartaconhecida cc

            INNER JOIN pokedex pd
                ON pd.idpokedex =
                cc.pokedex_idpokedex

            WHERE pd.jogador_idjogador = %s
            """,
            (jogador_id,)
        )

        total_conhecidas = (
            cursor.fetchone()[0]
        )

        cursor.execute(
            """
            SELECT COUNT(*)
            FROM cartaconhecida cc

            INNER JOIN pokedex pd
                ON pd.idpokedex =
                cc.pokedex_idpokedex

            WHERE pd.jogador_idjogador = %s
            AND cc.possui_atualmente = TRUE
            """,
            (jogador_id,)
        )

        total_atuais = (
            cursor.fetchone()[0]
        )

        cursor.execute(
            """
            UPDATE pokedex
            SET
                total_cartas_atualmente = %s,
                total_cartas_conhecidas = %s
            WHERE jogador_idjogador = %s
            """,
            (
                total_atuais,
                total_conhecidas,
                jogador_id
            )
        )

        conn.commit()

        cursor.close()
