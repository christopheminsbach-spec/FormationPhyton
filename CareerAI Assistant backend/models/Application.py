from database import db


class Application(db.Model):

    __tablename__ = "applications"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    company = db.Column(
        db.String(120),
        nullable=False
    )


    position = db.Column(
        db.String(120)
    )


    status = db.Column(
        db.String(50),
        default="Envoyée"
    )


    date = db.Column(
        db.String(30)
    )