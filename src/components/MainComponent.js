import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Footer from "./FooterComponent";
import { Search } from "./SearchComponent";
import Hotel from "./HotelComponent";
import baseUrl from "../shared/baseUrl";
import axios from "axios";
import Profile from "./ProfileComponent";
import { AdminReceptionists } from "./AdminReceptionists";
import MaintainerHotels from "./MaintainerHotels";
import PreviousBookings from "./PreviousBookingComponent";
import UpcomingBooking from "./UpcomingBookingsComponent";
import { Contactus } from "./Contactus";

export const Main = () => {
	const [isLoggedin, setisLoggedin] = useState(false);
	const [userType, setuserType] = useState("");
	const [secret, setsecret] = useState("");
	const [userId, setuserId] = useState("");
	const [userInfo, setuserInfo] = useState("");
	const [searchHotelResults, setsearchHotelResults] = useState([]);
	const [previousBookings, setpreviousBookings] = useState([]);
	const [upcomingBookings, setupcomingBookings] = useState([]);
	const [availableRooms, setavailableRooms] = useState([]);
	const [rooms, setrooms] = useState([]);
	const [hotelAdmins, sethotelAdmins] = useState([]);
	const [hotels, sethotels] = useState([]);
	const [hotelRoomTypes, sethotelRoomTypes] = useState([]);
	const [hotelRooms, sethotelRooms] = useState([]);

	useEffect(() => {
		let userDetails = JSON.parse(localStorage.getItem("userDetails"));
		let type = "";

		if (userDetails) {
			type = userDetails.type;
			setuserType(userDetails.type);
			setuserId(userDetails.id);
			setsecret(userDetails.secret);
			setisLoggedin(true);
		}
		if (type === "customer") {
			setuserInfo(userDetails.customerDetails);
			setpreviousBookings(userDetails.pastBookings);
			setupcomingBookings(userDetails.upcomingBookings);
			sethotels(userDetails.hotels);
			sethotelRoomTypes(userDetails.hotelRoomTypes);
			sethotelRooms(userDetails.hotelRooms);
		} else if (type === "maintainer") {
			let hotelAdmins = JSON.parse(localStorage.getItem("hotelAdmins"));
			let hotels = JSON.parse(localStorage.getItem("hotels"));
			sethotelAdmins(hotelAdmins);
			sethotels(hotels);
		} else {
			setuserType("");
			setuserId("");
			setsecret("");
			setisLoggedin(false);
		}
	}, []);

	const handleCheckAvailability = () => {
		setavailableRooms(rooms);
	};

	const handleSearchHotel = (event) => {
		event.preventDefault();
		console.log(event);
		let startDate = event.target.elements["checkIn"].value;
		let endDate = event.target.elements["checkOut"].value;
		let searchBy = event.target.elements["searchBy"].value;
		let location = event.target.elements["location"].value;

		console.log(typeof startDate);
	};

	const handleLogout = () => {
		setisLoggedin(false);
		setuserType("");
		setuserInfo("");
		setuserId("");
		setsecret("");
		localStorage.clear();
	};

	const handleLogin = (event) => {
		let email = event.target.elements["email"].value;
		let password = event.target.elements["password"].value;
		let body = {
			email: email,
			password: password,
		};
		console.log(body);
		axios({
			method: "POST",
			url: baseUrl + "/login",
			headers: {
				"Content-Type": "application/json",
			},
			data: body,
		})
			.then((response) => {
				if (response.data.type) {
					localStorage.setItem("userDetails", JSON.stringify(response.data));
					let userInfo, userType, userId, secret;
					userType = response.data.type;
					secret = response.data.secret;
					userId = response.data.id;
					if (userType === "maintainer") {
						userInfo = response.data.maintainerDetails;

						let req1 = axios({
							method: "GET",
							url: baseUrl + "/maintainer/hotelAdmin",
							headers: {
								userType: response.data.type,
								usersecret: response.data.secret,
							},
						});

						let req2 = axios({
							method: "GET",
							url: baseUrl + "/maintainer/hotel",
							headers: {
								userType: response.data.type,
								usersecret: response.data.secret,
							},
						});
						axios
							.all([req1, req2])
							.then(
								axios.spread((...response) => {
									localStorage.setItem(
										"hotelAdmins",
										JSON.stringify(response[0].data)
									);
									localStorage.setItem(
										"hotels",
										JSON.stringify(response[1].data)
									);
									let hotelAdmins = response[0].data,
										hotels = response[1].data;
									console.log(response);

									setisLoggedin(true);
									setuserType(userType);
									setuserId(userId);
									setsecret(secret);
									setuserInfo(userInfo);
									sethotelAdmins(hotelAdmins);
									sethotels(hotels);
								})
							)
							.catch((err) => console.log(err));
					} else if (userType === "customer") {
						userInfo = response.data.customerDetails;
						let previousBookings = response.data.pastBookings;
						let upcomingBookings = response.data.upcomingBookings;
						let hotels = response.data.hotels;
						let hotelRoomTypes = response.data.hotelRoomTypes;
						let hotelRooms = response.data.hotelRooms;

						setisLoggedin(true);
						setuserType(userType);
						setuserId(userId);
						setsecret(secret);
						setuserInfo(userInfo);
						setpreviousBookings(previousBookings);
						setupcomingBookings(upcomingBookings);
						sethotels(hotels);
						sethotelRoomTypes(hotelRoomTypes);
						sethotelRooms(hotelRooms);
					}
				} else if (response.data.error) {
					console.log(response.data);
					alert(response.data.error);
				}
			})
			.catch((err) => console.log(err));
	};

	const handleRegister = (event) => {
		let firstName = event.target.elements["firstname"].value;
		let lastName = event.target.elements["lastname"].value;
		let email = event.target.elements["email"].value;
		let password = event.target.elements["password"].value;
		let body = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
		};

		axios({
			method: "POST",
			url: baseUrl + "/registerCustomer",
			headers: {
				"Content-Type": "application/json",
			},
			data: body,
		})
			.then((response) => {
				if (response.status === 200) {
					alert("Account Successfully Created");
				}
			})
			.catch((err) => console.log(err));
	};

	const addHotel = (event) => {
		event.preventDefault();
		console.log(event.target.elements);
		let firstName = event.target.elements["firstName"].value;
		let lastName = event.target.elements["lastName"].value;
		let email = event.target.elements["email"].value;
		let password = event.target.elements["password"].value;
		let street = event.target.elements["street"].value;
		let city = event.target.elements["city"].value;
		let pincode = event.target.elements["pincode"].value;
		let hotelName = event.target.elements["hotelName"].value;

		let body = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			street: street,
			city: city,
			pinCode: pincode,
			hotelName: hotelName,
		};

		console.log(body);

		axios({
			method: "POST",
			url: baseUrl + "/maintainer/addNewHotel",
			data: body,
			headers: {
				userType: this.state.userType,
				usersecret: this.state.secret,
			},
		}).then((response) => {
			console.log(response);
			let req1 = axios({
				method: "GET",
				url: baseUrl + "/maintainer/hotelAdmin",
				headers: {
					userType: this.state.userType,
					usersecret: this.state.secret,
				},
			});

			let req2 = axios({
				method: "GET",
				url: baseUrl + "/maintainer/hotel",
				headers: {
					userType: this.state.userType,
					usersecret: this.state.secret,
				},
			});
			axios
				.all([req1, req2])
				.then(
					axios.spread((...response) => {
						localStorage.setItem("hotelAdmins", JSON.stringify(response[0].data));
						localStorage.setItem("hotels", JSON.stringify(response[1].data));
						let hotelAdmins = response[0].data,
							hotels = response[1].data;
						console.log(response);
						setisLoggedin(true);
						sethotelAdmins(hotelAdmins);
						sethotels(hotels);
					})
				)
				.catch((err) => console.log(err));
		});
	};

	const deleteHotel = (hotelId) => {
		axios({
			method: "delete",
			url: baseUrl + "/maintainer/removeHotel/" + hotelId + "/?" + hotelId,
			headers: {
				usertype: this.state.userType,
				usersecret: this.state.secret,
			},
		})
			.then((response) => {
				console.log(response);
				let req1 = axios({
					method: "GET",
					url: baseUrl + "/maintainer/hotelAdmin",
					headers: {
						userType: this.state.userType,
						usersecret: this.state.secret,
					},
				});

				let req2 = axios({
					method: "GET",
					url: baseUrl + "/maintainer/hotel",
					headers: {
						userType: this.state.userType,
						usersecret: this.state.secret,
					},
				});
				axios
					.all([req1, req2])
					.then(
						axios.spread((...response) => {
							localStorage.setItem("hotelAdmins", JSON.stringify(response[0].data));
							localStorage.setItem("hotels", JSON.stringify(response[1].data));
							let hotelAdmins = response[0].data,
								hotels = response[1].data;
							console.log(response);
							setisLoggedin(true);
							sethotelAdmins(hotelAdmins);
							sethotels(hotels);
						})
					)
					.catch((err) => console.log(err));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const hotelWithId = ({ match }) => {
		return (
			<Hotel
				hotel={hotels.filter((hotel) => hotel.id === parseInt(match.params.hotelId, 10))[0]}
			/>
		);
	};

	return (
		<div style={{ minHeight: "100vh", position: "relative" }}>
			<div style={{ paddingBottom: "10rem" }}>
				<Header
					isLoggedin={isLoggedin}
					userType={userType}
					handleLogin={handleLogin}
					handleRegister={handleRegister}
					handleLogout={handleLogout}
				/>
				<Switch>
					<Route
						exact
						path="/"
						component={() => {
							return (
								<Home
									isLoggedin={isLoggedin}
									userInfo={userInfo}
									userType={userType}
									handleSearchHotel={handleSearchHotel}
									availableRooms={availableRooms}
									handleCheckAvailability={handleCheckAvailability}
									deleteHotel={deleteHotel}
									hotelAdmins={hotelAdmins}
									hotels={hotels}
									addHotel={addHotel}
								/>
							);
						}}
					/>
					<Route exact path="/profile" component={<Profile />} />
					<Route
						exact
						path="/searchResults"
						component={() => {
							return (
								<Search
									hotels={searchHotelResults}
									handleSearchHotel={handleSearchHotel}
								/>
							);
						}}
					/>
					<Route exact path="/hotel/:hotelId" component={hotelWithId} />
					<Route exact path="/receptionists" component={AdminReceptionists} />
					<Route exact path="/admins" component={MaintainerHotels} />
					<Route
						exact
						path="/customer/previousBookings"
						component={() => {
							return <PreviousBookings bookings={previousBookings} />;
						}}
					/>
					<Route
						exact
						path="/customer/upcomingBookings"
						component={() => {
							return <UpcomingBooking bookings={upcomingBookings} />;
						}}
					/>
					<Route exact path="/contactus" component={Contactus} />
					<Redirect to="/" />
				</Switch>
			</div>
			<Footer />
		</div>
	);
};
