import React, { Component } from "react";
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

function RenderUpcomingBookings(props) {
	return props.bookings.map((booking) => {
		return (
			<Card key={booking.id}>
				<CardImg top width="100%" src={booking.hotel.image} alt="Card image cap" />
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
	});
}

<<<<<<< HEAD
class UpcomingBooking extends Component{

    render(){
        return(
            <Container className="mt-5 pt-5">
                <Row>
                    <RenderUpcomingBookings bookings={this.props.bookings} />
                    { this.props.bookings &&
                        (
                            <h1>No upcoming bookings</h1>
                        )

                    }
                </Row>
            </Container>
        )
    }
=======
class UpcomingBooking extends Component {
	render() {
		return (
			<Container>
				<Row>
					<RenderUpcomingBookings bookings={this.props.bookings} />
					{this.props.bookings && <h1>No upcoming bookings</h1>}
				</Row>
			</Container>
		);
	}
>>>>>>> 3f35d2ff7caecf56f00ce9db088778d9081e5d6d
}

export default UpcomingBooking;
