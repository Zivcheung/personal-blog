const {Schema} = require("mongoose");

const user = new Schema({
    username:String,
    password:String,
    avatar:{
        type:String,
        default:"/avatar/default.jpg"
    }
})

module.exports = user;