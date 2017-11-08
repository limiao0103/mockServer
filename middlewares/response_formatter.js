/**
 * 在app.use(router)之前调用
 */
let response_formatter = async (ctx, next) => {
      await next();
  //  如果有返回数据，将返回数据添加到data中
    if (ctx.body) {
        ctx.body = {
            code: 1,
            message: 'success',
            data: ctx.body
        }
    } else {
        ctx.body = {
            code: 0,
            message: 'error'
        }
    }

}

module.exports = response_formatter;
