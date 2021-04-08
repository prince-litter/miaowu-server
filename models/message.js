var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  userId:{type:Schema.Types.ObjectId,ref:'User'},
  friendId:{type:Schema.Types.ObjectId,ref:'User'},
  message:{type:String},
  types:{type:Number},
  time:{type:Date},
  state:{type:Number}
})

module.exports = mongoose.model('Message',MessageSchema)
