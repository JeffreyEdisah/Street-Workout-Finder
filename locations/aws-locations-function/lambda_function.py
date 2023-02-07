import os
import json
from bson import ObjectId
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

# Mongo Configuration
mongoUsername = 'swfDatabaseUser'
mongoPassword = os.environ.get('SWF_MONGO_PASSWORD')
mongoDatabase = 'streetWorkoutFinder'
mongoURI = "mongodb+srv://{}:{}@cluster0.rqrjnrv.mongodb.net/".format(mongoUsername, mongoPassword)

# other config
defaultMaxDistance = 10000 # default distance to search in geospatial search (in meters)

client = MongoClient(mongoURI)
db = client[mongoDatabase]
locationsCollection = db["locations"]

# Define a function to return an error message
def sendErrorMessage(httpErrorCode, message):
    # return error
    return {
        'statusCode': httpErrorCode,
        'body': message
    }

####################
# CRUD starts here #
####################

# add a new item to the database
def add():
    return "Not implemented yet"

def findByCoords(lon, lat, maxDst):
    # find locations around a given coordinate
    # GET request with parameters lon (longitude), lat (latitude) and maxDst (maximum search distance)
    # example: /locations/findByCoords?lon=5.4443387&lat=43.3444461&maxDst=10000

    # query = {"location": {"$nearSphere": { "coordinates": [ lon, lat ] }, "$maxDistance": maxDst}}
    # query = {"location": SON([("$near", [ lon, lat ]), ("$maxDistance", maxDst)])}
    query = {
        "location": {
            "$nearSphere": {
                "$geometry": {
                    "type": "Point",
                    "coordinates": [float(lon), float(lat)]
                },
                "$maxDistance": int(maxDst)
            }
        }
    }
    resultList = []
    mongoResults = locationsCollection.find(query)
    for document in mongoResults:
        resultList.append(document)
    json_result = json.dumps(resultList, default=str)
    return {"locations": json_result}

def findByID(id):
    # find location by its OID
    location = db.locations.find_one({"_id": ObjectId(id)})
    return json.dumps(location)

def findAll():
    # output all locations
    locations = db.locations.find()
    return json.dumps(locations)

def update(id):
    # TODO: update location
    return "Not implemented yet"

def delete(id):
    # TODO: delete location
    return "Not implemented yet"

##################
# CRUD ends here #
##################

################################
# Request handling starts here #
################################
def lambda_handler(event, context):
    try:
        client.admin.command('ping') # The ping command is cheap and does not require auth.
        print("Successfull connection")

        print("Current Lambda Event:")
        print(event)

        route = event['requestContext']['http']['path']
        method = event['requestContext']['http']['method']
        parameters = event['queryStringParameters']

        # here, we select the correct route and method and execute the corresponding code
        if route == '/locations/add':
            # TODO extract parameters from request body and add the location to the database
            responeBody = add()

        elif route == '/locations/findByCoords':
            lon = parameters['lon']
            lat = parameters['lat']

            responeBody = findByCoords(lon, lat, maxDst = defaultMaxDistance)

        elif route == 'locations/findByID':
            id = parameters['id']
            responeBody = findByID(id)

        elif route == '/locations/findAll':
            responeBody = findAll()

        elif route == '/locations':
            if method == 'PUT':
                # update location
                id = parameters['id']
                responeBody = update(id)

            elif method == 'DELETE':
                # delete location
                id = parameters['id']
                responeBody = delete(id)
            else:
                # unknown method
                # return wrong method
                sendErrorMessage(405, "Method not allowed")

        else:
            sendErrorMessage(404, "Route not found")

        return {
            'statusCode': 200,
            'body': responeBody
        }

    except ConnectionFailure:
        print("Server not available")
        return {
            "statusCode": 500,
            "body": "Connection to database failed"
        }

    except Exception as e:
        print("Something went wrong")
        print(e)
        return {
            "statusCode": 500,
            "body": e
        }