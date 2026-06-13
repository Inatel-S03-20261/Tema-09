from database import get_connection

class PokedexRepository:

    def listar_todas(self):
        conn = get_connection()

        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM pokedex")

        pokedex = cursor.fetchall()

        cursor.close()
        conn.close()

        return pokedex