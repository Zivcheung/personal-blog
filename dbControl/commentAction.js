
const comModel = require("../model/comment");

async function addComment(ctx) {
    const post = ctx.request.body;
    const session = ctx.session;

    try {
        const fb = comModel.create({
            content: post.content,
            article: post.article,
            author: session.uid,
        });

        ctx.body = {
            status:1,
            msg: "comment upload succeed"
        }

    } catch (err) {
        console.log("commentAction: "+ err);
        ctx.body = {
            status: 0,
            msg: "comment upload fails"
        }
    }
}

exports.addComment = addComment;


