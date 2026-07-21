from .backend.app.routes import trip_bp

app.register_blueprint(trip_bp)