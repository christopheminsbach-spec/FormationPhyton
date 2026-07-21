from flask import Flask
from flask_cors import CORS

from config import Config
from .extensions import db


def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)

    from .routes.trips import trips_bp

    app.register_blueprint(trips_bp)

    with app.app_context():
        from .models import Trip
        db.create_all()

    return app