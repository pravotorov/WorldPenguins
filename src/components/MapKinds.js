import React from 'react';
import { render } from 'react-dom'
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';

const MapKinds = ({kinds}) => {
  const position = [47.211832, 38.935350];
  return (
    <LeafletMap center={position} zoom={16}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>
      </LeafletMap>
  );
};

export default MapKinds;