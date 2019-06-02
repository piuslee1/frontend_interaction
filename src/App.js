import React from "react";
import "./App.css";
import { Row, Col } from "reactstrap";
import posed from "react-pose";
import cardData from "./CardData";
import MakeCard from "./utils/Card.js";
import TopNavbar from "./modules/TopNavbar.js";

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
            {cardData(this).rows.map(row => {
              return row.columns.map(card => {
                return <MakeCard body={card.body}>{card.data}</MakeCard>;
              });
            })}
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
              {cardData(this).rows.map(row => {
                return (
                  <Row className={row.className}>
                    {row.columns.map(card => {
                      return (
                        <Col className={card.className}>
                          <MakeCard body={card.body}>{card.data}</MakeCard>
                        </Col>
                      );
                    })}
                  </Row>
                );
              })}
            </Stagger>
          </div>
        </div>
      );
    }
  }
}
