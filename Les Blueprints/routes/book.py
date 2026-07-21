# Import de Blueprint et jsonify depuis Flask
from flask import Blueprint, jsonify

# Import des fonctions utilitaires
from utils import get_error

# Création du Blueprint
book_bp = Blueprint(
    "book",
    __name__,
    url_prefix="/books"
)


# ==========================
# Données temporaires
# (À remplacer par une base de données)
# ==========================

books = [
    {
        "id": 1,
        "title": "The Little Prince",
        "author": "Antoine de Saint-Exupéry",
        "year": 1988,
        "price": 9.99
    },
    {
        "id": 2,
        "title": "Harry Potter and the Philosopher's Stone",
        "author": "J.K. Rowling",
        "year": 1997,
        "price": 12.99
    },
    {
        "id": 3,
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "year": 1937,
        "price": 15.50
    },
    {
        "id": 4,
        "title": "1984",
        "author": "George Orwell",
        "year": 1949,
        "price": 8.99
    }
]


# ==========================
# GET : Tous les livres
# URL : GET /books/
# ==========================

@book_bp.get("/")
def list_books():
    """Retourne la liste de tous les livres."""
    return jsonify(books)


# ==========================
# GET : Un livre par son identifiant
# URL : GET /books/<book_id>
# ==========================

@book_bp.get("/<int:book_id>")
def get_book(book_id: int):
    """Retourne un livre à partir de son identifiant."""

    for book in books:
        if book["id"] == book_id:
            return jsonify(book)

    return get_error("BOOK_NOT_FOUND")