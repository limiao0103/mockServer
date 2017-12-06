let mongoose = require("mongoose");

/**
 * [personCreateApiSchema 目录管理]
 * @type {mongoose}
 */
let personApiSchema = new mongoose.Schema({
      userId: String,
      projectId: String,
      apiId: String,
      url: String,
      apiUrl: String,
      apiName: String,
      ContentType: {
        type: String,
        default : 'application/json'
      },
      methods:{
        type: String,
        default : 'GET'
      },
      isMock:{
        type: Number,
        default: 0
      },
      desc: String,
      requestRadio:{
        type: String,
        default : 'edit'
      },
      request: [
        {
          key: String,
          value: {},
          content: String,
          valueMust: String,
          desc: String,
          typeValue: String,
        }
      ],
      responseRadio:{
        type: String,
        default : 'edit'
      },
      response: [
        {
          key: String,
          value: String
        }
      ],
      data:{
        type: String,
        default : ''
      }


})



let personApi = mongoose.model('personApi', personApiSchema);
module.exports = personApi
