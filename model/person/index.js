let mongoose = require("mongoose");

let personSchema = new mongoose.Schema({
  userId : String,
  projectName : String,
  url : String,
  desc : String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})



let person = mongoose.model('person', personSchema);
module.exports = person
