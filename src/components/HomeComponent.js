import { MaintainerHotels } from "./MaintainerHotels";
import React, { useState } from "react";
import {
	Carousel,
	CarouselItem,
	CarouselCaption,
	CarouselIndicators,
	CarouselControl,
	Jumbotron,
	Container,
	Input,
	FormGroup,
	Form,
	Button,
	Label,
	Row,
	Card,
	CardBody,
	CardImg,
	CardTitle,
	CardSubtitle,
	CardText,
	Nav,
	NavLink,
	NavItem,
	TabContent,
	TabPane,
} from "reactstrap";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import items from "../shared/HomepageItems";
import { Search } from "./SearchComponent";
import axios from "axios";
import baseUrl from "../shared/baseUrl";
import classnames from "classnames";
import { AdminRoom } from "./AdminRoomComponent";
import { AdminReceptionists } from "./AdminReceptionists";

const RenderAdmin = (props) => {
	const [activeTab, setActiveTab] = useState("1");

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<div>
			<Nav tabs className="mt-5">
				<NavItem>
					<NavLink
						className={classnames({ active: activeTab === "1" })}
						onClick={() => {
							toggle("1");
						}}
					>
						Hotel Rooms Section
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={classnames({ active: activeTab === "2" })}
						onClick={() => {
							toggle("2");
						}}
					>
						Receptionists section
					</NavLink>
				</NavItem>
			</Nav>
            <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <AdminRoom rooms={props.rooms}
                            addRoomType = {props.addRoomType}
                            hotelRoomTypes = {props.hotelRoomTypes}
                            addRoom = {props.addRoom}
							deleteRoom = {props.deleteRoom}
							editRoom = {props.editRoom}
                        />
                    </TabPane>
                    <TabPane tabId="2">
                        <AdminReceptionists receptionists={props.receptionists}
							addReceptionist = {props.addReceptionist}
							deleteReceptionist = {props.deleteReceptionist}	
						/>
                    </TabPane>
            </TabContent>
        </div>
    )
}

const RenderAvailableRooms = (props) => {
	return (
		<div>
			{props.availableRooms.map((room) => {
				return (
					<Card key={room.id} className="col-12 col-sm-3">
						<CardImg width="50%" src={room.image} alt="hotelImage" />
						<CardBody>
							<CardTitle tag="h5">{room.name}</CardTitle>
							<Rating name="read-only" value={room.rating} readOnly />
							<CardSubtitle tag="h6" className="mb-2 text-muted">
								Card subtitle
							</CardSubtitle>
							<CardText>
								Some quick example text to build on the card title and make up the
								bulk of the card's content.
							</CardText>
							<Link to={`/hotel/${room.id}`}>
								<Button>Book a room</Button>
							</Link>
						</CardBody>
					</Card>
				);
			})}
		</div>
	);
};

