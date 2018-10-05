from flask import Flask, jsonify
import constants
import db

app = Flask(__name__)

@app.route("/<census_division>")
def get_data(census_division):
    # Check if census_divison is valid
    if census_division not in constants.CENSUS_DIVISION_TO_ID:
        return jsonify({ "error": "Invalid census division" })

    census_division_id = constants.CENSUS_DIVISION_TO_ID[census_division]
    data = db.get_census_division_data(census_division_id)
    return jsonify({ "error": "", "data": data })

if __name__ == "__main__":
    app.run("localhost", 8080, debug=True)
