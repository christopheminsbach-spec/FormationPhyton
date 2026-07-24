from flask import Blueprint, jsonify, request


ai_bp = Blueprint(
    "analysis",
    __name__,
    url_prefix="/api/ai"
)



@ai_bp.route("/analyse", methods=["POST"])
def analyse_profile():


    data = request.get_json()


    offer = data.get(
        "offer",
        ""
    )


    result = {

        "score": 85,

        "offer_analyzed": offer,

        "skills_found": [

            "Python",
            "Flask",
            "React",
            "SQL",
            "IA"

        ],

        "recommendation":

        "Mettre en avant vos projets Full Stack et IA"

    }


    return jsonify(result)
