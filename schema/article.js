const mongoose = require("mongoose");

const artiSchema = new mongoose.Schema({
    title: String,
    tag: String,
    content: String,
    author: String

    }, {
            versionKey: false,
            timestamps: {
                createdAt: "create",
                updatedAt: "update"
            },
    })

module.exports=artiSchema;