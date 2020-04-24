<h1 align="center">
    The Game of Thrones Predicator
</h1>

<p align="center">
  <strong>Made by Robin, Aymen & Sabri</strong><br>
  This application aims to predict if the character you created in the world of GoT will die or not using machine learning
</p>

*******************

## 📋 The project

This project aims to predict if a character defined by some parameters is alive at the end of Game Of Thrones serie.
In order to do so, we use Machine Learning and a web application (using React frontend and Flask python backend).


## 🚀 Installation instructions

### 1. Before starting the application:
If the files "classifier.joblib","regressionDthDesc.joblib" and "regressionDthEp.joblib" are not present, you need to train the different models by running the following commands:
```
$ python service/model_generator.py
$ python service/model_reg_generator.py
```

### 2. The application:
* You need to run the following commands to deploy the Web Application:
```
$ git clone https://github.com/sabrizz/got-predicator.git
$ cd ui
$ yarn install
$ npm install -g serve
$ npm run build
$ serve -s build -l 3000
```

**If you go at http://localhost:3000, you will find the application runnning**


* Before using the Web Application, you need to deploy the server in another terminal:
```
$ cd service
$ pip install virtualenv (you need to have Python)
$ virtualenv venv (or 'python -m virtualenv venv' if it doesn't work)
$ venv\scripts\activate
$ pip install flask
$ pip install flask-restplus
$ pip install sklearn
$ pip install Werkzeug==0.16.1
$ flask run
```
**If you go at http://localhost:5000, you will find the server runnning**

## 🔗 Links
 - Collaboratory file - https://colab.research.google.com/drive/1bsFwGD44t0V8Ter6OibUNwDg_LjfhVoQ
## ✨ Collaborators

Robin Dutertre  
Sabri Sahli   
Aymen Nefzaoui
