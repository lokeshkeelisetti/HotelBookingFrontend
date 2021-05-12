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

export const RenderRoomTypes = ({
	hotelRoomTypes,
	handleEdit,
	isEditing,
	editRoomType}) => {
		return hotelRoomTypes.map((hotelRoomType) => {
			return (
				<ListGroupItem key={hotelRoomType._id}>
					<Media className="mr-2" left href="#">
						<Media object src={hotelRoomType.imgURLs[0]} alt="hotelRoomType image" />
					</Media>
					{isEditing !== hotelRoomType._id ? (
						<Media body>
							<Media heading> {hotelRoomType.type}</Media>
							<h2>Facilities</h2>
							<ul>
								<li>{hotelRoomType.facilities.ac_or_not ? "AC" : "Non-AC"}</li>
								{hotelRoomType.facilities.wifi_or_not && <li>Wifi</li>}
								<li>No.of People {hotelRoomType.facilities.max_no_of_people}</li>
							</ul>
							<Button
								className="bg bg-warning ml-4"
								color="warning"
								onClick={() => handleEdit(hotelRoomType._id)}
							>
								<span className="fa fa-pencil"></span>Edit
							</Button>
						</Media>
					): (
						<Form onSubmit={editRoomType}>
							<h3>{hotelRoomType.type}</h3>
							<FormGroup>
								<Label htmlFor="price">price</Label>
								<Input type="text" id="price" name="price" />
							</FormGroup>
							<FormGroup>
								<Input type="text" hidden id="hotelRoomTypeId" name="hotelRoomTypeId" value={hotelRoomType._id}/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="NoOfPeople">No of People</Label>
								<Input type="text" id="noOfPeople" name="noOfPeople"/>
							</FormGroup>
							<FormGroup check>
								<Label htmlFor="AC">
									<Input type="checkbox" id="AC" name="AC" />
									AC
								</Label>
							</FormGroup>
							<FormGroup check>
								<Label htmlFor="Wifi">
									<Input type="checkbox" id="Wifi" name="Wifi" />
									Wifi
								</Label>
							</FormGroup>
							<Button type="submit" className="btn btn-danger" color="danger">
								Edit
							</Button>
							<Button className="btn" onClick={() => handleEdit(hotelRoomType._id)}>
								Cancel
							</Button>
						</Form>
					)}
				</ListGroupItem>
			)
		})
}

export const RenderRooms = ({
	deleteRoom,
	rooms,
	hotelRoomTypes,
}) => {
	return rooms.map((room) => {
		let hotelRoomType = hotelRoomTypes.filter(
			(hotelRoomType) => hotelRoomType._id === room.hotelRoomTypeId
		)[0];
		return (
			<ListGroupItem
				key={room._id}
				style={{ margin: "10px", width: "100%", fontFamily: "Ubuntu" }}
			>
				<Media>
					<Media className="mr-2" left href="#">
						<Media
							object
							src={hotelRoomType.imgURLs[0]}
							alt="hotelRoomImage"
							style={{ height: "300px", width: "500px" }}
						/>
					</Media>
					{ (
						<Media body>
							<Media heading>Room No: {room.roomNo}</Media>
							<p>{hotelRoomType.type}</p>
							<h4>Facilities</h4>
							<ul>
								<li>{hotelRoomType.facilities.ac_or_not ? "AC" : "Non-AC"}</li>
								{hotelRoomType.facilities.wifi_or_not && <li>Wifi</li>}
								<li>No.of People {hotelRoomType.facilities.max_no_of_people}</li>
							</ul>
							<br />
							<Button
								className="bg bg-danger ml-4"
								color="danger"
								onClick={() => deleteRoom(room._id)}
							>
								<span className="fa fa-trash"></span>
							</Button>
						</Media>
					) }
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
	editRoomType,
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
				<NavItem style={{ cursor: "pointer" }}>
					<NavLink
						className={classnames({ active: activeTab === "4" })}
						onClick={() => {
							setActiveTab("4");
						}}
					>
						Room Type Details
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
								<Input type="text" id="newRoomType" name="newRoomType" />
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
				<TabPane tabId="4">
					<Row>
						<ListGroup>
							<RenderRoomTypes
								rooms={rooms}
								hotelRoomTypes={hotelRoomTypes}
								isEditing={isEditing}
								handleEdit={handleEdit}
								editRoomType={editRoomType}
								deleteRoom={deleteRoom}
							/>
						</ListGroup>
					</Row>
				</TabPane>
			</TabContent>
		</Container>
	);
};
