import mysql.connector


class DatabaseConnection:

    _instance = None

    def __init__(self):

        self.connection = None

    @classmethod
    def get_instance(cls):

        if cls._instance is None:

            cls._instance = DatabaseConnection()

        return cls._instance

    def get_connection(self):

        if (
            self.connection is None
            or not self.connection.is_connected()
        ):

            self.connection = mysql.connector.connect(
                host="localhost",
                user="root",
                password="root",
                database="pokedex_db"
            )

        return self.connection


def get_connection():

    return (
        DatabaseConnection
        .get_instance()
        .get_connection()
    )
