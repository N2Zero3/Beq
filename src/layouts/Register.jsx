import React, { Component } from 'react';
import {FormGroup,InputGroup,Button,RadioGroup, Radio,Tooltip,Intent} from '@blueprintjs/core';
// import { DateInput } from "@blueprintjs/datetime";
import axios from "axios";


import "./style/register.css";

class RegisterLayOut extends Component {
    state = {
        isLoading:false,
        showPassword:false,
        FirstName:"",
        LastName:"",
        Email:"",
        Password:"", 
        RepeatPassword:"",
        Gender:"MALE",
        BirthDay:"1993/10/07",
        //handle errors
        Error:{
            FirstName:false,
            LastName:false,
            Email:false,
            Password:false
        },
        ErrorMessage:{
            FirstName:"",
            LastName:"",
            Email:"",
            Password:""
        }
    }
    // handle click
    handleLockClick=()=>{
        this.setState({showPassword:!this.state.showPassword})
    }
    // handle functions
    handleGenderChange=(event)=>{
        this.setState({Gender:event.currentTarget.value})
    }
    handleFirstNameChange=(event)=>{
        this.setState({FirstName:event.target.value})
    }
    handleLastNameChange=(event)=>{
        this.setState({LastName:event.target.value})
    }
    handleEmailChange=(event)=>{
        this.setState({Email:event.target.value})
    }
    handlePasswordChange=(event)=>{
        this.setState({Password:event.target.value})
    }
    handleRepeatPasswordChange=(event)=>{
        this.setState({RepeatPassword:event.target.value})
    }
    // handleBirthDayChange=(date,used)=>{
    //     this.setState({BirthDay:date})
    //     console.log(date.format("MM/DD/YYYY"))
    // }

    checkValidate=()=>{
        var isValid  = true;
        this.isValidError={
            FirstName:false,
            LastName:false,
            Email:false,
            Password:false
        };
        
        this.ErrorMessage={
            FirstName:"",
            LastName:"",
            Email:"",
            Password:""
        }
        //FirstName Check
        if(this.state.FirstName ===""){
            this.Error.FirstName = true
            this.ErrorMessage.FirstName="First name cannot be empty"
        } else if(! /^[a-zA-Z ]{2,30}$/.test(this.state.FirstName)){
            this.Error.FirstName = true
            this.ErrorMessage.FirstName="Not valid Name"
        }

        //Check Last Name 
        if(this.state.LastName ===""){
            this.Error.LastName = true
            this.ErrorMessage.LastName="Last name cannot be empty"
        } else if(! /^[a-zA-Z ]{2,30}$/.test(this.state.LastName)){
            this.Error.LastName = true
            this.ErrorMessage.LastName="Not valid Name"
        }

        //Check Email 
        if(this.state.Email ===""){
            this.Error.Email = true
            this.ErrorMessage.Email="Email cannot be empty"
        } else if(! /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(this.state.Email)){
            this.Error.Email = true
            this.ErrorMessage.Email="Not valid Email"
        }

        //Check Password
        if(this.state.Password ===""){
            this.Error.Password = true
            this.ErrorMessage.Password="Password cannot be empty"
        } else if(this.state.Password.length<8){
            this.Error.Password = true
            this.ErrorMessage.Password="Pasword should have at least 8 character"
        }else if(this.state.Password !== this.state.RepeatPassword){
            this.Error.Password = true
            this.ErrorMessage.Password="Paswords are not matched"
        }

        Object.keys(this.Error).map((value)=>{
            if(this.Error[value]){
                isValid = false 
            }
        }

        )
        // Submit Data
        if(isValid){
            this.DataSubmit()
        }
        
        // set State
        this.setState({Error:this.Error,ErrorMessage:this.ErrorMessage})
        
    }

    // get intent 
    getIntent=(feild)=>{
        if(this.state.Error[feild]){
            return "danger"
        }
        console.log(this.state.Error[feild])
        return "primary"
    }

