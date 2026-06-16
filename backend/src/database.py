import mysql.connector

class DatabaseConnection:
    _instance = None

    @staticmethod
    def get_instance():
        if DatabaseConnection._instance is None:
            DatabaseConnection._instance = mysql.connector.connect(
                host="localhost",
                user="root",
                password="root",
                database="pokedex_db"
            )

        return DatabaseConnection._instance


def get_connection():
    return DatabaseConnection.get_instance()