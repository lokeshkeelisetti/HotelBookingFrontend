import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import {Redirect, Route, Switch} from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Search from './SearchComponent';
import Hotel from './HotelComponent';
import hotels from '../shared/hotels';
import Booking from './BookingComponent';


class Main extends Component {



    render(){

        const hotelWithId = ({match}) => {
            return(
                <Hotel hotel = {hotels.filter((hotel) => hotel.id === parseInt(match.params.hotelId,10))[0]}
                />
            )
        }

        const bookWithId = ({match}) => {
            return (
                <Booking hotel = {hotels.filter((hotel) => hotel.id === parseInt(match.params.hotelId))[0]} roomId = {match.params.roomId} />
            )
        }

        return (
            <div style={{minHeight:"100vh"}}>
                <Header />
                <TransitionGroup className="mb-auto">
                    <Switch>
                        <Route exact path='/' component= {Home} />
                        <Route exact path='/searchResults' component={Search} />
                        <Route exact path='/hotel/:hotelId' component={hotelWithId}/>
                        <Route path='/hotel/:hotelId/:roomId' component={bookWithId}/>
                        <Redirect to='/' />
                    </Switch>
                </TransitionGroup>
                <Footer />
            </div>
        )
    }
}

export default Main;