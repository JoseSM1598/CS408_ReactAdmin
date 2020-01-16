import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink as RRNavLink } from 'react-router-dom';



export class NavBar extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: true,
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
                <NavbarBrand href="/" style = {{fontSize: "20px"}}>OurSpace</NavbarBrand>
                <NavbarToggler aria-controls="basic-navbar-nav" onClick={this.toggle}/>
                <Collapse id="basic-navbar-nav" isOpen={this.state.isOpen} style = {{width: '100%'}}>
                    <Nav className="mr-auto" navbar>
                    </Nav>
                    <Nav className="justify-content-end" variant="tabs" style = {{fontcolor:"black", fontSize: "20px", marginLeft: '80vh'}} navbar>
                        <NavItem className="navItem">
                            <NavLink tag={RRNavLink} to="/questions" exact activeClassName="active" >Questions</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink}  to="/spaces" activeClassName="active">Spaces</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/transactions" activeClassName="active">Transactions</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/users" activeClassName="active">Users</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="#analytics" activeClassName="active" >Analytics</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }

};
