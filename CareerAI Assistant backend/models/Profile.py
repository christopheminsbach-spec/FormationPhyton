from database import db


class Profile(db.Model):

    __tablename__ = "profiles"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    name = db.Column(
        db.String(100)
    )


    title = db.Column(
        db.String(150)
    )


    summary = db.Column(
        db.Text
    )