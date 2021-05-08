import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class Booking extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [{
                name : '',
                address : '',
                typeOfId : '',
                ID : ''
            }],
            noOfUsers : 1
        }
        this.handleChangeUsers = this.handleChangeUsers.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeTypeId = this.handleChangeTypeId.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
    }

    handleChangeName(index,event){
        console.log(index);
        let user = {
            name : event.target.value,
            address : this.state.users[index].address,
            typeOfId : this.state.users[index].typeOfId,
            ID : this.state.users[index].ID
        }
        this.setState({
            users : [...this.state.users.slice(0,index+1),user,...this.state.users.slice(index+1)]
        })
    }

    handleChangeAddress(index,event){
        let user = {
            name : this.state.users[index].name,
            address : event.target.value,
            typeOfId : this.state.users[index].typeOfId,
            ID : this.state.users[index].ID
        }
        this.setState({
            users : [...this.state.users.slice(0,index+1),user,...this.state.users.slice(index+1)]
        })
    }

    handleChangeTypeId(index,event){
        let user = {
            name : this.state.users[index].name,
            address : this.state.users[index].address,
            typeOfId : event.target.value,
            ID : this.state.users[index].ID
        }
        this.setState({
            users : [...this.state.users.slice(0,index+1),user,...this.state.users.slice(index+1)]
        })
    }

    handleChangeId(index,event){
        let user = {
            name : this.state.users[index].name,
            address : this.state.users[index].address,
            typeOfId : this.state.users[index].typeOfId,
            ID : event.target.value
        }
        this.setState({
            users : [...this.state.users.slice(0,index+1),user,...this.state.users.slice(index+1)]
        })
    }

    handleChangeUsers(event){
        console.log(event.target.value)
        let newUser = {
            name : '',
            address : '',
            typeOfId : '',
            ID : ''
        }
        this.setState({
            noOfUsers : event.target.value,
            users : new Array(parseInt(event.target.value)).fill(newUser)
        })
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state);
    }



    render(){

        function RenderForm(props){
            console.log(props);
            let arr = [];
            for(let i=0;i<parseInt(props.noOfUsers);i++){
                arr.push(i+1);
            }
            return(
                arr.map((time) => {
                    return(
                        <React.Fragment key={time}>
                            <h5 className="mt-2">Person {time}</h5>
                            <FormGroup>
                                <Label for={`user${time}name`}>Name</Label>
                                <Input onChange={(event) => {props.handleChangeName(time-1,event)}} value={props.users[time-1].name} type="text" id={`user${time}name`} />
                            </FormGroup>
                            <FormGroup>
                                <Label for={`user${time}address`}>Address</Label>
                                <Input onChange={(event) => {props.handleChangeAddress(time-1,event)}} value={props.users[time-1].address} type="text" id={`user${time}address`} />
                            </FormGroup>
                            <FormGroup>
                                <Label for={`user${time}proof`}>Type of ID proof</Label>
                                <Input onChange={(event) => {props.handleChangeTypeId(time-1,event)}} value={props.users[time-1].typeOfId} type="select" id={`user${time}proof`}>
                                    <option selected value="aadhar">Aadhar Card</option>
                                    <option value="Passport">Passport</option>
                                    <option value="Driving license">Driving License</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for={`user${time}ID`}>Enter ID</Label>
                                <Input onChange={(event) => {props.handleChangeId(time-1,event)}} value={props.users[time-1].ID} type="text" id={`user${time}ID`} />
                            </FormGroup>
                        </React.Fragment>
                    )
                })
            )
        }

        return(
            <Container className="mt-5 mb-5">
                <h3>Booking Form</h3>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label className="font-weight-bold" for="noOfUsers">Number of Persons Staying</Label>
                        <Input type="select" name="select" id="noOfUsers"
                            onChange={(value) => this.handleChangeUsers(value)}>
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </Input>
                        <RenderForm noOfUsers = {this.state.noOfUsers}
                                    users = {this.state.users}
                                    handleChangeName = {this.handleChangeName}
                                    handleChangeId = {this.handleChangeId}
                                    handleChangeAddress = {this.handleChangeAddress}
                                    handleChangeTypeId = {this.handleChangeTypeId}
                                    />
                    </FormGroup>
                    <Button type="submit" className="bg-primary" color="primary">Book Room</Button>
                </Form>
            </Container>
        )
    }
}

export default Booking