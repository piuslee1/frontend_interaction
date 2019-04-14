import React from 'react';
import Joystick from 'react-joystick';
import functions from './utils/requests.js';

const joyOptions = {
  mode: 'static',
  position: {top: "100px", left: "50%"},
  color: 'white'
}
 
const containerStyle = {
  position: 'static',
  height: '350px',
  width: '100%',
  background: 'linear-gradient(to right, #E684AE, #79CBCA, #77A1D3)',
  borderTopLeftRadius: '15px',
  borderTopRightRadius: '15px'
}

export default class DrivetrainManual extends React.Component {
  constructor(props) {
    super(props);
    this.managerListener = this.managerListener.bind(this);
    this.state = {
      x: 0,
      y: 0,
      z: 0,
      angle: 0,
      force: 0,
      rotation: 0
    };

    // let updateInterval = 200;
    // setInterval(this.updateStatus, updateInterval);
  }
 
  updateStatus = () => {
    

    functions.update_arm_position(
      this.state,
      () => {}
    );
  }


  managerListener(manager) {
    manager.on('move', (e, stick) => {
      this.setState({
        angle: stick.angle.radian,
        force: stick.force
      },
      // Callback:
      () => {
        functions.update_drivetrain(
        this.state,
        () => {})
      })
    })
  }

  render() {
    return <Joystick options={joyOptions}
      containerStyle={containerStyle}
      managerListener={this.managerListener}
    />
  }

}
