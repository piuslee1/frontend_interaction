import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Joystick from 'react-joystick';
import ReactPlayer from 'react-player' 
import functions from './utils/requests.js'

const joyOptions = {
  mode: 'static',
  position: {top: 0, left: 0},
  catchDistance: 150,
  color: 'white'
}
 
const containerStyle = {
  position: 'static',
  height: '350px',
  width: '100%',
  background: 'linear-gradient(to right, #E684AE, #79CBCA, #77A1D3)'
} 

class App extends Component {
  constructor() {
    super();
    this.managerListener = this.managerListener.bind(this);
    this.state = {angle:0, force:0, x:0,y:0,z:0,rotation:0}

    let updateInterval = 200

    setInterval(this.updateStatus, updateInterval);
  }
 
  updateStatus = () => {
    functions.update_drivetrain(
      this.state,
      () => {}
    )
    functions.update_arm_position(
      this.state,
      () => {}
    )
  }

  handleKeyPress = (event) => {
    console.log('enter press here! ')
  }

  managerListener(manager) {
    manager.on('move', (e, stick) => {
      this.setState({angle:stick.angle.radian, force:stick.force})
    })
  }

  render() {
    return (
      <div className="container" onKeyPress={this.handleKeyPress} tabIndex="0">
        <div className="row">
          <div className="col-md-4">
            <Joystick joyOptions={joyOptions} containerStyle={containerStyle} managerListener={this.managerListener} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
