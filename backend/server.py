from firebase_admin import auth, credentials, initialize_app
from flask import Flask, jsonify, request, url_for
import constants
import db
import pdb

app = Flask(__name__)

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

    id_token = requests.args.get('id_token')
    if id_token:
        claims = auth.verify_id_token(id_token)
        is_user = True
        is_admin = claims['admin']

    service_providers = db.get_all_service_providers(is_user, is_admin)
    return jsonify({ "error": "", "data": service_providers })

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


if __name__ == "__main__":
    cred = credentials.Certificate("instance/c4k-dashboard-firebase-adminsdk-ypbc3-c66b8c5a1c.json")
    initialize_app(cred)

    app.run("localhost", 8080, debug=True)
