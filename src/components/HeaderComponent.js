import React, { Component } from 'react';
import {Navbar,NavbarToggler,NavbarBrand,Collapse,Nav,NavItem,NavLink,Button, 
    Modal, ModalHeader, ModalBody, FormGroup, Form,Input,Label,UncontrolledDropdown,
    DropdownItem,DropdownToggle,DropdownMenu} from 'reactstrap';

class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            isNavOpen : false,
            isModalOpen : false,
            isLogin : true,
            isLoggedIn : false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        console.log('logged out');
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

    handleLogin(event){
        event.preventDefault();
        this.toggleModal();
        if(this.state.isLogin){
            alert('Username: '+this.username.value+' Password: '+this.password.value);
        }
        else{
            alert('Firstname: '+this.firstname.value+ ' Lastname: '+this.lastname.value);
        }
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
                                <NavLink className="nav-link" href="/">
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
                        {this.state.isLoggedIn && (
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
                                        Profile  
                                    </NavLink>
                              </DropdownItem>
                              <DropdownItem onClick={this.handleLogout}>
                                Logout
                              </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        )}
                        { !(this.state.isLoggedIn) &&
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
                   {this.state.isLogin ? ( <ModalBody>
                        <Form onSubmit = {this.handleLogin}>
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
                            <Button onClick={this.toggleLogin} color="link">Register</Button>
                        </Form>
                    </ModalBody>) : (
                        <ModalBody>
                            <Form onSubmit = {this.handleLogin}>
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
                                <Button type="submit" value="submit" className="bg-primary" color="primary">Register</Button>
                                <Button onClick={this.toggleLogin} color="link">Already have a account</Button>
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