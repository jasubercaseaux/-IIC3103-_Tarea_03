import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
//import Mapa from "./App.js";
import "./App.css";

export default class Flights extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const todos_vuelos = this.props.vuelos.map((elem, index) => {
      return <div id="carta-vuelo" class="card text-dark bg-light mb-3">
                  <div class="card-header">{elem.airline}</div>
                  <div class="card-body">
                    <h5 class="card-title">{elem.code}</h5>
                    <span>Avión: {elem.plane}</span>
                    <br></br>
                    <span>Origen: {elem.origin[0]} | {elem.origin[1]}</span>
                    <br></br>
                    <span>Destino: {elem.destination[0]} | {elem.destination[1]}</span>
                    <br></br>
                    <span>Asientos: {elem.seats}</span>
                    <br></br>
                    <div class="dropup">
                      <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">
                        Pasajeros
                      </button>
                      <div class="dropdown-menu">
                        {elem.passengers.map(c_pas=>
                          <a class="dropdown-item">({c_pas.age}) {c_pas.name}</a>
                        )}
                      </div>
                    </div>
                  </div>
             </div>
    });


    return (
      <div>
        <div id="cont-boton-vuelos" class="d-grid gap-2">
          <button class="btn btn-outline-secondary" type="button"
            onClick={this.props.SubmitVuelos}
          >Cargar Vuelos</button>
        </div>
        <div id="cont-tarjetas-vuelos">
          {todos_vuelos}
        </div>
      </div>
    );
  }

}

