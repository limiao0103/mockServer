const router = require('koa-router')()
let personApiController = require('../controllers/personApi.js');
/**
 * [params api查询]
 * @type {[type]}
 */
router.post('/personApi/list', personApiController.list)

module.exports = router
