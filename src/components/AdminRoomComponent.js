import React, { Component } from 'react';
import { Nav,NavItem,NavLink,Container,TabContent,TabPane,Row,Col,CardTitle,Card,CardText,Button, ListGroup,
        Media, Form,FormGroup,Label, 
        ListGroupItem,
        Input} from 'reactstrap';

function RenderRooms(props){
    return(
        props.rooms.map((room) => {
           return( 
               <ListGroupItem>

               
           <Media>
                <Media className="mr-2" left href="#">
                    <Media object src="assets/images/hotel1.jpeg" alt="Generic placeholder image" />
                </Media>
                {props.isEditing !== room._id ? (
                    <Media body>
                        <Media heading>
                            {room.type.type}
                            <Button className="bg bg-danger ml-4" color="danger" onClick={() => props.handleEdit(room._id)}><span className="fa fa-pencil"></span>Edit</Button>
                        </Media>
                        <p>{room.roomNo}</p>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    </Media>
                ) : (
                    <Form>
                    <h3>{room.type.type}</h3>
                    <FormGroup>
                        <Label htmlFor={`roomNo${room._id}`}>roomNo</Label>
                        <Input type="text" id={`roomNo${room._id}`}/>
                    </FormGroup>
                    </Form>
                )
                }
            </Media>
            </ListGroupItem>
            )
        })
    )
}

class AdminRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            isEditing : null,
            isModalOpen : false,
            activeTab : '1',
            rooms : [
                {   _id : 1,
                    roomNo: 'room1',
                    status : 'Available',
                    type : {
                        type: 'wonder',
                        facilities: {
                            AC : true,
                            Wifi : true
                        }
                    }
                },{     _id : 2,
                        roomNo: 'room1',
                        status : 'Available',
                        type : {
                            type: 'wonder',
                            facilities: {
                                AC : true,
                                Wifi : true
                            }
                        }
                }
            ]
        }
        this.setModal = this.setModal.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(id){
        this.setState({
            isEditing : id
        })
    }

    setActiveTab(tab){
        if(tab!==this.state.activeTab){
            this.setState({
                activeTab : tab
            })
        }
    }

    setModal(){
        this.setState({
            isModalOpen : true
        })
    }

    render(){
        return(
            <Container className="mt-5 mb-5">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            onClick={() => { this.setActiveTab('1'); }}
                        >
                            Room Details
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => { this.setActiveTab('2'); }}
                        >
                            Add Room
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <ListGroup>
                                <RenderRooms rooms={this.state.rooms} isEditing={this.state.isEditing} handleEdit = {this.handleEdit}/> 
                            </ListGroup>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </Container>
        )
    }
}

export default AdminRoom;