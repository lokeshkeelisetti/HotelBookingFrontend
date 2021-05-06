import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import {Route} from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';


class Main extends Component {
    render(){
        return (
            <div>
                <Header />
                <TransitionGroup>
                        <Route path='/' component= {Home} />
                </TransitionGroup>
            </div>
        )
    }
}

export default Main;