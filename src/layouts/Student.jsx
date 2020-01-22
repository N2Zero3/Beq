import React, { Component } from 'react';
import "./style/student.css";
import {Popover,InputGroup,Button,ButtonGroup,Classes,Divider,Icon} from '@blueprintjs/core';
import "@blueprintjs/icons"
import logo from "./assets/logo/logo.png"
// import user from "./assets/userProfile/user_01.png"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import auth from './../auth/auth'
import axios from "axios"

class Student extends Component {
    state = { 
        showPopover: false,
        IsLoading:true   
    }
    handleInteraction=(nextOpenState)=> {
        this.setState({ showPopover: nextOpenState });
    }
    
    render() { 
        
        const button = <Icon icon={"inbox"} iconSize={Icon.SIZE_LARGE}/>
        const button2 =<Icon icon={"badge"} iconSize={Icon.SIZE_LARGE}/>
        const button3 =<Icon icon={"layers"} iconSize={Icon.SIZE_LARGE}/>
        const button4 =<Icon icon={"chat"} iconSize={Icon.SIZE_LARGE}/>
        const button5 =<Icon icon={"user"} iconSize={Icon.SIZE_LARGE}/>
         return ( 
            <div className="main-container">
                <nav>
                    <img className="logo" src={logo} />
                    <div className="search-bar">
                        <InputGroup leftIcon="search" style={{background:"#3C4144"}}/>
                    </div>
                    <div className="button-set">
                        <Button id ="search-button" icon="search" minimal="true"></Button>
                        <Button id ="k1" icon={button}    minimal="true"></Button>
                        <Button id ="k1" icon={button2}   minimal="true"></Button>
                        <Button id ="k1" icon={button3}   minimal="true"></Button>
                        <Button id ="k1" icon={button4}   minimal="true"></Button>
                        
                        <Popover
                            interactionKind={"hover"}
                            popoverClassName={Classes.POPOVER_CONTENT_SIZING }
                            isOpen={this.state.showPopover}
                            onInteraction={(state) => this.handleInteraction(state)}
                            >
                            <Button icon={button5}    minimal="true"></Button>
                            <div className="user-details">
                                <div className="user-pic">
                                    <img  src={auth.getProfile()} />
                                    <Button className="user-pic-add" name="showPopover" icon="plus"/>
                                </div>
                                <p><b>Hi!.</b> Kalana . Welcome to the Beq</p>
                                <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: 15 }}>
                                <ButtonGroup minimal={true} fill={true} large={true} >
                                    <Button icon="log-out" onClick={()=>{auth.logOut(
                                        ()=>{
                                            this.props.history.push("/login");
                                        }
                                    )}}/>
                                    <Divider/>
                                    <Button icon="list-detail-view"/>
                                    <Divider/>
                                    <Button icon="stacked-chart"/>
                                </ButtonGroup>
                                </div>
                            </div>
                        </Popover>
                    </div>  
                     
                </nav>
                <div className="container">
                    <div className="side-bar-left">
                        
                        <ul>
                            <li>Home</li>
                            <li>Questions</li>
                            <li>Tags</li>
                            <li>Users</li>
                            <li>Unanswered</li>
                        </ul>
                    </div>
                    <div className="main">
                        <div className="Tag">
                            <h4>Tag</h4>
                        </div>

                    </div>
                    
                </div>
                <div className="footer">
                        
                </div>
                
         </div> )
    }
}
 
export default Student;