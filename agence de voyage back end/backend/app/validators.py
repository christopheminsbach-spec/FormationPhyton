from urllib.parse import urlparse



ALLOWED_TYPES = [
    "city",
    "nature",
    "beach",
    "adventure"
]



def validate_trip(data):


    if data["price"] <= 0:

        return "Le prix doit être positif"



    if data["duration"] <= 0:

        return "La durée doit être positive"



    if data["travel_type"] not in ALLOWED_TYPES:

        return "Type de voyage invalide"



    image = urlparse(
        data["image"]
    )


    if (
        "images.unsplash.com"
        not in image.netloc
    ):

        return "Image Unsplash obligatoire"


    return None