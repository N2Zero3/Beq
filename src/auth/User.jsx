class User{
    constructor(user,profile){
        this.ProfileImage = profile
        this.User = user
    }

    getProfile(){
        return this.ProfileImage
    }

} export default User;