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
import Profile from './ProfileComponent';
import AdminReceptionists from './AdminReceptionists';
import MaintainerHotels from './MaintainerHotels';
import PreviousBookings from './PreviousBookingComponent';
import UpcomingBooking from './UpcomingBookingsComponent';
import Contactus from './Contactus';


class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoggedin : false,
            userType : '',
            secret : '',
            userId : null,
            userInfo : null,
            searchHotelResults : [],
            previousBookings : [],
            upcomingBookings : [],
            availableRooms : [],
            rooms : [],
            hotelAdmins : [],
            hotels : [],
            hotelRoomTypes : [],
            hotelRooms : []
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSearchHotel = this.handleSearchHotel.bind(this);
        this.handleCheckAvailability = this.handleCheckAvailability.bind(this);
        this.deleteHotel = this.deleteHotel.bind(this);
        this.addHotel = this.addHotel.bind(this);
    }

    componentDidMount(){
        let userDetails = JSON.parse(localStorage.getItem('userDetails'))
        let type;
        let id;
        let secret;
        if(userDetails){
            type = userDetails.type;
            id = userDetails.id;
            secret = userDetails.secret;    
        }
        
        if(type === 'customer'){
            this.setState({
                userType : type,
                userId : id,
                secret : secret,
                isLoggedin : true,
                userInfo : userDetails.customerDetails,
                previousBookings : userDetails.pastBookings,
                upcomingBookings : userDetails.upcomingBookings,
                hotels : userDetails.hotels,
                hotelRoomTypes : userDetails.hotelRoomTypes,
                hotelRooms : userDetails.hotelRooms
            })
        }
        else if(type === 'hotelAdministration'){
            this.setState({
                userType : type,
                userId : id,
                secret : secret,
                isLoggedin : true,
            })
        }
        else if(type === 'receptionist'){
            this.setState({
                userType : type,
                userId : id,
                secret : secret,
                isLoggedin : true,
            })
        }
        else if(type === 'maintainer'){
            let hotelAdmins = JSON.parse(localStorage.getItem('hotelAdmins'));
            let hotels = JSON.parse(localStorage.getItem('hotels'));
            this.setState({
                userType : type,
                userId : id,
                secret : secret,
                isLoggedin : true,
                hotelAdmins : hotelAdmins,
                hotels : hotels
            });

        }
        else{
            this.setState({
                userType : '',
                userId : null,
                secret : '',
                isLoggedin : false
            })
        }
    }

    handleCheckAvailability(event){
        this.setState({
            availableRooms : this.state.rooms
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
        })
    }

    handleLogout(){
        this.setState({
            isLoggedin : false,
            userType : '',
            userInfo : null,
            userId : null,
            secret : ''
        })
        localStorage.clear();
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
                localStorage.setItem('userDetails',JSON.stringify(response.data));
                let userInfo,userType,userId,secret;
                userType = response.data.type;
                secret = response.data.secret;
                userId = response.data.id;
                if(userType === 'maintainer'){
                    userInfo = response.data.maintainerDetails

                    let req1 = axios({
                        method : "GET",
                        url: baseUrl+'/maintainer/hotelAdmin',
                        headers: {
                            userType : response.data.type,
                            usersecret : response.data.secret
                        }
                    })

                    let req2 = axios({
                        method : "GET",
                        url: baseUrl+'/maintainer/hotel',
                        headers: {
                            userType : response.data.type,
                            usersecret : response.data.secret
                        }
                    })
                    axios.all([req1,req2])
                    .then(axios.spread((...response) => {
                        localStorage.setItem("hotelAdmins",JSON.stringify(response[0].data));
                        localStorage.setItem("hotels",JSON.stringify(response[1].data));
                        let hotelAdmins = response[0].data,hotels = response[1].data;
                        console.log(response);
                        this.setState({
                                isLoggedin : true,
                                userType : userType,
                                userId : userId,
                                secret : secret,
                                userInfo : userInfo,
                                hotelAdmins : hotelAdmins,
                                hotels : hotels
                        })

                    }))
                    .catch((err) => console.log(err));
                }
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


    addHotel(event){
        event.preventDefault();
        console.log(event.target.elements);
        let firstName = event.target.elements["firstName"].value;
        let lastName = event.target.elements["lastName"].value;
        let email = event.target.elements["email"].value;
        let password = event.target.elements["email"].value;
        let street = event.target.elements["street"].value;
        let city = event.target.elements["city"].value;
        let pincode = event.target.elements["pincode"].value;
        let hotelName = event.target.elements["hotelName"].value;

        let body = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password,
            street : street,
            city : city,
            pinCode : pincode,
            hotelName : hotelName
        }

        axios({
            method:"POST",
            url : baseUrl + '/maintainer/addNewHotel',
            data : body,
            headers : {
                userType : this.state.userType,
                usersecret : this.state.secret
            }
        })
        .then((response) => {
            console.log(response);
            let req1 = axios({
                method : "GET",
                url: baseUrl+'/maintainer/hotelAdmin',
                headers: {
                    userType : this.state.userType,
                    usersecret : this.state.secret
                }
            })

            let req2 = axios({
                method : "GET",
                url: baseUrl+'/maintainer/hotel',
                headers: {
                    userType : this.state.userType,
                    usersecret : this.state.secret
                }
            })
            axios.all([req1,req2])
            .then(axios.spread((...response) => {
                localStorage.setItem("hotelAdmins",JSON.stringify(response[0].data));
                localStorage.setItem("hotels",JSON.stringify(response[1].data));
                let hotelAdmins = response[0].data,hotels = response[1].data;
                console.log(response);
                this.setState({
                        isLoggedin : true,
                        hotelAdmins : hotelAdmins,
                        hotels : hotels
                })

            }))
            .catch((err) => console.log(err));
        })
    }

    deleteHotel(hotelId){

        axios({
            method : "delete",
            url : baseUrl+'/maintainer/removeHotel/'+hotelId+'/?'+hotelId,
            headers : {
                usertype : this.state.userType,
                usersecret : this.state.secret
            }
        })
        .then((response) => {
            console.log(response);
            let req1 = axios({
                method : "GET",
                url: baseUrl+'/maintainer/hotelAdmin',
                headers: {
                    userType : this.state.userType,
                    usersecret : this.state.secret
                }
            })

            let req2 = axios({
                method : "GET",
                url: baseUrl+'/maintainer/hotel',
                headers: {
                    userType : this.state.userType,
                    usersecret : this.state.secret
                }
            })
            axios.all([req1,req2])
            .then(axios.spread((...response) => {
                localStorage.setItem("hotelAdmins",JSON.stringify(response[0].data));
                localStorage.setItem("hotels",JSON.stringify(response[1].data));
                let hotelAdmins = response[0].data,hotels = response[1].data;
                console.log(response);
                this.setState({
                        isLoggedin : true,
                        hotelAdmins : hotelAdmins,
                        hotels : hotels
                })

            }))
            .catch((err) => console.log(err));
        })
        .catch((err) => {
            console.log(err);
        })
    }


    render(){

        const HomeWithDetails = () => {
            return (
                <Home isLoggedin = {this.state.isLoggedin} userInfo = {this.state.userInfo} userType={this.state.userType}
                    handleSearchHotel={this.handleSearchHotel} availableRooms = {this.state.availableRooms} 
                    handleCheckAvailability={this.handleCheckAvailability} deleteHotel={this.deleteHotel}
                    hotelAdmins = {this.state.hotelAdmins} hotels={this.state.hotels}
                    addHotel={this.addHotel}/>
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

        const LoadProfile = () => {
            return (
                <Profile />
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
                        <Route exact path='/profile' component= {LoadProfile} />
                        <Route exact path='/searchResults' component={SearchHotels} />
                        <Route exact path='/hotel/:hotelId' component={hotelWithId}/>
                        <Route exact path = '/receptionists' component= {AdminReceptionists} />
                        <Route exact path = '/admins' component= {MaintainerHotels} />
                        <Route exact path = '/customer/previousBookings' component={RenderPreviousBookings} />
                        <Route exact path = '/customer/upcomingBookings' component={RenderUpcomingBookings} />
                        <Route exact path = '/contactus' component= {Contactus} />
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