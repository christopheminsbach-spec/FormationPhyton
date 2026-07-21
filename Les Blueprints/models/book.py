from database import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, Float


class Book(db.Model):

    __tablename__ = "books"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False
    )

    author: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    year: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    price: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )


    # Relation avec les achats
    purchases = relationship(
        "Purchase",
        back_populates="book"
    )