export const Home = (props) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [animating, setAnimating] = useState(false);

	const next = () => {
		if (animating) return;
		let nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	};

	const prev = () => {
		if (animating) return;
		let prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
		setActiveIndex(prevIndex);
	};

	const goToIndex = (index) => {
		if (animating) return;
		setActiveIndex(index);
	};

	const slides = items.map((item) => {
		return (
			<CarouselItem
				onExiting={() => setAnimating(true)}
				onExited={() => setAnimating(false)}
				key={process.env.PUBLIC_URL + item.src}
			>
				<img
					style={{ width: "100vw", height: "50vh" }}
					src={process.env.PUBLIC_URL + item.src}
					alt={item.altText}
				/>
				<CarouselCaption captionText={item.caption} captionHeader={item.caption} />
			</CarouselItem>
		);
	});

	const [nosearch, setNoSearch] = useState(true);
	const [startDate, setstartDate] = useState("");
	const [endDate, setendDate] = useState("");
	const [keyWord, setkeyWord] = useState("");
	const [sortedHotelRoomTypes, setsortedHotelRoomTypes] = useState([]);
	const [sortedHotels, setsortedHotels] = useState([]);

	const handleSearchHotel = (event) => {
		setNoSearch(false);
		event.preventDefault();
		console.log(event);
		setstartDate(event.target.elements["checkIn"].value);
		setendDate(event.target.elements["checkOut"].value);
		setkeyWord(event.target.elements["location"].value);
		var body = {
			startDate: startDate,
			endDate: endDate,
		};
		axios({
			method: "POST",
			url: baseUrl + "/findHotelRoomTypes",
			headers: {
				"Content-Type": "application/json",
			},
			data: body,
		})
			.then((res) => {
				console.log(res.data.hotelRoomTypes);
				console.log(res.data.hotelDetails);
				setsortedHotels(res.data.hotelDetails);
				setsortedHotelRoomTypes(res.data.hotelRoomTypes);
			})
			.catch((err) => console.log(err));
	};

	return (
		<React.Fragment>
			{(props.userType === "customer" || !props.isLoggedin) && (
				<div>
					<Jumbotron
						style={{
							backgroundColor: "rgb(236,23,81)",
							paddingTop: "100px",
							color: "#fff",
						}}
					>
						<Container className="text-center mb-5">
							<h3 className="font-ubuntu-700">Hotel Pedia</h3>
							<h5 className="font-roboto">A place to find your every stay</h5>
						</Container>
						<Container
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flexWrap: "wrap",
								width: "100%",
							}}
						>
							<Form
								className="row searchForm"
								onSubmit={handleSearchHotel}
								style={{
									display: "flex",
									flexWrap: "wrap",
									width: "100%",
									justifyContent: "center",
								}}
							>
								<FormGroup>
									<Input
										required
										type="text"
										id="location"
										name="location"
										placeholder="Search by City or Hotel"
									/>
								</FormGroup>
								<FormGroup>
									<Input
										required
										type="date"
										id="checkIn"
										placeholder="check in"
										name="checkIn"
									/>
								</FormGroup>
								<FormGroup>
									<Input
										required
										type="date"
										id="checkOut"
										placeholder="check out"
										name="checkOut"
									/>
								</FormGroup>
								<Button
									type="submit"
									value="submit"
									className="btn btn-success col-4 col-md-1 mb-3"
									color="success"
								>
									Search
								</Button>
							</Form>
						</Container>
					</Jumbotron>
					{nosearch && (
						<Container className="pics">
							<Carousel
								className="mb-5"
								activeIndex={activeIndex}
								next={next}
								previous={prev}
							>
								<CarouselIndicators
									items={items}
									activeIndex={activeIndex}
									onClickHandler={goToIndex}
								/>
								{slides}
								<CarouselControl
									direction="prev"
									directionText="Previous"
									onClickHandler={prev}
								/>
								<CarouselControl
									direction="next"
									directionText="Next"
									onClickHandler={next}
								/>
							</Carousel>
						</Container>
					)}
				</div>
			)}
			{props.userType === "receptionist" && (
				<div>
					<Jumbotron>
						<Container>
							<h3>Welcome to Hotel</h3>
							<Form
								className="w-50 offset-1"
								onSubmit={props.handleCheckAvailability}
							>
								<FormGroup>
									<Label htmlFor="timeOfStay">Duration of Stay in days</Label>
									<Input name="timeOfStay" type="text" id="timeOfStay" />
								</FormGroup>
								<FormGroup>
									<Label htmlFor="typeOfRoom">Type Of Room</Label>
									<Input name="typeOfRoom" type="select" id="typeOfRoom">
										<option selected value="AC Deluxe">
											AC Deluxe
										</option>
										<option selected value="Non AC Deluxe">
											Non AC Deluxe
										</option>
									</Input>
								</FormGroup>
								<Button type="submit" className="btn btn-primary" color="primary">
									Check Availabilty
								</Button>
							</Form>
						</Container>
					</Jumbotron>
					<Container style={{ minHeight: "30vh" }}>
						<Row className="mt-5 mb-5">
							<RenderAvailableRooms availableRooms={props.availableRooms} />
						</Row>
					</Container>
				</div>
			)}
			{props.userType === "hotelAdministration" && (
				<RenderAdmin rooms={props.hotelRooms} 
                    receptionists={props.receptionists} 
                    addRoomType={props.addRoomType}
                    hotelRoomTypes = {props.hotelRoomTypes}
                    addRoom = {props.addRoom}
					editRoom = {props.editRoom}
					deleteRoom = {props.deleteRoom}
					addReceptionist = {props.addReceptionist}
					deleteReceptionist = {props.deleteReceptionist}
                />
			)}
			{props.userType === "maintainer" && (
				<MaintainerHotels
					hoteladmins={props.hotelAdmins}
					hotels={props.hotels}
					addHotel={props.addHotel}
					deleteHotel={props.deleteHotel}
				/>
			)}
			{(props.userType === "customer" || !props.isLoggedin) && !nosearch && (
				<Search
					hotels={sortedHotels}
					hotelRoomTypes={sortedHotelRoomTypes}
					keyWord={keyWord}
					isLoggedin={props.isLoggedin}
					bookRoom={props.bookRoom}
					startDate={startDate}
					endDate={endDate}
				/>
			)}
		</React.Fragment>
	);
};
