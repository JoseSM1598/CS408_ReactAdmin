import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

export class SubNavBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar color="light" light expand="lg">
        <NavbarToggler aria-controls="basic-navbar-nav" onClick={this.toggle} />
        <Collapse id="basic-navbar-nav" isOpen={this.state.isOpen}>
          <Nav
            className="justify-content-center"
            variant="pills"
            style={{ fontcolor: "black", fontSize: "15px" }}
            navbar
          >
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/questions/recent"
                activeClassName="active"
              >
                Recent
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/questions/user"
                activeClassName="active"
              >
                Search By User
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/questions/date"
                activeClassName="active"
              >
                Search By Date
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/questions/location"
                activeClassName="active"
              >
                Search by Location
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
