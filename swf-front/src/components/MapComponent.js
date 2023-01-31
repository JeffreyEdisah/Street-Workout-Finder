import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, LeafletMap } from "react-leaflet";

import { getAllLocations } from './../services/locationService'

function MapComponent() {

// TODO re-do this entire file using react-leaflets useMap and useMapEvents!!!!

  const centraleMarseilleCoords = [43.342700, 5.436710];
  let [userCoords, setUserCoords] = useState(null);
  let [fitnessStationsAroundMe, setFitnessStationsAroundMe] = useState([]);
  let [error, setError] = useState(null);

  const [zoom, setZoom] = useState(10);
  const [maxSearchDistance, setMaxSearchDistance] = useState(50000)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserCoords([position.coords.latitude, position.coords.longitude]);
          getAllLocations(position.coords.longitude, position.coords.latitude, maxSearchDistance).then((allLocationsAroundMe) => {
            let resultJSON = JSON.parse(allLocationsAroundMe)
            resultJSON.map(station => {
              console.log("station: " + station.location.coordinates.reverse());
              setFitnessStationsAroundMe(prevStations => [...prevStations, station.location.coordinates.reverse()])
            });
          });
        },
        error => {
          setError(error);
          console.error(error);
        },
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);
  
  return (
      <MapContainer center={userCoords ? userCoords : centraleMarseilleCoords} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!userCoords && (
        <Marker position={centraleMarseilleCoords}>
          <Popup>
            École Centrale Marseille
          </Popup>
        </Marker>
        )}
        {fitnessStationsAroundMe.map((coords, index) => (
          <Marker position={coords}>
            <Popup>
              Fitness No. {index}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
  );
}

export default MapComponent;
