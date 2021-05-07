import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import {Redirect, Route, Switch} from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';


class Main extends Component {
    render(){
        return (
            <div>
                <Header />
                <TransitionGroup>
                    <Switch>
                        <Route path='/' component= {Home} />
                        <Route path='/searchResults' />
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