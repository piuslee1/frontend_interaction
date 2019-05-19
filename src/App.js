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
import posed from 'react-pose';

const Stagger = posed.ul({
  visible: {
    delayChildren: 200,
    staggerChildren: 300
  },
  hidden: { 
    delay: 300
  }
});

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.joystickRef = React.createRef();
    this.robotOrientationRef = React.createRef();
    this.state = {
      isVisible: false
    };
  }
  
  componentDidMount() {
    document.body.style.background = "#F4F4F4";
    this.setState({isVisible: true});
  }

  render() {
    return (
      <div>
        <TopNavbar/>
        <div className="px-5">
          <Stagger 
            style={{listStyleType: 'none'}}
            className="stagger"
            pose={this.state.isVisible ? 'visible' : 'hidden'}
          >
            <Row className="my-4">
              <Col className="col-2">
                <MakeCard body={{
                  title: "Drivetrain",
                  subtitle: "Manual Joystick Control",
                  text: "Click and drag to control the robot."
                }}>
                  <DrivetrainManual onMove={(x, y, rot) => {
                    functions.update_drivetrain({x: x, y: y}, () => {});
                    this.joystickRef.current.axisChangeHandler('LeftStickX', x, null);
                    this.joystickRef.current.axisChangeHandler('LeftStickY', y, null);
                    if (rot === null) { return; }
                    this.robotOrientationRef.current.setState({rotation: rot});
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
              <Col className="col-3">
                <MakeCard body={{
                  title: "Robot Orientation"
                }}>
                  <RobotOrientation ref={this.robotOrientationRef}/>
                </MakeCard>
              </Col>
            </Row>
            <Row className="my-4">
              <Col className="col-4">
                <MakeCard body={{
                  title: "Joystick Feedback",
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
          </Stagger>
        </div>
      </div>
    );
  }

}
