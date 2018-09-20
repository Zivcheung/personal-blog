const userSchema = require("../schema/user");
const db = require("../schema/db");
const shaHash = require("../util/encrypt")

const userModel = db.model("users", userSchema);

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
        const uindb = await userModel.create({
            username: username,
            password: encryPass,
        });

        ctx.cookies.set("username", username, cookieConfig);
        ctx.cookies.set("_id", uindb._id, cookieConfig);
        //set session after set cookies
        ctx.session = {
            username: username,
            _id: uindb._id,
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
            ctx.cookies.set("_id", findRes[0]._id, cookieConfig);
            //set session after set cookies
            ctx.session = {
                username: username,
                _id: findRes[0]._id,
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