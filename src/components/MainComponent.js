import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import {Redirect, Route, Switch} from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Search from './SearchComponent';


class Main extends Component {
    render(){
        return (
            <div>
                <Header />
                <TransitionGroup>
                    <Switch>
                        <Route exact path='/' component= {Home} />
                        <Route exact path='/searchResults' component={Search} />
                        <Route path='/hotel/:hotelId' />
                        <Route path='/hotel/:hotelId/roomId' />
                        <Redirect to='/' />
                    </Switch>
                </TransitionGroup>
                <Footer />
            </div>
        )
    }
}

export default Main;