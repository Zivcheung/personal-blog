const Router = require("koa-router");
const { register, login, logout } = require("../dbControl/userAction");
const {addArticle} = require("../dbControl/articleAction");


const router = new Router();



router.get('/', async (ctx) => {

    await ctx.render("./index", {
        session: ctx.session,
    });
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
    });
});
    // add article
router.post("/article", async (ctx) => {
   await addArticle(ctx);
});

module.exports = router;