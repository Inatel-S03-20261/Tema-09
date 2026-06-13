from database import get_connection

class CartaConhecidaRepository:

    def listar_todas(self):
        conn = get_connection()

        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM cartaconhecida")

        cartas = cursor.fetchall()

        cursor.close()
        conn.close()

        return cartas