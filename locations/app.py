from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import json
from bson.json_util import dumps
from bson.objectid import ObjectId


app= Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/streetWorkoutFinder" # the database name is streetWorkoutFinder, the collection name is "locations". The database and collection are created automatically when you insert the first document (if it does not exist).
mongo = PyMongo(app)

@app.route("/")
def hello():
    # two test operations for mongo (can be deleted)
    mongo.db.locations.insert_one({"name": "test", "lat": 1, "lng": 2}) # insert a document into the collection "locations"
    locations = mongo.db.locations.find({"name": "test"}) # find all documents with the name "test"
    mongo.db.equipement.insert_one({"name": "barre de traction", "state": "bon état"})
    equipement = mongo.db.equipement.find({"name": "barre de traction"})
    return (locations[0]["name"],equipement[0]["name"])

# MongoDB:
# I did not create a schema as this is not necessary. Just use the schema from mongoDB-schema.txt for the CRUD operations.
# use db.locations to access the locations collection in the database streetWorkoutFinder
# Insert: db.locations.insertOne({name: "test", lat: 1, lng: 2})
# Find: db.locations.find()
# Delete: db.locations.deleteOne({name: "test"})
# Update: db.locations.updateOne({name: "test"}, {$set: {name: "test2"}})

@app.route("/locations/add", methods = ["POST"])
def create():
    location = request.get_json()
    mongo.db.locations.insert_one(location)
    return dumps(location)

@app.route("/locations/<id>")
def read(id):
    location = mongo.db.locations.find_one_or_404({"_id": ObjectId(id)})
    return dumps(location)

@app.route("/locations")
def readall():
    locations = mongo.db.locations.find()
    return dumps(locations)

@app.route("/locations/<id>",methods = ["PUT"])
def update(id):
     updatedLocation = request.get_json()
     mongo.db.locations.find_one_or_404({"_id": ObjectId(id)})
     mongo.db.locations.update_one({"_id": ObjectId(id)}, {set: updatedLocation})
     location =  mongo.db.locations.find_one_or_404({"_id": ObjectId(id)})
     return dumps(location)    

@app.route("/locations/<id>",methods =["DELETE"])
def delete(id):
    mongo.db.locations.find_one_or_404({"_id": ObjectId(id)})
    mongo.db.locations.delete_one({"_id": ObjectId(id)})

@app.route("/equipement/add")
def createEquipement():
    currentEquipement = request.get_json()
    mongo.db.equipement.insert_one(currentEquipement)
    return dumps(currentEquipement)

@app.route("/equipement/<id>")
def readEquipement(id):
    currentEquipement = mongo.db.equipement.find_one_or_404({"_id": ObjectId(id)})
    return dumps(currentEquipement)

@app.route("/equipement")
def readEquipement(id):
    currentEquipements = mongo.db.equipement.find()
    return dumps(currentEquipements)

@app.route("/locations/<id>",methods = ["PUT"])
def update(id):
     updatedEquipement = request.get_json()
     mongo.db.equipement.find_one_or_404({"_id": ObjectId(id)})
     mongo.db.equipement.update_one({"_id": ObjectId(id)}, {set: updatedEquipement})
     currentEquipement =  mongo.db.equipement.find_one_or_404({"_id": ObjectId(id)})
     return dumps(currentEquipement)    

@app.route("/equipement/<id>")
def readEquipement(id):
    mongo.db.equipement.find_one_or_404({"_id": ObjectId(id)})
    mongo.db.equipement.delete_one({"_id": ObjectId(id)})