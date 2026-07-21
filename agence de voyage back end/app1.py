# ==========================================================
# IMPORTS
# ==========================================================

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from urllib.parse import urlparse

from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


# ==========================================================
# CONFIGURATION DE L'APPLICATION
# ==========================================================

app = Flask(__name__)

# Autorise les requêtes provenant du frontend (React)
CORS(app)

# Base de données SQLite
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///travel.db"

# Désactive le suivi des modifications (plus rapide)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# ==========================================================
# CONFIGURATION SQLALCHEMY
# ==========================================================

class Base(DeclarativeBase):
    """Classe de base utilisée par SQLAlchemy."""
    pass


db = SQLAlchemy(model_class=Base)
db.init_app(app)


# ==========================================================
# MODELE TRIP
# ==========================================================

class Trip(db.Model):

    __tablename__ = "trips"

    # Identifiant
    id: Mapped[int] = mapped_column(primary_key=True)

    # Informations générales
    title: Mapped[str] = mapped_column(String(100))
    destination: Mapped[str] = mapped_column(String(100))
    country: Mapped[str] = mapped_column(String(2))
    description: Mapped[str] = mapped_column(String(255))

    # Informations du voyage
    price: Mapped[float] = mapped_column()
    duration: Mapped[int] = mapped_column()
    travel_type: Mapped[str] = mapped_column(String(20))

    # Chemin de l'image Unsplash
    # Exemple :
    # /photo-1500530855697-b586d89ba3ee
    image_filename: Mapped[str] = mapped_column(String(150))

    # Disponibilité
    is_available: Mapped[bool] = mapped_column(default=True)

    # ------------------------------------------------------
    # Conversion de l'objet Trip en dictionnaire JSON
    # ------------------------------------------------------

    def to_dict(self):

        return {
            "id": self.id,
            "title": self.title,
            "destination": self.destination,
            "country": self.country,
            "description": self.description,
            "price": self.price,
            "duration": self.duration,
            "travel_type": self.travel_type,

            # Reconstitue automatiquement l'URL complète
            "image_url": f"https://images.unsplash.com{self.image_filename}",

            "is_available": self.is_available
        }


# ==========================================================
# CREATION DES TABLES
# ==========================================================

with app.app_context():
    db.create_all()


# ==========================================================
# VALIDATION DES DONNEES
# ==========================================================

def validate_body(body: dict):

    # Vérifie que le JSON existe
    if body is None:
        return "JSON invalide"

    # Champs obligatoires
    mandatory_fields = {
        "title": str,
        "destination": str,
        "country": str,
        "description": str,
        "price": (int, float),
        "duration": int,
        "travel_type": str,
        "image": str
    }

    # Vérifie chaque champ
    for field, expected_type in mandatory_fields.items():

        if field not in body:
            return f"Le champ '{field}' est requis"

        if not isinstance(body[field], expected_type):
            return f"Le champ '{field}' n'est pas du bon type"

    # -------------------------
    # Validation du titre
    # -------------------------

    if not (1 <= len(body["title"]) <= 100):
        return "Titre invalide"

    # -------------------------
    # Validation du pays
    # -------------------------

    body["country"] = body["country"].strip().upper()

    if len(body["country"]) != 2:
        return "Le code pays doit contenir 2 lettres"

    # -------------------------
    # Validation du prix
    # -------------------------

    if body["price"] <= 0:
        return "Le prix doit être supérieur à 0"

    # -------------------------
    # Validation de la durée
    # -------------------------

    if body["duration"] <= 0:
        return "La durée doit être supérieure à 0"

    # -------------------------
    # Validation du type
    # -------------------------

    allowed_types = [
        "city",
        "nature",
        "beach",
        "adventure"
    ]

    if body["travel_type"] not in allowed_types:
        return "Type de voyage invalide"

    # -------------------------
    # Validation de l'image
    # -------------------------

    parsed = urlparse(body["image"])

    if "images.unsplash.com" not in parsed.netloc:
        return "L'image doit provenir de Unsplash"

    if parsed.path == "":
        return "URL d'image invalide"

    # Tout est correct
    return None

