from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from .extensions import db



class Trip(db.Model):

    __tablename__ = "trips"


    id: Mapped[int] = mapped_column(
        primary_key=True
    )


    title: Mapped[str] = mapped_column(
        String(100)
    )


    destination: Mapped[str] = mapped_column(
        String(100)
    )


    country: Mapped[str] = mapped_column(
        String(2)
    )


    description: Mapped[str] = mapped_column(
        String(255)
    )


    price: Mapped[float]


    duration: Mapped[int]


    travel_type: Mapped[str] = mapped_column(
        String(20)
    )


    image_filename: Mapped[str] = mapped_column(
        String(150)
    )


    is_available: Mapped[bool] = mapped_column(
        default=True
    )


    def to_dict(self):

        return {

            "id": self.id,

            "title": self.title,

            "destination": self.destination,

            "country": self.country,

            "description": self.description,

            "price": self.price,

            "duration": self.duration,

            "travel_type": self.travel_type,

            "image_url":
            f"https://images.unsplash.com{self.image_filename}",

            "is_available":
            self.is_available
        }