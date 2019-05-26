import React from "react";
import posed from "react-pose";
import { Card } from "reactstrap";

const Hover = posed.div({
  enter: { boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" },
  exit: { boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0.0)" }
});

const Fade = posed.li({
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
});

export default class RoundCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      hover: false
    };
  }

  componentDidMount() {
    this.setState({ isVisible: true });
  }

  onMouseEnter = () => {
    this.setState({ hover: true });
  };

  onMouseLeave = () => {
    this.setState({ hover: false });
  };

  render() {
    return (
      <Fade
        style={{ borderRadius: "10px" }}
        className="fade"
        pose={this.state.isVisible ? "visible" : "hidden"}
      >
        <Hover
          style={{ borderRadius: "10px" }}
          className="hover"
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          pose={this.state.hover ? "enter" : "exit"}
        >
          <Card
            {...this.props}
            style={{
              borderRadius: "10px"
            }}
          >
            {this.props.children}
          </Card>
        </Hover>
      </Fade>
    );
  }
}