# ==========================================================
# ROUTE D'ACCUEIL
# ==========================================================

@app.route("/")
def home():
    """Vérifie que l'API fonctionne."""
    return "Bienvenue sur mon API de voyages !"


# ==========================================================
# GET /trips
# Retourne tous les voyages
# ==========================================================

@app.route("/trips", methods=["GET"])
def list_trips():

    # SELECT * FROM trips ORDER BY id
    statement = db.select(Trip).order_by(Trip.id)

    # Exécute la requête
    trips = db.session.execute(statement).scalars().all()

    # Conversion des objets Trip en JSON
    return jsonify([trip.to_dict() for trip in trips])


# ==========================================================
# GET /trips/<id>
# Retourne un voyage par son identifiant
# ==========================================================

@app.route("/trips/<int:trip_id>", methods=["GET"])
def get_trip(trip_id):

    # Recherche du voyage
    trip = db.session.get(Trip, trip_id)

    # Vérifie si le voyage existe
    if trip is None:
        return jsonify({"error": "Trip not found"}), 404

    return jsonify(trip.to_dict())


# ==========================================================
# POST /trips
# Création d'un nouveau voyage
# ==========================================================

@app.route("/trips", methods=["POST"])
def create_trip():

    # Récupère le JSON envoyé par le frontend
    body = request.get_json(silent=True)

    # Validation des données
    error = validate_body(body)

    if error:
        return jsonify({"error": error}), 400

    # Analyse de l'URL de l'image
    parsed_image = urlparse(body["image"])

    # On conserve uniquement le chemin
    # Exemple :
    # https://images.unsplash.com/photo-12345
    # devient
    # /photo-12345
    image_filename = parsed_image.path

    # Création du voyage
    trip = Trip(
        title=body["title"].strip(),
        destination=body["destination"].strip(),
        country=body["country"].upper(),
        description=body["description"].strip(),
        price=float(body["price"]),
        duration=int(body["duration"]),
        travel_type=body["travel_type"],
        image_filename=image_filename,
        is_available=body.get("is_available", True)
    )

    # Ajout dans la base
    db.session.add(trip)

    # Sauvegarde
    db.session.commit()

    # Retourne le voyage créé
    return jsonify(trip.to_dict()), 201

# ==========================================================
# PUT /trips/<id>
# Modifier un voyage existant
# ==========================================================

@app.route("/trips/<int:trip_id>", methods=["PUT"])
def update_trip(trip_id):

    # Recherche du voyage
    trip = db.session.get(Trip, trip_id)

    # Vérifie que le voyage existe
    if trip is None:
        return jsonify({"error": "Trip not found"}), 404

    # Récupération du JSON
    body = request.get_json(silent=True)

    # Validation des données
    error = validate_body(body)

    if error:
        return jsonify({"error": error}), 400

    # Analyse de l'URL de l'image
    parsed_image = urlparse(body["image"])

    # Mise à jour des informations
    trip.title = body["title"].strip()
    trip.destination = body["destination"].strip()
    trip.country = body["country"].upper()
    trip.description = body["description"].strip()
    trip.price = float(body["price"])
    trip.duration = int(body["duration"])
    trip.travel_type = body["travel_type"]
    trip.image_filename = parsed_image.path
    trip.is_available = body.get("is_available", True)

    # Sauvegarde des modifications
    db.session.commit()

    # Retourne le voyage modifié
    return jsonify(trip.to_dict())


# ==========================================================
# DELETE /trips/<id>
# Supprimer un voyage
# ==========================================================

@app.route("/trips/<int:trip_id>", methods=["DELETE"])
def delete_trip(trip_id):

    # Recherche du voyage
    trip = db.session.get(Trip, trip_id)

    # Vérifie qu'il existe
    if trip is None:
        return jsonify({"error": "Trip not found"}), 404

    # Suppression
    db.session.delete(trip)

    # Validation
    db.session.commit()

    # Réponse HTTP 204 = suppression réussie
    return "", 204


# ==========================================================
# LANCEMENT DU SERVEUR
# ==========================================================

if __name__ == "__main__":

    # Lance Flask en mode développement
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )