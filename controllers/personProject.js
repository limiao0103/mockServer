const personProjectModel = require('../model/personProject')
const personApi = require('../model/personApi')



module.exports = {
  async create(ctx) {
      let params = Object.assign(
         ctx.request.body ,
         ctx.userId
      )
      let res = await personProjectModel.findOne({ projectId: params.projectId })
      if (res != null) {
         let doc = await personProjectModel.findOneAndUpdate({ projectId: params.projectId }, {items:params.items}, {new :true})
         if ( doc._id ){
           ctx.body = doc.items
         }
      } else {
        let res = await personProjectModel.create(params)
        ctx.body = res.items
      }

  },
  async list(ctx)  {
      let params = Object.assign(
         ctx.request.body ,
         ctx.userId
      )
      console.log(params,'params')
      let res = await personProjectModel.findOne(params)
      if(res != null){
        ctx.body = res
      }else{
        ctx.body = []
      }

  },
  async createApi(ctx)  {
      let projectId =  ctx.request.body.projectId
      //选择目录
      let modelValue = ctx.request.body.modelValue
      let res = await personProjectModel.findOne({projectId})

      let newParams = Object.assign({},
        Object.create(Object.getPrototypeOf(ctx.request.body))
        ,ctx.request.body
      );

      delete newParams.modelValue
      delete newParams.projectId
      if (res.items.length) {
        let flag = false;
        res.items.forEach((item) => {
          if(item.menuId == modelValue){
            item.children.push(newParams)
            flag = true
            return false
        }
      })
      if (flag){
        let doc = await personProjectModel.create(res)
        //创建生成新的ID
        let apiId = ''
        doc.items.forEach((item) => {
          if (item.menuId == modelValue) {
             item.children.forEach((child) => {
                apiId = child._id
                return false
             })
          }
        })

        //创建api
        let newApi = Object.assign({},
          { apiId },
          { request: { key: '' , value: '' } },
          { response: { key: '' , value: '' } },
          Object.create(Object.getPrototypeOf(ctx.request.body))
          ,ctx.request.body
        );
        let result = await personApi.create(newApi)
        if(result._id){
           ctx.body = doc.items
        }else{
          ctx.body = ''
        }
      }
    }
  }
}
