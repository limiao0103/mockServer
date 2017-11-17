const personApi = require('../model/personApi')

module.exports = {
  //查询API
  async list(ctx){
      let params = Object.assign(
           ctx.request.body
          //  ctx.userId
    )
    let res = await personApi.findOne(params)
    ctx.body = res
  }
}
