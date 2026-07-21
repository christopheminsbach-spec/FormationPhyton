from marshmallow import Schema, fields



class TripSchema(Schema):

    title = fields.Str(
        required=True
    )

    destination = fields.Str(
        required=True
    )

    country = fields.Str(
        required=True
    )

    description = fields.Str(
        required=True
    )

    price = fields.Float(
        required=True
    )

    duration = fields.Integer(
        required=True
    )

    travel_type = fields.Str(
        required=True
    )

    image = fields.Str(
        required=True
    )

    is_available = fields.Bool()