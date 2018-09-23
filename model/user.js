const userSchema = require("../schema/user");
const db = require("../schema/db");

//user model
module.exports=db.model("users", userSchema);