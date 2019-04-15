import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import TopNavbar from './TopNavbar.js';
import DrivetrainManual from './DrivetrainManual';
import MakeCard from './utils/Card.js'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import functions from './utils/requests.js';
import RobotOrientation from './RobotOrientation';
import Joystick from './Joystick';

const keysHandled = [
  'w', 'a', 's', 'd',
  'shift', 'space', 'q', 'e',
  'left', 'right', 'up', 'down'
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drivetrain:{
        x: 0,
        y: 0
      },
      arm_position:{
        x: 0,
        y: 0,
        z: 0,
        x_angle: 0,
        y_angle: 0,
        rotation: 0
      },
      keys:{
        "w":false,
        "s":false,
        "a":false,
        "d":false,
        "e":false,
        "q":false,
        "space":false,
        "shift":false,
        "left":false,
        "right":false,
        "up":false,
        "down":false
      }
    }

    let updateInterval = 200;
    setInterval(this.update_arm_position, updateInterval);

  }
  
  update_arm_position = () => {
    let keys = this.state.keys;
    let arm_position = {...this.state.arm_position}

    if(keys.w){ arm_position.z += .1; }
    if(keys.s){ arm_position.z -= .1; }
    if(keys.a){ arm_position.x -= .1; }
    if(keys.d){ arm_position.x += .1; }
    if(keys.shift){ arm_position.y -= .1; }
    if(keys.space){ arm_position.y += .1; }
    if(keys.e){ arm_position.rotation += Math.PI / 10; }
    if(keys.q){ arm_position.rotation -= Math.PI / 10; }
    if(keys.left){ arm_position.x_angle -= Math.PI / 10; }
    if(keys.right){ arm_position.x_angle += Math.PI / 10; }
    if(keys.down){ arm_position.y_angle -= Math.PI / 10; }
    if(keys.up){ arm_position.y_angle += Math.PI / 10; }
    if(arm_position !== this.state.arm_position){
      let changed = false;
      Object.values(keys).forEach((value) => {
        if(value){
          changed = true;
        }
      })
      if(changed){
        functions.update_arm_position(this.state.arm_position,() => {})
      }
    }
    this.setState({arm_position})
  } 


  armKeysDown = (key) => {
    let keys = {...this.state.keys}
    keys[key] = true;

    this.setState({keys})
  }

  armKeysUp = (key) => {
    let keys = {...this.state.keys}
    keys[key] = false;
    this.setState({keys})
  }
  
  componentDidMount() {
    document.body.style.background = "#F4F4F4";
  }

  getPressedKeys = () => {
    let keys = [];

    for (const [key, value] of Object.entries(this.state.keys)) {
      if(value){
        keys.push(<li>{key}</li>)
      }
    }  
    return keys
  }

  displayArmValues = () => {
    let arm_values = [];

    for (const [key, value] of Object.entries(this.state.arm_position)) {
      if (arm_values){
        arm_values.push(<li>{key}: {value.toFixed(3)}</li>)
      }
    }  
    return arm_values
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
                      x: Math.cos(stick.angle.radian) * Math.min(1,stick.force),
                      y: Math.sin(stick.angle.radian) * Math.min(1,stick.force),
                    }
                  },
                  // Callback:
                  () => {
                    functions.update_drivetrain(this.state.drivetrain,() => {})
                  })
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
              <MakeCard>
                <KeyboardEventHandler
                  handleKeys={keysHandled}
                  handleEventType="keydown"
                  onKeyEvent={this.armKeysDown} 
                  handleFocusableElements={true}
                />
                <KeyboardEventHandler
                  handleKeys={keysHandled}
                  handleEventType="keyup"
                  onKeyEvent={this.armKeysUp} 
                  handleFocusableElements={true}
                />
                <Container>
                  <Row>
                    <Col class="col-2">
                      <h5 class="mt-4">Keys Depressed</h5>
                      <ul>
                        {this.getPressedKeys()}
                      </ul>
                    </Col>
                    <Col class="col-2">
                      <h5 class="mt-4">Current Arm Position</h5>
                      <ul>
                        {this.displayArmValues()}
                      </ul>
                    </Col>
                  </Row>
                </Container>
              </MakeCard>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

export default App;
