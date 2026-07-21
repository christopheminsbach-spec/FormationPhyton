from flask import Blueprint, jsonify, request

from ..services.trip_service import (
    get_all_trips,
    get_trip_by_id,
    create_trip,
    delete_trip
)

from ..validators import validate_trip


trips_bp = Blueprint(
    "trips",
    __name__
)