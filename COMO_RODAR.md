# Como rodar backend e frontend juntos

Este projeto usa MySQL local. Nao precisa subir Docker para a apresentacao.

## 1. Configurar o banco local

Instale e abra o MySQL. Depois importe o script do banco:

```bash
mysql -u root -p < backend/database/pokedex_db.sql
```

O script ja cria o banco `pokedex_db`.

## 2. Configurar o backend

O backend le as configuracoes em `backend/.env`.

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=pokedex_db
```

Se a senha do MySQL for diferente, altere apenas `DB_PASSWORD` no seu computador.

Depois instale e execute:

```bash
cd backend
pip install -r requirements.txt
python src/app.py
```

No Windows, se o comando `python` nao existir, use:

```bash
py -m pip install -r requirements.txt
py src/app.py
```

O backend deve iniciar em:

```text
http://localhost:5000
```

## 3. Configurar o frontend

O frontend le a URL da API em `frontend/.env`.

```env
VITE_API_URL=http://localhost:5000
```

Depois rode:

```bash
cd frontend
npm install
npm run dev
```

Abra o endereco mostrado no terminal, geralmente:

```text
http://localhost:5173
```

## Observacao

Os arquivos `.env` ficam fora do Git para cada integrante poder usar sua propria senha e porta do MySQL sem alterar o codigo.
