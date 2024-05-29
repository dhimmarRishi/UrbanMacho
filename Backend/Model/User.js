const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        min : 4,
        max : 40
    },
    lastName : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required: true,
        min : 8,
        max : 12,
    },
    
})

const User = mongoose.model("User" , userSchema);

module.exports = {
    User
}

