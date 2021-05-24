import React from "react";
import { Map, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import { Icon } from "leaflet";
import "./App.css";
import Flights from "./Flights";
import Mapa from "./Map";
import Chat from "./Chat";

//import L from 'leaflet';

var io = require("socket.io-client");

var socket = io.connect('wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl', {
    path:'/flights'
}); 


//socket.on('CHAT', function(data){
  //console.log(data);
  //var todos_vuelos = JSON.parse(sessionStorage.getItem("todos_vuelos"));
  //console.log(todos_vuelos[0].origin[0]);
  //render(data)
//});

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      vuelos: [],
      chats: [],
      posiciones: [],
    };
    
  }

  componentDidMount () {
    socket.on('POSITION', data => {
      var pos_aux = this.state.posiciones;
      var pos_aux_2 = this.state.posiciones;
      var encontrado = 0;
      if (pos_aux.length === 0){
        pos_aux_2 = [data]
      } else {
        pos_aux.map((c_pos, index) => {
          if (c_pos.code === data.code){
            pos_aux_2[index] = data
            encontrado = 1;
          } 
        });
        if (encontrado === 0) {
          pos_aux_2 = [...pos_aux_2, data]
        } 
      }
      this.setState({ posiciones: pos_aux_2})
           
         
    })
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    socket.emit('FLIGHTS', "");
    socket.on('FLIGHTS', data => {
      this.setState({ vuelos: data})
    })
    //console.log(this.state.vuelos)
    //mandar vuelos a App
    //var todos_vuelos = this.state.vuelos;
    //sessionStorage.setItem("todos_vuelos", JSON.stringify(todos_vuelos));    
  }


  render() {
      return (
        <div>
              <div id="cont-vuelos">
                <Flights
                  vuelos={this.state.vuelos}
                  SubmitVuelos={this.mySubmitHandler}
                />
              </div>
              <div id="cont-mapa">
                <Mapa
                  vuelos={this.state.vuelos}
                  posiciones={this.state.posiciones}
                />
              </div>
              <div id="cont-chat">
                <Chat
                  //schats={this.state.chats}            
                />
            </div> 
        </div>
    );
  }

}

//Tutorial base para levantar la App >> https://github.com/leighhalliday/react-leaflet-demo/blob/master/src/App.js










