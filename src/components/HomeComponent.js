import React,{ Component } from 'react';
import { Carousel, CarouselItem , CarouselCaption,CarouselIndicators,CarouselControl, Jumbotron, Container, Input,
     FormGroup ,Form,Button, Label,Row,Card,CardBody,CardImg,CardTitle,CardSubtitle,CardText} from 'reactstrap';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';
import hotels from '../shared/hotels';

function RenderAvailableRooms(props){
    return(
        <>
        {props.availableRooms.map((room) => {
            return(
                <Card key={room.id} className="col-12 col-sm-3">
                    <CardImg width="50%" src={room.image} alt="hotelImage"/>
                    <CardBody>
                        <CardTitle tag="h5">{room.name}</CardTitle>
                        <Rating name="read-only" value={room.rating} readOnly />
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <Link to={`/hotel/${room.id}`}>
                            <Button>Book a room</Button>
                        </Link>
                    </CardBody>
                </Card>
            )
        })}
        </>
    )
}


const items = [
    {
        src : 'assets/images/hotel1.jpeg',
        altText : 'Hotel',
        caption : 'Hotel'
    },{
        src : 'assets/images/hotel2.jpeg',
        altText : 'Another Hotel',
        caption : 'Another Hotel'
    },{
        src : 'assets/images/hotel3.jpeg',
        altText : 'Again Hotel',
        caption : 'Again Hotel'
    }
]

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex : 0,
            animating : false,
            userInfo : {
                name : 'bhaggi',
                hotel : 'Sitara'
            },
            rooms : [],
            hotels: hotels,
            availableRooms : [{
                id : 1,
                image : 'assets/images/hotel1.jpeg',
                rating : 3,
                name : 'violet'
            }]
        }
        this.setActiveIndex = this.setActiveIndex.bind(this);
        this.setAnimating = this.setAnimating.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCheckAvailability = this.handleCheckAvailability.bind(this);
    }

    handleCheckAvailability(event){
        event.preventDefault();
        console.log(`Checking availbility for ${this.timeOfStay.value} days of ${this.typeOfRoom.value} Stay`);
    }

    handleSearch(event){
        event.preventDefault();
        console.log('Searching for hotel in '+this.location.value+' between '+this.checkIn.value+' and '+this.checkOut.value);
    }

    setActiveIndex = (index) => {
        this.setState({
            activeIndex : index
        })
    }

    setAnimating = () => {
        this.setState({
            animating : !this.state.animating
        })
    }


    render(){
        const next = () =>{
            if(this.state.animating) return;
            let nextIndex = (this.state.activeIndex === items.length-1) ? 0 : this.state.activeIndex+1;
            this.setActiveIndex(nextIndex);
        }
        const prev = () => {
            if(this.state.animating) return;
            let prevIndex = (this.state.activeIndex === 0 ) ? items.length-1 : this.state.activeIndex-1;
            this.setActiveIndex(prevIndex);
        }

        const goToIndex = (index) => {
            if(this.state.animating) return;
            this.setActiveIndex(index);
        }

        const slides = items.map((item) => {
            return(
                <CarouselItem onExiting = {() => this.setAnimating(true)}
                    onExited = {() => this.setAnimating(false)}
                    key={process.env.PUBLIC_URL +item.src}>
                    <img style={{width:"100vw",height:"50vh"}} src={process.env.PUBLIC_URL+item.src} alt={item.altText} />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            )
        })

        

        return(
            <React.Fragment>
                {(this.props.userType === 'Customer' || !this.props.isLoggedin) && 
                    (<>
                        <Jumbotron>
                            <Container>
                                <h3>OYO</h3>
                                <h5>A place to find your every stay</h5>
                            </Container>
                            <Container>
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
                            </Container>    
                        </Jumbotron>
                        <Container>
                            <Carousel className="mb-5" activeIndex={this.state.activeIndex} 
                                next={next}
                                previous={prev}>
                                <CarouselIndicators items={items} activeIndex={this.state.activeIndex} onClickHandler={goToIndex} />
                                {slides}
                                <CarouselControl direction="prev" directionText="Previous" onClickHandler={prev} />
                                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                            </Carousel>
                        </Container>
                    </>)
                }
                { (this.props.userType === 'receptionist') &&
                    <>
                        <Jumbotron>
                            <Container>
                                <h3>Welcome to Hotel</h3>
                                <Form className="w-50 offset-1" onSubmit={this.handleCheckAvailability}>
                                    <FormGroup>
                                        <Label htmlFor="timeOfStay">Duration of Stay in days</Label>
                                        <Input name="timeOfStay" type="text" id="timeOfStay" innerRef={(timeOfStay) => this.timeOfStay = timeOfStay}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="typeOfRoom">Type Of Room</Label>
                                        <Input name="typeOfRoom" type="select" id="typeOfRoom" innerRef={(typeOfRoom) => this.typeOfRoom = typeOfRoom}>
                                            <option selected value="AC Deluxe">AC Deluxe</option>
                                            <option selected value="Non AC Deluxe">Non AC Deluxe</option>
                                        </Input>
                                    </FormGroup>
                                    <Button type="submit" className="btn btn-primary" color="primary">Check Availabilty</Button>
                                </Form>
                            </Container>
                        </Jumbotron>
                        <Container style={{minHeight:'30vh'}}>
                            <Row className="mt-5 mb-5">
                                <RenderAvailableRooms availableRooms={this.state.availableRooms} />
                            </Row>
                        </Container>
                    </>
                }
                {this.props.userType === 'hotelAdministration' &&
                    (   <Container className="mt-5 mb-5">
                            <Row>
                                <RenderAvailableRooms availableRooms = {this.state.availableRooms} />
                            </Row>
                        </Container>
                    )
                }
                {this.props.userType === 'maintainer' &&
                    (
                        <Container className="mt-5 mb-5">
                            <Row>
                                <RenderAvailableRooms availableRooms={this.state.availableRooms} />
                            </Row>
                        </Container>
                    )
                }
            </React.Fragment>
        )
    }

}

export default Home;