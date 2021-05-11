import React from "react";
import {
	CardText,
	Container,
	Row,
	Card,
	CardImg,
	CardBody,
	CardTitle,
	Button,
	CardSubtitle,
} from "reactstrap";

export const UpcomingBooking = (props) => {
	return (
		<Container className="mt-5 pt-5">
			<Row>
				{props.bookings.map((booking) => {
					return (
						<Card key={booking.id}>
							<CardImg
								top
								width="100%"
								src={booking.hotel.image}
								alt="Card image cap"
							/>
							<CardBody>
								<CardTitle tag="h5">{booking.hotel.name}</CardTitle>
								<CardSubtitle tag="h6" className="mb-2 text-muted">
									Card subtitle
								</CardSubtitle>
								<CardText>Booking on {booking.duration.startDate}</CardText>
								<CardText>Don't Forgot to bring your id</CardText>
								<Button>Cancel Booking</Button>
							</CardBody>
						</Card>
					);
				})}
				{props.bookings && <h1>No upcoming bookings</h1>}
			</Row>
		</Container>
	);
};
