import React, { Component } from 'react';

// import AdminLayout from "layouts/Admin.jsx";
import  LoginLayOut  from "layouts/Login.jsx";
import RegisterLayOut from "layouts/Register.jsx";
import Student from "layouts/Student.jsx"
import { ProtectedRoute } from  "auth/privateRoute"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


import Page404 from './../pages/404'



class RouteManager extends Component {
    state = {  }
    render() { 
        return ( <BrowserRouter>
            <Switch>
                <Route path="/Register" render={props => <RegisterLayOut {...props}/>} />
            
                <Route path="/login" render={props => <LoginLayOut {...props}/>} />

                <ProtectedRoute allowRoles={['STUDENT', 'ADMIN']} exact path="/" component={Student} redirectPath="./login"  />
                <Route path="*" component={Page404} />
              
              
            </Switch>
          </BrowserRouter> );
    }
}
 
export default RouteManager;