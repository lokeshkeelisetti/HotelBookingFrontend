import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Navbar,NavbarToggler,NavbarBrand,Collapse,Nav,NavItem,NavLink,Button, 
    Modal, ModalHeader, ModalBody, FormGroup, Form,Input,Label,UncontrolledDropdown,
    DropdownItem,DropdownToggle,DropdownMenu} from 'reactstrap';

class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            isNavOpen : false,
            isModalOpen : false,
            isLogin : true
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.handleLoginTemp = this.handleLoginTemp.bind(this);
    }

    toggleLogin(){
        this.setState({
            isLogin : !this.state.isLogin
        })
    }

    toggleNav(){
        this.setState({
            isNavOpen : !this.state.isNavOpen
        })
    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }

    handleLoginTemp(event){
        event.preventDefault();
        console.log(event);
        if(this.state.isLogin){
            this.props.handleLogin(event);
            
        }
        else{
            this.props.handleRegister(event);
        }
        this.toggleModal();
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
                                <NavLink className="nav-link">
                                    <Link to="/">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </Link>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        {this.props.userType === 'Customer' && (
                            <>
                                <Nav navbar>
                                    <NavLink className="nav-link">
                                        <Link to="/customer/previousBookings">
                                            Previous Bookings
                                        </Link>
                                    </NavLink>
                                </Nav>
                                <Nav navbar>
                                    <NavLink className="nav-link">
                                        <Link to="/customer/upcomingBookings">
                                            Upcoming Bookings
                                        </Link>
                                    </NavLink>
                                </Nav>
                            </>
                            )
                        }
                        {this.props.isLoggedin && (
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle>
                                <Nav navbar>
                                    <NavItem>
                                    <span className="fa fa-user-circle fa-lg"></span>
                                    </NavItem>
                                </Nav>
                            </DropdownToggle>
                            <DropdownMenu right>
                              <DropdownItem>
                                    <NavLink className="nav-link">
                                        <Link to="/profile">
                                            Profile  
                                        </Link>
                                    </NavLink>
                              </DropdownItem>
                              <DropdownItem onClick={this.props.handleLogout}>
                                  <NavLink className="nav-link" href='/'>
                                  Logout
                                  </NavLink>
                              </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        )}
                        { !(this.props.isLoggedin) &&
                        (
                        <Nav className="" navbar>
                            <NavItem>
                                <Button outline onClick={this.toggleModal}>
                                    <span className="fa fa-sign-in fa-lg"></span> Login
                                </Button>
                            </NavItem>
                        </Nav>
                        )
                        }
                        </Collapse>
                </Navbar>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        {this.state.isLogin ? 'Login' : 'Register'}
                    </ModalHeader>
                   {this.state.isLogin ? ( 
                   <ModalBody>
                        <Form onSubmit = {this.handleLoginTemp}>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label> 
                                <Input type="email" id="email" name="email"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef = {(password) => this.password = password} />
                            </FormGroup>
                            <Button type="submit" value="submit" className="bg-primary" color="primary">Login</Button>
                            <Button color='link' className="btn btn-link" onClick={this.toggleLogin}>Register</Button>
                        </Form>
                    </ModalBody>) : (
                        <ModalBody>
                            <Form onSubmit = {this.handleLoginTemp}>
                                <FormGroup>
                                    <Label htmlFor="firstname">First Name</Label>
                                    <Input type="text" id="firstname" name="firstname"
                                        innerRef={(firstname) => this.firstname = firstname} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="lastname">Last Name</Label>
                                    <Input type="text" id="lastname" name="lastname"
                                        innerRef={(lastname) => this.lastname = lastname} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="email">email</Label>
                                    <Input type="email" id="email" name="email"
                                        innerRef={(email) => this.email = email} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">password</Label>
                                    <Input type="password" id="password" name="password"
                                        innerRef={(password) => this.password = password} />
                                </FormGroup>
                                <Button type="submit" value="submit" className="bg-primary" color="primary">Register</Button>
                                <Button color='link' className="btn btn-link" onClick={this.toggleLogin}>Already have a account</Button>
                            </Form>
                        </ModalBody>
                    )
                    }
                </Modal>
            </React.Fragment>
        )
    }
}

export default Header;