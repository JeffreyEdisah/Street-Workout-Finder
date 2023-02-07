from flask import Flask, request, jsonify
from flask_cors import CORS

from flask_pymongo import PyMongo
import json
from bson.json_util import dumps
from bson.objectid import ObjectId
from pymongo import GEOSPHERE # for GeoJSON stuff

import os

# Mongo Configuration
mongoUsername = 'swfDatabaseUser'
mongoPassword = os.environ.get('SWF_MONGO_PASSWORD')
mongoDatabase = 'streetWorkoutFinder'

# other config
defaultMaxDistance = 10000 # default distance to search in geospatial search (in meters)

# Flask initialisation
app = Flask(__name__)
CORS(app)
# app.config["MONGO_URI"] = "mongodb://localhost:27017/streetWorkoutFinder" # the database name is streetWorkoutFinder, the collection name is "locations". The database and collection are created automatically when you insert the first document (if it does not exist).
app.config["MONGO_URI"] = 'mongodb+srv://' + mongoUsername + ':' + mongoPassword + '@cluster0.rqrjnrv.mongodb.net/' + mongoDatabase+ '?retryWrites=true&w=majority'
mongo = PyMongo(app)


# Index page
@app.route('/')
def index():
    return 'Nothing to see here'

# initialise MongoDB easily by accessing this route -> creates an index that is necessary for geospatial search
@app.route('/admin/firstMongoLaunch')
def create2dGeosphereIndex():
    mongoResponse = mongo.db.locations.create_index([("location", GEOSPHERE)])
    return 'Index created: ' + mongoResponse

@app.route('/admin/test/insertSomeMongoData')
def insertSomeData():
    # only execute once - else you get duplicates
    fitnessCoordsMarseille= [[43.2607753, 5.3735325], [43.3444461, 5.4331751], [43.292049, 5.400078], [43.2895241, 5.3702871], [43.2378017, 5.4033233], [43.2982242, 5.490455], [43.2603959, 5.3739465], [43.2820833, 5.3918312], [43.2820623, 5.3918667], [43.2820364, 5.3918902], [43.2820714, 5.3917366], [43.2819821, 5.3918838], [43.3399445, 5.4443387], [43.2685186, 5.4186736], [43.3124955, 5.4239761], [43.3574542, 5.3528942], [43.3578637, 5.3526113], [43.3593869, 5.3511656], [43.3595282, 5.3513156], [43.3595231, 5.3509145], [43.3589539, 5.3500401], [43.3529229, 5.3781548]]
    franceCityCoords =  [[48.8566969, 2.3514616], [45.764043, 4.835659], [43.604652, 1.444209],[44.837789, -0.57918], [47.218371, -1.553621]]
    # for i, coords in enumerate(fitnessCoordsMarseille):
    #     entry = {
    #         "name": "Fitness-Station #{}".format(i),
    #         "location": {
    #             "type": "Point",
    #             "coordinates": [
    #                 coords[1], coords[0]
    #             ]
    #         }
    #     }
    #     mongo.db.locations.insert_one(entry) # insert a document into the collection "locations"
    locations = mongo.db.locations.find({"name": "city"}) # find all documents with the name "test"
    return locations[0]["name"]

####################
# CRUD starts here #
####################

# add a new item to the database
@app.route("/locations/add", methods = ["POST"])
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
def update(id):
     updatedLocation = request.get_json()
     mongo.db.locations.find_one_or_404({"_id": ObjectId(id)})
     mongo.db.locations.update_one({"_id": ObjectId(id)}, {set: updatedLocation})
     location =  mongo.db.locations.find_one_or_404({"_id": ObjectId(id)})
     return dumps(location)    

# delete a location (identified by OID)
@app.route("/locations/<id>",methods =["DELETE"])
def delete(id):
    mongo.db.locations.find_one_or_404({"_id": ObjectId(id)})
    mongo.db.locations.delete_one({"_id": ObjectId(id)})

