# Import de la classe Flask
from flask import Flask, redirect, url_for
from flask_cors import CORS


# Import des Blueprints
# Chaque Blueprint contient ses propres routes
from routes.products import products_bp
from routes.users import users_bp
from routes.book import book_bp
from routes.purchase import purchase_bp



# ==========================
# Création de l'application Flask
# ==========================

app = Flask(__name__)
app = Flask(__name__)

CORS(app)


# ==========================
# Enregistrement des Blueprints
# ==========================

# Les routes définies dans les Blueprints
# deviennent accessibles dans l'application.
app.register_blueprint(products_bp)
app.register_blueprint(users_bp)
app.register_blueprint(book_bp)
app.register_blueprint(purchase_bp)




# ==========================
# Route de compatibilité Users
# Ancienne URL : /utilisateurs
# Redirige vers : /users/
# ==========================

@app.get("/utilisateurs")
def list_users_legacy():

    return redirect(
        url_for("users.list_users")
    )


# ==========================
# Route de compatibilité Books
# Ancienne URL : /book
# Redirige vers : /books/
# ==========================

@app.get("/book")
def list_book_legacy():

    return redirect(
        url_for("book.list_books")
    )


# ==========================
# Point d'entrée du programme
# ==========================

if __name__ == "__main__":

    # Lance le serveur Flask
    app.run(debug=True)