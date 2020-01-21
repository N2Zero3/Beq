import jwtDecode from 'jwt-decode'
import user from "./user"


class Auth{
  constructor(){
    this.authenticated = false 
    this.user =null
  }

  getProfile(){
    return this.user.ProfileImage
  }

  logOut(callBack){
    this.authenticated= false
    localStorage.setItem('Token',null)
    localStorage.setItem('Profile',null)
    callBack()
  }

  

  isAuthenticated(allowedRoles){
    this.authenticated= true
    let Token = localStorage.getItem('Token')
    try{
      let jwt_Decode = jwtDecode(Token)
      this.user = new user(jwt_Decode)
      // check Expire Time
      if (Date.now() >= jwt_Decode.exp * 1000) {
        this.authenticated = false;
      }
      // check Roles
      if(! allowedRoles.includes(jwt_Decode.Role)){
        this.authenticated = false;
      }
      
    }catch{
      this.authenticated = false;
    }
    return this.authenticated
  }
}
export default new Auth()
