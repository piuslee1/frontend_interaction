import React from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Container, Row, Col } from "reactstrap";
import functions from "../utils/requests.js";

let _keysHandled = [
  "w",
  "a",
  "s",
  "d",
  "q",
  "e",
  // 'W', 'A', 'S', 'D', 'Q', 'E',
  "shift",
  "space",
  "left",
  // 'SHIFT', 'SPACE', 'LEFT',
  "right",
  "up",
  "down"
  // 'RIGHT', 'UP', 'DOWN'
];

export const keysHandled = _keysHandled;

export default class KeyboardControl extends React.Component {
  state = {
    drivetrain: {
      x: 0,
      y: 0
    },
    arm_position: {
      x: 0,
      y: 0,
      z: 0,
      x_angle: 0,
      y_angle: 0,
      rotation: 0
    },
    keys: keysHandled.map((value, index, array) => {
      return eval(`{_${value}: false}`);
    })
  };

  componentDidMount() {
    let updateInterval = 200;
    setInterval(this.update_arm_position, updateInterval);
  }

  update_arm_position = () => {
    let keys = this.state.keys;
    let arm_position = this.state.arm_position;
    if (keys._w) {
      arm_position.z += 0.1;
    }
    if (keys._s) {
      arm_position.z -= 0.1;
    }
    if (keys._a) {
      arm_position.x -= 0.1;
    }
    if (keys._d) {
      arm_position.x += 0.1;
    }
    if (keys._shift) {
      arm_position.y -= 0.1;
    }
    if (keys._space) {
      arm_position.y += 0.1;
    }
    if (keys._e) {
      arm_position.rotation += Math.PI / 10;
    }
    if (keys._q) {
      arm_position.rotation -= Math.PI / 10;
    }
    if (keys._left) {
      arm_position.x_angle -= Math.PI / 10;
    }
    if (keys._right) {
      arm_position.x_angle += Math.PI / 10;
    }
    if (keys._down) {
      arm_position.y_angle -= Math.PI / 10;
    }
    if (keys._up) {
      arm_position.y_angle += Math.PI / 10;
    }

    if (arm_position !== this.state.arm_position) {
      let changed = false;
      Object.values(keys).forEach(value => {
        changed = value ? true : changed;
      });
      if (changed) {
        functions.update_arm_position(this.state.arm_position, () => {});
      }
    }

    this.setState({ arm_position });
  };

  armKeysDown = key => {
    let keys = this.state.keys;
    keys[key] = true;

    this.setState({ keys });
  };

  armKeysUp = key => {
    let keys = this.state.keys;
    keys[key] = false;
    this.setState({ keys });
  };

  getPressedKeys = () => {
    let keys = [];

    for (const [key, value] of Object.entries(this.state.keys)) {
      if (value) {
        keys.push(<li>{key}</li>);
      }
    }

    return keys;
  };

  displayArmValues = () => {
    let arm_values = [];

    for (const [key, value] of Object.entries(this.state.arm_position)) {
      if (arm_values) {
        arm_values.push(
          <li>
            {key}: {value.toFixed(3)}
          </li>
        );
      }
    }

    return arm_values;
  };

  render() {
    return (
      <div>
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
            <Col>
              <h5 className="mt-4">Keys Depressed</h5>
              <ul>{this.getPressedKeys()}</ul>
            </Col>
            <Col>
              <h5 className="mt-4">Current Arm Position</h5>
              <ul>{this.displayArmValues()}</ul>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
