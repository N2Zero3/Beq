import React, { Component } from 'react';
import "./style/login.css";
import {FormGroup,InputGroup,Button,Checkbox,Intent,Tooltip} from '@blueprintjs/core';
import axios from "axios";
import auth from "./../auth/auth"

import Regex from "./util/regax"

export default class LoginLayOut extends Component {
    state = { 
        isLoading: false,
        UserName:"",
        Password:"",
        showPassword:false,
        Error:{
            UserName:false,
            Password:false
        },
        ErrorMessage:{
            UserName:"",
            Password:""
        }
    }
    // handle Functions 
    handleUserNameChange=(event)=>{
        this.setState({UserName:event.target.value})
    }

    handlePasswordChange=(event)=>{
        this.setState({Password:event.target.value})
    }

    handleLock=()=>{
        this.setState({showPassword:!this.state.showPassword})
    }

    Verify=()=>{
        let isValid= true;

        let Error={
            UserName:false,
            Password:false
        }
        let ErrorMessage={
            UserName:"",
            Password:""
        }
        //Check Email 
        if(this.state.UserName ===""){
            Error.UserName = true
            ErrorMessage.UserName="Email cannot be empty"
        } else if(! Regex.Email.test(this.state.UserName)){
            Error.UserName = true
            ErrorMessage.UserName="Not valid Email"
        }

        //Check Password
        if(this.state.Password ===""){
            Error.Password = true
            ErrorMessage.Password="Password cannot be empty"
        } else if(this.state.Password.length<8){
            Error.Password = true
            ErrorMessage.Password="Pasword should have at least 8 character"
        }

        //check form input errors
        Object.keys(Error).map((value)=>{
            if(Error[value]){
                isValid = false 
            }
        })

        // Submit Data
        if(isValid) {
            this.DataSubmit()
        }

        // set State
        this.setState({Error:Error,ErrorMessage:ErrorMessage})
    }

    // get intent 
    getIntent=(feild)=>{
        if(this.state.Error[feild]){
            return "danger"
        }
        return "primary"
    }

    //Send Request
    DataSubmit=()=> {
        const Request_Body =
            {
                "UserName":this.state.UserName,
                "Password":this.state.Password
            }
        this.setState({isLoading:true})
        axios.post(`http://localhost:8081/Student/Login`, Request_Body).then(response => {
            console.log(response);
            if(response.status === 200){
                console.log("login");
                console.log(response);
                localStorage.setItem('Token', 
                    response.data.token);
                localStorage.setItem('Profile', 
                    response.data.Profile);
                this.props.history.push("/");
                this.setState({isLoading:false})
          }
        },
        error=>{
            console.log(error);
            console.log(error.data);
            this.setState({isLoading:false}) 
        });
        
      }
    componentWillMount(){
        if(auth.isAuthenticated()){
            this.props.history.push("/");
        }
    }


    render() { 
        const lockButton = (
            <Tooltip content={`${this.state.showPassword ? "Hide" : "Show"} Password`}>
                <Button
                    // disabled={disabled}
                    icon={this.state.showPassword ? "eye-open" : "eye-off"}
                    intent={Intent.WARNING}
                    minimal={true}
                    onClick={this.handleLock}
                />
            </Tooltip>
        );

            return (
                <div className="sign-in">
                    <div className="form1">
                        <div className="logo">
                            <img src={require('./../assets/img/login/student.png')} width="100%" alt=""/>
                        </div>
                        <div className="inputs">
                            <h4 class="bp3-heading">LOGIN</h4>
                            <FormGroup
                                helperText={this.state.ErrorMessage.UserName}
                                label="User Name"
                                // labelFor="text-input"
                            >
                                <InputGroup id="text-input" placeholder="User Name" intent={this.getIntent("UserName")} value={this.state.UserName}  onChange={this.handleUserNameChange} />
                            </FormGroup>
                            <FormGroup
                                helperText={this.state.ErrorMessage.Password}
                                label="Password"
                                // labelFor="text-input"
                            >
                                <InputGroup id="text-input"  intent={this.getIntent("Password")} placeholder="Password" value={this.state.Password} type={this.state.showPassword ? "text":"password"} onChange={this.handlePasswordChange} rightElement={lockButton} />
                            </FormGroup>
                            <FormGroup>
                                <Checkbox checked={true} label="Remember Me"  />
                            </FormGroup>

                            <FormGroup>
                                <Button intent="primary" text="Sign In" fill={true} onClick={this.Verify}  loading={this.state.isLoading} />
                            </FormGroup>
                            
                        </div>
                        <div className="linkContainer">
                                <div className="link">
                                    <a  href="/Student/Register">Register</a>
                                </div>
                                <div className="link">
                                    <a href="/Register">Forget Your Password</a>
                                </div>
                                
                                
                        </div>
                        
                    </div>
                    <div className="footer"> All copyright reserve , 2020 Beq  </div>
                </div>
            );
    }
}