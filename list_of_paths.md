User 
VehicleType
Vehicle 
Ride 
Location 
Driver 

[ Passenger, State, Authorization, Drivers ]

^ Schema from ride-share-api.json


User 
    /users              GET     "Get all users"
    /users              POST    "Create a new user"
    /users/{id}         GET     "Get user by ID"
    /users/{userId}/rides{rideId}   POST    "Add a passenger to a ride"
    /users/{userId}/rides{rideId}   DELETE  "Delete an existing passenger"
VehicleType 
    /vehicle-types      GET     "Retrieve all vehicle types"
    /vehicle-types      POST    "Create a new vehicle type"
    /vehicle-types/{id} PATCH   "Update an existing vehicle type"
    /vehicle-types/{id} DELETE  "Delete an existing vehicle type"

Ride 
    /rides              GET     "Retrieve all rides"
    /rides              POST    "Create a new ride"
    /rides/{id}         PATCH   "Update an existing ride"
    /rides/{id}         DELETE  "Delete an existing ride"

Vehicle 
.    /vehicles           GET     "Retrieve all vehicles"
.    /vehicles           POST    "Create a new vehicle"
    /vehicles/{id}      PATCH   "Update an existing vehicle"
    /vehicles/{id}      DELETE  "Delete an existing vehicle"

Drivers 
    /drivers            GET     "Retrieve all drivers"
    /drivers            POST    "Create a new driver"
    /drivers/{id}       PATCH   "Update an existing driver"
    /drivers/{id}       DELETE  "Delete an existing drivers"

Location 
    /location           GET     "Retrieve all locations"
    /location           POST    "Create a new location"
    /location/{id}      PATCH   "Update an existing location"
    /location/{id}      DELETE  "Delete an existing location"
    /location/{id}?from=true,to=true    PATCH   "Update an existing location"
    /location/{id}?from=true,to=true    DELETE  "Delete an existing location"
















/* ,
      "State": {
        "description": "Every State within **RideShare**",
        "type": "object",
        "properties": {
          "abbreviation": { "type": "string" },
          "name": { "type": "string" }
        },
        "example": {
          "abbreviation": "WI",
          "name": "Wisconsin"
        }
      },
      "Authorization": {
        "description": "Authorized drivers and vehicles within **RideShare**",
        "type": "object",
        "properties": {
          "driverId": { "type": "integer" },
          "vehicleId": { "type": "integer" }
        },
        "example": {
          "driverId": 43,
          "vehicleId": 54
        }
      },
      "Drivers": {
        "description": "Drivers and rides within **RideShare**",
        "type": "object",
        "properties": {
          "driverId": { "type": "integer" },
          "rideId": { "type": "integer" }
        },
        "example": {
          "driverId": 42,
          "rideId": 55
        }
      } */