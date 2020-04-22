# Import libraries
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
#from sklearn.externals import joblib
import joblib as joblib
from sklearn import datasets

# Get the dataset
dataset = pd.read_csv('dataset/character_data_S01-S08.csv')

#Data cleaning

#dropping columns
columns_to_drop = ["id","name","time_of_day","allegiance_switched","dth_time_sec","dth_time_hrs","censor_time_sec","censor_time_hrs","exp_season","exp_episode","exp_time_sec","exp_time_hrs","featured_episode_count", "intro_season","prominence","intro_episode","intro_time_sec","intro_time_hrs","icd10_dx_code","icd10_dx_text","icd10_cause_code","icd10_cause_text","icd10_place_code","icd10_place_text","Unnamed: 35","Unnamed: 36","Unnamed: 37","Unnamed: 38","Unnamed: 39","Unnamed: 40"]
dataset.drop(columns=columns_to_drop, axis=1, inplace=True)

# Get names of indexes for which column dth_flag equals 0
indexNames = dataset[ dataset['dth_flag'] == 0 ].index
 
# Delete these row indexes from dataFrame
dataset.drop(indexNames , inplace=True)
dataset.drop(columns=['dth_flag'], axis=1, inplace=True)

#filling columns
dataset["geo_location"].fillna(dataset["geo_location"].median(),inplace=True)
dataset["top_location"].fillna(dataset["top_location"].median(),inplace=True)

predictors1 = ['sex', 'religion', 'occupation', 'social_status','allegiance_last', 'geo_location','top_location']

X_train, X_test, y_train, y_test = train_test_split(dataset[predictors1], dataset['dth_episode'], test_size=0.25, random_state=1)

clf = LogisticRegression(random_state=1)
clf.fit(X_train, y_train)

# Save the model to disk
joblib.dump(clf, 'regressionDthEp.joblib')

######
predictors2 = ['sex', 'religion', 'occupation', 'social_status','allegiance_last', 'geo_location','top_location','dth_episode']

X_train, X_test, y_train, y_test = train_test_split(dataset[predictors2], dataset['dth_description'], test_size=0.3, random_state=1)

clf2 = LogisticRegression(random_state=1)
clf2.fit(X_train, y_train)

joblib.dump(clf2, 'regressionDthDesc.joblib')