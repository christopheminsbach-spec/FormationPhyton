from database import db

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String


# ==========================
# Model User
# ==========================

class User(db.Model):

    __tablename__ = "users"


    # Identifiant unique
    id: Mapped[int] = mapped_column(
        primary_key=True
    )


    # Nom utilisateur
    username: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )


    # Email
    email: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        unique=True
    )


    # Relation avec les achats
    purchases = relationship(
        "Purchase",
        back_populates="user"
    )