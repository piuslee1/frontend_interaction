import React, { Component } from 'react';
import './App.css';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody
 } from 'reactstrap';
import TopNavbar from './TopNavbar.js';
import Joystick from 'react-joystick';
import ReactPlayer from 'react-player';
import YoutubePlayer from 'react-player/lib/players/YouTube';
import functions from './utils/requests.js';

const joyOptions = {
  mode: 'static',
  position: {top: 0, left: 0},
  catchDistance: 150,
  color: 'white'
}
 
const containerStyle = {
  position: 'static',
  height: '350px',
  width: '100%',
  background: 'linear-gradient(to right, #E684AE, #79CBCA, #77A1D3)'
}

const verticalSpacer = {
  height: '150px'
}

class App extends Component {
  constructor() {
    super();
    this.managerListener = this.managerListener.bind(this);
    this.state = {angle:0, force:0, x:0,y:0,z:0,rotation:0}

    let updateInterval = 200

    setInterval(this.updateStatus, updateInterval);
  }
 
  updateStatus = () => {
    functions.update_drivetrain(
      this.state,
      () => {}
    )
    functions.update_arm_position(
      this.state,
      () => {}
    )
  }

  handleKeyPress = (event) => {
    console.log('enter press here! ')
  }

  managerListener(manager) {
    manager.on('move', (e, stick) => {
      this.setState({angle:stick.angle.radian, force:stick.force})
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="0"/>
          <Col>
            <TopNavbar/>
          </Col>
          <Col xs="0"/>
        </Row>
        <Row className="my-4">
          <Col>
            <Card style={{borderRadius: "15px"}}>
              <Joystick joyOptions={joyOptions} containerStyle={containerStyle} managerListener={this.managerListener}/>
              <CardBody>
                <h1>Drivetrain</h1>
                <h4>Manual Joystick Control</h4>
                <p>Click and drag to control the robot.</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Card style={{borderRadius: "15px"}}>
              <YoutubePlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                playing controls width='100%' height='500px'/>
              <CardBody>
                <h1>Video Feed</h1>
                <h4>Live Camera Feed</h4>
                <p>Something something flavor text.</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row containerStyle={verticalSpacer}/>
      </Container>
    );
  }
}

export default App;
