import React, { useState } from "react";
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

export const RenderRooms = ({ handleEdit, handleDelete, rooms, isEditing, handleEditSubmit }) => {
	return rooms.map((room) => {
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
					{isEditing !== room._id ? (
						<Media body>
							<Media heading>
								{room.type.type}
								<Button
									className="bg bg-warning ml-4"
									color="warning"
									onClick={() => handleEdit(room._id)}
								>
									<span className="fa fa-pencil"></span>Edit
								</Button>
								<Button
									className="bg bg-danger ml-4"
									color="danger"
									onClick={() => handleDelete(room._id)}
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
						<Form onSubmit={handleEditSubmit}>
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
							<Button className="btn" onClick={() => handleEdit(room._id)}>
								Cancel
							</Button>
						</Form>
					)}
				</Media>
			</ListGroupItem>
		);
	});
};

export const AdminRoom = () => {
	[isEditing, setisEditing] = useState(null);
	[isModalOpen, setisModalOpen] = useState(false);
	[activeTab, setactiveTab] = useState("1");
	[rooms, setrooms] = useState([
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
	]);

	const handleAddRoom = (event) => {
		event.preventDefault();
		console.log(event);
	};

	const handleAddRoomType = (event) => {
		event.preventDefault();
		console.log(event.target);
	};

	const handleEditSubmit = (event) => {
		event.preventDefault();
		console.log(event);
	};

	const handleDelete = (id) => {
		console.log(id);
	};

	const handleEdit = (id) => {
		console.log(isEditing, id);
		if (isEditing === id) setisEditing(null);
		else setisEditing(id);
	};

	const setActiveTab = (tab) => {
		if (tab !== activeTab) {
			setactiveTab(tab);
		}
	};

	const setModal = () => {
		setisModalOpen(true);
	};

	return (
		<Container className="mt-5 mb-5">
			<Nav tabs>
				<NavItem>
					<NavLink
						onClick={() => {
							setActiveTab("1");
						}}
						className={classnames({ active: activeTab === "1" })}
					>
						Room Details
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						onClick={() => {
							setActiveTab("2");
						}}
						className={classnames({ active: activeTab === "2" })}
					>
						Add Room
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={classnames({ active: activeTab === "3" })}
						onClick={() => {
							setActiveTab("3");
						}}
					>
						Add Room Type
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={activeTab}>
				<TabPane tabId="1">
					<Row>
						<ListGroup>
							<RenderRooms
								rooms={rooms}
								isEditing={isEditing}
								handleDelete={handleDelete}
								handleEdit={handleEdit}
								handleEditSubmit={handleEditSubmit}
							/>
						</ListGroup>
					</Row>
				</TabPane>
				<TabPane tabId="2">
					<Row>
						<Form onSubmit={handleAddRoom}>
							<FormGroup>
								<Label htmlFor="roomNo">Room Number</Label>
								<Input type="text" id="roomNo" />
							</FormGroup>
							<FormGroup>
								<Label htmlFor="roomType">Room Types</Label>
								<Input type="select" id="roomType">
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
						<Form onSubmit={handleAddRoomType}>
							<FormGroup>
								<Label htmlFor="newRoomType">Room Type Name</Label>
								<Input type="text" id="newRoomType" />
							</FormGroup>
							<FormGroup>
								<Label htmlFor="price">Price for type</Label>
								<Input type="text" id="price" />
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
};
