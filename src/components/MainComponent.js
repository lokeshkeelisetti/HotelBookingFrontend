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


class Main extends Component {



    render(){

        const hotelWithId = ({match}) => {
            return(
                <Hotel hotel = {hotels.filter((hotel) => hotel.id === parseInt(match.params.hotelId,10))[0]}
                />
            )
        }

        return (
            <div style={{minHeight:"100vh"}}>
                <Header />
                <TransitionGroup className="mb-auto">
                    <Switch>
                        <Route exact path='/' component= {Home} />
                        <Route exact path='/profile' component= {ProfileComponent} />
                        {/* profile root */}
                        <Route exact path='/searchResults' component={Search} />
                        <Route exact path='/hotel/:hotelId' component={hotelWithId}/>
                        <Redirect to='/' />
                    </Switch>
                </TransitionGroup>
                <Footer />
            </div>
        )
    }
}

export default Main;