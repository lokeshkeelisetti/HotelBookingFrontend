import React,{ Component } from 'react';
import { Carousel, CarouselItem , CarouselCaption,CarouselIndicators,CarouselControl, Jumbotron, Container, Input,
     FormGroup ,Form,Button} from 'reactstrap';

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
            isLogged : false,
            userType: 'customer'
        }
        this.setActiveIndex = this.setActiveIndex.bind(this);
        this.setAnimating = this.setAnimating.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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
                {this.state.userType === 'customer' && 
                    (
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
                    )
                }
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
            </React.Fragment>
        )
    }

}

export default Home;