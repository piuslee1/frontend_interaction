import React from 'react';
import Gamepad from 'react-gamepad';
import { Container, Row, Col } from 'reactstrap';

export default class Joystick extends React.Component {
  constructor(props) {
    super(props);
    this.axisChangeHandler = this.axisChangeHandler.bind(this);
    this.state= {
      leftJoystick: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        backgroundColor: 'red',
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        border: '3px solid pink'
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
    if ( axisName === 'LeftStickX' ) {
      let leftPos = (value * 50).toString() + 'px';

      // this.setState({
      //   leftJoystick.left: leftPos
      // });

      this.setState((state) => {
        var leftJoystick = state.leftJoystick;
        leftJoystick.left = leftPos;
        return {leftJoystick};
      });

      console.log("BLOB", leftPos);


      
      //console.log("BLOB", left);
    }

    //console.log(axisName, value)
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
          onAxisChange={this.axisChangeHandler}
        >
          <p></p>
        </Gamepad>
        <Row>
          <div style={{
            margin: '3%'
          }}>
            <div style={{
              backgroundColor: "grey",
              width: '125px',
              height: '125px',
              borderRadius: '15%',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                right: '0',
                bottom: '0',
                width: '75px',
                height: '75px'
              }}>
                <div style={this.state.leftJoystick} />
              </div>
            </div>
          </div>
        </Row>
      </Container>
    );
  }

}