var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var storeSchema = new Schema({
  storeId:String,
  storeName:String,
  storeAddress:String,
  storeImage:String,
  storeInfo:[
    {
      start:Number,
      tel:String,
      startTime:String,
      endTime:String,
      goodsInfo:[
        {
          goodId:String,
          goodImage:String,
          goodName:String,
          goodPrice:Number,
          goodNum:Number
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Store',storeSchema)
