import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({height = "300px"}) => {
  const position = [10.803833, 106.694284];

  return (
    <MapContainer
      center={position} 
      zoom={15}
      style={{ height: height, width: "100%" }} 
    >
      {/* Tile layer từ OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marker tại Hà Nội */}
      <Marker position={position}>
        <Popup>
          Bệnh viên nhân dân Gia định 📍
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
