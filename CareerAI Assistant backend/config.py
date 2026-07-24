import os


class Config:

    # Configuration Flask
    SECRET_KEY = "careerai-secret-key"


    # Base de données SQLite
    SQLALCHEMY_DATABASE_URI = (
        "sqlite:///careerai.db"
    )


    SQLALCHEMY_TRACK_MODIFICATIONS = False


    # JWT (pour prochaine étape authentification)
    JWT_SECRET_KEY = "jwt-careerai-secret"