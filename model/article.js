const articleSchema = require("../schema/article");
const db = require("../schema/db");

//article model
module.exports=db.model("articles", articleSchema);