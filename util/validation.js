

async function validation(ctx,next){
    if(ctx.session.isNew){
        await ctx.render("isOk",{
            status:"请登录"
        });
    }else{
        await next();
    }
    
    
}

module.exports = validation;