const {Schema} = require("mongoose");

const user = new Schema({
    username:String,
    password:String
})

module.exports = user;