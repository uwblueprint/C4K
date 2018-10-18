from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
app = Flask(__name__)

@app.route("/")
def index():
	return "Index Data"

@app.route("/<string:region>")
def regionData(region):
	return jsonify(region=region,
		           population=123456,
		           average_income=25000,
		           num_health_centers=28,
		           num_mental_health_centers=16,
		           lead_agency="Woodview",
		           ethnicity_caucasion=36,
		           ethnicity_asian=25,
		           ethnicity_african_american=18,
		           ethnicity_latino=10,
		           ethnicity_arab=8,
		           ethnicity_other=3,
		           num_high_schools=6,
		           num_elementary_schools=9,
		           num_adolescent=12321)

if __name__ == "__main__":
	app.run()