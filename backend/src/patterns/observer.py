class Observer:

    def atualizar(
        self,
        evento
    ):

        pass


class Subject:

    def __init__(self):

        self._observers = []

    def registrar_observer(
        self,
        observer
    ):

        self._observers.append(
            observer
        )

    def remover_observer(
        self,
        observer
    ):

        if observer in self._observers:

            self._observers.remove(
                observer
            )

    def notificar_observers(
        self,
        evento
    ):

        for observer in self._observers:

            observer.atualizar(
                evento
            )
