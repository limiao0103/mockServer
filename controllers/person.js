const personModel = require('../model/person')

module.exports = {
  async create (ctx) {
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
  },
  async update (ctx) {
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
  },

  async list(ctx)  {
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
 },

 async modify(ctx)  {
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
 },

 async delete(ctx)  {
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
 }
}
