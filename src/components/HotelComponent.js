import React, { Component } from 'react';
import { Button, Container,Row } from 'reactstrap';

class Hotel extends Component{
   

    render(){

        const RenderRooms = (props) =>{
            return (
                props.rooms.map((room) => {
                    return(
                        <div key={room.id} className="col-6 col-sm-3">
                            <h1>{room.name}</h1>
                            <p>{room.AC ? 'AC' : 'Non-AC'}</p>
                            <p>{room.status}</p>
                            <Button>Book Room</Button>
                        </div>
                    )
                })
            )
        }

        return(
            <Container>
                <Row>
                    <RenderRooms rooms = {this.props.hotel.rooms}/>
                </Row>
            </Container>
        )
    }
}

export default Hotel;