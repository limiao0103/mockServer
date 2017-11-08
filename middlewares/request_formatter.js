/**
 * 在app.use(router)之前调用
 */
let request_formatter = async (ctx, next) => {
    //先去执行路由
    ctx.session.user = {
     org_id: '201509041522224164c741',
     employid: '41618',
     id: '20161025142200093c8053',
     email: 'zhangzhen09@58ganji.com',
     location: '北京-A5楼',
     gender: '1',
     realname: '张振',
     leaders: '201503311435372c775d71',
     mobile: '18241756780',
     cityid: '1',
     username: 'zhangzhen09'
    }

    ctx.userId = {
      userId :ctx.session.user.id
    }
    await next();



}

module.exports = request_formatter;
