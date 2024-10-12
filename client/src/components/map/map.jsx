import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Pin from '../pin/pin';

function Map({ items }) {
  return (
    <div className="w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={items.length === 1 ? [items[0].latitude, items[0].longitude] : [10.8505, 78.7006]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map(item => (
          <Pin item={item} key={item.id} />
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;