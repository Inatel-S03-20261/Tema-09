from clients.auth_service_client import AuthServiceClient
from clients.troca_client import (
    TrocaClient
)


class ClientFactory:

    @staticmethod
    def create_auth_client():

        return AuthServiceClient()

    @staticmethod
    def create_troca_client():

        return TrocaClient()
