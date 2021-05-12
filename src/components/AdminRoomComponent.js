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

export const RenderRooms = ({
	handleEdit,
	deleteRoom,
	rooms,
	isEditing,
	editRoom,
	hotelRoomTypes,
}) => {
	return rooms.map((room) => {
		let hotelRoomType = hotelRoomTypes.filter(
			(hotelRoomType) => hotelRoomType._id === room.hotelRoomTypeId
		)[0];
		console.log(hotelRoomType);
		return (
			<ListGroupItem key={room._id}>
				<Media>
					<Media className="mr-2" left href="#">
						<Media object src={hotelRoomType.imgURLs[0]} alt="hotelRoomImage" />
					</Media>
					{isEditing !== room._id ? (
						<Media body>
							<Media heading>Room No: {room.roomNo}</Media>
							<p>Hotel Room type :{hotelRoomType.type}</p>
							<h2>Facilities</h2>
							<ul>
								<li>{hotelRoomType.facilities.ac_or_not ? "AC" : "Non-AC"}</li>
								{hotelRoomType.facilities.wifi_or_not && <li>Wifi</li>}
								<li>No.of People {hotelRoomType.facilities.max_no_of_people}</li>
							</ul>
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
								onClick={() => deleteRoom(room._id)}
							>
								<span className="fa fa-trash"></span>
							</Button>
						</Media>
					) : (
						<Form onSubmit={editRoom}>
							<h3>{room.roomNo}</h3>
							<FormGroup>
								<Label htmlFor="hotelRoomType">Room Type</Label>
								<Input type="select" id="hotelRoomType" name="hotelRoomType">
									{hotelRoomTypes.map((hotelRoomType) => {
										return (
											<option value={hotelRoomType._id}>
												{hotelRoomType.type}
											</option>
										);
									})}
								</Input>
								<Input
									type="text"
									hidden
									id="room_id"
									name="room_id"
									value={room._id}
								/>
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

export const AdminRoom = ({
	rooms,
	addRoomType,
	hotelRoomTypes,
	addRoom,
	editRoom,
	deleteRoom,
}) => {
	const [isEditing, setisEditing] = useState(false);
	const [activeTab, setactiveTab] = useState("1");

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

	return (
		<Container className="mt-5 mb-5">
			<Nav tabs>
				<NavItem style={{ cursor: "pointer" }}>
					<NavLink
						onClick={() => {
							setActiveTab("1");
						}}
						className={classnames({ active: activeTab === "1" })}
					>
						Room Details
					</NavLink>
				</NavItem>
				<NavItem style={{ cursor: "pointer" }}>
					<NavLink
						onClick={() => {
							setActiveTab("2");
						}}
						className={classnames({ active: activeTab === "2" })}
					>
						Add Room
					</NavLink>
				</NavItem>
				<NavItem style={{ cursor: "pointer" }}>
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
								hotelRoomTypes={hotelRoomTypes}
								isEditing={isEditing}
								handleEdit={handleEdit}
								editRoom={editRoom}
								deleteRoom={deleteRoom}
							/>
						</ListGroup>
					</Row>
				</TabPane>
				<TabPane tabId="2">
					<Row>
						<Form onSubmit={addRoom}>
							<FormGroup>
								<Label htmlFor="roomNo">Room Number</Label>
								<Input type="text" id="roomNo" name="roomNo" />
							</FormGroup>
							<FormGroup>
								<Label htmlFor="roomType">Room Types</Label>
								<Input type="select" id="roomType" name="roomType">
									{hotelRoomTypes.map((hotelRoomType) => {
										return (
											<option value={hotelRoomType._id}>
												{hotelRoomType.type}
											</option>
										);
									})}
									<option selected value="none">
										make a new room type
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
						<Form onSubmit={addRoomType}>
							<FormGroup>
								<Label htmlFor="newRoomType">Room Type Name</Label>
								<Input type="text" id="newRoomType" name="newRoomTyep" />
							</FormGroup>
							<FormGroup>
								<Label htmlFor="price">Price for type</Label>
								<Input type="text" id="price" name="price" />
							</FormGroup>
							<FormGroup check>
								<Input type="checkbox" name="AC" value="AC" />
								AC
							</FormGroup>
							<FormGroup check>
								<Input type="checkbox" name="Wifi" value="Wifi" />
								Wifi
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
