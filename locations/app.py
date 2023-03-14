from flask import Flask, request
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from pymongo import GEOSPHERE # for GeoJSON stuff
from auth_middleware import token_required

import os

# Mongo Configuration
mongoUsername = 'StreetWorkoutFinder'
mongoPassword = os.environ.get('SWF_MONGO_PASSWORD')
mongoDatabase = 'streetWorkoutFinder'

# other config
defaultMaxDistance = 10000 # default distance to search in geospatial search (in meters)

# Flask initialisation
app = Flask(__name__)
CORS(app)
# app.config["MONGO_URI"] = "mongodb://localhost:27017/streetWorkoutFinder" # the database name is streetWorkoutFinder, the collection name is "locations". The database and collection are created automatically when you insert the first document (if it does not exist).
app.config["MONGO_URI"] = 'mongodb+srv://' + mongoUsername + ':' + mongoPassword + '@cluster0.cri1oxc.mongodb.net/?retryWrites=true&w=majority'
mongo = PyMongo(app).cx[mongoDatabase]

SECRET_KEY = os.environ.get('SECRET_KEY') or 'this is a secret'
print(SECRET_KEY)
app.config['SECRET_KEY'] = SECRET_KEY

@app.route("/")
def hello():
    # two test operations for mongo (can be deleted)
    mongo.db.locations.insert_one({"name": "test", "lat": 1, "lng": 2}) # insert a document into the collection "locations"
    locations = mongo.db.locations.find({"name": "test"}) # find all documents with the name "test"
    mongo.db.equipement.insert_one({"name": "barre de traction", "state": "bon état"})
    equipement = mongo.db.equipement.find({"name": "barre de traction"})
    return (locations[0]["name"], equipement[0]["name"])

####################
# CRUD starts here #
####################

# add a new item to the database
@app.route("/locations/add", methods = ["POST"])
@token_required
@token_required
def create():
    location = request.get_json()
    mongo.db.locations.insert_one(location)
    return dumps(location)

# find locations around a given coordinate
# GET request with parameters lon (longitude), lat (latitude) and maxDst (maximum search distance)
# example: /locations/findByCoords?lon=5.4443387&lat=43.3444461&maxDst=10000
@app.route('/locations/findByCoords', methods = ['GET'])
def findLocationsByCoords():
    lon = request.args.get('lon', type=float)
    lat = request.args.get('lat', type=float)
    if request.args.get('maxDst') == None:
        dst = defaultMaxDistance
    else:
        dst = request.args.get('maxDst', type=int)
    
    query = {"location": {"$nearSphere": { "coordinates": [ lon, lat ] }, "$maxDistance": dst}}
    mongoResults = dumps(list(mongo.db.locations.find(query)))
    return mongoResults

# find location by its OID
@app.route("/locations/findByID/<id>")
def read(id):
    location = mongo.db.locations.find_one_or_404({"_id": ObjectId(id)})
    return dumps(location)

# output all locations
@app.route("/locations")
def readall():
    locations = mongo.db.locations.find()
    return dumps(locations)

# update a location (identified by OID)
@app.route("/locations/<id>",methods = ["PUT"])
@token_required
def update(id):
     updatedLocation = request.get_json()
     mongo.db.locations.find_one_or_404({"_id": ObjectId(id)})
     mongo.db.locations.update_one({"_id": ObjectId(id)}, {set: updatedLocation})
     location =  mongo.db.locations.find_one_or_404({"_id": ObjectId(id)})
     return dumps(location)    

# delete a location (identified by OID)
@app.route("/locations/<id>",methods =["DELETE"])
@token_required
def delete(id):
    mongo.db.locations.find_one_or_404({"_id": ObjectId(id)})
    mongo.db.locations.delete_one({"_id": ObjectId(id)})

@app.route("/equipement/add", methods = ["POST"])
@token_required
def createEquipement():
    currentEquipement = request.get_json()
    mongo.db.equipement.insert_one(currentEquipement)
    return dumps(currentEquipement)

@app.route("/equipement/<id>")
def readEquipement(id):
    currentEquipement = mongo.db.equipement.find_one_or_404({"_id": ObjectId(id)})
    return dumps(currentEquipement)

@app.route("/equipements")
def readEquipements():
    currentEquipements = mongo.db.equipement.find()
    return dumps(currentEquipements)

@app.route("/locations/<id>",methods = ["PUT"])
@token_required
def updateEquipement(id):
     updatedEquipement = request.get_json()
     mongo.db.equipement.find_one_or_404({"_id": ObjectId(id)})
     mongo.db.equipement.update_one({"_id": ObjectId(id)}, {set: updatedEquipement})
     currentEquipement =  mongo.db.equipement.find_one_or_404({"_id": ObjectId(id)})
     return dumps(currentEquipement)    

@app.route("/equipement/<id>")
def deleteEquipement(id):
    mongo.db.equipement.find_one_or_404({"_id": ObjectId(id)})
    mongo.db.equipement.delete_one({"_id": ObjectId(id)})