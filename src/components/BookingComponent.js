import React, { Component } from 'react';
import { Container,Row } from 'reactstrap';

class Booking extends Component{
    constructor(props){
        super(props);
        this.state = {
            previous_bookings : [],
            upcoming_bookings : []
        }
    }

    render(){
        return(
            <Container>
                <Row>
                    
                </Row>
            </Container>
        )
    }
}