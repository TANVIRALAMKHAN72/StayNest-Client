import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import { FaMapMarkedAlt, FaHome } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Slide } from "react-awesome-reveal";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ApartmentLocation = () => {
  const position = [23.750743, 90.432212];

  return (
    <section className="py-16 px-4 bg-base-100 dark:bg-neutral-900 transition-colors duration-500">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <Slide direction="up" triggerOnce>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
            <FaMapMarkedAlt className="text-indigo-600 text-4xl" />
            Apartment in Banasree
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg max-w-2xl mx-auto">
            This is the pinpointed location of our featured apartment in
            Banasree, Dhaka. Feel free to explore using zoom and pan controls.
          </p>
        </Slide>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="relative h-80 md:h-96">
          <MapContainer
            center={position}
            zoom={16}
            scrollWheelZoom={true}
            zoomControl={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="topright" />
            <Marker position={position}>
              <Popup>
                <FaHome className="inline text-indigo-500 mr-1" />
                Your Apartment
                <br />
                Banasree, Dhaka
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Located in a quiet residential block of Banasree
          </p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${position[0]},${position[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-neutral btn-dash"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default ApartmentLocation;
