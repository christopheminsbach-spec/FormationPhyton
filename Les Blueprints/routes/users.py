# Import de Blueprint et jsonify depuis Flask
from flask import Blueprint, jsonify


# Création du Blueprint utilisateur
# Toutes les routes commenceront par /users
users_bp = Blueprint(
    "users",
    __name__,
    url_prefix="/users"
)


# Liste temporaire des utilisateurs
# Dans une vraie application, ces données viendraient d'une base de données
users = [
    {
        "id": 1,
        "name": "Jean", "email": "jean@gmail.com",
        "age": 24
    },
    {
        "id": 2,
        "name": "paul", "email": "paul@gmail.com",
        "age": 35
    },
    {
        "id": 3,
        "name": "michelk", "email": "michel@gmail.com",
        "age": 43
    },
    {
        "id": 4,
        "name": "herver", "email": "herver@gmail.com",
        "age": 23
    },
]


# ==========================
# GET : Récupérer tous les utilisateurs
# URL finale : GET /users/
# ==========================
@users_bp.get("/")
def list_users():

    # Retourne la liste des utilisateurs en JSON
    return jsonify(users)


# ==========================
# GET : Récupérer un utilisateur par son ID
# URL finale : GET /users/<id>
# Exemple : GET /users/2
# ==========================
@users_bp.get("/<int:user_id>")
def get_user(user_id: int):

    # Recherche de l'utilisateur dans la liste
    for user in users:

        # Vérifie si l'identifiant correspond
        if user["id"] == user_id:

            # Retourne l'utilisateur trouvé
            return jsonify(user)

    # Aucun utilisateur trouvé
    return jsonify({
        "error": "Utilisateur introuvable"
    }), 404