    //Send Request
    DataSubmit=()=> {
        const Request_Body =
            {
                "FirstName":this.state.FirstName,
                "LastName":this.state.LastName,
                "Email":this.state.Email,
                "Password":this.state.Password,
                "Gender":this.state.Gender,
                "BirthDay":"2020/10/10"
            }
        this.setState({isLoading:true})
        axios.post(`http://localhost:8081/Register/Student`, Request_Body).then(response => {
          console.log(response);
          if(response.status === 201){
              console.log("login");
              this.props.history.push("/login");
              this.setState({isLoading:false})
          }
          
        },
        error=>{
            console.log(error);
            console.log(error.data);
            this.setState({isLoading:false}) 
        });
        
      }

    

    render() { 
        const lockButton = (
            <Tooltip content={`${this.state.showPassword ? "Hide" : "Show"} Password`}>
                <Button
                    // disabled={disabled}
                    icon={this.state.showPassword ? "eye-open" : "eye-off"}
                    intent={Intent.WARNING}
                    minimal={true}
                    onClick={this.handleLockClick}
                />
            </Tooltip>
        );

        return (

            <div className="Register-container">
                <div className="image">
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" alt=""/>
                </div>
                <div className="form">
                    <div className="inputs">
                        <h1 className="bp3-heading">Student Register</h1>
                            <FormGroup
                                helperText={this.state.ErrorMessage.FirstName}
                                label="First Name"
                                // labelFor="text-input"
                            >
                                <InputGroup id="text-input" intent={this.getIntent("FirstName")}  placeholder="First Name" value={this.state.FirstName} onChange={this.handleFirstNameChange} />
                            </FormGroup>
                            <FormGroup
                                helperText={this.state.ErrorMessage.LastName}
                                label="Last Name"
                                // labelFor="text-input"
                            >
                                <InputGroup id="text-input" intent={this.getIntent("LastName")} placeholder="Last Name" value={this.state.LastName}  onChange={this.handleLastNameChange} />
                            </FormGroup>
                            <FormGroup
                                helperText={this.state.ErrorMessage.Email}
                                label="Email"
                                // labelFor="text-input"
                            >
                                <InputGroup  intent={this.getIntent("Email")} placeholder="Email" value = {this.state.Email} onChange = {this.handleEmailChange}/>
                            </FormGroup>
                            <FormGroup
                                helperText={this.state.ErrorMessage.Password}
                                label="Password"
                                // labelFor="text-input"
                            >
                                <InputGroup id="text-input" rightElement={lockButton} type={this.state.showPassword ? "text":"password"} intent={this.getIntent("Password")} placeholder="Password" value = {this.state.Password} onChange = {this.handlePasswordChange}/>
                            </FormGroup>
                            <FormGroup
                                // helperText="Helper text with details..."
                                label="Repeat Password"
                                // labelFor="text-input"
                            >
                                <InputGroup id="text-input" type="password" intent={this.getIntent("Password")} placeholder="Repeat Password" value={this.state.RepeatPassword} onChange={this.handleRepeatPasswordChange} />
                            </FormGroup>
                            
                            <RadioGroup
                                label="Gender"
                                inline={true}
                                onChange={this.handleGenderChange}
                                selectedValue={this.state.Gender}
                            >
                                <Radio id="as"  label="Male" value="MALE" />
                                <Radio id="as" label="Female" value="FEMALE" />
                                
                            </RadioGroup>
                            {/* <FormGroup
                                // helperText="Helper text with details..."
                                label="Birth Day"
                                // labelFor="text-input"
                            >
                            <DateInput
                                formatDate={date => date.toLocaleString()}
                                onChange ={this.handleBirthDayChange}
                                parseDate={str => new Date(str)}
                                placeholder={"M/D/YYYY"}
                                value={this.state.BirthDay}
                            />
                            </FormGroup> */}

                            <FormGroup>
                                <Button intent="success" text="Sign In" onClick={this.checkValidate}   loading={this.state.isLoading} />
                            </FormGroup>
                            
                        </div>
                </div>
            </div>
            
            );
    }
}
 
export default RegisterLayOut ;