from flask import Flask, render_template, request

app = Flask(__name__)

movies = [
        {"title": "Inception", "year": 2010, "rating": 9},
        {"title": "Interstellar", "year": 2014, "rating": 8},
        {"title": "Matrix", "year": 1999, "rating": 10}
]
# Exercice 1 - Profil
@app.route("/profil")
def home():
    prenom = "Alice"
    age = 24
    ville = "Metz"
    connecte = True

    return render_template(
        "profil.html",
        prenom=prenom,
        age=age,
        ville=ville,
        connecte=connecte
    )

# Exercice 2 - Liste de films
@app.route("/films")
def films():
    return render_template("films.html", movies=movies)

# Exercice 3 - Détails d'un film
@app.route("/films/<int:movie_id>")
def film_details(movie_id):
    if 0 <= movie_id < len(movies):
        movie = movies[movie_id]
        return render_template("film_details.html", movie=movie)
    else:
        return "Film non trouvé", 404

#exercice 4 - Formulaire de recherche
@app.route("/search")
def search():
    products = ["Ordinateur", "Clavier", "Souris", "Ecran"]

    query = request.args.get("keyword", "")

    if query:
        results = [
            product for product in products
            if query.lower() in product.lower()
        ]
    else:
        results = products

    return render_template(
        "recherche.html",
        query=query,
        results=results
    )  


if __name__ == "__main__":
    app.run(debug=True)