const mongoose = require("mongoose");

const artiSchema = new mongoose.Schema({
    title: String,
    tag: String,
    content: String,
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }

    }, {
            versionKey: false,
            timestamps: {
                createdAt: "create",
                updatedAt: "update"
            },
    })

module.exports=artiSchema;