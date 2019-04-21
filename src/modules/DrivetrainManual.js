import React from 'react';
import Joystick from 'react-joystick';

const joyOptions = {
  mode: 'static',
  color: 'white',
  position: {
    top: '100px',
    left: '50%'
  }
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
  }

  managerListener(manager) {
    manager.on('move', (e, stick) => {
      let xVal = Math.cos(stick.angle.radian) * Math.min(1, stick.force);
      let yVal = Math.sin(stick.angle.radian) * Math.min(1, stick.force);

      this.setState({x: xVal, y: yVal}, this.props.onMove(xVal, yVal));
    });
  }

  render() {
    return (
      <Joystick options={joyOptions}
        containerStyle={containerStyle}
        managerListener={this.managerListener}
      />
    );
  }

}
