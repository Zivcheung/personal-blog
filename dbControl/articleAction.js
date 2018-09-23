const artiModel = require("../model/article");
const commentModel = require("../model/comment");


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
    const pageLoad = 3;
    let pageNum = ctx.params.page || 1;//page number start from 1
    pageNum--;
    try {
        const artiList = await artiModel
            .find()
            .sort("-create")
            .skip(pageNum * pageLoad)
            .limit(pageLoad)
            .populate({
                path: "author",
                select: "_id avatar username"
            });
        console.log(sumOfArti);
        await ctx.render("index", {
            artList: artiList,
            session: ctx.session,
            maxNum: sumOfArti
        });

    } catch (err) {
        const errMsg = []
        console.log("article list loading fails");
        console.log(err);
    }


}

async function articlePage(ctx) {
    const articleID = ctx.params.id;
    const userInfo = ctx.session;
    try {
        const artData = await artiModel.findById(articleID)
            .populate({
                path: "author",
                select: "_id username"
            });
        const commentData = await commentModel.find({ article: articleID })
            .sort("-create")
            .populate({
                path:"author",
                select:"avatar username"
            }); 
        await ctx.render("article", {
            article: artData,
            comments: commentData,
            session:userInfo
        });


    } catch (err) {
        console.log(err);
        await ctx.render("isOk", {
            status: err
        });

    }

}

module.exports.addArticle = addArticle;
module.exports.getArtiList = getArtiList;
module.exports.articlePage = articlePage;