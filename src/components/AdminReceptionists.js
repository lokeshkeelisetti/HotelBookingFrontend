import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from "reactstrap";
import classnames from "classnames";
import { Input, FormGroup, Form, Button, Container, Table } from "reactstrap";

export const AdminReceptionists = ({receptionists}) => {
	const [activeTab, setActiveTab] = useState("1");

	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	return (
		<div>
			{/* Using tabs for navigation of details and editing receptionists */}
			<Nav tabs className="mt-5">
				<NavItem>
					<NavLink
						className={classnames({ active: activeTab === "1" })}
						onClick={() => {
							toggle("1");
						}}
					>
						Info
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className={classnames({ active: activeTab === "2" })}
						onClick={() => {
							toggle("2");
						}}
					>
						Add new receptionist
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent activeTab={activeTab}>
				<TabPane tabId="1">
					<Row>
						<Col sm="12">
							<br />
							<Table className="col-md-8 offset-md-2">
								<thead>
									<tr>
										<th>receptionists id</th>
										<th>Name</th>
										<th>Email</th>
										<th>Edit</th>
									</tr>
								</thead>
								<tbody>
									{receptionists.map((receptionist) => {
										return (
											<tr>
												<td>{receptionist.id}</td>
												<td>{receptionist.name}</td>
												<td>{receptionist.email}</td>
												<td>
													<span class="fa fa-trash"></span>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
							<br />
						</Col>
					</Row>
				</TabPane>
				<TabPane tabId="2">
					<Container>
						<br />
						<br />
						{/* Form for adding recpetionist */}
						<Form>
							<FormGroup>
								<Input
									type="text"
									id="receptionistFirstName"
									placeholder="enter first name of receptionist"
									className="col-md-6"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="text"
									id="receptionistLastName"
									placeholder="enter last name of receptionist"
									className="col-md-6"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="email"
									id="receptionistEmail"
									placeholder="enter email of receptionist"
									className="col-md-6"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="password"
									id="receptionistPassword"
									placeholder="enter password for receptionist"
									className="col-md-6"
								/>
							</FormGroup>
							<Button
								type="submit"
								value="submit"
								className="bg-primary"
								color="primary"
							>
								Add hotel
							</Button>
						</Form>
					</Container>
				</TabPane>
			</TabContent>

			<br />
		</div>
	);
};
