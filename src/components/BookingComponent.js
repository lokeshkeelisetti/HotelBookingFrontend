import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class Booking extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            noOfUsers : 1
        }
        this.handleChangeUsers = this.handleChangeUsers.bind(this);
    }

    handleChangeUsers(event){
        console.log(event.target.value)
        this.setState({
            noOfUsers : event.target.value
        })
    }

    render(){

        function RenderForm(props){
            let arr = [];
            for(let i=0;i<parseInt(props.noOfUsers);i++){
                arr.push(i+1);
            }
            return(
                arr.map((time) => {
                    return(
                        <>
                        <h5 className="mt-2">Person {time}</h5>
                        <FormGroup>
                            <Label for={`user${time}name`}>Name</Label>
                            <Input type="text" id={`user${time}name`} />
                        </FormGroup>
                        <FormGroup>
                            <Label for={`user${time}address`}>Address</Label>
                            <Input type="text" id={`user${time}address`} />
                        </FormGroup>
                        <FormGroup>
                            <Label for={`user${time}proof`}>Type of ID proof</Label>
                            <Input type="select" id={`user${time}proof`}>
                                <option selected value="aadhar">Aadhar Card</option>
                                <option value="Passport">Passport</option>
                                <option value="Driving license">Driving License</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for={`user${time}ID`}>Enter ID</Label>
                            <Input type="text" id={`user${time}ID`} />
                        </FormGroup>
                        </>
                    )
                })
            )
        }

        return(
            <Container className="mt-5 mb-5">
                <h3>Booking Form</h3>
                <Form>
                    <FormGroup>
                        <Label className="font-weight-bold" for="noOfUsers">Number of Persons Staying</Label>
                        <Input type="select" name="select" id="noOfUsers"
                            onChange={(value) => this.handleChangeUsers(value)}>
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </Input>
                        <RenderForm noOfUsers = {this.state.noOfUsers}/>
                    </FormGroup>
                    <Button type="submit" className="bg-primary" color="primary">Book Room</Button>
                </Form>
            </Container>
        )
    }
}

export default Booking