var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
  userId:{type:Schema.Types.ObjectId,ref:'User'},  //用户id
  articleId:{type:Schema.Types.ObjectId,ref:'Article'}, //所收藏的作品id
})

module.exports = mongoose.model('Collection',CollectionSchema)
