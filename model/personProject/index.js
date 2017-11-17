let mongoose = require("mongoose");

/**
 * [personCreateApiSchema 目录管理]
 * @type {mongoose}
 */
let personProjectSchema = new mongoose.Schema({
      userId: String,
      projectId: String,
      items: [
        {
          value: String,
          status: Number,
          menuId: Number,
          children:[
            {
              apiName: String
            }
          ]
        }
      ]
})



let personProject = mongoose.model('personProject', personProjectSchema);
module.exports = personProject
