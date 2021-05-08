import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg,CardBody,CardTitle,CardSubtitle,CardText,Button,Form,
        FormGroup,Input, Jumbotron, Row, Container } from 'reactstrap';
import Rating from '@material-ui/lab/Rating';
import hotels from '../shared/hotels';

function RenderHotels(props){
    console.log('lokesh')
    return (
        hotels.map((hotel) => {
            return(<div className="col-sm-6" key={hotel.id}>
                <Card>
                    <CardImg width="30%" src={hotel.image} alt="hotelImage"/>
                    <CardBody>
                        <CardTitle tag="h5">{hotel.name}</CardTitle>
                        <Rating name="read-only" value={hotel.rating} readOnly />
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <Link to={`/hotel/${hotel.id}`}>
                            <Button>Book a room</Button>
                        </Link>
                    </CardBody>
                </Card>
            </div>)
        })
    )
}

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            hotels : hotels
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event){
        event.preventDefault();
    }

    render(){
        return(
        <>
        <Jumbotron>
            <Form onSubmit={this.handleSearch} inline>
                <FormGroup>
                    <Input type="text" id="location" placeholder="Enter search location"
                        innerRef = {(location) => this.location = location} />
                </FormGroup>
                <FormGroup>
                    <Input type="date" id="checkIn" placeholder="check-in"
                        innerRef = {(checkIn) => this.checkIn = checkIn} />
                </FormGroup>
                <FormGroup>
                    <Input type="date" id="checkOut" placeholder="check-out"
                        innerRef = {(checkOut) => this.checkOut = checkOut} />
                </FormGroup>
                <Button type="submit" value="submit" className="bg-primary" color="primary">Search</Button>
            </Form>
        </Jumbotron>
        <Container>
            <Row className="mb-2">
                <RenderHotels/>
            </Row>
        </Container>
        </>
        )
    }
}

export default Search;