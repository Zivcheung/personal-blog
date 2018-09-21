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
            author: userInfo.uid,
        });
        ctx.body = {
            msg: "发表成功",
            status: true,
        }
    } catch (err) {
        ctx.body = {
            msg: "发表失败",
            status: false
        }
    }




}


async function getArtiList(ctx) {
    const sumOfArti = await artiModel.estimatedDocumentCount();
    const pageLoad = 5;
    let pageNum = ctx.params.page||1;//page number start from 1
    console.log(ctx.params.page);
    console.log(22);
    pageNum--;
    try{
        const artiList = await artiModel
        .find()
        .sort("-create")
        .skip(pageNum*pageLoad)
        .limit(pageLoad)
        .populate({
            path:"author",
            select:"_id avatar username"
        });
        console.log(sumOfArti);
        // console.log(artiList);
        await ctx.render("index",{
            artList:artiList,
            session:ctx.session,
            maxNum:sumOfArti
        });
        
    }catch(err){
        const errMsg = []
        console.log("article list loading fails");
        console.log(err);
    }
    
    
}

module.exports.addArticle = addArticle;
module.exports.getArtiList = getArtiList;