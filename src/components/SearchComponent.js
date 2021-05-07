import React, { Component } from 'react';
import { Card, CardImg,CardBody,CardTitle,CardSubtitle,CardText,Button,Form,
        FormGroup,Input, Jumbotron, Row } from 'reactstrap';

let hotels = [
    {
        id : 1,
        name : 'Red',
        image : 'assets/images/hotel1.jpeg',
        rating : 3
    },{
        id : 2,
        name : 'Green',
        image : 'assets/images/hotel2.jpeg',
        rating: 4
    },{
        id : 3,
        name : 'Blue',
        image : 'assets/images/hotel3.jpeg'
    }
]

function RenderHotels(props){
    console.log('lokesh')
    return (
        hotels.map((hotel) => {
            return(<div key={hotel.id}>
                <Card sm="6">
                    <CardImg width="30%" src={hotel.image} alt="hotelImage"/>
                    <CardBody>
                        <CardTitle tag="h5">{hotel.name}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <Button>Button</Button>
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
        <Row>
            <RenderHotels/>
        </Row>
        </>
        )
    }
}

export default Search;