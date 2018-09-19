const Koa = require("koa");
const router = require("./router/router");
const static = require("koa-static");
const views = require("koa-views");
const logger = require("koa-logger");
const {join} = require("path");

//generate Koa instance
const app = new Koa();

//logger 
app.use(logger());

//static folder
app.use(static(join(__dirname,"public")));

//views
app.use(views(join(__dirname,"views"),{
    extension:"pug"
}));

//register router into koa middleware
app.use(router.routes());
app.use(router.allowedMethods());


//initiate server
app.listen(3000,()=>{
    console.log("server starting successfully");
});

