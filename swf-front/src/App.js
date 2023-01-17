import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import logo from './logo.svg';
import './App.css';

function App() {
  const centraleMarseilleCoords = [43.342700, 5.436710];
  const fitnessCoordsMarseille= [[43.2607753, 5.3735325], [43.3444461, 5.4331751], [43.292049, 5.400078], [43.2895241, 5.3702871], [43.2378017, 5.4033233], [43.2982242, 5.490455], [43.2603959, 5.3739465], [43.2820833, 5.3918312], [43.2820623, 5.3918667], [43.2820364, 5.3918902], [43.2820714, 5.3917366], [43.2819821, 5.3918838], [43.3399445, 5.4443387], [43.2685186, 5.4186736], [43.3124955, 5.4239761], [43.3574542, 5.3528942], [43.3578637, 5.3526113], [43.3593869, 5.3511656], [43.3595282, 5.3513156], [43.3595231, 5.3509145], [43.3589539, 5.3500401], [43.3529229, 5.3781548]]
  return (
    <div className="App">
      <MapContainer center={centraleMarseilleCoords} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={centraleMarseilleCoords}>
          <Popup>
            École Centrale Marseille
          </Popup>
        </Marker>
        {fitnessCoordsMarseille.map((coords, index) => (
          <Marker position={coords}>
            <Popup>
              Fitness No. {index}
            </Popup>
          </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default App;
