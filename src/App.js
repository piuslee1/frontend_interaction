import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Joystick from 'react-joystick';
 
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
    this.state = {angle:0, force:0}
    
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
      <div onKeyPress={this.handleKeyPress} tabIndex="0">
        <Joystick joyOptions={joyOptions} containerStyle={containerStyle} managerListener={this.managerListener} />
      </div>
    );
  }
}

export default App;
