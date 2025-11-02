"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/user', methods=['GET'])
def get_users():
    all_users = User.query.all()
    serialized_users = [user.serialize() for user in all_users]

    return jsonify(serialized_users), 200


@api.route('/user', methods=['POST'])
def add_user():
    request_body = request.get_json()

    if request_body is None:
        raise APIException(
            "You must send a JSON body with the request", status_code=400)

    email = request_body.get("email", None)
    password = request_body.get("password", None)

    if email is None or password is None:
        raise APIException(
            "The fields 'email' and 'password' are required", status_code=400)

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise APIException(
            "User with this email already exists", status_code=409)

    hashed_password = generate_password_hash(password)

    new_user = User(
        email=email,
        password=hashed_password,
        is_active=True
    )

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        raise APIException(f"Could not create user: {str(e)}", status_code=500)
    return jsonify(new_user.serialize()), 201


@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user_to_delete = User.query.get(user_id)

    if user_to_delete is None:
        raise APIException(
            f"User with ID {user_id} not found", status_code=404)

    try:
        db.session.delete(user_to_delete)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        raise APIException(f"Could not delete user: {str(e)}", status_code=500)

    return jsonify({"msg": f"User with ID {user_id} successfully deleted"}), 200


@api.route('/token', methods=['POST'])
def create_token():
    request_body = request.get_json()

    if not request_body or 'email' not in request_body or 'password' not in request_body:
        raise APIException(
            "The fields 'email' and 'password' are required", status_code=400)

    email = request_body['email']
    password = request_body['password']

    user = User.query.filter_by(email=email).first()

    if user is None or not check_password_hash(user.password, password):
        return jsonify({"message": "INVALID CREDENTIALS"}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "message": "Login successfull",
        "user_email": user.email,
        "token": access_token
    }), 201


@api.route('/private', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({"id": user.id, "username": user.username}), 200
