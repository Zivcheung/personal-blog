const mongoose = require("mongoose");

//models

const userModel = require("../model/user");




const commentSchema = new mongoose.Schema({
    content: String,
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "articles"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {
        versionKey: false,
        timestamps: {
            createdAt: "create",
            updatedAt: "update"
        }
    });

// middleware hook
// commentSchema.post("save",async (doc)=>{
//     const userID = doc.author;
//     const articleID = doc._id;

//     try {
//         await userModel.findById(userID)
//             .updateOne({ $inc: { articleNum: -1 } })

//         await commentModel.find({article:articleID}).remove();
//     } catch (err) {
//         console.log("comment remove hooks: " + err)
//     }
// });

commentSchema.post("save", async (doc) => {
    const artiModel = require("../model/article");
    const articleID = doc.article;
    const userID = doc.author;
    try {
        await artiModel.findById(articleID)
            .updateOne({ $inc: { commentNum: 1 } });

        await userModel.findById(userID)
            .updateOne({ $inc: { commentNum: 1 } })
    } catch (err) {
        console.log("comment save hooks: " + err)

    }
});

commentSchema.post("remove", async (doc) => {
    const artiModel = require("../model/article");
    const articleID = doc.article;
    const userID = doc.author;

    try {
        await artiModel.findById(articleID)
            .updateOne({ $inc: { commentNum: -1 } });
        await userModel.findById(userID)
            .updateOne({ $inc: { commentNum: -1 } })
    } catch (err) {
        console.log("comment remove hooks: " + err)
    }
});

module.exports = commentSchema;
