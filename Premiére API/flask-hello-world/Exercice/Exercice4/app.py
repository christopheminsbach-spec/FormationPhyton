from flask import Flask

app = Flask(__name__)

# Liste des livres
books = [
    {"id": 1, "title": "1984", "author": "George Orwell"},
    {"id": 2, "title": "Dune", "author": "Frank Herbert"},
    {"id": 3, "title": "Fondation", "author": "Isaac Asimov"},
]

# Route : afficher tous les livres
@app.route("/books")
def get_books():
    result = "<ul>"
    for book in books:
        result += f"<li><a href='/books/{book['id']}'>{book['id']} - {book['title']} ({book['author']})</a></li>"
    result += "</ul>"
    return result

# Route : afficher un livre par son id
@app.route("/books/<int:book_id>")
def get_book(book_id):
    for book in books:
        if book["id"] == book_id:
            return f"Titre : {book['title']}<br>Auteur : {book['author']}"

    return "Livre introuvable", 404


if __name__ == "__main__":
    app.run(debug=True)

    """
    Tests
     URL	Résultat attendu
    http://127.0.0.1:5000/books	      Affiche les 3 livres
    http://127.0.0.1:5000/books/1	  Titre : 1984 puis Auteur : George Orwell
    http://127.0.0.1:5000/books/999	  Livre introuvable

    """