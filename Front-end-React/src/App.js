import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      response: false,
      endpoint: "http://localhost:3001"
    }
  }
  componentDidMount(){
    const {endpoint} = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("data", data => {
    this.setState({
       response: data 
      })
    }
    );
  }
  render() {
    const { response } = this.state;
    return (
      <div className="App">
        <h1>{response ? "CONNECTED" : "NOT CONNECTED" }</h1>
      </div>
    );
  }
}

export default App;
