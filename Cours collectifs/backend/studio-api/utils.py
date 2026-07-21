from flask import jsonify, request


# ==================================================
# Dictionnaire des erreurs de l'API
# ==================================================
# Chaque clé représente un code d'erreur interne.
# La valeur associée contient :
# - le message affiché au client
# - le code HTTP retourné par l'API

ERRORS = {

    # ==========================
    # Erreurs liées aux ressources
    # ==========================

    "COURSE_NOT_FOUND": (
        "Cours introuvable",
        404
    ),

    "PARTICIPANT_NOT_FOUND": (
        "Participant introuvable",
        404
    ),

    "PARTICIPANT_NOT_IN_COURSE": (
        "Le participant n'est pas inscrit dans ce cours",
        404
    ),


    # ==========================
    # Erreurs de validation générale
    # ==========================

    "INVALID_BODY": (
        "Le corps de la requête est invalide",
        400
    ),

    "MISSING_FIELDS": (
        "Des champs obligatoires sont manquants",
        400
    ),


    # ==========================
    # Validation des cours
    # ==========================

    "INVALID_COURSE_COACH_NAME": (
        "Le nom du coach est invalide",
        400
    ),

    "INVALID_COURSE_NAME": (
        "Le nom du cours doit être une chaîne non vide",
        400
    ),

    "INVALID_COURSE_PRICE": (
        "Le prix est invalide",
        400
    ),

    "INVALID_COURSE_SEATS": (
        "Le nombre de places est invalide",
        400
    ),


    # ==========================
    # Validation des participants
    # ==========================

    "INVALID_PARTICIPANT_FIRSTNAME": (
        "Le prénom du participant est invalide",
        400
    ),

    "INVALID_PARTICIPANT_LASTNAME": (
        "Le nom du participant est invalide",
        400
    ),

    "INVALID_PARTICIPANT_AGE": (
        "L'âge du participant doit être compris entre 18 et 120 ans",
        400
    ),


    # ==========================
    # Gestion des contraintes métier
    # ==========================

    "COURSE_FULL": (
        "Le cours est complet",
        406
    ),

    "SEATS_TOO_LOW": (
        "Le nombre de places est inférieur au nombre de participants déjà inscrits",
        406
    ),


    # ==========================
    # Suppression des ressources
    # ==========================

    "COURSE_HAS_PARTICIPANTS": (
        "Impossible de supprimer un cours contenant des participants",
        406
    )
}

# ==================================================
# Gestion des erreurs
# ==================================================

def get_error(code: str):
    """
    Construit une réponse JSON d'erreur.

    Paramètre :
        code (str) :
            Code d'erreur interne.

    Retour :
        tuple :
            Réponse JSON Flask + code HTTP.
    """

    # Recherche du message et du statut HTTP associés au code.
    # Si le code n'existe pas, retourne une erreur interne 500.
    message, http_status = ERRORS.get(
        code,
        ("Erreur interne", 500)
    )


    # Retourne une réponse JSON contenant :
    # - le message d'erreur
    # - le code interne utilisé
    return jsonify({
        "error": message,
        "code": code
    }), http_status



# ==================================================
# Récupération du JSON envoyé par le client
# ==================================================

def get_json_body():
    """
    Récupère le corps JSON d'une requête HTTP.

    Retour :
        dict :
            Données JSON reçues si elles sont valides.
        
        None :
            Si le JSON est absent ou incorrect.
    """


    # Lecture du JSON sans déclencher d'exception
    # en cas de mauvais format.
    body = request.get_json(silent=True)


    # Vérifie que le JSON reçu est bien un objet Python
    # correspondant à un dictionnaire.
    if not isinstance(body, dict):
        return None


    return body



# ==================================================
# Validation des données d'un cours
# ==================================================

def validate_course_body(body: dict):
    """
    Vérifie que les données reçues pour un cours
    respectent les règles de validation.

    Paramètre :
        body (dict) :
            Données JSON du cours.

    Retour :
        str :
            Code d'erreur si une validation échoue.

        None :
            Si toutes les validations sont réussies.
    """


    # Vérifie que le corps JSON existe.
    if body is None:
        return "INVALID_BODY"



    # Liste des champs obligatoires
    # nécessaires pour créer ou modifier un cours.
    required_fields = [
        "name",
        "coach_name",
        "seats",
        "price"
    ]



    # Vérifie que tous les champs obligatoires
    # sont présents dans la requête.
    for field in required_fields:
        if field not in body:
            return "MISSING_FIELDS"



    # Vérifie que le nom du cours est :
    # - une chaîne de caractères
    # - non vide après suppression des espaces
    if not isinstance(body["name"], str) or not body["name"].strip():
        return "INVALID_COURSE_NAME"



    # Vérifie que le nom du coach est :
    # - une chaîne de caractères
    # - non vide
    if not isinstance(body["coach_name"], str) or not body["coach_name"].strip():
        return "INVALID_COURSE_COACH_NAME"



    # Vérifie que le nombre de places est :
    # - un entier
    # - différent d'un booléen
    # - supérieur à zéro
    if (
        not isinstance(body["seats"], int)
        or isinstance(body["seats"], bool)
        or body["seats"] <= 0
    ):
        return "INVALID_COURSE_SEATS"



    # Vérifie que le prix est :
    # - un entier ou un nombre décimal
    # - différent d'un booléen
    # - positif ou égal à zéro
    if (
        not isinstance(body["price"], (int, float))
        or isinstance(body["price"], bool)
        or body["price"] < 0
    ):
        return "INVALID_COURSE_PRICE"



    # Toutes les validations sont passées.
    return None

def from_body(self, body):
        """
        Valide les données reçues et remplit l'objet Participant.
        Lève une ValueError si une validation échoue.
        """

        # Vérification des champs obligatoires
        if (
            "firstname" not in body
            or "lastname" not in body
            or "age" not in body
        ):
            raise ValueError("MISSING_FIELDS")

        firstname = body["firstname"]
        lastname = body["lastname"]
        age = body["age"]

        # Vérification du prénom
        if not isinstance(firstname, str) or firstname.strip() == "":
            raise ValueError("INVALID_PARTICIPANT_FIRSTNAME")

        # Vérification du nom
        if not isinstance(lastname, str) or lastname.strip() == "":
            raise ValueError("INVALID_PARTICIPANT_LASTNAME")

        # Vérification de l'âge
        if not isinstance(age, int) or age < 18 or age > 120:
            raise ValueError("INVALID_PARTICIPANT_AGE")

        # Enregistrement des valeurs nettoyées
        self.firstname = firstname.strip()
        self.lastname = lastname.strip()
        self.age = age