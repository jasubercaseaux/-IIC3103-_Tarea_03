import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "./App.css";
import moment from 'moment';

var io = require("socket.io-client");

var socket = io.connect('wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl', {
    path:'/flights'
}); 



export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      name: "",
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this)
    
  }

  componentDidMount () {
    socket.on('CHAT', data => {
      //var mensaje = {
      //  name: data.name,
      //  date: moment(new Date(data.date)).format('DD-MM-YYYY'),
      //  message: data.message
      //}
      this.setState({ chats: [...this.state.chats, data]})
      //console.log(this.state.chats)
    })
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    var mensaje = { 
      name: this.state.name,
      message: this.state.message
    };
    //console.log(mensaje);
    socket.emit('CHAT', mensaje);
    this.state.name = '';
    this.state.message = '';
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  render() {
    const mensajes = this.state.chats.map((mensaje, index) => {
      return <div key={index} id="cont-mensaje" class="card text-dark bg-light mb-3">
        <div id="cont-nombre-chat" class="card-header">{mensaje.name}</div>
        <span>{mensaje.message}</span>
        <span id="fecha-chat">{moment(new Date(mensaje.date)).format('DD-MM-YYYY')}</span>
      </div>
    });

    return (
      <div>
        <div id="cont-mensajes">
          {mensajes}
        </div>
        <div id="cont-accion-chat">
        <form onSubmit={this.mySubmitHandler}>
          <input
            class="form-control me-2"
            type='text'
            name='name'
            placeholder = "Nombre..."
            value = {this.state.name}
            onChange={this.handleChange}
            //onChange={(e) => this.setState({name: e.target.value})}
          />
          <input
            class="form-control me-2"
            type='text'
            name='message'
            placeholder = "Chat..."
            value = {this.state.message}
            onChange={this.handleChange}
            //onChange={(e) => this.setState({message: e.target.value})}
          />
          <div class="d-grid gap-2">
            <button class="btn btn-outline-secondary" type="submit">Enviar</button>
          </div>
        </form>
        </div>
      </div>
    );
  }

}

