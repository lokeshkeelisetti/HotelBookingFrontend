import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import {Input,FormGroup ,Form,Button, Container, Table} from 'reactstrap';
import axios from 'axios';
import baseUrl from '../shared/baseUrl';

function Profile() {
	const [activeTab, setActiveTab] = useState("1");
	const toggle = (tab) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	let userInfo = JSON.parse(localStorage.getItem("userDetails"));
	console.log(userInfo);

	let name, email;


    function changePassword(event){
      event.preventDefault();
      let oldPassword = event.target.elements["oldPassword"].value;
      let newPassword = event.target.elements["newPassword"].value;
      let newConfirmPassword = event.target.elements["newConfirmPassword"].value;

      if(newPassword !== newConfirmPassword){
        setError("newpasswords don't match");
      }
      else{
        let body = {
          oldPassword : oldPassword,
          newPassword : newPassword
        }
        
        let url;
        if(userInfo.type === 'maintainer'){
          url = baseUrl + '/maintainer/changePassword';
        }
        else if(userInfo.type === 'customer'){
          url = baseUrl + '/customer/changePassword';
        }
        else if(userInfo.type === 'receptionist'){
          url = baseUrl + '/receptionist/changePassword';
        }
        else if(userInfo.type === 'hotelAdministration'){
          url = baseUrl + '/hotelAdministration/changePassword';
        }
        
        axios({
          method : "POST",
          url : url,
          headers : {
            usersecret : userInfo.secret,
            usertype : userInfo.type,
            hotelAdminId : userInfo.id,
            receptionistId : userInfo.id,
            customerId : userInfo.id,
            maintainerId : userInfo.id
          },
          body
        })
        .then((response) => {
            if(response.data.success){
              setSuccess(response.data.success);
              setError("");
            }
            else{
              setError(response.data.failure);
              setSuccess("");
            }
        })
        .catch((err) => {
          console.log(err);
        })
      }

    }

    let name,email;

    if(userInfo.type === 'maintainer'){
      name = userInfo.maintainerDetails.name.firstName+' '+userInfo.maintainerDetails.name.lastName;
      email = userInfo.maintainerDetails.email;
    }
    else if(userInfo.type === 'customer'){
      name = userInfo.customerDetails.name.firstName+' '+userInfo.customerDetails.name.lastName;
      email = userInfo.customerDetails.email
    }

    return (
    <>
    <div className="profile__image__div">
      <img src="assets/images/profile.jpg" alt="profile" className="profile__image"/>
    </div>
    <div>
      <Container>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Info
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Change Password
          </NavLink>
        </NavItem>
      </Nav>
      </Container>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Container>
                <Table className="col-md-6">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{email}</td>
                        </tr>
                        
                    </tbody>
                </Table>
                </Container>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
        <Container>
            <Form onSubmit={changePassword}>
                <br />
                <FormGroup>
                    <Input type="password" id="oldPassword" name="oldPassword" placeholder="Enter the old password" className="col-md-6"/>
                </FormGroup>
                <FormGroup>
                    <Input type="password" id="newPassword" name="newPassword" placeholder="Enter the new password" className="col-md-6"/>
                </FormGroup>
                    <Input type="password" id="newConfirmPassword" name="newConfirmPassword" placeholder="Confirm the new password" className="col-md-6"/>
                <FormGroup>
                </FormGroup>
                <Button type="submit" value="submit" className="bg-primary" color="primary">Change Password</Button>
                <p style={{color:'red'}}>{error}</p>
                <p style={{color:'green'}}>{success}</p>
            </Form>
        </Container>
        </TabPane>
      </TabContent>
    <br />
    </div>
    </>
    )
}

export default Profile;
