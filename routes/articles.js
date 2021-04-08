var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var Praise = require('../models/praise');
var Collection = require('../models/collection');

//添加发布消息
router.post('/add',function (req,res,next) {
  let param = {
    userId:req.body.id,
    txt:req.body.txt,
    imgUrl:req.body.imgUrl,
    time:new Date(),
    type:req.body.type,
    classify:req.body.classify,
    state:req.body.state
  }
  let article = new Article(param)
  article.save(function (err,doc) {
    if(err){
      res.json({
        status:'500',
        msg:err.message
      })
    }
    else {
      res.json({
        status:'200',
        msg:'成功'
      })
    }
  })

})

//查找所有的发布消息(最新消息)
router.get('/getAll',function (req,res,next) {
  let query = Article.find({})
  //查询条件
  query.where({})
  //查找userId 关联的user对象
  query.populate('userId');
  //排序方式 最后通讯时间倒序排列
  query.sort({'time':-1})
  //查询结果
  query.exec().then(function (e) {
    let result = e.map(function (ver) {
      return {
        id:ver._id,
        userId:ver.userId._id,
        name:ver.userId.userName,
        imgUrl:ver.userId.imgUrl,
        tex:ver.txt,
        imgArr:ver.imgUrl,
        type:ver.type,
        classify:ver.classify,
        state:ver.state,
        time:ver.time
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

//查找发布的领养Dog信息
router.get('/getLyDog',function (req,res,next) {
  let query = Article.find({})
  //查询条件
  query.where({type:0,classify:1})
  //查找userId 关联的user对象
  query.populate('userId');
  //排序方式 最后通讯时间倒序排列
  query.sort({'time':-1})
  //查询结果
  query.exec().then(function (e) {
    let result = e.map(function (ver) {
      return {
        id:ver._id,
        userId:ver.userId._id,
        name:ver.userId.userName,
        imgUrl:ver.userId.imgUrl,
        tex:ver.txt,
        imgArr:ver.imgUrl,
        type:ver.type,
        classify:ver.classify,
        state:ver.state,
        time:ver.time
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

//查找发布的领养Cat信息
router.get('/getLyCat',function (req,res,next) {
  let query = Article.find({})
  //查询条件
  query.where({type:0,classify:0})
  //查找userId 关联的user对象
  query.populate('userId');
  //排序方式 最后通讯时间倒序排列
  query.sort({'time':-1})
  //查询结果
  query.exec().then(function (e) {
    let result = e.map(function (ver) {
      return {
        id:ver._id,
        userId:ver.userId._id,
        name:ver.userId.userName,
        imgUrl:ver.userId.imgUrl,
        tex:ver.txt,
        imgArr:ver.imgUrl,
        type:ver.type,
        classify:ver.classify,
        state:ver.state,
        time:ver.time
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

//查找发布的寄养喵的信息
router.get('/getJyCat',function (req,res,next) {
  let query = Article.find({})
  //查询条件
  query.where({type:1,classify:0})
  //查找userId 关联的user对象
  query.populate('userId');
  //排序方式 最后通讯时间倒序排列
  query.sort({'time':-1})
  //查询结果
  query.exec().then(function (e) {
    let result = e.map(function (ver) {
      return {
        id:ver._id,
        userId:ver.userId._id,
        name:ver.userId.userName,
        imgUrl:ver.userId.imgUrl,
        tex:ver.txt,
        imgArr:ver.imgUrl,
        type:ver.type,
        classify:ver.classify,
        state:ver.state,
        time:ver.time
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

//查找发布的寄养狗的信息
router.get('/getJyDog',function (req,res,next) {
  let query = Article.find({})
  //查询条件
  query.where({type:1,classify:1})
  //查找userId 关联的user对象
  query.populate('userId');
  //排序方式 最后通讯时间倒序排列
  query.sort({'time':-1})
  //查询结果
  query.exec().then(function (e) {
    let result = e.map(function (ver) {
      return {
        id:ver._id,
        userId:ver.userId._id,
        name:ver.userId.userName,
        imgUrl:ver.userId.imgUrl,
        tex:ver.txt,
        imgArr:ver.imgUrl,
        type:ver.type,
        classify:ver.classify,
        state:ver.state,
        time:ver.time
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

//查找用户发布的文章
router.post('/getUser',function (req,res,next) {
  let query = Article.find({})
  //查询条件
  query.where({userId:req.body.userId})
  //查找userId 关联的user对象
  query.populate('userId');
  //排序方式 最后通讯时间倒序排列
  query.sort({'time':-1})
  //查询结果
  query.exec().then(function (e) {
    let result = e.map(function (ver) {
      return {
        id:ver._id,
        userId:ver.userId._id,
        name:ver.userId.userName,
        imgUrl:ver.userId.imgUrl,
        tex:ver.txt,
        imgArr:ver.imgUrl,
        type:ver.type,
        classify:ver.classify,
        state:ver.state,
        time:ver.time
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

//汇总发布消息的总数
router.get('/pubNum',function (req,res,next) {
  let userId = req.query.id
  //汇总条件
  let wherestr = {'userId':userId}
  //console.log(wherestr)
  Article.countDocuments(wherestr,(err,doc) => {
    if(err){
      res.json({
        status:'500',
        msg:err.message
      })
    }else {
      res.json({
        status:'200',
        msg:'',
        result:doc
      })
    }
  })
})

//修改发布状态已处理
router.post('/updateArticle',function (req,res,next) {
  let id = req.body.id
  //修改项条件
  let wherestr = {'_id':id,'state':0}
  //修改内容
  let updatestr = {'state':1}
  Article.updateMany(wherestr,updatestr,(err,doc) => {
    if(err){
      res.json({
        status:'500',
        msg:err.message
      })
    }else {
      res.json({
        status:'200',
        msg:'修改成功',

      })
    }
  })
})

//点赞
router.post('/isPraise',(req,res,next) => {
  let userId = req.body.id
  let articleId = req.body.articleId
  let authorId = req.body.authorId
  //判断是否已经建立聊天联系
  let wherestr = {'userId':userId,'articleId':articleId}
  Praise.countDocuments(wherestr,(err,doc) => {
    if(err){
      res.json({
        status:'500',
        msg:err.message
      })
    }else {
      if(doc === 0){
        //没有建立建立点赞
        this.buildPraise(userId,articleId,authorId)
      }else {
        //已经建立点赞，删除
        this.removePraise(userId,articleId)
      }
      res.json({
        status:'200',
        msg:'成功'
      })
    }
  })

})

//点赞列表
router.post('/getPraise',function (req,res,next) {
  let query = Praise.find({})
  let userId = req.body.id
  //查询条件
  query.where({userId:userId})
  //查询结果
  query.exec().then(function (e) {
    let result = e.map(function (ver) {
      return {
        articleId:ver.articleId
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


//建立点赞
exports.buildPraise = function(userId,articleId,authorId){
  let param = {
    userId:userId,
    articleId:articleId,
    authorId,authorId
  }
  let praise = new Praise(param);
  praise.save(function (err,doc) {
    if(err){
      console.log('建立出错')
    }
  })
}
//删除点赞
exports.removePraise = function(userId,articleId){
  let wherestr = {'userId':userId,'articleId':articleId}
  Praise.remove(wherestr,function (err,doc) {
    if(err){
     console.log('移除出错')
    }
  })
}

//收藏
router.post('/isCollect',(req,res,next) => {
  let userId = req.body.id
  let articleId = req.body.articleId
  //判断是否已经建立聊天联系
  let wherestr = {'userId':userId,'articleId':articleId}
  Collection.countDocuments(wherestr,(err,doc) => {
    if(err){
      res.json({
        status:'500',
        msg:err.message
      })
    }else {
      if(doc === 0){
        //没有建立建立点赞
        this.buildCollect(userId,articleId)
      }else {
        //已经建立点赞，删除
        this.removeCollect(userId,articleId)
      }
      res.json({
        status:'200',
        msg:'成功'
      })
    }
  })

})

//建立收藏
exports.buildCollect = function(userId,articleId){
  let param = {
    userId:userId,
    articleId:articleId,
  }
  let collection = new Collection(param);
  collection.save(function (err,doc) {
    if(err){
      console.log('建立出错')
    }
  })
}

//删除收藏
exports.removeCollect = function(userId,articleId){
  let wherestr = {'userId':userId,'articleId':articleId}
  Collection.remove(wherestr,function (err,doc) {
    if(err){
      console.log('移除出错')
    }
  })
}

//汇总用户获赞
router.post('/praiseNum',function (req,res,next) {
  let authorId = req.body.id
  //汇总条件
  let wherestr = {'authorId':authorId}
  //console.log(wherestr)
  Praise.countDocuments(wherestr,(err,doc) => {
    if(err){
      res.json({
        status:'500',
        msg:err.message
      })
    }else {
      res.json({
        status:'200',
        msg:'',
        result:doc
      })
    }
  })
})

//汇总文章获赞数量
router.post('/num',function (req,res,next) {
  let articleId = req.body.id
  //汇总条件
  let wherestr = {'articleId':articleId}
  //console.log(wherestr)
  Praise.countDocuments(wherestr,(err,doc) => {
    if(err){
      res.json({
        status:'500',
        msg:err.message
      })
    }else {
      res.json({
        status:'200',
        msg:'',
        result:doc
      })
    }
  })
})
//汇总收藏
router.post('/collectNum',function (req,res,next) {
  let userId = req.body.id
  //汇总条件
  let wherestr = {'userId':userId}
  //console.log(wherestr)
  Collection.countDocuments(wherestr,(err,doc) => {
    if(err){
      res.json({
        status:'500',
        msg:err.message
      })
    }else {
      res.json({
        status:'200',
        msg:'',
        result:doc
      })
    }
  })
})

//汇总文章收藏数量
router.post('/cNum',function (req,res,next) {
  let articleId = req.body.id
  //汇总条件
  let wherestr = {'articleId':articleId}
  //console.log(wherestr)
  Collection.countDocuments(wherestr,(err,doc) => {
    if(err){
      res.json({
        status:'500',
        msg:err.message
      })
    }else {
      res.json({
        status:'200',
        msg:'',
        result:doc
      })
    }
  })
})

//收藏列表
router.post('/getCollection',function (req,res,next) {
  let query = Collection.find({})
  let userId = req.body.id
  //查询条件
  query.where({userId:userId})
  //查询结果
  query.exec().then(function (e) {
    let result = e.map(function (ver) {
      return {
        articleId:ver.articleId
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


//查找我的收藏
router.get('/getCollections',function (req,res,next) {
  let userId = req.query.id
  let query = Collection.find({})
  //查询条件
  query.where({userId:userId})
  //查找userId 关联的user对象
  query.populate({
    path:'articleId',
    populate:{
      path:'userId'
    }
  });
  //排序方式 最后通讯时间倒序排列
  query.sort({'time':-1})
  //查询结果
  query.exec().then(function (e) {
    let result = e.map(function (ver) {
      return {
        id:ver.articleId._id,
        userId:ver.articleId.userId._id,
        name:ver.articleId.userId.userName,
        imgUrl:ver.articleId.userId.imgUrl,
        tex:ver.articleId.txt,
        imgArr:ver.articleId.imgUrl,
        state:ver.articleId.state,
        time:ver.articleId.time,
        type:ver.articleId.type,
        classify:ver.articleId.classify,

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
