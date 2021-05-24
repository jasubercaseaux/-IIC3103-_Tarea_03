import React from "react";
import { Map, Marker, Popup, TileLayer, Polyline, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import "./App.css";
import L from 'leaflet';
import iconos_aviones_izq from './img/icono_avion_izq.svg';
import iconos_aviones_der from './img/icono_avion_der.svg';


export const icon_izq = new Icon({
  iconUrl: iconos_aviones_izq,
  iconSize: [40, 40]
});

export const icon_der = new Icon({
  iconUrl: iconos_aviones_der,
  iconSize: [40, 40]
});

export default function Mapa({vuelos, posiciones}) {

  const limeOptions = { color: 'red' };

  
  return (
    <div>
      <Map center={[30, 0]} zoom={1}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      
        {vuelos.map((c_vuelo) => (
            <Polyline pathOptions={limeOptions} positions={[
                [c_vuelo.origin[0], c_vuelo.origin[1]],
                [c_vuelo.destination[0], c_vuelo.destination[1]],
              ]} />
        ))}

        {posiciones.map((c_pos) => (
            <Marker icon={icon_der} position={c_pos.position}>
              <Tooltip><b>{c_pos.code}</b><br></br>
              <span>Latitud:</span><br></br>{c_pos.position[0]}<br></br>
              <span>Longitud:</span><br></br>{c_pos.position[1]}</Tooltip>
            </Marker>
        ))}

      </Map>
    </div>
  );
}

