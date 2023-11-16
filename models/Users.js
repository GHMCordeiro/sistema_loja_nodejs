import mongoose from 'mongoose'

const users = new mongoose.Schema({
    email: String,
    password: String,
})

export default users