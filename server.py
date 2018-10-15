from flask import Flask, jsonify
import constants
import db

app = Flask(__name__)

@app.route("/<census_division>")
def get_data_by_division(census_division):
    # Check if census_divison is valid
    if census_division not in constants.CENSUS_DIVISION_TO_ID:
        return jsonify({ "error": "Invalid census division" })

    census_division_id = constants.CENSUS_DIVISION_TO_ID[census_division]
    data = db.get_census_division_data(census_division_id)
    return jsonify({ "error": "", "data": data })

@app.route("/<census_id>")
def get_data_by_id(census_id):
   # Check if census_id is valid
    if census_id not in constants.ID_TO_CENSUS_DIVISION[census_id]:
        return jsonify({ "error": "Invalid census id" })

    data = db.get_census_division_data(census_id)
    return jsonify({ "error": "", "data": data }) 

if __name__ == "__main__":
    app.run("localhost", 8080, debug=True)
