import React from 'react';
import './App.css';
import { Row, Col } from 'reactstrap';

import MakeCard from './utils/Card.js'
import functions from './utils/requests.js';

import TopNavbar from './modules/TopNavbar.js';
import DrivetrainManual from './modules/DrivetrainManual';
import RobotOrientation from './modules/RobotOrientation';
import JoystickReader from './modules/JoystickReader';
import KeyboardControl, { keysHandled } from './modules/KeyboardControl';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.joystickRef = React.createRef();
  }
  
  componentDidMount() {
    document.body.style.background = "#F4F4F4";
  }

  render() {
    return (
      <div>
        <TopNavbar/>
        <div className="px-5">
          <Row className="my-4">
            <Col>
              <MakeCard body={{
                title: "Drivetrain",
                subtitle: "Manual Joystick Control",
                text: "Click and drag to control the robot."
              }}>
                <DrivetrainManual onMove={(xVal, yVal) => {
                  functions.update_drivetrain({x: xVal, y: yVal}, () => {});
                  this.joystickRef.current.axisChangeHandler('LeftStickX', xVal, null);
                  this.joystickRef.current.axisChangeHandler('LeftStickY', yVal, null);
                }}/>
              </MakeCard>
            </Col>
            <Col>
              <MakeCard body={{
                title: "Live Camera Feed"
              }}>
                <img src={"/sensors/video/stream/video0"} alt={"video feed"}/>
              </MakeCard>
            </Col>
            <Col>
              <MakeCard body={{
                title: "Robot Orientation"
              }}>
                <RobotOrientation/>
              </MakeCard>
            </Col>
          </Row>
          <Row className="my-4">
            <Col className="col-4">
              <MakeCard body={{
                title: "Joystick Reader",
                subtext: "Reads input from controller",
                text: "Connect a joystick"
              }}>
                <JoystickReader ref={this.joystickRef}/>
              </MakeCard>
            </Col>
            <Col>
              <MakeCard body={{
                title: "Keyboard Control",
                text: "Valid Keys: " + keysHandled.join(', ')
              }}>
                <KeyboardControl/>
              </MakeCard>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}
