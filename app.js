const Koa = require("koa");
const router = require("./router/router");
const static = require("koa-static");
const views = require("koa-views");
const logger = require("koa-logger");
const {join} = require("path");
const koaBody = require("koa-body");
const koaSession = require("koa-session");
const multer = require("multer");
const compressor = require("koa-compress");

//generate Koa instance
const app = new Koa();

//koaSession
const CONFIG={
    key:"SID",
    maxAge:60*60*1000,
    rolling:true,
}
app.keys = ["mykeymyblog"]
app.use(koaSession(CONFIG,app));

//logger 
app.use(logger());

//compressor
app.use(compressor({
    threshold:1024,
    flush:require("zlib").Z_SYNC_FLUSH
}));

//static folder
app.use(static(join(__dirname,"./public")));

//views
app.use(views(join(__dirname,"views"),{
    extension:"pug"
}));

//body parser 
app.use(koaBody());

//register router into koa middleware
app.use(router.routes());
app.use(router.allowedMethods());


//initiate server
app.listen(3000,()=>{
    console.log("server starting successfully");
});

