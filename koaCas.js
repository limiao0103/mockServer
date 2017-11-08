/**!
 * koa58 - index.js
 *
 * MIT Licensed
 *
 * Authors: zhangzhen
 * rtx: zhangzhen09
 *
 */

'use strict';

/**
 * 测试环境 配置
 * @type {{baseUrl: string, validateTicketUrl: string, secureSSL: boolean}}
 */
const TESTING_OPTIONS = {
  // 基础 URL
  baseUrl: 'https://sso.test.58.com:8443/gsso',
  // 验证 Ticket URL
  validateTicketUrl: 'https://sso.test.58.com:8443/gsso',
  // 是否开启 https 认证
  secureSSL: false
}

/**
 * 线上环境 配置
 * @type {{baseUrl: string, validateTicketUrl: string, secureSSL: boolean}}
 */
const PRODUCTION_OPTIONS = {
  // 基础 URL
  baseUrl: 'https://passport.58corp.com',
  // 验证 Ticket URL
  validateTicketUrl: 'http://passport.web.58dns.org',
  // 是否开启 https 认证
  secureSSL: true
}
class Cas {
  constructor(options){
    console.log(options)
    this.name = 'zhangzhen'
  }
}

module.exports = new Cas();
