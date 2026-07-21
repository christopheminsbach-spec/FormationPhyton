from ..extensions import db
from ..models import Trip

from ..utils import extract_image_path



def get_all_trips():

    return db.session.execute(
        db.select(Trip)
    ).scalars().all()



def get_trip_by_id(id):

    return db.session.get(
        Trip,
        id
    )



def create_trip(data):


    trip = Trip(

        title=data["title"],

        destination=data["destination"],

        country=data["country"].upper(),

        description=data["description"],

        price=float(data["price"]),

        duration=int(data["duration"]),

        travel_type=data["travel_type"],

        image_filename=
        extract_image_path(
            data["image"]
        ),

        is_available=
        data.get(
            "is_available",
            True
        )
    )


    db.session.add(
        trip
    )

    db.session.commit()


    return trip



def delete_trip(trip):

    db.session.delete(
        trip
    )

    db.session.commit()