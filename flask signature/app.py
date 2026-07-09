from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Mapped, mapped_column


app = Flask(__name__)


# ==========================
# Configuration
# ==========================

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///signatures.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db = SQLAlchemy(app)



# ==========================
# Modèle Base de données
# ==========================

class Signature(db.Model):

    __tablename__ = "signatures"


    id: Mapped[int] = mapped_column(
        primary_key=True
    )


    nom: Mapped[str] = mapped_column(
        db.String(100),
        nullable=False
    )


    prenom: Mapped[str] = mapped_column(
        db.String(100),
        nullable=False
    )


    poste: Mapped[str] = mapped_column(
        db.String(100),
        nullable=False
    )


    telephone: Mapped[str] = mapped_column(
        db.String(50),
        nullable=False
    )


    email: Mapped[str] = mapped_column(
        db.String(150),
        nullable=False
    )


    def __repr__(self):
        return f"<Signature {self.prenom} {self.nom}>"



# Création table

with app.app_context():
    db.create_all()



# ==========================
# Fonctions
# ==========================

def saisir_informations(form):

    nom = form.get("nom", "").strip()
    prenom = form.get("prenom", "").strip()
    poste = form.get("poste", "").strip()
    telephone = form.get("telephone", "").strip()
    email = form.get("email", "").strip()


    if nom == "":
        nom = "Dupont"


    if prenom == "":
        prenom = "Jean"


    if poste == "":
        poste = "Collaborateur"


    if telephone == "":
        telephone = "N/A"


    if email == "":
        email = f"{prenom.lower()}.{nom.lower()}@entreprise.com"


    return {
        "nom": nom,
        "prenom": prenom,
        "poste": poste,
        "telephone": telephone,
        "email": email
    }



def generer_signature(infos):

    return {

        "nom": infos["nom"].upper(),

        "prenom": infos["prenom"].capitalize(),

        "poste": infos["poste"],

        "telephone": infos["telephone"],

        "email": infos["email"].lower()

    }



# ==========================
# Accueil formulaire
# ==========================

@app.route("/", methods=["GET", "POST"])
def index():


    if request.method == "POST":


        infos = saisir_informations(request.form)


        # Sauvegarde SQLite

        nouvelle_signature = Signature(

            nom=infos["nom"],

            prenom=infos["prenom"],

            poste=infos["poste"],

            telephone=infos["telephone"],

            email=infos["email"]

        )


        db.session.add(nouvelle_signature)

        db.session.commit()



        signature = generer_signature(infos)


        return render_template(
            "signatures.html",
            signature=signature
        )


    return render_template(
        "index.html"
    )



# ==========================
# Historique base de données
# ==========================

@app.route("/signatures")
def historique():


    signatures = db.session.execute(

        db.select(Signature)
        .order_by(Signature.id.desc())

    ).scalars().all()



    return render_template(

        "signatures.html",

        signatures=signatures

    )



# ==========================

if __name__ == "__main__":

    app.run(debug=True)