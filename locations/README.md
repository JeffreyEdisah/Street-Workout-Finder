# Street Workout Finder Backend

Welcome to the Street Workout Finder repository for the spot backend. This backend is responsible for managing the street workout spots data and serving it to the frontend via an API.

## Requirements

To run this backend, you will need:

- [Python 3.6 or later](https://www.python.org/downloads/)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
- [MongoDB Community Server](https://www.mongodb.com/download-center/community)

## Getting Started

1. Clone this repository and navigate to the directory:
`$ git clone git@github.com:JeffreyEdisah/Street-Workout-Finder.git`
`$ cd locations`

2. Create a virtual environment and activate it:
`$ python -m venv venv`
`$ source venv/bin/activate`

3. Install the required dependencies:
`$ pip install -r requirements.txt`

4. Start the MongoDB server (make sure you have installed MongoDB Community Server):
`$ mongod`

5. Start the backend server:
`$ flask run`
The backend will now be running at [http://localhost:5000](http://localhost:5000).

## API

The backend will expose the following API endpoints (NOT IMPLEMENTED YET):

- `GET /api/v1/spots?location=<geolocation>`: Returns a list of all street workout spots within a specified distance from the specified geolocation.
- `GET /api/v1/spots/<spot_id>`: Returns a single street workout spot with the specified ID.
- `POST /api/v1/spots`: Creates a new street workout spot.
- `PUT /api/v1/spots/<spot_id>`: Updates an existing street workout spot with the specified ID.
- `DELETE /api/v1/spots/<spot_id>`: Deletes an existing street workout spot with the specified ID.

(generated using ChatGPT)