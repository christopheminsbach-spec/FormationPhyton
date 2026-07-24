from database import db


class Skill(db.Model):

    __tablename__ = "skills"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    name = db.Column(
        db.String(100),
        nullable=False
    )


    level = db.Column(
        db.String(50)
    )


    profile_id = db.Column(
        db.Integer,
        db.ForeignKey("profiles.id")
    )


    profile = db.relationship(
        "Profile",
        backref="skills"
    )
