const schema = require("../schema/article");
const db = require("../schema/db");

//create article model for mongoose
const artiModel = db.model("articles", schema);

async function addArticle(ctx) {
    if (ctx.session.isNew) {
        ctx.body = {
            msg: "用户未登录!!",
            status: false,
        };
    }

    const userInfo = ctx.session;

    const article = ctx.request.body;

    try {
        const savemsg = await artiModel.create({
            title: article.title,
            tag: article.tips,
            content: article.content,
            author: userInfo.username,
        });

        ctx.body={
            msg:"发表成功",
            status:true,
        }
    } catch (err) {
        ctx.body={
            msg:"发表失败",
            status:false
        }
    }




}


module.exports.addArticle = addArticle;