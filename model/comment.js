const commentSchema = require("../schema/comment");
const db = require("../schema/db");

//comment model
module.exports=db.model("comments", commentSchema);