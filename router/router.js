const Router = require("koa-router");
const router = new Router();

router.get('/', async (ctx) => {
    await ctx.render("./index");
});

router.get(/^\/user\/(?=login|register)/, async (ctx)=>{
    const show = /register$/.test(ctx.path);

    await ctx.render("register",{
        show: show
    });
});


module.exports = router;