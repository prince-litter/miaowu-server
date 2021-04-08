var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PraiseSchema = new Schema({
  userId:{type:Schema.Types.ObjectId,ref:'User'},  //用户id
  articleId:{type:Schema.Types.ObjectId,ref:'Article'}, //所点赞的作品
  authorId:{type:Schema.Types.ObjectId,ref:'User'},//作者id
})

module.exports = mongoose.model('Praise',PraiseSchema)
