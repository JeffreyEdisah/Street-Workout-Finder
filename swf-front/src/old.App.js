import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, LeafletMap } from "react-leaflet";
import './App.css';
import { getAllLocations } from './services/locationService'

function App() {
  const centraleMarseilleCoords = [43.342700, 5.436710];
  let [userCoords, setUserCoords] = useState(null);
  let [fitnessStationsAroundMe, setFitnessStationsAroundMe] = useState([]);
  let [error, setError] = useState(null);

  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserCoords([position.coords.latitude, position.coords.longitude]);
          getAllLocations(position.coords.longitude, position.coords.latitude,).then((allLocationsAroundMe) => {
            let resultJSON = JSON.parse(allLocationsAroundMe)
            resultJSON.map(station => {
              console.log("station: " + station.location.coordinates.reverse());
              setFitnessStationsAroundMe(prevStations => [...prevStations, station.location.coordinates.reverse()])
            });
          });
        },
        error => {
          setError(error);
        },
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);
  
  return (
    <div className="App">
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
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}


export default App;
