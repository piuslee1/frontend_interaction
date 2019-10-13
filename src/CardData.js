import React from "react";
import functions from "./utils/requests.js";
import DrivetrainManual from "./modules/DrivetrainManual";
import RobotOrientation from "./modules/RobotOrientation";
import JoystickReader from "./modules/JoystickReader";
import KeyboardControl, { keysHandled } from "./modules/KeyboardControl";

export default function cardData(thisObj) {
  return {
    rows: [
      {
        className: "my-4",
        columns: [
          {
            className: "col-2",
            body: {
              title: "Manual",
              text: "Click and drag to control the robot."
            },
            data: (
              <DrivetrainManual
                onMove={(x, y, rotation) => {
                  functions.update_drivetrain({ x, y }, () => {});
                  thisObj.Joystick.current.axisChangeHandler(
                    "LeftStickX",
                    x,
                    null
                  );
                  thisObj.Joystick.current.axisChangeHandler(
                    "LeftStickY",
                    y,
                    null
                  );
                  if (rotation === null) {
                    return;
                  }
                  thisObj.RobotOrientation.current.setState({ rotation });
                }}
              />
            )
          },
          {
            body: {
              title: "Live Camera Feed"
            },
            data: (
              <img src={"/sensors/video/stream/video0"} alt={"video feed"} />
            )
          },
          {
            className: "col-4",
            body: {
              title: "Robot Orientation"
            },
            data: <RobotOrientation ref={thisObj.RobotOrientation} />
          }
        ]
      },
      {
        className: "my-4",
        columns: [
          {
            className: "col-4",
            body: {
              title: "Joystick Feedback",
              subtext: "Reads input from controller",
              text: "Connect a joystick"
            },
            data: <JoystickReader ref={thisObj.Joystick} />
          },
          {
            body: {
              title: "Keyboard Control",
              text: "Valid Keys: " + keysHandled.join(", ")
            },
            data: <KeyboardControl />
          }
        ]
      }
    ]
  };
}
