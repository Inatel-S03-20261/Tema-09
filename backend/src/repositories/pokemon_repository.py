from database import get_connection

class PokemonRepository:

    def listar_todos(self):
        conn = get_connection()

        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM pokemon")

        pokemon = cursor.fetchall()

        cursor.close()
        conn.close()

        return pokemon