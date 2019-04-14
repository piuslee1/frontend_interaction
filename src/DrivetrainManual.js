import React from 'react';
import Joystick from 'react-joystick';

const joyOptions = {
  mode: 'static',
  position: {top: "100px", left: "50%"},
  color: 'white'
}
 
const containerStyle = {
  position: 'static',
  height: '200px',
  width: '100%',
  background: 'linear-gradient(to right, #E684AE, #79CBCA, #77A1D3)',
  borderTopLeftRadius: '15px',
  borderTopRightRadius: '15px'
}

export default class DrivetrainManual extends React.Component {
  constructor(props) {
    super(props);
    this.managerListener = this.managerListener.bind(this);

    // let updateInterval = 200;
    // setInterval(this.updateStatus, updateInterval);
  }


  managerListener(manager) {
    manager.on('move', (e, stick) => {
      this.props.on_move(stick)
    })
  }

  render() {
    return <Joystick options={joyOptions}
      containerStyle={containerStyle}
      managerListener={this.managerListener}
    />
  }

}
