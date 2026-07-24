from flask import Blueprint, jsonify

from models.Profile import Profile


profile_bp = Blueprint(
    "profile",
    __name__,
    url_prefix="/api/profile"
)


@profile_bp.route("", methods=["GET"])
def get_profile():

    profiles = Profile.query.all()

    return jsonify([

        {
            "id": profile.id,
            "name": profile.name,
            "title": profile.title,
            "summary": profile.summary
        }

        for profile in profiles

    ])