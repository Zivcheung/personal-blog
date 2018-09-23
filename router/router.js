const Router = require("koa-router");
const { register, login, logout } = require("../dbControl/userAction");
const {addArticle,getArtiList,articlePage} = require("../dbControl/articleAction");
const {addComment} = require("../dbControl/commentAction");
const admin = require("../dbControl/admin");
const validation = require("../util/validation");
const multerTool = require("../util/multerConfig");


const router = new Router();



router.get('/', async (ctx) => {

    await getArtiList(ctx);
    // await ctx.render("index",{
    //     artList:[],
    //     title:"main"
    // });
});

router.get(/^\/user\/(?=login|register)/, async (ctx) => {
    const show = /register$/.test(ctx.path);

    await ctx.render("register", {
        show: show
    });
});

router.post("/user/login", async (ctx) => {
    await login(ctx);
});

router.post("/user/register", async (ctx) => {
    await register(ctx);
    // ctx.body = ctx.request.body
});
router.get("/user/logout", async (ctx) => {
    await logout(ctx);
});



//article related router
router.get("/article", async (ctx) => {
    await ctx.render("add-article",{
        title:"文章发表页",
        session:ctx.session,
    });
});
    // add article
router.post("/article", async (ctx) => {
    
   await addArticle(ctx);
});
    //get article list
router.get("/page:page",async (ctx)=>{
    await getArtiList(ctx);
});
    //open article 
router.get("/article/:id",async (ctx)=>{
    await articlePage(ctx);
});



//comments related router
router.post("/comment",async (ctx)=>{
    await addComment(ctx);
});

//back stage management 
router.get("/admin/:page",validation,async(ctx)=>{
    await admin.admin(ctx);
});

router.get("/user/articles",async(ctx)=>{
    await admin.adminArticle(ctx);
});
//delete article
router.delete("/article/:id",async(ctx)=>{
    await admin.deleteArticle(ctx);
});

router.get("/user/comments",async(ctx)=>{
    await admin.adminComment(ctx);
});
router.delete("/comment/:id",async(ctx)=>{
    await admin.deleteComment(ctx);
});


router.post("/upload",multerTool.single("file"),admin.iconManage);

// 404 page router
router.get(/.*/,async (ctx)=>{
    await ctx.render("404");
});

module.exports = router;