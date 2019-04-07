import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Joystick from 'react-joystick';
 
const joyOptions = {
    mode: 'semi',
    catchDistance: 150,
    color: 'white'
}
 
const containerStyle = {
    position: 'relative',
    height: '350px',
    width: '100%',
    background: 'linear-gradient(to right, #E684AE, #79CBCA, #77A1D3)'
} 

class App extends Component {
  constructor() {
      super();
      this.managerListener = this.managerListener.bind(this);
  }
 
  managerListener(manager) {
      manager.on('move', (e, stick) => {
          console.log('I moved!')
      })
      manager.on('end', () => {
          console.log('I ended!')
      })
  }

  render() {
    return (
      <div>

        <Joystick joyOptions={joyOptions} containerStyle={containerStyle} managerListener={this.managerListener} />
        
      </div>
    );
  }
}

export default App;
