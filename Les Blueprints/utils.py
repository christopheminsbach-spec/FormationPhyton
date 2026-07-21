# Import des outils Flask
from flask import jsonify, request

# ==========================
# Dictionnaire des erreurs API
# ==========================

ERRORS = {

    # Livre introuvable
    "BOOK_NOT_FOUND": (
        "Livre introuvable",
        404
    ),

    # Corps JSON invalide
    "INVALID_BODY": (
        "Le corps de la requête est invalide",
        400
    ),

    # Champs obligatoires manquants
    "MISSING_FIELDS": (
        "Des champs obligatoires sont manquants",
        400
    ),

    # Titre invalide
    "INVALID_BOOK_TITLE": (
        "Le titre du livre est invalide",
        400
    ),

    # Auteur invalide
    "INVALID_BOOK_AUTHOR": (
        "L'auteur du livre est invalide",
        400
    ),

    # Année invalide
    "INVALID_BOOK_YEAR": (
        "L'année du livre est invalide",
        400
    ),

    # Prix invalide
    "INVALID_BOOK_PRICE": (
        "Le prix du livre est invalide",
        400
    ),
}

# ==========================
# Retourner une erreur JSON
# ==========================

def get_error(error_code):

    message, status_code = ERRORS.get(
        error_code,
        ("ERREUR inconnue", 500)
    )

    return jsonify({
        "error": error_code,
        "message": message
    }), status_code

# ==========================
# Récupérer le JSON envoyé
# ==========================

def get_json_body():

    data = request.get_json()

    if not data:
        return None

    return data

# ==========================
# Validation des données Book
# ==========================

def validate_book_body(data):

    # Vérification du JSON
    if data is None:
        return "INVALID_BODY"

    # Vérification des champs obligatoires
    required_fields = [
        "title",
        "author",
        "year",
        "price"
    ]

    for field in required_fields:
        if field not in data:
            return "MISSING_FIELDS"

    # Vérification du titre
    if (
        not isinstance(data["title"], str)
        or len(data["title"].strip()) < 2
    ):
        return "INVALID_BOOK_TITLE"

    # Vérification de l'auteur
    if (
        not isinstance(data["author"], str)
        or len(data["author"].strip()) < 2
    ):
        return "INVALID_BOOK_AUTHOR"

    # Vérification de l'année
    if (
        not isinstance(data["year"], int)
        or data["year"] < 0
    ):
        return "INVALID_BOOK_YEAR"

    # Vérification du prix
    if (
        not isinstance(data["price"], (int, float))
        or data["price"] < 0
    ):
        return "INVALID_BOOK_PRICE"
    
    # Tout est valide

    return None

