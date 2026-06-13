from database import get_connection

class JogadorRepository:

    def listar_todos(self):
        conn = get_connection()

        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM jogador")

        jogadores = cursor.fetchall()

        cursor.close()
        conn.close()

        return jogadores