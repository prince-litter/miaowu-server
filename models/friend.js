var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var FriendSchema = new Schema({
  userId:{type:Schema.Types.ObjectId,ref:'User'},
  friendId:{type:Schema.Types.ObjectId,ref:'User'},
  lastTime:{type:Date}             //最后通讯时间
})

module.exports = mongoose.model('Friend',FriendSchema)
