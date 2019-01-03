import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

const span = React.createElement('span', {}, "zdre")

class App extends Component {
  constructor() {
    super()
    this.state = {
      response: false,
      endpoint: "http://localhost:3001",
      itemArray: [1, 2, 3]
    }
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("data", data => {
      this.setState({
        response: data
      })
    }
    );
  }
  createElement = (event) => {
    console.log("X ===", event.clientX)
    console.log("Y ===", event.clientY)
    const items = this.state.itemArray
    const positionX = event.clientX
    const positionY = event.clientY
    const name = "test"
    let posObj = {
      x: positionX,
      y: positionY,
      name: name
    }
    items.push(posObj)
    this.setState({
      itemArray: items
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentWillMount() {
    window.addEventListener('click', this.createElement)
  }
  render() {
    const { response } = this.state;
    return (
      <div className="App">
        <h1>{response ? "CONNECTED" : "NOT CONNECTED"}</h1>
        {this.state.itemArray.map((res, index) => {
          if (res.x !== undefined) {
            return <span className="pos" key={index} style={{ top: res.y, left: res.x }}>{res.name}:<input className="input" autoFocus onChange={this.state.handleChange} name={res.name} /></span>
          }
        })}
      </div>
    );
  }
}

export default App;
