import React,{Component} from 'react';
import { Media ,Container, ListGroup, ListGroupItem, Button} from 'reactstrap';


class Room extends Component{
    constructor(props){
        super(props);
        this.state = {
            room : {
                type : {
                    type : 'Prsidential',
                    image : 'assets/images/hotel3.jpeg',
                    facilities : {
                        AC : true,
                        noOfPeople : 4,
                        Wifi : true
                    },
                    price : 10000
                },
                status : 'Available'
            }
        }
        this.handleBooking = this.handleBooking.bind(this);
    }

    handleBooking(){
        console.log('lokesh');
    }

    render(){
        return(
            <>
            <Container className="d-flex mt-5 flex-wrap">
                <Media className="mr-auto col-12 col-md-6" style={{width:'50vw'}} object src={this.state.room.type.image} />
                <Container className="ml-auto col-md-4">
                    <h3>{this.state.room.type.type}</h3>
                    <br />
                    <h5>Facilities</h5>
                    <ListGroup>
                        <ListGroupItem>{this.state.room.type.facilities.AC ? ('AC') : ('Non-AC')}</ListGroupItem>
                        <ListGroupItem>{`No of People ${this.state.room.type.facilities.noOfPeople}`}</ListGroupItem>
                        <ListGroupItem>{this.state.room.type.facilities.Wifi ? ('Wifi') : ('Non-Wifi')}</ListGroupItem>
                    </ListGroup>
                </Container>
            </Container>
            <Container className="mb-5 ml-auto mr-auto p-4">
                <p style={{color:"green"}}>{this.state.room.status}</p>
                <p>Price Rs.{this.state.room.type.price}/- per day</p>
                <Button onClick={this.handleBooking}>Book Room</Button>
            </Container>
            </>
        )
    }
}

export default Room