const shaHash = require("../util/encrypt")
const userModel = require("../model/user");

const cookieConfig = {
    domain: "localhost",
    path: "/",
    signed: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: false,
}

async function register(ctx) {
    const user = ctx.request.body;
    const username = user.username,
        password = user.password;
    console.log("username: " + username + "password: " + password);

    try {
        const findRes = await userModel.find({ username: username });
        if (findRes.length > 0) {
            await ctx.render("isOk", {
                status: "用户名已存在"
            });
            return "";
        }

        const encryPass = shaHash(password);
        const userInfo = {
            username: username,
            password: encryPass,
        };
        if(username==="admin"){
            userInfo.power="administrator";
        }
        const uindb = await userModel.create(userInfo);

        ctx.cookies.set("username", username, cookieConfig);
        ctx.cookies.set("_id", uindb._id, cookieConfig);
        //set session after set cookies
        ctx.session = {
            username: username,
            uid: uindb._id,
            avatar: uindb.avatar,
            power:uindb.power
        }

        await ctx.render("isOk", {
            status: "注册成功"
        });



    } catch (err) {
        ctx.render("isOK", {
            status: "注册失败"
        });
    };


}


async function login(ctx) {
    const userInfo = ctx.request.body;
    const username = userInfo.username,
        password = userInfo.password;
    try {
        //search username
        const findRes = await userModel.find({ username: username });
        if (findRes.length === 0) {
            await ctx.render("isOk", {
                status: "用户不存在，请重新登录"
            });
            return;
        }
        //matching password
        const isMatch = findRes[0].password === shaHash(password);

        if (isMatch) {
            ctx.cookies.set("username", username, cookieConfig);
            ctx.cookies.set("uid", findRes[0]._id, cookieConfig);
            //set session after set cookies
            ctx.session = {
                username: username,
                uid: findRes[0]._id,
                avatar: findRes[0].avatar,
                power:findRes[0].power
            }
            await ctx.render("isOk", {
                status: "登陆成功"
            });
        } else {
            await ctx.render("isOk", {
                status: "密码错误请重新输入"
            });
        }

    } catch (err) {
        ctx.render("isOk", {
            status: "登录失败"
        });
    }


}

async function logout(ctx) {
    ctx.session = null;
    ctx.cookies.set("username", null, {
        maxAge: 0,
    });
    ctx.cookies.set("_id", null, {
        maxAge: 0,
    });

    ctx.redirect("/user/login");
}

module.exports.register = register;
module.exports.login = login;
module.exports.logout = logout;