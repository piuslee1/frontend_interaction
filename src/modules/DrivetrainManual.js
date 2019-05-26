import React from "react";
import Joystick from "react-joystick";

const joyOptions = {
  mode: "static",
  color: "white",
  position: {
    top: "100px",
    left: "50%"
  }
};

const containerStyle = {
  height: "200px",
  width: "100%",
  background: "linear-gradient(to right, #E684AE, #79CBCA, #77A1D3)",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  overflow: "hidden",
  position: "relative",
  zIndex: 1
};

export default class DrivetrainManual extends React.Component {
  update = stick => {
    let angle = stick.angle.radian;
    let x = Math.cos(stick.angle.radian) * Math.min(1, stick.force);
    let y = Math.sin(stick.angle.radian) * Math.min(1, stick.force);

    this.setState({ x, y, angle }, this.props.onMove(x, y, angle));
  };

  managerListener = manager => {
    manager.on("move", (e, stick) => {
      let angle = stick.angle.radian;
      let x = Math.cos(stick.angle.radian) * Math.min(1, stick.force);
      let y = Math.sin(stick.angle.radian) * Math.min(1, stick.force);

      this.setState(
        {
          x: x,
          y: y,
          angle: angle
        },
        this.props.onMove(x, y, angle)
      );
    });
    manager.on("end", (e, stick) => {
      let x = 0;
      let y = 0;

      this.setState(
        {
          x: x,
          y: y
        },
        this.props.onMove(x, y, null)
      );
    });
  };

  render() {
    return (
      <Joystick
        options={joyOptions}
        containerStyle={containerStyle}
        managerListener={this.managerListener}
      />
    );
  }
}
