const userModel = require("../model/user");
const articleModel = require("../model/article");
const commentModel = require("../model/comment");
const fs = require("fs");
const { join } = require("path");


async function admin(ctx) {
    const page = ctx.params.page;
    const userID = ctx.session.uid;

    const fileName = fs.readdirSync(join(__dirname, "../views/admin"));

    //check is the page is valid to our pagename 
    let flag = false;
    fileName.forEach((item, index, arr) => {
        const news = item.replace(/^(?:admin\-)|(?:\.pug)$/g, "");
        if (news === page) flag = true;
    });
    if (flag) {
        await ctx.render("./admin/admin-" + page, {
            session: ctx.session,
        });
    }


}

async function adminArticle(ctx) {
    const userID = ctx.session.uid;
    try {
        const fbData = await articleModel.find({ author: userID })
            .sort("-create");
        ctx.body = {
            code: 0,
            count: fbData.length,
            data: fbData
        }
    } catch (err) {
        console.log(err);
        ctx.body = {
            msg: "table loading fails",
            code: 0,
            count: fbData.length,
            data: fbData
        }
    }
}

async function deleteArticle(ctx) {
    const artiID = ctx.params.id;
    try {
        const fbData = await articleModel.findById(artiID);
        fbData.remove();

        ctx.body = {
            state: true,
            message: "文章已删除"
        }
    } catch (err) {
        console.log(err);
        ctx.body = {
            msg: "table loading fails",
            code: 0,
            count: fbData.length,
            data: fbData
        }
    }
}

//comments ajax
async function adminComment(ctx) {
    const userID = ctx.session.uid;
    try {
        const fbData = await articleModel.find({ author: userID })
            .sort("-create");
        ctx.body = {
            code: 0,
            count: fbData.length,
            data: fbData
        }
    } catch (err) {
        console.log(err);
        ctx.body = {
            msg: "table loading fails",
            code: 0,
            count: fbData.length,
            data: fbData
        }
    }
}
async function adminUser(ctx) {
    await ctx.render("./admin/admin-user", {
        session: ctx.session,
    });

}


async function adminComment(ctx) {
    const userID = ctx.session.uid;
    try {
        const fbData = await commentModel.find({ author: userID })
            .sort("-create");
        console.log(fbData);
        ctx.body = {
            code: 0,
            count: fbData.length,
            data: fbData
        }
    } catch (err) {
        console.log(err);
        ctx.body = {
            msg: "table loading fails",
            code: 0,
            count: fbData.length,
            data: fbData
        }
    }

}

async function deleteComment(ctx) {
    const artiID = ctx.params.id;
    try {
        const fbData = await commentModel.findById(artiID);
        fbData.remove();

        ctx.body = {
            state: true,
            message: "评论已删除"
        }
    } catch (err) {
        console.log(err);
        ctx.body = {
            msg: "table loading fails",
            code: 0,
            count: fbData.length,
            data: fbData
        }
    }
}



async function iconUpload(ctx) {
    const upFile = ctx.req.file.filename;
    console.log(upFile);
    try {
        await userModel.findOneAndUpdate({ _id: ctx.session.uid }, { $set: { avatar: `/avatar/${upFile}` } })
        ctx.session.avatar=`/avatar/${upFile}`;
        ctx.body = {
            message: "上传成功"
        }

    } catch (err) {
        ctx.body = {
            message: err
        }
    }

    // const fd = await fs.writeFile(join(__dirname,"../public/avatar"))

}

module.exports.admin = admin;
module.exports.deleteArticle = deleteArticle;
module.exports.adminComment = adminComment;
module.exports.deleteComment = deleteComment;
module.exports.iconManage = iconUpload;
module.exports.adminArticle = adminArticle;
