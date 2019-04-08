import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
 } from 'reactstrap';
import TopNavbar from './TopNavbar.js';
import Joystick from 'react-joystick';
 
const joyOptions = {
    mode: 'semi',
    catchDistance: 150,
    color: 'white'
}
 
const containerStyle = {
    position: 'relative',
    height: '350px',
    width: '100%',
    background: 'linear-gradient(to right, #E684AE, #79CBCA, #77A1D3)'
} 

class App extends Component {
  constructor() {
      super();
      this.managerListener = this.managerListener.bind(this);
  }
 
  managerListener(manager) {
      manager.on('move', (e, stick) => {
          console.log('I moved!')
      })
      manager.on('end', () => {
          console.log('I ended!')
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
        <Row>
          <Col>
            <Card>
              <Joystick joyOptions={joyOptions} containerStyle={containerStyle} managerListener={this.managerListener}/>
              <CardBody>
                <h1>Drivetrain</h1>
                <h4>Manual Joystick Control</h4>
                <p>Click and drag to control the robot.</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

        
      // <div>
      //   <TopNavbar/>
      //   <Joystick joyOptions={joyOptions} containerStyle={containerStyle} managerListener={this.managerListener} />
      // </div>
    );
  }
}

export default App;
