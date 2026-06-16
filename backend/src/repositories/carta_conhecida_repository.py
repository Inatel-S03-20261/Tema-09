from database import get_connection


class CartaConhecidaRepository:

    def listar_todas(self):

        conn = get_connection()

        cursor = conn.cursor(
            dictionary=True
        )

        cursor.execute(
            "SELECT * FROM cartaconhecida"
        )

        cartas = cursor.fetchall()

        cursor.close()

        return cartas


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
                cc.*,
                p.nome AS pokemon_nome,
                p.tipo_principal,
                p.tipo_secundario,
                p.imagem_url
            FROM cartaconhecida cc

            INNER JOIN pokedex pd
                ON pd.idpokedex =
                cc.pokedex_idpokedex

            INNER JOIN pokemon p
                ON p.idpokemon =
                cc.pokemon_idpokemon

            WHERE pd.jogador_idjogador = %s
            """,
            (jogador_id,)
        )

        cartas = cursor.fetchall()

        cursor.close()

        return cartas
    
    def salvar_cartas(
        self,
        jogador_id,
        cartas
    ):

        for carta in cartas:

            self.adicionar_posse(
                jogador_id,
                carta["pokemon_id"],
                carta["origem"]
            )

    def remover_posse(
        self,
        jogador_id,
        pokemon_id
    ):

        conn = get_connection()

        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE cartaconhecida cc

            INNER JOIN pokedex pd
                ON pd.idpokedex =
                cc.pokedex_idpokedex

            SET
                cc.possui_atualmente = FALSE,
                cc.data_ultima_atualizacao = NOW()

            WHERE pd.jogador_idjogador = %s
            AND cc.pokemon_idpokemon = %s
            """,
            (
                jogador_id,
                pokemon_id
            )
        )

        conn.commit()

        cursor.close()

    def adicionar_posse(
        self,
        jogador_id,
        pokemon_id,
        origem="Troca"
    ):

        conn = get_connection()

        cursor = conn.cursor(
            dictionary=True
        )

        cursor.execute(
            """
            SELECT
                cc.idcartaConhecida
            FROM cartaconhecida cc

            INNER JOIN pokedex pd
                ON pd.idpokedex =
                cc.pokedex_idpokedex

            WHERE pd.jogador_idjogador = %s
            AND cc.pokemon_idpokemon = %s
            """,
            (
                jogador_id,
                pokemon_id
            )
        )

        carta = cursor.fetchone()

        #
        # Já conhece o pokemon
        #

        if carta:

            cursor.execute(
                """
                UPDATE cartaconhecida cc

                INNER JOIN pokedex pd
                    ON pd.idpokedex =
                    cc.pokedex_idpokedex

                SET
                    cc.possui_atualmente = TRUE,
                    cc.ja_possui = TRUE,
                    cc.data_ultima_atualizacao = NOW()

                WHERE pd.jogador_idjogador = %s
                AND cc.pokemon_idpokemon = %s
                """,
                (
                    jogador_id,
                    pokemon_id
                )
            )

        #
        # Nunca viu esse pokemon
        #

        else:

            cursor.execute(
                """
                SELECT idpokedex
                FROM pokedex
                WHERE jogador_idjogador = %s
                """,
                (jogador_id,)
            )

            pokedex = cursor.fetchone()

            if not pokedex:

                cursor.close()

                return

            cursor.execute(
                """
                INSERT INTO cartaconhecida
                (
                    data_primeiro_contato,
                    origem,
                    ja_possui,
                    possui_atualmente,
                    data_ultima_atualizacao,
                    pokedex_idpokedex,
                    pokemon_idpokemon
                )
                VALUES
                (
                    NOW(),
                    %s,
                    TRUE,
                    TRUE,
                    NOW(),
                    %s,
                    %s
                )
                """,
                (
                    origem,
                    pokedex["idpokedex"],
                    pokemon_id
                )
            )

        conn.commit()

        cursor.close()

    def possui_carta(
        self,
        jogador_id,
        pokemon_id
    ):

        conn = get_connection()

        cursor = conn.cursor(
            dictionary=True
        )

        cursor.execute(
            """
            SELECT
                cc.idcartaConhecida

            FROM cartaconhecida cc

            INNER JOIN pokedex pd
                ON pd.idpokedex =
                cc.pokedex_idpokedex

            WHERE pd.jogador_idjogador = %s
            AND cc.pokemon_idpokemon = %s
            AND cc.possui_atualmente = TRUE
            """,
            (
                jogador_id,
                pokemon_id
            )
        )

        carta = cursor.fetchone()

        cursor.close()

        return carta is not None
