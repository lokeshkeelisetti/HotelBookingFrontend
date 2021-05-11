import React from "react";
import { Input, FormGroup, Form, Button } from "reactstrap";

function Contactus() {
	return (
		<>
			<br />
			<br />
			<br />

			<div style={{ textAlign: "center" }}>
				<p>Contactus via phone or email</p>
				<i className="fa fa-phone fa-lg"></i>: +852 1234 5678
				<br />
				<i className="fa fa-envelope fa-lg"></i>:{" "}
				<a href="mailto:confusion@food.net">hotels@india.net</a>
				<br />
				<br />
				<p>write a query we will respond</p>
				<Form className="col-md-8">
					<br />
					<FormGroup>
						<Input type="text" id="namePerson" placeholder="please Enter your name" />
					</FormGroup>
					<FormGroup>
						<Input type="text" id="personEmail" placeholder="please Enter your Email" />
					</FormGroup>
					<Input type="password" id="query" placeholder="please enter your query" />
					<FormGroup></FormGroup>
					<Button type="submit" value="submit" className="bg-primary" color="primary">
						Submit
					</Button>
				</Form>
			</div>
		</>
	);
}

export default Contactus;