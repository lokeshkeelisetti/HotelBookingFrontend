import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import {Redirect, Route, Switch,withRouter} from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Search from './SearchComponent';
import Hotel from './HotelComponent';
import baseUrl from '../shared/baseUrl';
import axios from 'axios';
import AdminRoom from './AdminRoomComponent';
import Profile from './ProfileComponent';
import AdminReceptionists from './AdminReceptionists';
import MaintainerHotels from './MaintainerHotels';
import PreviousBookings from './PreviousBookingComponent';
import UpcomingBooking from './UpcomingBookingsComponent';


class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            hotels: [],
            error : null,
            isLoggedin : false,
            userType : '',
            userInfo : null,
            searchHotelResults : [],
            previousBookings : [],
            upcomingBookings : [],
            availableRooms : [],
            rooms : []
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSearchHotel = this.handleSearchHotel.bind(this);
        this.handleCheckAvailability = this.handleCheckAvailability.bind(this);
    }

    componentDidMount(){
        this.setState({
            availableRooms : rooms
        });
        if(!this.state.isLoggedin || this.state.userType === 'customer' || this.state.userType === 'maintainer'){
            axios.get(baseUrl)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    hotels : response.data
                })
            })
            .catch((err) => console.log(err));
        }
        else{

        }
    }

    handleCheckAvailability(event){
        this.setState({
            availableRooms : rooms
        })
    }

    handleSearchHotel(event){
        event.preventDefault();
        console.log(event);
        let body = {};
        let startDate = event.target.elements["checkIn"].value;
        let endDate = event.target.elements["checkOut"].value;
        if(event.target.elements["searchBy"].value === 'location'){
            let city = event.target.elements["location"].value;
            body = {
                city : city,
                startDate : startDate,
                endDate : endDate
            }
        }
        else{
            let hotelName = event.target.elements["location"].value;
            body = {
                hotelName : hotelName,
                startDate : startDate,
                endDate : endDate
            }
        }
        console.log(body);
        axios({
            method: "POST",
            url : baseUrl + '/customer/findHotel',
            headers : {
                "Content-Type" : "application/json"
            },
            data : body
        })
        .then((response) => console.log(response))
        .catch((err) => {
            this.setState({
                searchHotelResults : []
            })
            this.props.history.push('/searchResults');
            alert('No Hotel matching with your filters');
        })
    }

    handleLogout(){
        this.setState({
            isLoggedin : false,
            userType : '',
            userInfo : null
        })
    }

    handleLogin(event){
        let email = event.target.elements['email'].value;
        let password = event.target.elements['password'].value;
        let body = {
            "email":email,
            "password":password
        }
        axios({
            method : 'POST',
            url : baseUrl + '/login',
            headers : {
                "Content-Type" : "application/json"
            },
            data : body
        })
        .then((response) => {
            if(response.data.type){
                this.setState({
                    isLoggedin : true,
                    userType : response.data.type
                })
            }
            else if(response.data.error){
                alert(response.data.error);
            }
        })
        .catch((err) => console.log(err));
    }

    handleRegister(event){
        let firstName = event.target.elements["firstname"].value;
        let lastName = event.target.elements["lastname"].value;
        let email = event.target.elements["email"].value;
        let password = event.target.elements["password"].value;
        let body = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            password:password
        }

        axios({
            method : "POST",
            url: baseUrl+'/registerCustomer',
            headers : {
                "Content-Type" : "application/json"
            },
            data : body
        })
        .then((response) => {
            if(response.status === 200){
                alert('Account Successfully Created');
            }
        })
        .catch((err) => console.log(err))
    }


    render(){

        const HomeWithDetails = () => {
            return (
                <Home isLoggedin = {this.state.isLoggedin} userInfo = {this.state.userInfo} userType={this.state.userType}
                    handleSearchHotel={this.handleSearchHotel} availableRooms = {this.state.availableRooms} 
                    handleCheckAvailability={this.handleCheckAvailability}/>
            )
        }

        const hotelWithId = ({match}) => {
            return(
                <Hotel hotel = {this.state.hotels.filter((hotel) => hotel.id === parseInt(match.params.hotelId,10))[0]}
                />
            )
        }

        const SearchHotels = () => {
            return (
                <Search hotels = {this.state.searchHotelResults} handleSearchHotel={this.handleSearchHotel} />
            )
        }

        const RenderPreviousBookings = () => {
            return (
                <PreviousBookings  bookings={this.state.previousBookings}/>
            )
        }

        const RenderUpcomingBookings = () => {
            return (
                <UpcomingBooking bookings={this.state.upcomingBookings} />
            )
        }

        return (
            <div style={{minHeight:'100vh',position:'relative'}}>
                <div style={{paddingBottom:'10rem'}}>
                <Header 
                    isLoggedin={this.state.isLoggedin}
                    userType = {this.state.userType}
                    handleLogin = {this.handleLogin}
                    handleRegister = {this.handleRegister}
                    handleLogout = {this.handleLogout}
                />
                <TransitionGroup className="mb-auto flex-grow-1">
                    <Switch>
                        <Route exact path='/' component= {HomeWithDetails} />
                        <Route exact path='/profile' component= {Profile} />
                        {/* profile root */}
                        <Route exact path='/searchResults' component={SearchHotels} />
                        <Route exact path='/hotel/:hotelId' component={hotelWithId}/>
                        <Route exact path = '/test' component = {AdminRoom} />
                        <Route exact path = '/receptionists' component= {AdminReceptionists} />
                        <Route exact path = '/admins' component= {MaintainerHotels} />
                        <Route exact path = '/customer/previousBookings' component={RenderPreviousBookings} />
                        <Route exact path = '/customer/upcomingBookings' component={RenderUpcomingBookings} />
                        <Redirect to='/' />
                    </Switch>
                </TransitionGroup>
                </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(Main);