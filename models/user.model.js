const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: [3, "Username must be at least 3 chareecter long"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: [13, "Email must be at least 3 chareecter long"]
    },
    password : {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: [5, "Password must be at least 3 chareecter long"]
    }
})


const user = mongoose.model("user",userSchema)

module.exports = user