const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    Name: {
        type: String,
        require: true
    },
    LastName:{
        type: String,
        require: true
    },
    Email:{
        type: String,
        require: true
    },
    Password: {
        type: String,
        require: true

    }

},{timestamps: true})


const User = mongoose.model("user", UserSchema)
module.exports = User