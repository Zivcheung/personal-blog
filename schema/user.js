const {Schema} = require("mongoose");

const user = new Schema({
    power:{
        type:String,
        default:"member"
    },
    username:String,
    password:String,
    avatar:{
        type:String,
        default:"/avatar/default.jpg"
    },
    commentNum:{
        type:Number,
        default:0
    },
    articleNum:{
        type:Number,
        default:0
    }
},{
    versionKey:false,
    timestamps:{
        createdAt:"create",
        updatedAt:"update"
    }
})

module.exports = user;