from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
from flask_cors import CORS
#from sklearn.externals import joblib
import numpy as np
import pandas as pd
import joblib as joblib
import sys

flask_app = Flask(__name__)
CORS(flask_app)
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

											   

classifier_dth_pred = joblib.load('classifier.joblib')
reg_dth_ep = joblib.load('regressionDthEp.joblib')
reg_desc_ep = joblib.load('regressionDthDesc.joblib')


@name_space.route("/")
class MainClass(Resource):

	def get_season(self, episode_number):
		episodes = pd.read_csv("dataset/episode_data.csv")
		episode = episodes[episodes['episode_number'] == episode_number]
		return episode.at[episode_number - 1, 'season']

	def get_name(self, episode_number):
		episodes = pd.read_csv("dataset/episode_data.csv")
		episode = episodes[episodes['episode_number'] == episode_number]
		return episode.at[episode_number - 1, 'episode_name']

	def get_episode_number_in_season(self, episode_number, season):
		switcher = {
			1:episode_number,
			2:episode_number - 10,
			3:episode_number - 20,
			4:episode_number - 30,
			5:episode_number - 40,
			6:episode_number - 50,
			7:episode_number - 60,
			8:episode_number - 67,
		}
		return switcher.get(season,"Invalid season number")


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
			#classification
			print("data",data)
			dth_prediction = classifier_dth_pred.predict(np.array(data).reshape(1, -1))
			print("dth_prediction",dth_prediction)

			types = { 0: "Alive", 1: "Dead"}
			response = {}
			if(dth_prediction[0] == 1) :
				#regression for dth_episode
				ep_reg = reg_dth_ep.predict(np.array(data).reshape(1, -1))
				ep_desc = reg_desc_ep.predict(np.array(data + list(ep_reg)).reshape(1, -1))
				predicted_ep_number = ep_reg[0].astype(int).item()
				season = self.get_season(predicted_ep_number)
				print("season", season)
				ep_name = self.get_name(predicted_ep_number)
				print("ep_name", ep_name)
				episode_number = self.get_episode_number_in_season(predicted_ep_number,season)
				print("episode_number", episode_number)
				response = jsonify({
					"statusCode": 200,
					"status": "Prediction made",
					"result": "Your character is: " + types[dth_prediction[0]] + ". He died in episode " + str(ep_name) + "(S" + str(season) + "E" + str(episode_number) +")" + ". Cause of death : " + str(ep_desc[0])
					})
			else :
				response = jsonify({
					"statusCode": 200,
					"status": "Prediction made",
					"result": "Your character is: " + types[dth_prediction[0]]
					})

			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})
	
