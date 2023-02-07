import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvent, useMapEvents, Marker, Popup, LeafletMap } from "react-leaflet";

import { getAllLocations } from '../services/locationService'

// Adds a marker at the current geolocation
function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate({setView: true})
    },
    locationfound(e) {
      setPosition(e.latlng)
      // map.flyTo(e.latlng, map.getZoom())
    },
    locationerror(e) {
      console.error(e.message)
    }
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

function MapComponentTest() {
// TODO re-do this entire file using react-leaflets useMap and useMapEvents!!!!

  const centraleMarseilleCoords = [43.342700, 5.436710];
  let [userCoords, setUserCoords] = useState(null);
  let [fitnessStationsAroundMe, setFitnessStationsAroundMe] = useState([]);
  let [error, setError] = useState(null);

  const [zoom, setZoom] = useState(10);
  const [maxSearchDistance, setMaxSearchDistance] = useState(50000)

 
  return (
      <MapContainer center={centraleMarseilleCoords} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
  );
}

export default MapComponentTest;
