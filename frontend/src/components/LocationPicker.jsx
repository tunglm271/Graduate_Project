import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { RestartAlt } from "@mui/icons-material";

const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position);
    }, [position, map]);
    return null;
};

const LocationPicker = ({ onLocationSelect, defaultAddresses, lat = 21.0285, lng = 105.8544 }) => {
  const [position, setPosition] = useState([lat ?? 21.0285, lng ?? 105.8544]);

  useEffect(() => {
    const fetchCoordinates = async () => {
    
      if (!defaultAddresses || defaultAddresses.length === 0) return;
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(defaultAddresses)}`
      );
      const data = await response.json();
      
      if (data && data.length > 0 && data[0].lat && data[0].lon) {
        const { lat, lon } = data[0];
        const parsedLat = parseFloat(lat);
        const parsedLon = parseFloat(lon);
        
        if (!isNaN(parsedLat) && !isNaN(parsedLon)) { // Kiểm tra nếu lat, lon hợp lệ
          setPosition([parsedLat, parsedLon]);
          onLocationSelect({ lat: parsedLat, lng: parsedLon });
        }
      }
    };
  
    // Set a timeout to delay the API call
    const timeoutId = setTimeout(fetchCoordinates, 500); // Adjust delay as needed (e.g., 500ms)
  
    return () => clearTimeout(timeoutId); // Cleanup previous timeout on re-render
  }, [defaultAddresses]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        if (onLocationSelect) {
          onLocationSelect(e.latlng);
        }
      },
    });
    return null;
  };

  return (
      <MapContainer center={position} zoom={15} style={{ height: "250px", width: "100%" }}>
        <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} />
        <MapClickHandler />
        <RecenterMap position={position} />
      </MapContainer>
  );
};

export default LocationPicker;
