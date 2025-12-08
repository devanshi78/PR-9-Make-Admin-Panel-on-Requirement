import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    fullname : {
        type : String
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        unique : true,
    },
    mobileNo : {
        type : Number,
    },
    address : {
        type : String
    },
    image : {
        type : String
    },
    DOB : {
        type : Date
    },
    bio : {
        type : String
    }
},{
    timestamps : true
})

const User = mongoose.model('usermodel',userschema);

export default User;