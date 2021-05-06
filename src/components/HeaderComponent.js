import React, { Component } from 'react';
import {Navbar,NavbarToggler,NavbarBrand,Collapse,Nav,NavItem,NavLink,Button} from 'reactstrap';

class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            isNavOpen : false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen : !this.state.isNavOpen
        })
    }

    render(){
        return(
            <React.Fragment>
                <Navbar color="dark" dark expand="md">
                        <NavbarToggler onClick={this.toggleNav}/>
                        <NavbarBrand className="mr-auto ml-2" href="/">
                            <img src="/logo192.png" height="30" width="41"
                                alt="Logo" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar className = "ml-auto mr-2">
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-home fa-lg"></span> Home
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link">
                                    <span className="fa fa-address-book fa-lg"></span> Contact Us
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="" navbar>
                            <NavItem>
                                <Button outline onClick={this.toggleModal}>
                                    <span className="fa fa-sign-in fa-lg"></span> Login
                                </Button>
                            </NavItem>
                        </Nav>
                        </Collapse>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default Header;