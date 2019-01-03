import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

const host = "10.10.0.239" // must be the real ip to work on phones otherwise localhost does the
let room = 'chat'
const endpoint = `http://${host}:3001/${room}`;
const socket = socketIOClient(endpoint);


class App extends Component {
  constructor() {
    super()
    this.state = {
      response: false,
      endpoint: `http://localhost:3001/${room}`,
      screenName:'',
      itemArray: [],
      check: false,
      msg:''
    }
  }
  componentDidMount() {
    // const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    socket.on("data", data => {
      this.setState({
        response: data
      })
    }
    );
  socket.on('user', user => {
      // console.log(user)
      this.setState({
        itemArray: user
      })
    })
  }
  createElement = (event) => {
    if (event.target.getAttribute('name') === 'screenName' || event.target.getAttribute('name') === 'room'){
      return
    }

    // console.log("X ===", event.clientX)
    // console.log("Y ===", event.clientY)
    const items = this.state.itemArray
    const positionX = event.clientX
    const positionY = event.clientY

    let posObj = {
      x: positionX,
      y: positionY,
      name: this.state.screenName === '' ? 'Anonymous' : this.state.screenName,
      msg:''
    }
    items.push(posObj)
    this.setState({
      itemArray: items,
      check: false,
      msg:''
    })
  }

  handleChange = async (e) => {
    let arrtobeimported = this.state.itemArray
    this.setState({
      [e.target.name]: e.target.value,
      msg: e.target.value,
    });
    if (arrtobeimported.length > 0){
      console.log("zdre")
      arrtobeimported[arrtobeimported.length - 1].msg = this.state.msg
      }
    var user = this.state.itemArray
    socket.on('user', user => {
      this.setState({
        itemArray: user,
      })
    })
    socket.emit('user', user);
    console.log(this.state.itemArray)

  }

  componentWillMount() {
    document.addEventListener('click', this.createElement)
  }
  render() {
    // console.log(this.state.itemArray)
    const { response } = this.state;
    return (
      <div className="App">
        <h1>{response ? "CONNECTED" : "NOT CONNECTED"}</h1>
        <p><input className="EnterName" onChange={this.handleChange} name="screenName" placeholder="Enter Name" value={this.state.screenName}/></p>
        {this.state.itemArray.map((res, index) => {
          console.log('res', res.msg)
          if (res.x !== undefined) {
            return <span className="pos" key={index} style={{ top: res.y, left: res.x }} onChange={this.handleChange} name={res.name}>{res.name}:<input className="input" autoFocus />{res.msg}</span>
          }
        })}
      </div>
    );
  }
}

export default App;
