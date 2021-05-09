import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import {Redirect, Route, Switch} from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Search from './SearchComponent';
import Hotel from './HotelComponent';
import hotels from '../shared/hotels';
import ProfileComponent from './ProfileComponent';
import baseUrl from '../shared/baseUrl';
import axios from 'axios';
import Room from './RoomComponent';


class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            hotels: [],
            error : null,
            isLoggedin : false,
            userType : ''
        }
        this.setHotels = this.setHotels.bind(this);
        this.setLoggedin = this.setLoggedin.bind(this);
        this.setUserType = this.setUserType.bind(this);
    }

    setUserType(){
        return;
    }

    setLoggedin(){
        return;
    }

    setHotels(){
        return;
    }

    componentDidMount(){
        axios.get(baseUrl)
            .then((response) => response)
            .then((response) => console.log(response.data))
            .catch((err) => console.log(err));
    }


    render(){

        const hotelWithId = ({match}) => {
            return(
                <Hotel hotel = {hotels.filter((hotel) => hotel.id === parseInt(match.params.hotelId,10))[0]}
                />
            )
        }

        return (
            <div>
                <Header 
                    isLoggedin={this.state.isLoggedin} setLoggedin = {this.setLoggedin} 
                    userType = {this.state.userType}  setUserType = {this.setUserType}
                />
                <TransitionGroup className="mb-auto">
                    <Switch>
                        <Route exact path='/' component= {Home} />
                        <Route exact path='/profile' component= {ProfileComponent} />
                        {/* profile root */}
                        <Route exact path='/searchResults' component={Search} />
                        <Route exact path='/hotel/:hotelId' component={hotelWithId}/>
                        <Route exact path = '/test' component = {Room} />
                        <Redirect to='/' />
                    </Switch>
                </TransitionGroup>
                <Footer />
            </div>
        )
    }
}

export default Main;