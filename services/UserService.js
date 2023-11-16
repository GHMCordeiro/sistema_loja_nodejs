import mongoose from "mongoose";
import users from "../models/Users.js"

const User = mongoose.model("users", users);

class UserService{
    Create(email, password) {
        const newUser = new User({
            email: email,
            password: password
        })
        newUser.save()
    }
    
    GetAll() {
        const users = User.find()
        return users
    }

    GetOne(email) {
        const user = User.findOne({email: email})
        return user
    }
}

export default new UserService