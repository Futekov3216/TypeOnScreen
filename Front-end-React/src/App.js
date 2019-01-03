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
      screenName:'',
      itemArray: [],
      msg:''
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
    if (event.target.getAttribute('name') === 'screenName'){
      return
    }
    console.log("X ===", event.clientX)
    console.log("Y ===", event.clientY)
    const items = this.state.itemArray
    const positionX = event.clientX
    const positionY = event.clientY
    // const name = "test"
    let posObj = {
      x: positionX,
      y: positionY,
      name: this.state.screenName === '' ? 'Anonymous' : this.state.screenName,
      msg:''
    }
    items.push(posObj)
    this.setState({
      itemArray: items
    })
  }

  handleChange = (e) => {
    let arrtobeimported = this.state.itemArray
    this.setState({
      [e.target.name]: e.target.value,
      msg: e.target.value
    })
    if (arrtobeimported.length > 0){
        arrtobeimported[arrtobeimported.length - 1].msg = this.state.msg
      }
  }

  componentWillMount() {
    document.addEventListener('click', this.createElement)
  }
  render() {
    const { response } = this.state;
    return (
      <div className="App">
        <h1>{response ? "CONNECTED" : "NOT CONNECTED"}</h1>
        <p><input className="EnterName" onChange={this.handleChange} name="screenName" placeholder="Enter Name" value={this.state.screenName}/></p>
        {this.state.itemArray.map((res, index) => {
          if (res.x !== undefined) {
            console.log(res.msg)
            return <span className="pos" key={index} style={{ top: res.y, left: res.x }}>{res.name}:<input className="input" autoFocus onChange={this.handleChange} name={res.name} /></span>
          }
        })}
      </div>
    );
  }
}

export default App;
