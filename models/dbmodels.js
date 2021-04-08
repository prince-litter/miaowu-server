var mongoose = require('mongoose')
var Schema = mongoose.Schema;

//用户表
var UserSchema = new Schema({
  name:{type:String},
  psw:{type: String},
  imgUrl:{type:String,default:'head-me.jpg'},
  time:{type:Date}
})

//好友表（消息列表）
var FriendSchema = new Schema({
  userId:{type:Schema.Types.ObjectId,ref:'User'},
  friendId:{type:Schema.Types.ObjectId,ref:'User'},
})

//一对一消息表
var MessageSchema = new Schema({
  userId:{type:Schema.Types.ObjectId,ref:'User'},
  friendId:{type:Schema.Types.ObjectId,ref:'User'},
  message:{type:String},
  types:{type:Number},
  time:{type:Date},
  state:{type:Number}
})


//
// module.exports = mongoose.model('User',UserSchema)
// module.exports = mongoose.model('Friend',FriendSchema)
// module.exports = mongoose.model('Message',MessageSchema)
