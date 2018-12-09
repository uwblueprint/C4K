from firebase_admin import auth, credentials, initialize_app
from flask import Flask, jsonify, request, url_for
from flask_cors import CORS
import sys
import os
import os.path
import constants
import db
import argparse
import pandas as pd

IS_DEV = False
STATIC_DIR = os.getenv("PROJECTROOT") + "/frontend/build"

app = Flask(__name__,
        static_url_path="",
        static_folder=STATIC_DIR)
CORS(app)

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/division/<census_division>")
def get_data_by_division(census_division):
    # Check if census_divison is valid
    if census_division not in constants.CENSUS_DIVISION_TO_ID:
        return jsonify({ "error": "Invalid census division" })

    census_division_id = constants.CENSUS_DIVISION_TO_ID[census_division]
    data = db.get_census_division_data(census_division_id)
    return jsonify({ "error": "", "data": data })

@app.route("/division/id/<int:census_id>")
def get_data_by_id(census_id):
    # Check if census_id is valid
    if census_id not in constants.ID_TO_CENSUS_DIVISION:
        return jsonify({ "error": "Invalid census id" })

    data = db.get_census_division_data(census_id)
    return jsonify({ "error": "", "data": data })

@app.route("/service_providers")
def get_all_service_providers():
    is_user = False
    is_admin = False

    if IS_DEV:
        is_user = True
        is_admin = True
    else:
        id_token = request.args.get('id_token')
        if id_token:
            is_user = True
            is_admin = verify_admin(id_token)

    service_providers = db.get_all_service_providers(is_user, is_admin)
    return jsonify({ "error": "", "data": service_providers })

@app.route("/service_providers/<int:service_provider_id>/update")
def update_service_provider_data(service_provider_id):
    if not verify_admin(request.args.get('id_token')):
        return jsonify({"error": "User is not an admin"})

    data = request.args.get('data')
    if data is None:
        return jsonify({"error": "Expecting a map for data"})

    service_provider = db.get_service_provider(service_provider_id)
    if not service_provider:
        return jsonify({"error": "Invalid service_provider_id"})

    data['updated_at'] = pd.Timestamp.today()

    db.update_service_provider_data(service_provider_id, data)

    return jsonify({"success": data})

@app.route("/users/new")
def create_user():
    # Check if proper params have been passed in
    params = ['email', 'password', 'admin']
    for param in params:
        if not request.args.get(param, None):
            return jsonify({"error": "Missing param: {}".format(param)})

    email = str(request.args.get('email', ''))
    password = str(request.args.get('password', ''))
    admin = bool(request.args.get('admin'))

    try:
        user = auth.create_user(email=email, password=password)
        auth.set_custom_user_claims(user.uid, {'admin': admin})
    except auth.AuthError:
        return jsonify({"error": "User with email {} already exists".format(email)})

    return jsonify({'uid': user.uid})

def verify_admin(id_token):
    user = auth.verify_id_token(id_token) 
    return user.get('admin', False)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Server arguments')
    parser.add_argument('--dev', action='store_true')
    args = parser.parse_args()

    IS_DEV = args.dev

    if os.path.isfile(constants.FIREBASE_AUTH_FILE_PATH):
        cred = credentials.Certificate(constants.FIREBASE_AUTH_FILE_PATH)
    elif os.getenv("FIREBASE_TYPE"):
        firebase_auth = {
                "type":           os.getenv("FIREBASE_TYPE"),
                "project_id":     os.getenv("FIREBASE_PROJECT_ID"),
                "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
                "private_key":    os.getenv("FIREBASE_PRIVATE_KEY"),
                "client_email":   os.getenv("FIREBASE_CLIENT_EMAIL"),
                "client_id":      os.getenv("FIREBASE_CLIENT_ID"),
                "auth_uri":       os.getenv("FIREBASE_AUTH_URI"),
                "token_uri":      os.getenv("FIREBASE_TOKEN_URI"),
                "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
                "client_x509_cert_url":        os.getenv("FIREBASE_CLIENT_X509_CERT_URL")
            }
        cred = credentials.Certificate(firebase_auth)
    else:
        print("Error: no Firebase cert found")
        sys.exit(1)

    initialize_app(cred)

    if os.getenv("PORT"):
        port = os.getenv("PORT")
        host = "0.0.0.0"
    else:
        port = 8080
        host = "localhost"

    app.run(host, port, debug=IS_DEV)
