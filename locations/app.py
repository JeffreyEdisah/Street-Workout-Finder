from flask import Flask
from flask_pymongo import PyMongo


app= Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/streetWorkoutFinder" # the database name is streetWorkoutFinder, the collection name is "locations". The database and collection are created automatically when you insert the first document (if it does not exist).
mongo = PyMongo(app)

@app.route("/")
def hello():
    # two test operations for mongo (can be deleted)
    mongo.db.locations.insert_one({"name": "test", "lat": 1, "lng": 2}) # insert a document into the collection "locations"
    locations = mongo.db.locations.find({"name": "test"}) # find all documents with the name "test"
    return locations[0]["name"]

# MongoDB:
# I did not create a schema as this is not necessary. Just use the schema from mongoDB-schema.txt for the CRUD operations.
# use db.locations to access the locations collection in the database streetWorkoutFinder
# Insert: db.locations.insertOne({name: "test", lat: 1, lng: 2})
# Find: db.locations.find()
# Delete: db.locations.deleteOne({name: "test"})
# Update: db.locations.updateOne({name: "test"}, {$set: {name: "test2"}})
