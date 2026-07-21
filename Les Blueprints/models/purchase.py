# Import de la configuration SQLAlchemy
from database import db

# Import des outils SQLAlchemy 2.x
from sqlalchemy.orm import Mapped, mapped_column, relationship

# Import des types SQL
from sqlalchemy import ForeignKey, DateTime

# Gestion de la date
from datetime import datetime

from models.user import User
from models.book import Book


# ==========================
# Model : Purchase
# Représente un achat d'un livre par un utilisateur
# ==========================

class Purchase(db.Model):

    __tablename__ = "purchases"


    # Identifiant de l'achat
    id: Mapped[int] = mapped_column(
        primary_key=True
    )


    # ==========================
    # Clé étrangère User
    # ==========================

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )


    # ==========================
    # Clé étrangère Book
    # ==========================

    book_id: Mapped[int] = mapped_column(
        ForeignKey("books.id"),
        nullable=False
    )


    # ==========================
    # Date de création de l'achat
    # ==========================

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )


    # ==========================
    # Relations
    # ==========================

    user: Mapped["User"] = relationship(
        "User",
        back_populates="purchases"
    )


    book: Mapped["Book"] = relationship(
        "Book",
        back_populates="purchases"
    )