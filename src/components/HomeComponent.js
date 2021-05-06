import React,{ Component } from 'react';
import { Carousel, CarouselItem , CarouselCaption,CarouselIndicators,CarouselControl } from 'reactstrap';

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
            animating : false
        }
        this.setActiveIndex = this.setActiveIndex.bind(this);
        this.setAnimating = this.setAnimating.bind(this);
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
            <Carousel activeIndex={this.state.activeIndex} 
                next={next}
                previous={prev}>
                <CarouselIndicators items={items} activeIndex={this.state.activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={prev} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        )
    }

}

export default Home;