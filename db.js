const mongoose = require('mongoose');

let config = {
  hosts : 'localhost',
  port : '27017',
  project : "mockSever"
}

const db = mongoose.connect(`mongodb://${config.hosts}:${config.port}/${config.project}`);

const dbconnection = () => {
  db.connection.on("open", ()=>{
    console.log("数据库连接成功")
  })
  db.connection.on("error", (error)=>{
    console.log("数据库连接失败"+ error)
  })
}

module.exports = dbconnection
