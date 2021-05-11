import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Collapse,
	Nav,
	NavItem,
	NavLink,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	FormGroup,
	Form,
	Input,
	Label,
	UncontrolledDropdown,
	DropdownItem,
	DropdownToggle,
	DropdownMenu,
} from "reactstrap";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isNavOpen: false,
			isModalOpen: false,
			isLogin: true,
		};
		this.toggleNav = this.toggleNav.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.toggleLogin = this.toggleLogin.bind(this);
		this.handleLoginTemp = this.handleLoginTemp.bind(this);
	}

	toggleLogin() {
		this.setState({
			isLogin: !this.state.isLogin,
		});
	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen,
		});
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	handleLoginTemp(event) {
		event.preventDefault();
		console.log(event);
		if (this.state.isLogin) {
			this.props.handleLogin(event);
		} else {
			this.props.handleRegister(event);
		}
		this.toggleModal();
	}

	render() {
		return (
			<React.Fragment>
				<Navbar color="light" light expand="md" className="fixed-top">
					{/*fixed-top is responsible for sticky*/}
					<NavbarBrand className="mr-auto ml-1" href="/">
						<img
							src="/logo.png"
							height="35"
							width="35"
							alt="Logo"
							style={{ float: "left" }}
							className="mr-2"
						/>
						<h3 style={{ color: "rgb(236,23,81)", fontFamily: "sans-serif" }}>
							HotelPedia
						</h3>
					</NavbarBrand>
					<NavbarToggler onClick={this.toggleNav} />
					<Collapse isOpen={this.state.isNavOpen} navbar>
						<Nav navbar className="ml-auto mr-2">
							<NavItem>
								<NavLink className="nav-link">
									<Link to="/" style={{ color: "rgb(236,23,81)" }}>
										<span className="fa fa-home fa-lg"></span> Home
									</Link>
								</NavLink>
							</NavItem>
						</Nav>
						{this.props.userType === "customer" && (
							<UncontrolledDropdown style={{ listStyleType: "none" }} nav inNavbar>
								<DropdownToggle className="userIcon">
									<Nav navbar>
										<NavItem className="userIcon1">
											<span className="fa fa-user-circle fa-lg"></span>
										</NavItem>
									</Nav>
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem>
										<NavLink className="nav-link">
											<Link to="/profile">Profile</Link>
										</NavLink>
									</DropdownItem>
									<DropdownItem>
										<NavLink className="nav-link">
											<Link to="/customer/upcomingBookings">
												Upcoming Bookings
											</Link>
										</NavLink>
									</DropdownItem>
									<DropdownItem>
										<NavLink className="nav-link">
											<Link to="/customer/previousBookings">
												Previous Bookings
											</Link>
										</NavLink>
									</DropdownItem>
									<DropdownItem onClick={this.props.handleLogout}>
										<NavLink className="nav-link" href="/">
											Logout
										</NavLink>
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						)}
						{this.props.isLoggedin && this.props.userType !== "customer" && (
							<UncontrolledDropdown style={{ listStyleType: "none" }} nav inNavbar>
								<DropdownToggle className="userIcon">
									<Nav navbar>
										<NavItem className="userIcon1">
											<span className="fa fa-user-circle fa-lg"></span>
										</NavItem>
									</Nav>
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem>
										<NavLink className="nav-link">
											<Link to="/profile">Profile</Link>
										</NavLink>
									</DropdownItem>
									<DropdownItem onClick={this.props.handleLogout}>
										<NavLink className="nav-link" href="/">
											Logout
										</NavLink>
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						)}
						{!this.props.isLoggedin && (
							<Nav className="" navbar>
								<NavItem>
									<Button outline onClick={this.toggleModal} className="spBtn">
										<span className="fa fa-sign-in fa-lg"></span> Login
									</Button>
								</NavItem>
							</Nav>
						)}
					</Collapse>
				</Navbar>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>
						{this.state.isLogin ? "Login" : "Register"}
					</ModalHeader>
					{this.state.isLogin ? (
						<ModalBody>
							<Form onSubmit={this.handleLoginTemp}>
								<FormGroup>
									<Label htmlFor="email">Email</Label>
									<Input
										type="email"
										id="email"
										name="email"
										innerRef={(input) => (this.username = input)}
									/>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="password">Password</Label>
									<Input
										type="password"
										id="password"
										name="password"
										innerRef={(password) => (this.password = password)}
									/>
								</FormGroup>
								<Button
									type="submit"
									value="submit"
									style={{
										color: "#fff",
										backgroundColor: "var(--my-red)",
										borderColor: "var(--my-red)",
									}}
								>
									Login
								</Button>
								<Button
									color="link"
									className="btn btn-link"
									onClick={this.toggleLogin}
									style={{ color: "var(--my-red)" }}
								>
									Register
								</Button>
							</Form>
						</ModalBody>
					) : (
						<ModalBody>
							<Form onSubmit={this.handleLoginTemp}>
								<FormGroup>
									<Label htmlFor="firstname">First Name</Label>
									<Input
										type="text"
										id="firstname"
										name="firstname"
										innerRef={(firstname) => (this.firstname = firstname)}
									/>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="lastname">Last Name</Label>
									<Input
										type="text"
										id="lastname"
										name="lastname"
										innerRef={(lastname) => (this.lastname = lastname)}
									/>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="email">email</Label>
									<Input
										type="email"
										id="email"
										name="email"
										innerRef={(email) => (this.email = email)}
									/>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="password">password</Label>
									<Input
										type="password"
										id="password"
										name="password"
										innerRef={(password) => (this.password = password)}
									/>
								</FormGroup>
								<Button
									type="submit"
									value="submit"
									className="bg-primary"
									color="primary"
								>
									Register
								</Button>
								<Button
									color="link"
									className="btn btn-link"
									onClick={this.toggleLogin}
								>
									Already have a account
								</Button>
							</Form>
						</ModalBody>
					)}
				</Modal>
			</React.Fragment>
		);
	}
}

export default Header;
