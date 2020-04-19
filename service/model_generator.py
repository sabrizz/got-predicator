# Import libraries
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
#from sklearn.externals import joblib
import joblib as joblib
from sklearn import datasets

# Get the dataset
#dataset = datasets.load_iris()
dataset = pd.read_csv('dataset/character_data_S01-S08.csv')

#Data cleaning

#dropping columns
columns_to_drop = ["id","name","time_of_day","dth_season","allegiance_switched","dth_episode","dth_time_sec","dth_time_hrs","censor_time_sec","censor_time_hrs","exp_season","exp_episode","exp_time_sec","exp_time_hrs","featured_episode_count","dth_description", "intro_season","prominence","intro_episode","intro_time_sec","intro_time_hrs","icd10_dx_code","icd10_dx_text","icd10_cause_code","icd10_cause_text","icd10_place_code","icd10_place_text","Unnamed: 35","Unnamed: 36","Unnamed: 37","Unnamed: 38","Unnamed: 39","Unnamed: 40"]
dataset.drop(columns=columns_to_drop, axis=1, inplace=True)

#filling columns
dataset["geo_location"].fillna(dataset["geo_location"].median(),inplace=True)
dataset["top_location"].fillna(dataset["top_location"].median(),inplace=True)

#predictors for classification
predictors = ['sex', 'religion', 'occupation', 'social_status','allegiance_last', 'geo_location','top_location']

# convert text to numerical in predictors
for col in predictors: # Loop through all columns in predictors
    if dataset[col].dtype == 'object':  # check if column's type is object (text)
        dataset[col] = pd.Categorical(dataset[col]).codes  # convert text to numerical

# Split the dataset into training (85%) and testing (25%) data
X_train, X_test, y_train, y_test = train_test_split(dataset[predictors], dataset['dth_flag'], test_size=0.25, random_state=1)

# Build the classifier and make prediction
classifier = RandomForestClassifier(random_state=1, max_depth=8, min_samples_leaf=2, min_samples_split=5, n_estimators=47)
classifier.fit(X_train, y_train)
prediction = classifier.predict(X_test)

# Print the confusion matrix
print("Confusion Matrix:")
print(confusion_matrix(y_test, prediction))

# Save the model to disk
joblib.dump(classifier, 'classifier.joblib')





