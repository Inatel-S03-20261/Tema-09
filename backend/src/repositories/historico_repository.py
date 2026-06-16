from database import get_connection


class HistoricoRepository:

    def registrar(
        self,
        jogador_id,
        pokemon_id,
        tipo_evento,
        origem,
        observacao
    ):

        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO historicocarta
            (
                data_evento,
                tipo_evento,
                origem,
                observacao,
                jogador_idjogador,
                pokemon_idpokemon
            )
            VALUES
            (
                NOW(),
                %s,
                %s,
                %s,
                %s,
                %s
            )
            """,
            (
                tipo_evento,
                origem,
                observacao,
                jogador_id,
                pokemon_id
            )
        )

        conn.commit()

        cursor.close()


    def listar_por_jogador(
        self,
        jogador_id
    ):

        conn = get_connection()

        cursor = conn.cursor(
            dictionary=True
        )

        cursor.execute(
            """
            SELECT
                h.*,
                p.nome AS pokemon_nome,
                p.imagem_url

            FROM historicocarta h

            INNER JOIN pokemon p
                ON p.idpokemon =
                h.pokemon_idpokemon

            WHERE h.jogador_idjogador = %s

            ORDER BY h.data_evento DESC
            """,
            (jogador_id,)
        )

        historico = cursor.fetchall()

        cursor.close()

        return historico
