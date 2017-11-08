const router = require('koa-router')()
const personModel = require('../model/person')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '接口测试'
  })
})
/**
 * [params 创建项目/更新项目]
 * @type {[type]}
 */
router.post('/person/create', async (ctx, next) => {
    let params = Object.assign(
       ctx.request.body ,
       ctx.userId
    )
    let newParams = Object.assign({},
      Object.create(Object.getPrototypeOf(params))
      ,params);
    delete newParams._id
    try{
      if (ctx.request.body._id) {
        let res = await personModel.findByIdAndUpdate(ctx.request.body._id, newParams)
      }else{
        let res = await personModel.create(newParams)
      }
      ctx.body = 'success'

    }
    catch(e) {
      console.log(e)
    }

})
/**
 * [body 检验项目名称是否重复]
 * @type {Object}
 */
router.post('/person/update', async (ctx, next) => {
    let params = Object.assign(
       ctx.request.body ,
       ctx.userId
    )
    try{
      let res = await personModel.findOne(params)
      res ? ctx.body = '' : ctx.body = 'success'
    }
    catch(e){
      console.log(e)
    }
})

/**
 * [params 获取列表]
 * @type {[type]}
 */
router.get('/person/List', async (ctx, next) => {
    let params = Object.assign(
       ctx.userId
    )
    try{
      let res = await personModel.find(params)
      res ? ctx.body = res.reverse() : ctx.body = ''
    }
    catch(e){
      console.log(e)
    }
})

/**
 * [params 修改列表]
 * @type {[type]}
 */
router.post('/person/modify', async (ctx, next) => {
    let params = Object.assign(
       ctx.userId,
       ctx.request.body
    )
    try{
      let res = await personModel.findOne(params)
      res ? ctx.body = res : ctx.body = ''
    }
    catch(e){
      console.log(e)
    }
})

/**
 * [exports 删除项目]
 * @type {[type]}
 */

 router.post('/person/delete', async (ctx, next) => {
     let params = Object.assign(
        ctx.request.body
     )
     try{
       let res = await personModel.remove(params)
       res ? ctx.body = res : ctx.body = ''
     }
     catch(e){
       console.log(e)
     }
 })
module.exports = router
