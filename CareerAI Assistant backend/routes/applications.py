from flask import Blueprint, jsonify

from models.Application import Application


application_bp = Blueprint(
    "applications",
    __name__,
    url_prefix="/api/applications"
)


@application_bp.route("", methods=["GET"])
def get_applications():

    applications = Application.query.all()


    return jsonify([

        {
            "id": a.id,
            "company": a.company,
            "position": a.position,
            "status": a.status,
            "date": a.date
        }

        for a in applications

    ])