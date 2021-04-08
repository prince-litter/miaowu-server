var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  userId:{type:Schema.Types.ObjectId,ref:'User'}
});

module.exports = mongoose.model('Article',articleSchema)
