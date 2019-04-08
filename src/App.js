import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import TopNavbar from './TopNavbar.js';
import YoutubePlayer from 'react-player/lib/players/YouTube';
import DrivetrainManual from './DrivetrainManual';

function RoundCard(props) {
  return (
    <Card {...props} style={{borderRadius: "15px"}}>
      {props.children}
    </Card>
  );
}

function RoundYoutubePlayer(props) {
  return <YoutubePlayer {...props} style={
    {
      borderRadius: "15px",
      overflow: "hidden",
      zIndex: 1
    }
  }/>;
}

class App extends Component {

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
            <RoundCard>
              <DrivetrainManual/>
              <CardBody>
                <h1>Drivetrain</h1>
                <h4>Manual Joystick Control</h4>
                <p>Click and drag to control the robot.</p>
              </CardBody>
            </RoundCard>
          </Col>
          <Col>
            <RoundCard>
              <RoundYoutubePlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                playing controls width='100%' height='500px'/>
              <CardBody>
                <h1>Video Feed</h1>
                <h4>Live Camera Feed</h4>
                <p>Something something flavor text.</p>
              </CardBody>
            </RoundCard>
          </Col>
        </Row>
      </Container>
    );
  }

}

export default App;
