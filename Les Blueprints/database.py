# database.py

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase


# Classe de base SQLAlchemy 2.x
class Base(DeclarativeBase):
    pass


# Instance SQLAlchemy utilisée par tous les modèles
db = SQLAlchemy(
    model_class=Base
)