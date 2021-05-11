import Rating from "@material-ui/lab/Rating";
import React, { Component } from "react";
import {
	CardBody,
	CardTitle,
	Button,
	Card,
	CardSubtitle,
	CardText,
	CardImg,
	Container,
	Row,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";

function RenderPreviousBookings(props) {
	return props.bookings.map((booking) => {
		return (
			<Card key={booking.id}>
				<CardImg top width="100%" src={booking.hotel.image} alt="Card image cap" />
				<CardBody>
					<CardTitle tag="h5">{booking.hotel.name}</CardTitle>
					{booking.rating != null && (
						<Rating name="read-only" value={booking.rating.ratingValue} />
					)}
					{booking.rating == null && (
						<Form>
							<FormGroup>
								<Rating name="rating" id={`rating${booking.id}`} value={null} />
							</FormGroup>
							<FormGroup>
								<Label htmlFor={`comment${booking.id}`}>Comments</Label>
								<Input type="textarea" id={`comment${booking.id}`} />
							</FormGroup>
							<Button type="submit">Give Feedback</Button>
						</Form>
					)}
					<CardSubtitle tag="h6" className="mb-2 text-muted">
						Card subtitle
					</CardSubtitle>
					<CardText>
						Some quick example text to build on the card title and make up the bulk of
						the card's content.
					</CardText>
					<Button>Button</Button>
				</CardBody>
			</Card>
		);
	});
}

class PreviousBookings extends Component{

    render(){
        return(
            <Container className="mt-5 pt-5">
                <Row>
                    <RenderPreviousBookings bookings={this.props.bookings} />
                    { this.props.bookings.length === 0 &&
                        (
                            <h1>No previous Bookings</h1>
                        )
                    }
                </Row>
            </Container>
        )
    }
}

export default PreviousBookings;
