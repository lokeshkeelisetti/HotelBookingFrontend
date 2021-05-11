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

const RenderHotels = ({ hotels, hotelRoomTypes, keyWord, isLoggedin }) => {
	console.log("Hi");
	console.log(hotelRoomTypes);
	console.log(hotels);
	return hotelRoomTypes.map((hotelRoomType) => {
		return (
			(hotels[hotelRoomType.hotelId].name.toLowerCase().indexOf(keyWord.toLowerCase()) !=
				-1 ||
				hotels[hotelRoomType.hotelId].address.street
					.toLowerCase()
					.indexOf(keyWord.toLowerCase()) != -1 ||
				hotels[hotelRoomType.hotelId].address.city
					.toLowerCase()
					.indexOf(keyWord.toLowerCase()) !== -1) && (
				<div className="col-sm-6" key={hotelRoomType._id}>
					<Card>
						<CardImg width="30%" src={hotelRoomType.imgURLs[0]} alt="hotelImage" />
						<CardBody>
							<CardTitle tag="h5">{hotels[hotelRoomType.hotelId].name}</CardTitle>
							<Rating name="read-only" value={hotelRoomType.rating} readOnly />
							<CardSubtitle tag="h6" className="mb-2 text-muted">
								Rs. {hotelRoomType.price}
							</CardSubtitle>
							<CardText>
								<span className="fa fa-map-marker"></span>
								{hotels[hotelRoomType.hotelId].address.street},
								{hotels[hotelRoomType.hotelId].address.city}
							</CardText>
							{isLoggedin && (
								<Link to={`/hotel/${hotelRoomType.id}`}>
									<Button>Book a room</Button>
								</Link>
							)}
						</CardBody>
					</Card>
				</div>
			)
		);
	});
};

export const Search = ({ hotels, hotelRoomTypes, keyWord, isLoggedin }) => {
	// console.log(hotels);
	// let hotelDetails = {};
	// var i = 0;
	// while (hotels[i]) {
	// 	hotelDetails[hotels[i]._id] = {
	// 		name: hotels[i].hotelName,
	// 		address: hotels[i].address,
	// 	};
	// 	i++;
	// }
	// console.log("yo", hotelDetails);
	return (
		<Container>
			<Row className="mb-2">
				<RenderHotels
					hotels={hotels}
					hotelRoomTypes={hotelRoomTypes}
					keyWord={keyWord}
					isLoggedin={isLoggedin}
				/>
			</Row>
			{hotels.length === 0 && (
				<h1 className="align-self-center">No hotel matched with the search</h1>
			)}
		</Container>
	);
};
