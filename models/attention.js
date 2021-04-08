var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var AttentionSchema = new Schema({
  userId:{type:Schema.Types.ObjectId,ref:'User'}, //用户id
  focusedId:{type:Schema.Types.ObjectId,ref:'User'},//关注的用户的id
})

module.exports = mongoose.model('Attention',AttentionSchema)
