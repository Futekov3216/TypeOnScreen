import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';
import { Button, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

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
      open: true,
      msg:'',
      fontSize:16,
      element1:'',
      element2:''
    }
  }

  //  MODAL CONTROLS 
  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })


  componentDidMount() {
    console.log(document.getElementsByClassName('modal'))
    const modal1 = document.getElementsByClassName('modals')[0]
    const modal2 = document.getElementsByClassName('modal')[0]
    this.setState({
      element: modal1,
      element2: modal2
    })
    // console.log(modal)
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
    console.log(event.target)
    console.log(this.state.element)
    if (event.target.getAttribute('name') === 'screenName' || event.target.getAttribute('name') === 'room' || event.target === this.state.element){
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
      msg:'',
      fontSize: (Math.floor(Math.random() * 21) + 13)
    }
    items.push(posObj)
    this.setState({
      itemArray: items,
      msg:'',
      fontSize: 16
    })
  }

  handleChange = async (e) => {
    let arrtobeimported = this.state.itemArray
    this.setState({
      [e.target.name]: e.target.value,
      msg: e.target.value,
    }, () => {
      if (arrtobeimported.length > 0){
        arrtobeimported[arrtobeimported.length - 1].msg = this.state.msg
        var user = this.state.itemArray
          socket.on('user', user => {
            this.setState({
              itemArray: user,
            })
          })
        socket.emit('user', user);
        }
    });

  }

  componentWillMount() {
    document.addEventListener('click', this.createElement)
  }
  render() {
    // console.log(this.state.itemArray)
    const { response, size, open } = this.state;
    return (
      <div className="App">
        <Modal size={size} open={open}>
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>No</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' />
          </Modal.Actions>
        </Modal>
        <h1>{response ? "CONNECTED" : "NOT CONNECTED"}</h1>
        <p><input className="EnterName" onChange={this.handleChange} name="screenName" placeholder="Enter Name" value={this.state.screenName}/></p>
        {this.state.itemArray.map((res, index) => {
          // console.log('res', res.msg)
          if (res.x === undefined) {
            return null
          }else{
            return <span className="pos" key={index} style={{ top: res.y, left: res.x, fontSize: res.fontSize }} onChange={this.handleChange} name={res.name}>{res.name}:<input className="input" autoFocus />{res.msg}</span>
          }
        })}
      </div>
    );
  }
}

export default App;
