const mongoose = require("mongoose");

const db = mongoose.createConnection("mongodb://localhost:27017/personal-blog",{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = db;