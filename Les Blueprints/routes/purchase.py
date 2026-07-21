from flask import Blueprint, jsonify

from database import db
from models.purchase import Purchase
from models.book import Book
from models.user import User


purchase_bp = Blueprint(
    "purchase",
    __name__,
    url_prefix="/purchases"
)

# ==========================
# Acheter un livre
# POST /purchases/user/1/book/2
# ==========================

@purchase_bp.post("/user/<int:user_id>/book/<int:book_id>")
def buy_book(user_id, book_id):

    # Recherche utilisateur
    user = db.session.get(
        User,
        user_id
    )

    if user is None:
        return jsonify({
            "error": "USER_NOT_FOUND"
        }), 404
    
# Recherche livre
    book = db.session.get(
        Book,
        book_id
    )

    if book is None:
        return jsonify({
            "error": "BOOK_NOT_FOUND"
        }), 404



    # Création de l'achat
    purchase = Purchase(
        user_id=user.id,
        book_id=book.id
    )


    db.session.add(purchase)

    db.session.commit()



    return jsonify({
        "message": "Book purchased successfully",
        "purchase": {
            "user": user.username,
            "book": book.title
        }
    }), 201