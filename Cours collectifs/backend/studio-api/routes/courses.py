from flask import Blueprint, jsonify
from sqlalchemy import select

from database import db, Courses

course_bp = Blueprint("courses", __name__)

# GET /courses
@course_bp.get("/courses")
def get_courses():

    statement = select(Courses)

    courses = db.session.scalars(statement).all()

    return jsonify([
        course.to_dict()
        for course in courses
    ])


# GET /courses/<id>
@course_bp.get("/courses/<int:id>")
def get_course(id):
    pass


# POST /courses
@course_bp.post("/courses")
def create_course():
    pass


# PUT /courses/<id>
@course_bp.put("/courses/<int:id>")
def update_course(id):
    pass


# DELETE /courses/<int:id>
@course_bp.delete("/courses/<int:id>")
def delete_course(id):
    pass