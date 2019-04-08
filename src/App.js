import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import TopNavbar from './TopNavbar.js';
import YoutubePlayer from 'react-player/lib/players/YouTube';
import DrivetrainManual from './DrivetrainManual';
import MakeCard from './utils/Card.js'

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

const debug = {
  backgroundColor: "#FF0000"
}

class App extends Component {

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs="0"/>
            <Col>
              <TopNavbar/>
            </Col>
            <Col xs="0"/>
          </Row>
        </Container>
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
                title: "Video Feed",
                subtitle: "Live Camera Feed",
                text: "Something something flavor text."
              }}>
                <RoundYoutubePlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                  playing controls width='100%' height='500px'/>
              </MakeCard>
            </Col>
            <Col>
              <MakeCard body={{
                title: "Stats and Stuff",
                subtitle: "",
                text: "We don't have any."
              }}/>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

export default App;
