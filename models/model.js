const mongoose = require('mongoose')
 const db = new mongoose.Schema({
     slug:{
      type:String,
     },
     password:{
         type:String,
     },
     content:{
         type:String,
     },
     image:{
         type:String,
     },
 })

module.exports =  mongoose.model('db_backend',db)