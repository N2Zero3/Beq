import jwtDecode from 'jwt-decode'
import user from "./User"


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


  isAuthenticated(){
    this.authenticated= true
    let Token = localStorage.getItem('Token')
    let Profile = localStorage.getItem('Profile')
    try{
      let jwt_Decode = jwtDecode(Token)
      this.user = new user(jwt_Decode,Profile)

      if (Date.now() >= jwt_Decode.exp * 1000) {
        this.authenticated = false;
      }
      console.log(this.user )
    }catch{
      this.authenticated = false;
    }
    return this.authenticated
  }
}
export default new Auth()
