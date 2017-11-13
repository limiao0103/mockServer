const router = require('koa-router')()
let personProjectController = require('../controllers/personProject.js')

/**
 * [params 创建项目/更新项目]
 * @type {[type]}
 */

router.post('/personProject/create', personProjectController.create)

/**
 * [params 查询项目]
 * @type {[type]}
 */
router.post('/personProject/list', personProjectController.list)


/**
 * [params 创建API]
 * @type {[type]}
 */
router.post('/personProject/create/api', personProjectController.createApi)

module.exports = router
