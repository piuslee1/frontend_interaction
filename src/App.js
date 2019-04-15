import React from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';

import MakeCard from './utils/Card.js'
import functions from './utils/requests.js';

import TopNavbar from './modules/TopNavbar.js';
import DrivetrainManual from './modules/DrivetrainManual';
import RobotOrientation from './modules/RobotOrientation';
import Joystick from './modules/Joystick';
import KeyboardControl, { keysHandled } from './modules/KeyboardControl';

export default class App extends React.Component {
  
  componentDidMount() {
    document.body.style.background = "#F4F4F4";
  }

  render() {
    return (
      <div>
        <div style={{
          color: "#FFFFFF",
          backgroundColor: "#555555"
        }}>
          <Container>
            <Row>
              <Col xs="0"/>
              <Col>
                <TopNavbar/>
              </Col>
              <Col xs="0"/>
            </Row>
          </Container>
        </div>
        <div className="px-5">
          <Row className="my-4">
            <Col>
              <MakeCard body={{
                title: "Drivetrain",
                subtitle: "Manual Joystick Control",
                text: "Click and drag to control the robot."
              }}>
                <DrivetrainManual on_move={(stick) =>{
                  this.setState({
                    drivetrain:{
                      x: Math.cos(stick.angle.radian) * Math.min(1, stick.force),
                      y: Math.sin(stick.angle.radian) * Math.min(1, stick.force),
                    }
                  },
                  // Callback:
                  () => {
                    functions.update_drivetrain(this.state.drivetrain,() => {})
                  });
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
                title: "Joystick reader",
                subtext: "Reads input from controller",
                text: "Connect a joystick"
              }}>
              <Joystick/>
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
