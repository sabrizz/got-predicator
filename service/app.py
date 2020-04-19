from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
#from sklearn.externals import joblib
import numpy as np
import joblib as joblib
import sys

flask_app = Flask(__name__)
app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "Iris Plant identifier", 
		  description = "Predict the type of iris plant")

name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params', 
				  {'religion': fields.Integer(required = True, 
				  							   description="religion", 
    					  				 	   help="Sepal Length cannot be blank"),
				  'occupation': fields.Integer(required = True, 
				  							   description="occupation", 
    					  				 	   help="Sepal Width cannot be blank"),
				  'socialStatus': fields.Integer(required = True, 
				  							description="socialStatus", 
    					  				 	help="Petal Length cannot be blank"),
				  'gender': fields.Integer(required = True, 
				  							description="gender", 
    					  				 	help="Petal Width cannot be blank"),
				  'location': fields.Integer(required = True, 
				  							description="location", 
    					  				 	help="Petal Width cannot be blank"),
				  'allegiance': fields.Integer(required = True, 
				  							description="allegiance", 
    					  				 	help="Petal Width cannot be blank"),
				  'continent': fields.Integer(required = True, 
				  							description="continent", 
    					  				 	help="Petal Width cannot be blank")})

classifier = joblib.load('classifier.joblib')

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model)		
	def post(self):
		try: 
			formData = request.json
			data = [val for val in formData.values()]
			prediction = classifier.predict(np.array(data).reshape(1, -1))
			types = { 0: "Alive", 1: "Dead"}
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": "The type of iris plant is: " + types[prediction[0]]
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})