var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  userId:{type:Schema.Types.ObjectId,ref:'User'},
  txt:{type:String},  //文字内容
  imgUrl:{type:Array},   //图片地址
  time:{type:Date},    //发布时间
  type:{type:Number},     //发布类型 0领养 1收养
  classify:{type:Number},     //发布类型 0喵喵 1汪汪
  state:{type:Number}       //发布状态 0 未处理 1 已处理
})

module.exports = mongoose.model('Article',ArticleSchema)
