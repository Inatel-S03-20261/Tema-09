from database import get_connection


class JogadorRepository:

    def buscar_por_id(
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
            FROM jogador
            WHERE idjogador = %s
            """,
            (jogador_id,)
        )

        jogador = cursor.fetchone()

        cursor.close()

        return jogador


    def salvar(
        self,
        jogador
    ):

        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO jogador
            (
                idjogador,
                nome,
                email
            )
            VALUES
            (
                %s,
                %s,
                %s
            )
            """,
            (
                jogador["id"],
                jogador["nome"],
                jogador["email"]
            )
        )

        conn.commit()

        cursor.close()
