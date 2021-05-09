import React, { useState } from 'react'
import hoteladmins from '../shared/hoteladmins';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import {Input,FormGroup ,Form,Button, Container, Table} from 'reactstrap';


function MaintainerHotels() {
    
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return ( 
        <>
        <Nav tabs className="mt-5">
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
                    Add new hotel
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
                        <th>Admin id</th>
                        <th>Name</th>
                        <th>Hotel Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {hoteladmins.map((hoteladmin) => {
                        return (
                        <tr>
                            <td>{hoteladmin.id}</td>
                            <td>{hoteladmin.name}</td>
                            <td>{hoteladmin.hotelName}</td>
                            <td>{hoteladmin.email}</td>
                            <td><span class="fa fa-trash"></span></td>
                        </tr>
                        )
                    })}
                    
                </tbody>
            </Table>
            <br />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
            <Container>
                <Form>
                    <br />
                    <FormGroup>
                        <Input type="text" id="FirstNameOfAdmin" placeholder="enter first name of admin" className="col-md-6"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" id="LastNameOfAdmin" placeholder="enter last name of admin" className="col-md-6"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" id="NameofHotel" placeholder="enter name of hotel" className="col-md-6"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="email" id="EmailOfAdmin" placeholder="enter email of admin" className="col-md-6"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" id="HotelCity" placeholder="enter Hotel city" className="col-md-6"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" id="HotelStreet" placeholder="enter Hotel street" className="col-md-6"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" id="HotelPincode" placeholder="enter Hotel pincode" className="col-md-6"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" id="adminPassword" placeholder="password for Hotel admin" className="col-md-6"/>
                    </FormGroup>
                    <Button type="submit" value="submit" className="bg-primary" color="primary">Add hotel</Button>
                </Form>
                <br />
                <br />
            </Container>
        </TabPane>
        </TabContent>
        </>
    )
}

export default MaintainerHotels
