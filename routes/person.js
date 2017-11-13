let router = require('koa-router')();
let personController = require('../controllers/person.js');
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '接口测试'
  })
})
/**
 * [params 创建项目/更新项目]
 * @type {[type]}
 */
router.post('/person/create', personController.create)
/**
 * [body 检验项目名称是否重复]
 * @type {Object}
 */
router.post('/person/update',personController.update)

/**
 * [params 获取列表]
 * @type {[type]}
 */
router.get('/person/List', personController.list)

/**
 * [params 修改列表]
 * @type {[type]}
 */
router.post('/person/modify',personController.modify)

/**
 * [exports 删除项目]
 * @type {[type]}
 */

 router.post('/person/delete', personController.delete)
module.exports = router
