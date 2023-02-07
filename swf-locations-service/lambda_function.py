import os
import json
import pymongo

# Mongo Configuration
mongoUsername = 'swfDatabaseUser'
mongoPassword = os.environ.get('SWF_MONGO_PASSWORD')
mongoDatabase = 'streetWorkoutFinder'

# other config
defaultMaxDistance = 10000 # default distance to search in geospatial search (in meters)

client = MongoClient('mongodb+srv://' + mongoUsername + ':' + mongoPassword + '@cluster0.rqrjnrv.mongodb.net/')
db = client[mongoDatabase]

def lambda_handler(event, context):
    print(event)

    route = event['rawPath']
    parameters = event['queryStringParameters']

    ####################
    # CRUD starts here #
    ####################
    
    # add a new item to the database
    if route == '/locations/add':
        # location = request.get_json()
        # mongo.db.locations.insert_one(location)
        responeBody = json.dumps(location)
        
    elif route == '/locations/findByCoords':
    
        # find locations around a given coordinate
        # GET request with parameters lon (longitude), lat (latitude) and maxDst (maximum search distance)
        # example: /locations/findByCoords?lon=5.4443387&lat=43.3444461&maxDst=10000

        lon = parameters['lon']
        lat = parameters['lat']
        
        if parameters['maxDst'] == None:
            dst = defaultMaxDistance
        else:
            dst = parameters['maxDst']
        
        query = {"location": {"$nearSphere": { "coordinates": [ lon, lat ] }, "$maxDistance": dst}}
        mongoResults = dumps(list(db.locations.find(query)))
        responeBody = mongoResults
    
    elif route == 'locations/findByID':
        # find location by its OID
        id = parameters['id']
        location = db.locations.find_one_or_404({"_id": ObjectId(id)})
        responeBody = dumps(location)
    
    elif route == '/locations':
        # output all locations
        locations = db.locations.find()
        responeBody = dumps(locations)

    return {
        'statusCode': 200,
        'body': responeBody
    }
