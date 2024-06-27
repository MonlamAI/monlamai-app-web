import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useLoaderData } from "@remix-run/react";
const getCountryCoordinates = async (countryCode) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );
    const data = await response.json();
    const country = data[0];
    return { lat: country.latlng[0], lng: country.latlng[1] };
  } catch (error) {
    console.error("Error fetching country coordinates:", error);
    return null;
  }
};

function Map() {
  let { usercount } = useLoaderData();
  const [userCounts, setUserCounts] = useState([]);
  const [countryCoords, setCountryCoords] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const data = usercount;
      const validData = data.filter((d) => d.country);
      setUserCounts(validData);

      const coords = {};
      for (const item of validData) {
        if (!coords[item.country]) {
          const countryCoord = await getCountryCoordinates(item.country);
          if (countryCoord) {
            coords[item.country] = countryCoord;
          }
        }
      }
      setCountryCoords(coords);
    };
    fetchData();
  }, []);
  useEffect(() => {
    let d = document.querySelectorAll(".leaflet-bottom");
    d.forEach((p) => p.classList.add("hidden"));
  }, []);
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={2}
      scrollWheelZoom={false}
      style={{
        height: "100%",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userCounts.map((data, index) => {
        const coordinates = countryCoords[data.country];
        if (coordinates) {
          const customIcon = L.divIcon({
            html: `<div style="display: flex; justify-content: center; align-items: center; width: 30px; height: 30px; border-radius: 50%; background-color: blue; color: white; font-size: 12px;">${data._count._all}</div>`,
            className: "",
          });
          return (
            <Marker
              key={index}
              position={[coordinates.lat, coordinates.lng]}
              icon={customIcon}
            >
              <Popup>
                {data.country}: {data._count._all} users
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
}

export default Map;
