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
              {/*<Route path="/" render={props => (localStorage.getItem('Token')  ?(<AdminLayout {...props} />):( <LoginLayOut {...props} />))} /> */}
             
              {/* <Route path="/admin" render={props => <AdminLayout {...props} />} />
              <Redirect from="/" to="/admin/dashboard" /> */}

               {/* <Route exact path="/" component={LandingPage} /> */}
                <Route path="/login" render={props => <LoginLayOut {...props}/>} />
                <ProtectedRoute exact path="/" component={Student} />
                <Route path="*" component={Page404} />
              
              
            </Switch>
          </BrowserRouter> );
    }
}
 
export default RouteManager;