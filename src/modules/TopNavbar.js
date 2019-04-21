import React from 'react';
import {
  Container, Row, Col,
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';

const headerStyle = {
  color: "#FFFFFF",
  backgroundColor: "#555555"
}

const website = "https://www.yonderdynamics.org"
const gitlab = "https://gitlab.com/Yonder-Dynamics/UI/frontend_interaction"

export default class TopNavbar extends React.Component {

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div style={headerStyle}>
        <Container>
          <Row>
            <Col xs="0"/>
            <Col>
              <Navbar color="faded" dark>
                <NavbarBrand href="/" className="mr-auto">
                  Yonder Dynamics
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                <Collapse isOpen={!this.state.collapsed} navbar>
                  <Nav navbar>
                    <NavItem>
                      <NavLink href={website}>
                        Website
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href={gitlab}>
                        GitLab
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </Col>
            <Col xs="0"/>
          </Row>
        </Container>
      </div>
    );
  }

}

