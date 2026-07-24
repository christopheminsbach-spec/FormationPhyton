from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from database import db


# Models
from models.Profile import Profile
from models.Application import Application
from models.Skill import Skill



app = Flask(__name__)

app.config.from_object(Config)


CORS(app)


db.init_app(app)



# ==========================
# Import des modèles
# ==========================

from models.Profile import Profile
from models.Application import Application
from models.Skill import Skill



# ==========================
# Import des routes
# ==========================

from routes.applications import application_bp
from routes.profile import profile_bp
from routes.analysis import ai_bp



# Enregistrement Blueprints

app.register_blueprint(
    application_bp
)


app.register_blueprint(
    profile_bp
)


app.register_blueprint(
    ai_bp
)



# ==========================
# Création base données
# ==========================

with app.app_context():

    db.create_all()



# ==========================
# Route accueil API
# ==========================

@app.route("/")
def home():

    return jsonify({

        "application":
        "CareerAI Assistant",

        "version":
        "1.0",

        "status":
        "API active"

    })



# ==========================
# Initialisation données test
# ==========================

@app.route("/init")
def init_data():


    if Application.query.count() == 0:


        applications = [

            Application(
                company="ENGIE Home Services",
                position="Développeur IA",
                status="Envoyée",
                date="23/07/2026"
            ),


            Application(
                company="ESN Metz",
                position="Développeur Flask Python",
                status="Entretien",
                date="25/07/2026"
            ),


            Application(
                company="Entreprise Data",
                position="Concepteur Développeur IA",
                status="En attente",
                date="30/07/2026"
            )

        ]


        db.session.add_all(
            applications
        )

        db.session.commit()


        return {

            "message":
            "Données créées"

        }


    return {

        "message":
        "Données déjà présentes"

    }



# ==========================
# Gestion erreurs
# ==========================

@app.errorhandler(404)
def not_found(error):

    return jsonify({

        "error":
        "Route inexistante"

    }),404



@app.errorhandler(500)
def server_error(error):

    return jsonify({

        "error":
        "Erreur serveur"

    }),500




# ==========================
# Lancement serveur
# ==========================

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5001,

        debug=True

    )