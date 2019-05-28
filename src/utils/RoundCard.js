import React from "react";
import posed from "react-pose";
import { Card } from "reactstrap";

const Hover = posed.div({
  enter: { boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" },
  exit: { boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.05)" }
});

const Fade = posed.li({
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
});

const Glow = posed.div(() => {
  let seed = Math.random();
  return {
    glow: { boxShadow: `0 4px 8px 5px ${randomHSL(seed, 0.5)}` },
    normal: { boxShadow: `0 4px 8px 5px ${randomHSL(seed, 0)}` }
  };
});

function randomHSL(seed, alpha) {
  return `hsla(${~~(256 * seed)}, 70%, 80%, ${alpha})`;
}

export default class RoundCard extends React.Component {
  state = {
    isVisible: false,
    hover: false,
    glow: false
  };

  componentDidMount() {
    this.setState({ isVisible: true });
  }

  onMouseEnter = () => {
    this.setState({ hover: true });
  };

  onMouseLeave = () => {
    this.setState({ hover: false });
  };

  onMouseDown = () => {
    this.setState({ glow: true });
  };

  onMouseUp = () => {
    this.setState({ glow: false });
  };

  render() {
    return (
      <Fade
        style={{
          margin: this.props.isMobile ? 20 : 0,
          marginLeft: 0,
          borderRadius: "10px"
        }}
        className="fade"
        pose={this.state.isVisible ? "visible" : "hidden"}
      >
        <Hover
          style={{ borderRadius: "10px" }}
          className="hover"
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          pose={this.state.hover && !this.state.glow ? "enter" : "exit"}
        >
          <Glow
            style={{ borderRadius: "10px" }}
            className="glow"
            onMouseLeave={this.onMouseUp}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            onMouseLeaveCapture={this.onMouseUp}
            onMouseDownCapture={this.onMouseDown}
            onMouseUpCapture={this.onMouseUp}
            pose={this.state.glow ? "glow" : "normal"}
          >
            <Card
              {...this.props}
              style={{
                borderWidth: 0,
                borderRadius: "10px"
              }}
            >
              {this.props.children}
            </Card>
          </Glow>
        </Hover>
      </Fade>
    );
  }
}
