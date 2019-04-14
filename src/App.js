import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import TopNavbar from './TopNavbar.js';
import YoutubePlayer from 'react-player/lib/players/YouTube';
import DrivetrainManual from './DrivetrainManual';
import MakeCard from './utils/Card.js'
import JoystickFeedback from './JoystickFeedback';

function RoundYoutubePlayer(props) {
  return <YoutubePlayer {...props} style={
    {
      borderTopLeftRadius: "15px",
      borderTopRightRadius: "15px",
      overflow: "hidden",
      position: "relative",
      zIndex: 1
    }
  }/>;
}

class App extends Component {

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
                <DrivetrainManual/>
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
                title: "Robot Stats"
              }}>
                <JoystickFeedback/>
              </MakeCard>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

export default App;
