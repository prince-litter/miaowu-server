var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Stores = require('../models/medic-store');

//链接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/miaowu-data',{ useNewUrlParser: true , useUnifiedTopology: true});

mongoose.connection.on("connected",function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error",function () {
  console.log("MongoDB connected fail.")

});

mongoose.connection.on("disconnected",function () {
  console.log("MongoDB connected disconnected.")

});

router.get('/',function (req,res,next) {
  //删除数据
  // Stores.remove({},function (err,ret) {
  //   if(err){
  //     console.log(err)
  //   }else{
  //     console.log(ret)
  //     res.send('删除成功')
  //   }
  // })
  //添加数据
  // res.send('hello stores')
  // new Stores({
  //   storeId:'100003',
  //   storeName: '仁华宠物医院',
  //   storeAddress: '文家场口站公交站140m',
  //   storeImage: 'public/images/medic-list/head3.jpg',
  //   storeInfo: [
  //     {
  //       start:3,
  //       tel:'13808044393',
  //       startTime:'8:00',
  //       endTime:'23:00',
  //       goodsInfo: [
  //         {
  //           goodId:'600004',
  //           goodImage:'public/images/medic-shop/head1.png',
  //           goodName: '犬猫美容',
  //           goodPrice: 30,
  //           goodNum: 0
  //         },
  //         {
  //           goodId:'600005',
  //           goodImage:'public/images/medic-shop/head2.png',
  //           goodName: '犬猫疫苗',
  //           goodPrice: 100,
  //           goodNum: 0
  //         }
  //
  //
  //       ]
  //     }
  //   ]
  // }).save(function (err,ret) {
  //   if(err){
  //     console.log(err)
  //   }else{
  //     console.log(ret)
  //   }
  // })
  //查询所有数据
  Stores.find({},function (err,doc,next) {
    if(err){
      res.json({
        status:'500',
        message:err.message
      })
    }else {
      res.json({
        status: '200',
        message: '',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })

})

module.exports = router;
