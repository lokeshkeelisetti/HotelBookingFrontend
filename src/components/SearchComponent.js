import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardText,
	Button,
	Form,
	FormGroup,
	Input,
	Jumbotron,
	Row,
	Container,
} from "reactstrap";
import Rating from "@material-ui/lab/Rating";

function RenderHotels(props) {
	console.log("lokesh");
	return props.hotels.map((hotel) => {
		return (
			<div className="col-sm-6" key={hotel._id}>
				<Card>
					<CardImg width="30%" src={hotel.imageURLs} alt="hotelImage" />
					<CardBody>
						<CardTitle tag="h5">{hotel.hotelName}</CardTitle>
						<Rating name="read-only" value={hotel.rating} readOnly />
						<CardSubtitle tag="h6" className="mb-2 text-muted">
							Card subtitle
						</CardSubtitle>
						<CardText>
							<span className="fa fa-map-marker"></span>
							{hotel.address.street},{hotel.address.city}
						</CardText>
						<Link to={`/hotel/${hotel.id}`}>
							<Button>Book a room</Button>
						</Link>
					</CardBody>
				</Card>
			</div>
		);
	});
}

class Search extends Component {
	render() {
		return (
			<>
				<Jumbotron>
					<Container>
						<Form className="row" onSubmit={this.props.handleSearchHotel}>
							<FormGroup className="col-7 col-md-7">
								<Input
									type="text"
									id="location"
									name="location"
									placeholder="Search by city or hotel"
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
					<Row className="mb-2">
						<RenderHotels hotels={this.props.hotels} />
					</Row>
					{this.props.hotels.length === 0 && (
						<h1 className="align-self-center">No hotel matched with the search</h1>
					)}
				</Container>
			</>
		);
	}
}

export default Search;
