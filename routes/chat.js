var express = require('express');
var router = express.Router();
var Message = require('../models/message');


//消息操作
//分页获取数据一对一聊天数据
router.post('/msg',function (req,res,next) {
  //data:uid,fid,nowPage,pageSize
  let nowPage = req.body.nowPage
  let pageSize = req.body.pageSize
  let userId = req.body.id
  let friendId = req.body.friendId
  let skipNum = nowPage*pageSize      //跳过的条数

  let query = Message.find({})
  //查询条件
  query.where({$or:[{'userId':userId,'friendId':friendId},{'userId':friendId,'friendId':userId}]})
  //排序方式 最后通讯时间倒序排列
  query.sort({'time':-1})
  //查找friendId 关联的user对象
  query.populate('userId');
  //跳过条数
  query.skip(skipNum)
  //一页条数
  query.limit(pageSize)
  //查询结果
  query.exec().then(function (e) {
    let result = e.map(function (ver) {
      return {
        id:ver._id,
        message:ver.message,
        time:ver.time,
        types:ver.types,
        fromId:ver.userId._id,
        imgUrl:ver.userId.imgUrl,

      }
    })
    res.json({
      status:"200",
      msg:"",
      result
    })
  }).catch(function (err) {
    res.json({
      status:'500',
      msg:err
    })
  })
})



module.exports = router;
