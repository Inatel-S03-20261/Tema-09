from flask import Flask
from flask_cors import CORS

from controllers.autenticacao_controller import auth_bp
from controllers.jogador_controller import jogador_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(jogador_bp)

if __name__ == "__main__":
    app.run(debug=True)