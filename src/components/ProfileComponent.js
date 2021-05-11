import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import {Input,FormGroup ,Form,Button, Container, Table} from 'reactstrap';

function Profile() {

    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
      }

    let userInfo = JSON.parse(localStorage.getItem('userDetails'));
    console.log(userInfo);

    let name,email;

    if(userInfo.type === 'maintainer'){
      name = userInfo.maintainerDetails.name.firstName+' '+userInfo.maintainerDetails.name.lastName;
      email = userInfo.maintainerDetails.email;
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
                <Table class="col-md-6">
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
            <Form>
                <br />
                <FormGroup>
                    <Input type="password" id="oldPassword" placeholder="Enter the old password" className="col-md-6"/>
                </FormGroup>
                <FormGroup>
                    <Input type="password" id="newPassword" placeholder="Enter the new password" className="col-md-6"/>
                </FormGroup>
                    <Input type="password" id="newConfirmPassword" placeholder="Confirm the new password" className="col-md-6"/>
                <FormGroup>
                </FormGroup>
                <Button type="submit" value="submit" className="bg-primary" color="primary">Change Password</Button>
            </Form>
        </Container>
        </TabPane>
      </TabContent>
    <br />
    </div>
    </>
    )
}

export default Profile
