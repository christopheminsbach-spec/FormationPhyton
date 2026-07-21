from flask import Flask, jsonify

# Import de SQLAlchemy et des modèles Courses et Participants
from database import db, Courses, Participants
from sqlalchemy import select

# Import de la configuration de l'application
from config import Config

# Import des fonctions utilitaires pour gérer les erreurs,
# récupérer les données JSON et valider les cours et participants
from utils import get_error, get_json_body, validate_course_body, validate_participant_body

# Import des Blueprints contenant les routes supplémentaires
from routes.courses import course_bp
from routes.participants import participant_bp


# Création de l'application Flask
app = Flask(__name__)


# Chargement de la configuration dans l'application
app.config.from_object(Config)


# Connexion de SQLAlchemy à l'application Flask
db.init_app(app)


# Création automatique des tables dans la base de données
# si elles n'existent pas encore
with app.app_context():
    db.create_all()


# Enregistrement des Blueprints pour utiliser leurs routes
app.register_blueprint(course_bp)
app.register_blueprint(participant_bp)



# ==========================
# Route : Ajouter un nouveau cours
# ==========================

@app.post("/courses")
def create_course():

    # Récupération des données JSON envoyées par le client
    body = get_json_body()

    # Vérification que les données reçues sont valides
    validation_error = validate_course_body(body)

    # Retourne une erreur si la validation échoue
    if validation_error:
        return get_error(validation_error)

    # Création d'un nouvel objet cours
    course = Courses()

    # Remplissage du cours avec les données reçues
    course.from_body(body)

    # Ajout du cours dans la base de données
    db.session.add(course)

    # Validation et sauvegarde des modifications
    db.session.commit()

    # Retourne le cours créé avec le code HTTP 201 (Created)
    return jsonify(course.to_dict()), 201



# ==========================
# Route : Page d'accueil de l'API
# ==========================

@app.get("/")
def home():

    # Message permettant de vérifier que l'API fonctionne
    return jsonify({
        "message": "API Studio en fonctionnement"
    })


# ==========================
# UPDATE : Modifier un participant
# ==========================

@app.put("/courses/<int:course_id>/participants/<int:part_id>")
def update_participant(course_id: int, part_id: int):

    # Recherche du cours
    course = db.session.scalar(
        select(Courses).where(Courses.id == course_id)
    )

    # Vérifie que le cours existe
    if course is None:
        return get_error("COURSE_NOT_FOUND")

    # Recherche du participant
    participant = db.session.scalar(
        select(Participants).where(Participants.id == part_id)
    )

    # Vérifie que le participant existe
    # et qu'il appartient au cours
    if participant is None or participant.course_id != course_id:
        return get_error("PARTICIPANT_NOT_FOUND")

    # Lecture du corps JSON
    body = get_json_body()

    if body is None:
        return get_error("INVALID_BODY")

    # Validation des données
    validation_error = validate_participant_body(body)

    if validation_error:
        return get_error(validation_error)

    # Mise à jour
    participant.lastname = body["lastname"]
    participant.firstname = body["firstname"]
    participant.age = body["age"]

    # Sauvegarde
    db.session.commit()

    # Réponse
    return jsonify(participant.to_dict()), 200



# ==========================
# Route : Supprimer un participant d'un cours
# ==========================

@app.delete("/courses/<int:course_id>/participants/<int:part_id>")
def delete_participant(course_id: int, part_id: int):

    # Recherche du cours concerné
    course = db.session.get(
        Courses,
        course_id
    )

    # Vérifie que le cours existe
    if course is None:
        return get_error("COURSE_NOT_FOUND")


    # Recherche du participant
    participant = db.session.get(
        Participants,
        part_id
    )

    # Vérifie que le participant existe
    if participant is None:
        return get_error("PARTICIPANT_NOT_FOUND")


    # Vérifie que le participant appartient bien au cours
    if participant.course_id != course_id:
        return get_error(
            "PARTICIPANT_NOT_IN_COURSE"
        )


    # Suppression du participant
    db.session.delete(participant)


    # Validation de la suppression
    db.session.commit()


    # Réponse HTTP 204 :
    # suppression réussie sans contenu retourné
    return "", 204



# ==========================
# Lancement du serveur Flask
# ==========================

# Exécute le serveur uniquement si ce fichier est lancé directement
if __name__ == "__main__":

    # Démarrage du serveur en mode debug
    app.run(debug=True)