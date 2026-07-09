from flask import Flask, request

app = Flask(__name__)

# Liste des films
movies = [
    {"id": 1, "title": "Inception", "director": "Christopher Nolan"},
    {"id": 2, "title": "Interstellar", "director": "Christopher Nolan"},
    {"id": 3, "title": "Avatar", "director": "James Cameron"},
]

# Page d'accueil
@app.route("/")
def home():
    return "Bienvenue sur le catalogue de films !"

# Route statique
@app.route("/about")
def about():
    return "Cette application présente une petite liste de films."

# Route dynamique (texte)
@app.route("/hello/<name>")
def hello(name):
    return f"Bonjour {name} !"

# Liste des films
@app.route("/movies")
def get_movies():
    result = ""
    for movie in movies:
        result += f"{movie['id']} - {movie['title']} ({movie['director']})<br>"
    return result

# Détail d'un film (paramètre entier)
@app.route("/movies/<int:movie_id>")
def get_movie(movie_id):
    for movie in movies:
        if movie["id"] == movie_id:
            return (
                f"Titre : {movie['title']}<br>"
                f"Réalisateur : {movie['director']}"
            )

    return "Film introuvable", 404

# Recherche avec query string
@app.route("/search")
def search():
    title = request.args.get("title", "aucune recherche")
    return f"Recherche du film : {title}"


if __name__ == "__main__":
    app.run(debug=True)


    """
    Tests à effectuer
     URL	Résultat attendu
     http://127.0.0.1:5000/	Bienvenue sur le catalogue de films !
     http://127.0.0.1:5000/about	Présentation de l'application
     http://127.0.0.1:5000/hello/Alice	Bonjour Alice !
     http://127.0.0.1:5000/movies	Affiche la liste des films
     http://127.0.0.1:5000/movies/1	Détail du film Inception
     http://127.0.0.1:5000/movies/999	Film introuvable avec le code 404
     http://127.0.0.1:5000/search?title=Avatar	Recherche du film : Avatar
    http://127.0.0.1:5000/search
    
    """