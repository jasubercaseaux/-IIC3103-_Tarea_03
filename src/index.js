import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import {Mapa, Flights} from './App';
//import Mapa from './App'
//import Chat from './Chat';
//import Flights from './Flights';
import * as serviceWorker from './serviceWorker';
//import { El_mapa } from './El_mapa';
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'));

//ReactDOM.render(<Mapa />, document.getElementById('mapa'));
//ReactDOM.render(<Chat />, document.getElementById('chat'));
//ReactDOM.render(<Flights />, document.getElementById('vuelos'));
//ReactDOM.render(<Flights />, document.getElementById('vuelos'));
//ReactDOM.render(<El_mapa />, document.getElementById('mapa'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
