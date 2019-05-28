import React from "react";
import "./App.css";
import { Row, Col } from "reactstrap";
import posed from "react-pose";
import MakeCard from "./utils/Card.js";
import functions from "./utils/requests.js";
import TopNavbar from "./modules/TopNavbar.js";
import DrivetrainManual from "./modules/DrivetrainManual";
import RobotOrientation from "./modules/RobotOrientation";
import JoystickReader from "./modules/JoystickReader";
import KeyboardControl, { keysHandled } from "./modules/KeyboardControl";

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
  state = {
    width: window.innerWidth,
    isVisible: false
  };

  constructor(props) {
    super(props);
    this.Joystick = React.createRef();
    this.RobotOrientation = React.createRef();
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentDidMount() {
    document.body.style.background = "#F4F4F4";
    this.setState({ isVisible: true });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  render() {
    const isMobile = this.state.width <= 1000;
    if (isMobile) {
      return (
        <div>
          <TopNavbar />
          <Stagger
            style={{ listStyleType: "none" }}
            className="stagger"
            pose={this.state.isVisible ? "visible" : "hidden"}
          >
            <MakeCard
              isMobile={isMobile}
              body={{
                title: "Manual",
                text: "Click and drag to control the robot."
              }}
            >
              <DrivetrainManual
                onMove={(x, y, rotation) => {
                  functions.update_drivetrain({ x, y }, () => {});
                  this.Joystick.current.axisChangeHandler(
                    "LeftStickX",
                    x,
                    null
                  );
                  this.Joystick.current.axisChangeHandler(
                    "LeftStickY",
                    y,
                    null
                  );
                  if (rotation === null) {
                    return;
                  }
                  this.RobotOrientation.current.setState({ rotation });
                }}
              />
            </MakeCard>
            <MakeCard
              isMobile={isMobile}
              body={{
                title: "Live Camera Feed"
              }}
            >
              <img src={"/sensors/video/stream/video0"} alt={"video feed"} />
            </MakeCard>
            <MakeCard isMobile={isMobile} body={{ title: "Robot Orientation" }}>
              <RobotOrientation ref={this.RobotOrientation} />
            </MakeCard>
            <MakeCard
              isMobile={isMobile}
              body={{
                title: "Joystick Feedback",
                subtext: "Reads input from controller",
                text: "Connect a joystick"
              }}
            >
              <JoystickReader
                ref={o => {
                  this.Joystick = o;
                }}
              />
            </MakeCard>
            <MakeCard
              isMobile={isMobile}
              body={{
                title: "Keyboard Control",
                text: "Valid Keys: " + keysHandled.join(", ")
              }}
            >
              <KeyboardControl />
            </MakeCard>
          </Stagger>
        </div>
      );
    } else {
      return (
        <div>
          <TopNavbar />
          <div className="px-5">
            <Stagger
              style={{ listStyleType: "none" }}
              className="stagger"
              pose={this.state.isVisible ? "visible" : "hidden"}
            >
              <Row className="my-4">
                <Col className="col-2">
                  <MakeCard
                    isMobile={isMobile}
                    body={{
                      title: "Manual",
                      text: "Click and drag to control the robot."
                    }}
                  >
                    <DrivetrainManual
                      onMove={(x, y, rotation) => {
                        functions.update_drivetrain({ x, y }, () => {});
                        this.Joystick.current.axisChangeHandler(
                          "LeftStickX",
                          x,
                          null
                        );
                        this.Joystick.current.axisChangeHandler(
                          "LeftStickY",
                          y,
                          null
                        );
                        if (rotation === null) {
                          return;
                        }
                        this.RobotOrientation.current.setState({ rotation });
                      }}
                    />
                  </MakeCard>
                </Col>
                <Col>
                  <MakeCard
                    isMobile={isMobile}
                    body={{
                      title: "Live Camera Feed"
                    }}
                  >
                    <img
                      src={"/sensors/video/stream/video0"}
                      alt={"video feed"}
                    />
                  </MakeCard>
                </Col>
                <Col className="col-4">
                  <MakeCard
                    isMobile={isMobile}
                    body={{ title: "Robot Orientation" }}
                  >
                    <RobotOrientation ref={this.RobotOrientation} />
                  </MakeCard>
                </Col>
              </Row>
              <Row className="my-4">
                <Col className="col-4">
                  <MakeCard
                    isMobile={isMobile}
                    body={{
                      title: "Joystick Feedback",
                      subtext: "Reads input from controller",
                      text: "Connect a joystick"
                    }}
                  >
                    <JoystickReader ref={this.Joystick} />
                  </MakeCard>
                </Col>
                <Col>
                  <MakeCard
                    isMobile={isMobile}
                    body={{
                      title: "Keyboard Control",
                      text: "Valid Keys: " + keysHandled.join(", ")
                    }}
                  >
                    <KeyboardControl />
                  </MakeCard>
                </Col>
              </Row>
            </Stagger>
          </div>
        </div>
      );
    }
  }
}
