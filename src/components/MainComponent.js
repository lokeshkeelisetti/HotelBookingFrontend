import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./HeaderComponent";
import { Home } from "./HomeComponent";
import Footer from "./FooterComponent";
import { Hotel } from "./HotelComponent";
import baseUrl from "../shared/baseUrl";
import axios from "axios";
import { Profile } from "./ProfileComponent";
import { AdminReceptionists } from "./AdminReceptionists";
import { MaintainerHotels } from "./MaintainerHotels";
import { PreviousBookings } from "./PreviousBookingComponent";
import { UpcomingBooking } from "./UpcomingBookingsComponent";
import { Contactus } from "./Contactus";

export const Main = () => {
	const [isLoggedin, setisLoggedin] = useState(false);
	const [userType, setuserType] = useState("");
	const [secret, setsecret] = useState("");
	const [userId, setuserId] = useState("");
	const [userInfo, setuserInfo] = useState("");
	const [previousBookings, setpreviousBookings] = useState([]);
	const [upcomingBookings, setupcomingBookings] = useState([]);
	const [hotelAdmins, sethotelAdmins] = useState([]);
	const [hotels, sethotels] = useState([]);
	const [hotelRoomTypes, sethotelRoomTypes] = useState([]);
	const [hotelRooms, sethotelRooms] = useState([]);
	const [receptionists, setreceptionists] = useState([]);

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
		} else if (type === "hotelAdministration") {
			sethotels(userDetails.hotel);
			setuserInfo(userDetails.hotelAdminDetails);
			sethotelRoomTypes(userDetails.hotelRoomTypes);
			sethotelRooms(userDetails.hotelRooms);
			setreceptionists(userDetails.receptionists);
		} else {
			setuserType("");
			setuserId("");
			setsecret("");
			setisLoggedin(false);
		}
	}, []);


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
					let userInfo1, userType1, userId1, secret1;
					userType1 = response.data.type;
					secret1 = response.data.secret;
					userId1 = response.data.id;
					if (userType1 === "maintainer") {
						userInfo1 = response.data.maintainerDetails;

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
									console.log(response);

									setisLoggedin(true);
									setuserType(userType1);
									setuserId(userId1);
									setsecret(secret1);
									setuserInfo(userInfo1);
									sethotelAdmins(response[0].data);
									sethotels(response[1].data);
								})
							)
							.catch((err) => console.log(err));
					} else if (userType1 === "customer") {
						setisLoggedin(true);
						setuserType(userType1);
						setuserId(userId1);
						setsecret(secret1);
						setuserInfo(response.data.customerDetails);
						setpreviousBookings(response.data.pastBookings);
						setupcomingBookings(response.data.upcomingBookings);
						sethotels(response.data.hotels);
						sethotelRoomTypes(response.data.hotelRoomTypes);
						sethotelRooms(response.data.hotelRooms);
					} else if (userType1 === "hotelAdministration") {
						setisLoggedin(true);
						setuserType(userType1);
						setuserId(userType1);
						setuserId(userId1);
						setsecret(secret1);
						setuserInfo(response.data.hotelAdminDetails);
						sethotels(response.data.hotel);
						sethotelRoomTypes(response.data.hotelRoomTypes);
						sethotelRooms(response.data.hotelRooms);
						setreceptionists(response.data.receptionists);
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
				userType: userType,
				usersecret: secret,
			},
		}).then((response) => {
			console.log(response);
			let req1 = axios({
				method: "GET",
				url: baseUrl + "/maintainer/hotelAdmin",
				headers: {
					userType: userType,
					usersecret: secret,
				},
			});

			let req2 = axios({
				method: "GET",
				url: baseUrl + "/maintainer/hotel",
				headers: {
					userType: userType,
					usersecret: secret,
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
						sethotels(hotels);
						sethotelAdmins(hotelAdmins);
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
				usertype: userType,
				usersecret: secret,
			},
		})
			.then((response) => {
				console.log(response);
				let req1 = axios({
					method: "GET",
					url: baseUrl + "/maintainer/hotelAdmin",
					headers: {
						userType: userType,
						usersecret: secret,
					},
				});

				let req2 = axios({
					method: "GET",
					url: baseUrl + "/maintainer/hotel",
					headers: {
						userType: userType,
						usersecret: secret,
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

	const addRoom = (event) => {
		event.preventDefault();
		let hotelRoomTypeId = event.target.elements["roomType"];
		let roomNo = event.target.elements["roomNo"];
		if(hotelRoomTypeId !== 'none'){
			let body = {
				hotelRoomTypeId : hotelRoomTypeId,
				hotelId : hotels._id,
				hotelAdminId : userId,
				roomNo : roomNo
			}

			axios({
				method : "POST",
				url : baseUrl + '/hotelAdministration/addRoom',
				headers : {
					usertype : userType,
					usersecret : secret
				},
				data : body
			})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			})

		}
	}

	const addRoomType = (event) => {
		event.preventDefault();
		let type = event.target.elements["newRoomType"].value;
		let price = event.target.elements["price"].value;
		let ac_or_not = event.target.elements["AC"].checked ? 1 : 0;
		let wifi_or_not = event.target.elements["Wifi"].checked ? 1 : 0;
		let max_no_of_people = event.target.elements["noOfPeople"].value;

		let body = {
			type: type,
			price: price,
			ac_or_not: ac_or_not,
			wifi_or_not: wifi_or_not,
			max_no_of_people: max_no_of_people,
			hotelId: hotels._id,
			hotelAdminId: userId,
		};

		axios({
			method: "POST",
			url: baseUrl + "/hotelAdministration/addHotelType",
			headers: {
				usertype: userType,
				usersecret: secret,
			},
			data: body,
		})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => console.log(err));
	};

	const hotelWithId = ({ match }) => {
		return (
			<Hotel
				hotel={hotels.filter((hotel) => hotel.id === parseInt(match.params.hotelId, 10))[0]}
			/>
		);
	};

	const bookRoom = (startDate, endDate, hotelRoomTypeId, hotelId) => {
		var body = {
			startDate,
			endDate,
			hotelRoomTypeId,
			hotelId,
			customerId: userId,
		};
		var d = new Date(startDate);
		console.log(d);
		console.log(body);
		axios({
			method: "POST",
			url: baseUrl + "/customer/bookRoom",
			headers: {
				"Content-Type": "application/json",
				usertype: userType,
				usersecret: secret,
			},
			data: body,
		})
			.then((response) => {
				if (response.data.success) {
					alert("Room Booked Successfully!");
				}
				console.log(response.data);
			})
			.catch((err) => console.log(err));
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
									deleteHotel={deleteHotel}
									hotelAdmins={hotelAdmins}
									hotels={hotels}
									addHotel={addHotel}
									hotelRoomTypes={hotelRoomTypes}
									hotelRooms={hotelRooms}
									receptionists={receptionists}
									addRoomType = {addRoomType}
									addRoom = {addRoom}
									bookRoom={bookRoom}
								/>
							);
						}}
					/>
					<Route exact path="/profile" component={Profile} />
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
