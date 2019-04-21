import React from 'react';
import Gamepad from 'react-gamepad';
import { Container, Row, Col } from 'reactstrap';

const joystickBoxStyle = {
  display: 'table',
  margin: '0 auto'
}

const joystickBackgroundStyle = {
  backgroundColor: "grey",
  width: '125px',
  height: '125px',
  borderRadius: '15%',
  position: 'relative'
}

const joystickMarkerBoxStyle = {
  position: 'absolute',
  right: '0',
  bottom: '0',
  width: '75px',
  height: '75px'
}

function joystickMarkerStyle(top, left) {
  return {
    position: 'absolute',
    top: (-top * 50).toString() + 'px',
    left: (left * 50).toString() + 'px',
    backgroundColor: 'red',
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    border: '3px solid pink'
  }
}

function JoystickElement(props) {
  return (
    <div style={joystickBoxStyle}>
      <div style={joystickBackgroundStyle}>
        <div style={joystickMarkerBoxStyle}>
          <div style={joystickMarkerStyle(props.joy.top, props.joy.left)}/>
        </div>
      </div>
    </div>
  );
}

export default class JoystickReader extends React.Component {
  
  constructor(props) {
    super(props);
    this.axisChangeHandler = this.axisChangeHandler.bind(this);
    this.state = {
      leftJoystick: {
        top: '0px',
        left: '0px'
      },
      rightJoystick: {
        top: '0px',
        left: '0px'
      }
    };
  }

  disconnectHandler(gamepadIndex) {
    console.log(`Gamepad ${gamepadIndex} disconnected !`);
  }
 
  buttonChangeHandler(buttonName, down) {
    console.log(buttonName, down);
  }
 
  axisChangeHandler(axisName, value, previousValue) {
    this.setState((state) => {
      var leftJoystick = state.leftJoystick;
      var rightJoystick = state.rightJoystick;

      switch (axisName) {
        case 'LeftStickX':
          leftJoystick.left = value;
          return {leftJoystick};
        case 'LeftStickY':
          leftJoystick.top = value;
          return {leftJoystick};
        case 'RightStickX':
          rightJoystick.left = value;
          return {rightJoystick};
        case 'RightStickY':
          rightJoystick.top = value;
          return {rightJoystick};
      }
    });
  }
 
  buttonDownHandler(buttonName) {
    console.log(buttonName, 'down')
  }
 
  buttonUpHandler(buttonName) {
    console.log(buttonName, 'up')
  }
 
// https://html5gamepad.com/
// https://gamepadviewer.com/

  render() {
    return (
      <Container>
        <Gamepad
          onConnect={this.connectHandler}
          onDisconnect={this.disconnectHandler}
          onButtonChange={this.buttonChangeHandler}
          onAxisChange={this.axisChangeHandler}>
          <div/>
        </Gamepad>
        <Row className="mt-3">
          <Col>
            <JoystickElement joy={this.state.leftJoystick}/>
          </Col>
          <Col>
            <JoystickElement joy={this.state.rightJoystick}/>
          </Col>
        </Row>
      </Container>
    );
  }

}