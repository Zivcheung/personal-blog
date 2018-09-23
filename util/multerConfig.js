const multer = require("koa-multer");
const {join} = require("path");

const storage = multer.diskStorage({
    destination:join(__dirname,"../public/avatar/"),
    filename:function (req,file,cb){
        const ext = file.originalname.split(".");
        cb(null,Date.now()+"."+ext[ext.length-1]);
    }
});

module.exports = multer({storage});
