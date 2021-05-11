import React from "react";
import { Link } from "react-router-dom";
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardText,
	Button,
	Row,
	Container,
} from "reactstrap";
import Rating from "@material-ui/lab/Rating";

const RenderHotels = ({
	hotelDetails,
	hotelRoomTypes,
	startDate,
	endDate,
	keyWord,
	hotelRooms,
}) => {
	return hotelRoomTypes.map((hotelRoomType) => {
		return (
			(hotelDetails[hotelRoomType.hotelId].name
				.toLowerCase()
				.indexOf(keyWord.toLowerCase()) != -1 ||
				hotelDetails[hotelRoomType.hotelId].address.street
					.toLowerCase()
					.indexOf(keyWord.toLowerCase()) != -1 ||
				hotelDetails[hotelRoomType.hotelId].address.city
					.toLowerCase()
					.indexOf(keyWord.toLowerCase()) != -1) && (
				<div className="col-sm-6" key={hotelRoomType._id}>
					<Card>
						<CardImg width="30%" src={hotelRoomType.imgURLs[0]} alt="hotelImage" />
						<CardBody>
							<CardTitle tag="h5">
								{hotelDetails[hotelRoomType.hotelId].name}
							</CardTitle>
							<Rating name="read-only" value={hotelRoomType.rating} readOnly />
							<CardSubtitle tag="h6" className="mb-2 text-muted">
								Rs. {hotelRoomType.price}
							</CardSubtitle>
							<CardText>
								<span className="fa fa-map-marker"></span>
								{hotelDetails[hotelRoomType.hotelId].address.street},
								{hotelDetails[hotelRoomType.hotelId].address.city}
							</CardText>
							<Link to={`/hotel/${hotelRoomType.id}`}>
								<Button>Book a room</Button>
							</Link>
						</CardBody>
					</Card>
				</div>
			)
		);
	});
};

export const Search = ({ hotels, hotelRoomTypes, startDate, endDate, keyWord, hotelRooms }) => {
	let hotelDetails = {};
	var i = 0;
	while (hotels[i]) {
		hotelDetails[hotels[i]._id] = {
			name: hotels[i].hotelName,
			address: hotels[i].address,
		};
		i++;
	}
	console.log(hotelDetails);
	return (
		<Container>
			<Row className="mb-2">
				<RenderHotels
					hotelDetails={hotelDetails}
					hotelRoomTypes={hotelRoomTypes}
					startDate={startDate}
					endDate={endDate}
					keyWord={keyWord}
					hotelRooms={hotelRooms}
				/>
			</Row>
			{hotels.length === 0 && (
				<h1 className="align-self-center">No hotel matched with the search</h1>
			)}
		</Container>
	);
};
