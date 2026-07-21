from database import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, ForeignKey
from course import Course


class Participant(db.Model):
    """
    Représente un participant inscrit à une course.

    Un participant possède des informations personnelles et est lié
    à une seule course via une clé étrangère.
    """

    __tablename__ = "participants"

    # Identifiant unique du participant
    id: Mapped[int] = mapped_column(primary_key=True)

    # Nom de famille du participant
    lastname: Mapped[str] = mapped_column(String(100), nullable=False)

    # Prénom du participant
    firstname: Mapped[str] = mapped_column(String(100), nullable=False)

    # Âge du participant
    age: Mapped[int] = mapped_column(Integer, nullable=False)

    # Prix payé par le participant en centimes
    # Exemple : 2500 = 25,00 €
    price: Mapped[int] = mapped_column(Integer, nullable=False)

    # Clé étrangère vers la table courses
    course_id: Mapped[int] = mapped_column(
        ForeignKey("courses.id"),
        nullable=False
    )

    # Relation avec la course associée
    # Une course peut avoir plusieurs participants
    course: Mapped["Course"] = relationship(
        back_populates="participants"
    )

    @property
    def remaining_seats(self) -> int:
        """
        Retourne le nombre de places restantes dans la course.

        Calcul :
        Nombre total de places - nombre de participants inscrits
        """
        return self.course.seats - len(self.course.participants)

    def to_dict(self) -> dict:
        """
        Transforme un participant en dictionnaire.

        Utile pour renvoyer les données au format JSON dans une API.
        Le prix est converti de centimes vers euros.
        """
        return {
            "id": self.id,
            "lastname": self.lastname,
            "firstname": self.firstname,
            "age": self.age,
            "course_id": self.course_id,
            "price": self.price / 100
        }

    def from_body(self, body: dict):
        """
        Remplit l'objet Participant à partir des données reçues
        dans une requête (par exemple un formulaire ou une API).

        Le prix reçu en euros est converti en centimes avant stockage.
        """

        self.lastname = body["lastname"]
        self.firstname = body["firstname"]
        self.age = body["age"]

        # Conversion euros -> centimes
        # Exemple : 25 devient 2500
        self.price = body["price"] * 100

        return self