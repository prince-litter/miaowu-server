var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName:String,
  userPwd:String,
  imgUrl:{type:String,default:'public/images/user/head-1.jpg'},
  time:{type:Date}
});

module.exports = mongoose.model('User',userSchema)
