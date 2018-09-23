const mongoose = require("mongoose");
const userModel = require("../model/user");
const commentModel = require("../model/comment");

const artiSchema = new mongoose.Schema({
    title: String,
    tag: String,
    content: String,
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    commentNum:{
        type:Number,
        default:0
    },


    }, {
            versionKey: false,
            timestamps: {
                createdAt: "create",
                updatedAt: "update"
            },
    })

//middleware hook
artiSchema.post("save",async (doc)=>{
    const userID = doc.author;

    try {
        await userModel.findById(userID)
            .updateOne({ $inc: { articleNum: 1 } })
    } catch (err) {
        console.log("comment remove hooks: " + err)
    }
});

artiSchema.post("remove",async (doc)=>{
    const userID = doc.author;
    const articleID = doc._id;

    try {
        await userModel.findById(userID)
            .updateOne({ $inc: { articleNum: -1 } })
        
        await commentModel.find({article:articleID}).remove();
    } catch (err) {
        console.log("comment remove hooks: " + err)
    }
});

module.exports=artiSchema;