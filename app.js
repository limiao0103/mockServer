const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const url = require('url')
const crypto = require('crypto')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const MongoStore = require('koa-generic-session-mongo');
const person = require('./routes/person')
const personApi = require('./routes/personApi')
const personProject = require('./routes/personProject')

const cas = require('@zz-nodejs/koa-cas').newSingleInstance({isTest: true})
const bsp = require('@zz-nodejs/node-bsp').newSingleInstance({isTest: true, appKey: 'xxx', appSecret: 'xxxx'})

/**
 * md5 加密字符串
 * @param str
 * @returns {String}
 */

function MD5 (str) {
  let md5sum = crypto.createHash('md5')
  md5sum.update(str)
  str = md5sum.digest('hex')
  return str
}
app.keys = ['test.58.nodejs.koa.cas.key.qazWSX']
app.use(session({
  key:'test.58.nodejs.koa.cas',
}));

bsp.getUsersByUserName('wangshu02')
.then(user => {
  console.log(user)
})
.catch(err => {
  console.error(err)
})
// app.use(async function (ctx, next) {
//       console.log(ctx)
//       // 处理单一登出。
//       // 如果有用户在其他应用登出，CAS服务会通知当前服务。会返回用户登录的 ticket。
//       let logoutTicket = await cas.handleSingleSignout(ctx)
//       let sessionUser = ctx.session.user
//       let reqURL = url.parse(ctx.url, true)
//       delete reqURL.query.ticket
//       let service = url.format({
//         protocol: ctx.protocol || 'http',
//         host: ctx.get('x-forwarded-host') || ctx.get('host'),
//         pathname: reqURL.pathname,
//         query: reqURL.query
//       })
//
//       // 如果有退出的 ticket，销毁对应 ticket 用户session
//       if (logoutTicket) {
//         await ctx.sessionStore.destroy(MD5(logoutTicket))
//         return (ctx.status = 200)
//       }
//
//       // 用户已经登录
//       if (sessionUser) {
//         await next()
//         return
//       }
//
//       try {
//         // 重定向到CAS服务器登录
//         let authResult = await cas.authenticate(ctx)
//         if (!authResult) {
//           return (ctx.body = 'Cas authenticate authResult Error')
//         }
//
//         /*
//         authResult: {
//           status: Boolean,
//             username: String,
//             extended: {
//               username: String,
//               attributes: {
//                 org_id: String,
//                 employid: String,
//                 id: String,
//                 email: String,
//                 location: String,
//                 gender: String,
//                 realname: String,
//                 leaders: String,
//                 mobile: String,
//                 cityid: String
//               },
//               ticket: String
//             }
//         }
//         */
//         let username = authResult.username
//         let extended = authResult.extended
//         let ticket = extended.ticket
//         let user = Object.assign({}, extended.attributes, {username})
//
//         ctx.session.ticket = ticket
//         ctx.session.user = user
//
//         ctx.sessionId = MD5(ctx.session.ticket)
//
//         return ctx.redirect(service)
//       } catch (err) {
//         console.log('userAuth error : ', err)
//         return (ctx.body = err)
//       }
//     })
onerror(app)


app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'html'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
const response_formatter = require('./middlewares/response_formatter');
const request_formatter = require('./middlewares/request_formatter');
app.use(request_formatter);
app.use(response_formatter);
app.use(person.routes(), person.allowedMethods())
app.use(personProject.routes(), personProject.allowedMethods())
app.use(personApi.routes(), personApi.allowedMethods())



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
