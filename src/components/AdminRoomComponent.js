/*  Component to give UI for hotel admin to see and edit rooms
    Functionalities
        ->see details of rooms
        ->add and delete rooms in hotel 
 */

import React, { Component } from "react";
import {
	Nav,
	NavItem,
	NavLink,
	Container,
	TabContent,
	TabPane,
	Row,
	Button,
	ListGroup,
	Media,
	Form,
	FormGroup,
	Label,
	ListGroupItem,
	Input,
} from "reactstrap";
import classnames from "classnames";

function RenderRooms(props) {
	return props.rooms.map((room) => {
		return (
			<ListGroupItem>
				<Media>
					<Media className="mr-2" left href="#">
						<Media
							object
							src="assets/images/hotel1.jpeg"
							alt="Generic placeholder image"
						/>
					</Media>
					{props.isEditing !== room._id ? (
						<Media body>
							<Media heading>
								{room.type.type}
								<Button
									className="bg bg-warning ml-4"
									color="warning"
									onClick={() => props.handleEdit(room._id)}
								>
									<span className="fa fa-pencil"></span>Edit
								</Button>
								<Button
									className="bg bg-danger ml-4"
									color="danger"
									onClick={() => props.handleDelete(room._id)}
								>
									<span className="fa fa-trash"></span>
								</Button>
							</Media>
							<p>{room.roomNo}</p>
							Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
							ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
							tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
							fringilla. Donec lacinia congue felis in faucibus.
						</Media>
					) : (
						<Form onSubmit={props.handleEditSubmit}>
							<h3>{room.roomNo}</h3>
							<FormGroup>
								<Label htmlFor={`roomType${room._id}`}>Room Type</Label>
								<Input type="select" id={`roomNo${room._id}`}>
									<option selected value="Face">
										Face
									</option>
								</Input>
								<Input type="text" hidden id="room_id" value={room._id} />
							</FormGroup>
							<Button type="submit" className="btn btn-danger" color="danger">
								Edit
							</Button>
							<Button className="btn" onClick={() => props.handleEdit(room._id)}>
								Cancel
							</Button>
						</Form>
					)}
				</Media>
			</ListGroupItem>
		);
	});
}

class AdminRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: null,
			isModalOpen: false,
			activeTab: "1",
			rooms: [
				{
					_id: 1,
					roomNo: "room1",
					status: "Available",
					type: {
						type: "wonder",
						facilities: {
							AC: true,
							Wifi: true,
						},
					},
				},
				{
					_id: 2,
					roomNo: "room1",
					status: "Available",
					type: {
						type: "wonder",
						facilities: {
							AC: true,
							Wifi: true,
						},
					},
				},
			],
		};
		this.setModal = this.setModal.bind(this);
		this.setActiveTab = this.setActiveTab.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEditSubmit = this.handleEditSubmit.bind(this);
		this.handleAddRoom = this.handleAddRoom.bind(this);
		this.handleAddRoomType = this.handleAddRoomType.bind(this);
	}

	handleAddRoom(event) {
		event.preventDefault();
		console.log(event);
	}

	handleAddRoomType(event) {
		event.preventDefault();
		console.log(event.target);
	}

	handleEditSubmit(event) {
		event.preventDefault();
		console.log(event);
	}

	handleDelete(id) {
		console.log(id);
	}

	handleEdit(id) {
		console.log(this.state.isEditing, id);
		if (this.state.isEditing === id) {
			this.setState({
				isEditing: null,
			});
			return;
		}
		this.setState({
			isEditing: id,
		});
	}

	setActiveTab(tab) {
		if (tab !== this.state.activeTab) {
			this.setState({
				activeTab: tab,
			});
		}
	}

	setModal() {
		this.setState({
			isModalOpen: true,
		});
	}

	render() {
		return (
			<Container className="mt-5 mb-5">
				<Nav tabs>
					<NavItem>
						<NavLink
							onClick={() => {
								this.setActiveTab("1");
							}}
							className={classnames({ active: this.state.activeTab === "1" })}
						>
							Room Details
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							onClick={() => {
								this.setActiveTab("2");
							}}
							className={classnames({ active: this.state.activeTab === "2" })}
						>
							Add Room
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === "3" })}
							onClick={() => {
								this.setActiveTab("3");
							}}
						>
							Add Room Type
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={this.state.activeTab}>
					<TabPane tabId="1">
						<Row>
							<ListGroup>
								<RenderRooms
									rooms={this.state.rooms}
									isEditing={this.state.isEditing}
									handleDelete={this.handleDelete}
									handleEdit={this.handleEdit}
									handleEditSubmit={this.handleEditSubmit}
								/>
							</ListGroup>
						</Row>
					</TabPane>
					<TabPane tabId="2">
						<Row>
							<Form onSubmit={this.handleAddRoom}>
								<FormGroup>
									<Label htmlFor="roomNo">Room Number</Label>
									<Input
										type="text"
										id="roomNo"
										innerRef={(roomNo) => (this.roomNo = roomNo)}
									/>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="roomType">Room Types</Label>
									<Input
										type="select"
										id="roomType"
										innerRef={(roomType) => (this.roomType = roomType)}
									>
										<option selected value="something">
											Something
										</option>
									</Input>
								</FormGroup>
								<Button type="submit" class="bg bg-primary" color="primary">
									Add Room
								</Button>
							</Form>
						</Row>
					</TabPane>
					<TabPane tabId="3">
						<Row>
							<Form onSubmit={this.handleAddRoomType}>
								<FormGroup>
									<Label htmlFor="newRoomType">Room Type Name</Label>
									<Input
										type="text"
										id="newRoomType"
										innerRef={(newRoomType) => (this.newRoomType = newRoomType)}
									/>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="price">Price for type</Label>
									<Input
										type="text"
										id="price"
										innerRef={(price) => (this.price = price)}
									/>
								</FormGroup>
								<FormGroup tag="fieldset">
									<FormGroup check>
										<Input type="radio" name="AC" value="AC" />
										AC
									</FormGroup>
									<FormGroup check>
										<Input type="radio" name="AC" value="Non-AC" />
										Non-AC
									</FormGroup>
								</FormGroup>
								<FormGroup tag="fieldset">
									<FormGroup check>
										<Input type="radio" name="Wifi" value="Wifi" />
										Wifi
									</FormGroup>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="noOfPeople">Number of People</Label>
									<Input type="text" name="noOfPeople" id="noOfPeople" />
								</FormGroup>
								<Button type="submit" color="primary">
									Add Room Type
								</Button>
							</Form>
						</Row>
					</TabPane>
				</TabContent>
			</Container>
		);
	}
}

export default AdminRoom;
