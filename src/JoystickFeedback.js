import React from 'react';
import { Container, Row, Col } from 'reactstrap';

function gradientProgressStyle() {
  return {
    backgroundImage: 'linear-gradient(to right, #DC3545, #FFC109, #28A745, #FFC109, #DC3545)',
  };
}

function joystickProgressBarStyle(joyPercent) {
  return {
    boxShadow: '0px 0px 0px 2000px #EAECEF',
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    width: ~~joyPercent + '%',
    transition: 'none'
  };
}

/**
 * Tick function used for demonstration
 * 
 * this.joystickX should be in the range [-50, 50]
 * this.joystickY should be in the range [-50, 50]
 */
export default class JoystickFeedback extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      joystickX: 0,
      joystickY: 0,
      startTick: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      30
    );
  }

  tick() {
    let angle = (new Date()) - this.state.startTick;
    let xVal = (Math.sin(angle / 1000) + 1) * 50;
    let yVal = (Math.cos(angle / 1000) + 1) * 50;

    this.setState({
      joystickX: Math.abs(xVal) - 50,
      joystickY: Math.abs(yVal) - 50
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <p class="mt-3">
              Joystick X: {~~this.state.joystickX}
            </p>
          </Col>
          <Col>
            <p class="mt-3">
              Joystick Y: {~~this.state.joystickY}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div class="progress" style={gradientProgressStyle()}>
              <div class='progress-bar'
                role="progressbar"
                style={joystickProgressBarStyle(this.state.joystickX + 50)}
                aria-valuenow={this.state.joystickX + 50}
                aria-valuemin="0"
                aria-valuemax="100">
              </div>
            </div>
          </Col>
          <Col>
            <div class="progress" style={gradientProgressStyle()}>
              <div class='progress-bar'
                role="progressbar"
                style={joystickProgressBarStyle(this.state.joystickY + 50)}
                aria-valuenow={~~this.state.joystickY + 50}
                aria-valuemin="0"
                aria-valuemax="100">
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

}
