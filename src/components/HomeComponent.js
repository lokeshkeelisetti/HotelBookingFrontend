import React, { Component } from "react";
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
} from "reactstrap";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import hotels from "../shared/hotels";

function RenderAvailableRooms(props) {
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
}

const items = [
	{
		src: "assets/images/hotel1.jpeg",
		altText: "Hotel",
		caption: "Hotel",
	},
	{
		src: "assets/images/hotel2.jpeg",
		altText: "Another Hotel",
		caption: "Another Hotel",
	},
	{
		src: "assets/images/hotel3.jpeg",
		altText: "Again Hotel",
		caption: "Again Hotel",
	},
];

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0,
			animating: false,
			rooms: [],
			hotels: hotels,
		};
		this.setActiveIndex = this.setActiveIndex.bind(this);
		this.setAnimating = this.setAnimating.bind(this);
	}

	setActiveIndex = (index) => {
		this.setState({
			activeIndex: index,
		});
	};

	setAnimating = () => {
		this.setState({
			animating: !this.state.animating,
		});
	};

	render() {
		const next = () => {
			if (this.state.animating) return;
			let nextIndex =
				this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
			this.setActiveIndex(nextIndex);
		};
		const prev = () => {
			if (this.state.animating) return;
			let prevIndex =
				this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
			this.setActiveIndex(prevIndex);
		};

		const goToIndex = (index) => {
			if (this.state.animating) return;
			this.setActiveIndex(index);
		};

		const slides = items.map((item) => {
			return (
				<CarouselItem
					onExiting={() => this.setAnimating(true)}
					onExited={() => this.setAnimating(false)}
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

		return (
			<React.Fragment>
				{(this.props.userType === "customer" || !this.props.isLoggedin) && (
					<div>
						<Jumbotron
							style={{
								backgroundColor: "rgb(236,23,81)",
								paddingTop: "100px",
								color: "#fff",
							}}
						>
							<Container>
								<h3 className="font-ubuntu-700">Hotel Pedia</h3>
								<h5 className="font-roboto">A place to find your every stay</h5>
							</Container>
							<Container>
								<Form className="row" onSubmit={this.props.handleSearchHotel}>
									<FormGroup className="col-5 col-md-3">
										<Input
											type="select"
											id="searchBy"
											name="searchBy"
											defaultValue="searchBy"
										>
											<option value="location">location</option>
											<option value="hotel">Hotel Name</option>
										</Input>
									</FormGroup>
									<FormGroup className="col-7 col-md-7">
										<Input
											type="text"
											id="location"
											name="location"
											placeholder="Enter keyword"
											innerRef={(location) => (this.location = location)}
										/>
									</FormGroup>
									<FormGroup className="col-6 col-md-3">
										<Input
											type="date"
											id="checkIn"
											placeholder="check in"
											name="checkIn"
											innerRef={(checkIn) => (this.checkIn = checkIn)}
										/>
									</FormGroup>
									<FormGroup className="col-6 col-md-3">
										<Input
											type="date"
											id="checkOut"
											placeholder="check out"
											name="checkOut"
											innerRef={(checkOut) => (this.checkOut = checkOut)}
										/>
									</FormGroup>
									<Button
										type="submit"
										value="submit"
										className="btn btn-primary col-4 col-md-1 mb-3"
										color="primary"
									>
										Search
									</Button>
								</Form>
							</Container>
						</Jumbotron>
						<Container>
							<Carousel
								className="mb-5"
								activeIndex={this.state.activeIndex}
								next={next}
								previous={prev}
							>
								<CarouselIndicators
									items={items}
									activeIndex={this.state.activeIndex}
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
					</div>
				)}
				{this.props.userType === "receptionist" && (
					<div>
						<Jumbotron>
							<Container>
								<h3>Welcome to Hotel</h3>
								<Form
									className="w-50 offset-1"
									onSubmit={this.props.handleCheckAvailability}
								>
									<FormGroup>
										<Label htmlFor="timeOfStay">Duration of Stay in days</Label>
										<Input
											name="timeOfStay"
											type="text"
											id="timeOfStay"
											innerRef={(timeOfStay) =>
												(this.timeOfStay = timeOfStay)
											}
										/>
									</FormGroup>
									<FormGroup>
										<Label htmlFor="typeOfRoom">Type Of Room</Label>
										<Input
											name="typeOfRoom"
											type="select"
											id="typeOfRoom"
											innerRef={(typeOfRoom) =>
												(this.typeOfRoom = typeOfRoom)
											}
										>
											<option selected value="AC Deluxe">
												AC Deluxe
											</option>
											<option selected value="Non AC Deluxe">
												Non AC Deluxe
											</option>
										</Input>
									</FormGroup>
									<Button
										type="submit"
										className="btn btn-primary"
										color="primary"
									>
										Check Availabilty
									</Button>
								</Form>
							</Container>
						</Jumbotron>
						<Container style={{ minHeight: "30vh" }}>
							<Row className="mt-5 mb-5">
								<RenderAvailableRooms availableRooms={this.props.availableRooms} />
							</Row>
						</Container>
					</div>
				)}
				{this.props.userType === "hotelAdministration" && (
					<Container className="mt-5 mb-5">
						<Row>
							<RenderAvailableRooms availableRooms={this.state.availableRooms} />
						</Row>
					</Container>
				)}
				{this.props.userType === "maintainer" && (
					<Container className="mt-5 mb-5">
						<Row>
							<RenderAvailableRooms availableRooms={this.state.availableRooms} />
						</Row>
					</Container>
				)}
			</React.Fragment>
		);
	}
}

export default Home;
