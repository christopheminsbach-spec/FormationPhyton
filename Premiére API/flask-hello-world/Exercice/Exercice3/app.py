from flask import Flask, request

app = Flask(__name__)

@app.route("/search")
def search():
    # Récupération des paramètres de la query string
    q = request.args.get("q", "aucune recherche")
    page = int(request.args.get("page", 1))

    return f"Recherche de {q}, page {page}"

if __name__ == "__main__":
    app.run(debug=True)


    """
    Tests
    URL	Résultat attendu
    http://127.0.0.1:5000/search	Recherche de aucune recherche, page 1
    http://127.0.0.1:5000/search?q=flask	Recherche de flask, page 1
    http://127.0.0.1:5000/search?q=flask&page=3	Recherche de flask, page 3
    Remarque

    Si vous testez une URL comme :

    http://127.0.0.1:5000/search?q=python&page=abc

    int("abc") provoquera une erreur ValueError, car "abc" ne peut pas être converti en entier.
    
    """