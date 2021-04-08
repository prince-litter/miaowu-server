var express = require('express');
var router = express.Router();

var bcrypt = require('../until/bcrypt')
var jwt = require('../until/jwt')
var User = require('../models/user');
var Friend = require('../models/friend');
var Message = require('../models/message');
var Attention = require('../models/attention');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登录
router.post('/login',function (req,res,next) {
  var param = {
    userName:req.body.userName,
  }
  User.findOne(param,function (err,doc) {
    if(err){
      res.json({
        status:'500',
        msg:err.message
      })
    }else {
      if(doc){
        const pwdMatch = bcrypt.verifcation(req.body.userPwd,doc.userPwd)
        if(pwdMatch){
          const token = jwt.generateToken(doc._id)
          res.cookie('userId',doc._id,{
            path:'/',
            maxAge:1000*60*60
          })
          res.cookie('userName',doc.userName,{
            path:'/',
            maxAge:1000*60*60
          })
          res.json({
            status: '200',
            msg:'',
            result:{
              id:doc._id,
              userName: doc.userName,
              imgUrl:doc.imgUrl,
              token:token
            }
          })
        }else {
          res.json({
            status:'400',
            msg:'用户名密码错误'
          })
        }

      }else {
        res.json({
          status:'400',
          msg:'用户名密码错误'
        })
      }

    }
  })
})

//登出接口
router.post('/logout',function (req,res,next) {
  res.cookie('userId','',{
    path:'/',
    maxAge: -1
  })
  res.json({
    status:"200",
    msg:'',
    result:''
  })
})

//登录确认
router.get('/checkLogin',function (req,res,next) {
  if(req.cookies.userId){
    res.json({
      status:'200',
      msg:'',
      result:req.cookies.userName
    })
  }else {
    res.json({
      status:'400',
      msg:'未登录',
      result:''
    })
  }
})

//注册账号
router.post('/register',function (req,res,next) {
  var param = {
    userName:req.body.userName
  }
  User.findOne(param,function (err,doc) {
    if(err){
      res.json({
        status:'500',
        msg:err.message
      })
    }else {
      if(doc){
        res.json({
          status:'400',
          msg:'用户名已存在'
        })
      }else {
        // var userId = ''
        let password =bcrypt.encryption(req.body.userPwd)

        // for(var i=0;i<9;i++){
        //   var num = parseInt(Math.random()*10).toString()
        //   userId += num
        // }
        new User({
          userName:req.body.userName,
          userPwd:password,
          // userId:userId
        }).save(function (err,ret) {
          if(err){
            res.json({
              status:'500',
              msg:err.message
            })
          }else {
            res.json({
              status:'200',
              msg:'注册成功',
              result:''
            })
          }
        })
      }
    }
  })

})

//搜索用户
router.post('/search',function (req,res,next) {
  let param;
  let searchStr = req.body.userName
  // console.log('searchStr',searchStr)
  if(searchStr === 'miaowu'){
    param = {};
  }else {
    param = {
      userName:{ $regex : searchStr}
    };
  }
  let out = {
    userName:1,
    imgUrl:1
  }
  User.find(param,out,function (err,doc) {

    if(err){
      res.json({
        status:'500',
        msg:err.message
      })
    }else {
      if(doc){
        res.json({
          status:'200',
          msg:'',
          result:doc
        })
      }else {
        res.json({
          status:'400',
          msg:'搜索的用户不存在'
        })
      }
    }
  })
})

//用户详情
router.get('/detail',function (req,res,next) {
  let param = {'_id':req.query.id}
  let out = { 'userPwd':0 }
  User.findOne(param,out,function (err,doc) {
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

//用户信息修改
router.post('/update',function (req,res,next) {
  let param = {}
  //判断是否有密码
  if(typeof(req.body.userPwd) !== 'undefined'){
    //有密码进行匹配
      User.findOne({'_id':req.body.id},{'userPwd':1},function (err,doc) {
        if(err){
          res.json({
            status:'500',
            msg:err.message
          })
        }else {
          const pwdMatch = bcrypt.verifcation(req.body.userPwd,doc.userPwd)
          if(pwdMatch){
            //密码验证成功
            //如果为修改密码先加密
            if(req.body.type == 'userPwd'){
              let password = bcrypt.encryption(req.body.data)
              param[req.body.type] = password
            }else {
              param[req.body.type] = req.body.data
            }
            User.findByIdAndUpdate(req.body.id,param,function (err,doc) {
              if(err){
                res.json({
                  status:'500',
                  msg:err.message
                })
              }else {
                res.json({
                  status:'200',
                  msg:'修改成功'
                })
              }
            })
          }else {
            res.json({
              status:'400',
              msg:'密码匹配失败'
            })
          }
        }
      })
  }else if(req.body.type === 'userName'){
    param[req.body.type] = req.body.data
    User.countDocuments(param,function (err,doc) {
      if(err){
        res.json({
          status:'500',
          msg:err.message
        })
      }else {
        //没有匹配项占用，可以修改
        if(doc === 0){
          User.findByIdAndUpdate(req.body.id,param,function (err,doc) {
            if(err){
              res.json({
                status:'500',
                msg:err.message
              })
            }else {
              res.json({
                status:'200',
                msg:'修改成功'
              })
            }
          })
        }else {
          //已存在
          res.json({
            status:'300',
            msg:'用户名已存在'
          })
        }
      }

    })
  }
  else {

    param[req.body.type] = req.body.data
    User.findByIdAndUpdate(req.body.id,param,function (err,doc) {
      // console.log('err',err)
      if(err){
        res.json({
          status:'500',
          msg:err.message
        })
      }else {
        res.json({
          status:'200',
          msg:'修改成功'
        })
      }
    })
  }
})

//添加好友表（消息列表）
router.post('/relative',(req,res,next) => {
  let userId = req.body.id
  let friendId = req.body.friendId
  //判断是否已经建立聊天联系
  let wherestr = {'userId':userId,'friendId':friendId}
  Friend.countDocuments(wherestr,(err,doc) => {
    if(err){
      res.json({
        status:'500',
        msg:err.message
      })
    }else {
      if(doc === 0){
        //初次建立
        this.buildFriend(userId,friendId)
        this.buildFriend(friendId,userId)
      }else {
        //已经建立聊天关系，更新时间即可
        this.upFriendLastTime(userId,friendId)
        this.upFriendLastTime(friendId,userId)
      }
      res.json({
        status:'200',
        msg:'成功'
      })
    }
  })

})

//好友最后通讯时间更新函数
exports.upFriendLastTime = function(id,friendId){
 let wherestr = {'userId':id,'friendId':friendId}

 let updatestr = {'lastTime':new Date()}
 Friend.updateOne(wherestr,updatestr,function (err,doc) {
   if(err){
     // res.json({
     //   status:'500',
     //   msg:err.message
     // })
     console.log('更新好友最后通讯时间出错')
   }else {
     // res.json({
     //   status:'200',
     //   msg:'成功'
     // })
   }
 })

}
//添加好友建立聊天关系函数
exports.buildFriend = function(userId,friendId){
  let param = {
    userId:userId,
    friendId:friendId,
    lastTime:new Date()
  }
  let friend = new Friend(param);
  friend.save(function (err,doc) {
    if(err){
      // res.json({
      //   status:'500',
      //   msg:err.message
      // })
      console.log('建立聊天关系出错')
    }else {
      // res.json({
      //   status:'200',
      //   msg:'成功'
      // })
    }
  })
}

//添加一对一消息
router.post('/message',function (req,res,next) {
  let param = {
    userId:req.body.id,
    friendId:req.body.friendId,
    message:req.body.msg,
    types:req.body.type,
    time:new Date(),
    state:1
  }
  let message = new Message(param)
  message.save(function (err,doc) {
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

//聊天列表删除一项
router.get('/deleteRelative',function (req,res,next) {
  let wherestr = {'userId':req.query.id,'friendId':req.query.friendId}
  Friend.remove(wherestr,function (err,doc) {
    if(err){
      res.json({
        status:'500',
        msg:err.message
      })
    }else {
      res.json({
        status:'200',
        msg:'成功'
      })
    }
  })
})

//按要求获取用户聊天列表
router.get('/list',function (req,res,next) {
  let query = Friend.find({})
  //查询条件
  query.where({'userId':req.query.id})
  //查找friendId 关联的user对象
  query.populate('friendId');
  //排序方式 最后通讯时间倒序排列
  query.sort({'lastTime':-1})
  //查询结果
  query.exec().then(function (e) {
    let result = e.map(function (ver) {
      return {
        id:ver.friendId._id,
        name:ver.friendId.userName,
        imgUrl:ver.friendId.imgUrl,
        lastTime:ver.lastTime
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

//按要求获取一条一对一消息表
router.get('/oneMsg',function (req,res,next) {
  let query = Message.findOne({})
  // console.log(query)
  //查询条件
  query.where({$or:[{'userId':req.query.id,'friendId':req.query.friendId},{'userId':req.query.friendId,'friendId':req.query.id}]})
  //排序方式 最后通讯时间倒序排列
  query.sort({'time':-1})
  //查询结果
  query.exec().then(function (e) {
     let result =  {
      message: e.message,
      time: e.time,
      types: e.types
    }
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

//汇总一对一消息未读数
router.get('/unreadMsg',function (req,res,next) {
  let userId = req.query.id
  let friendId = req.query.friendId
  //汇总条件
  let wherestr = {'userId':friendId,'friendId':userId,'state':1}
  //console.log(wherestr)
  Message.countDocuments(wherestr,(err,doc) => {
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

//一对一消息状态修改
router.post('/updateMsg',function (req,res,next) {
  let userId = req.body.id
  let friendId = req.body.friendId
  //修改项条件
  let wherestr = {'userId':userId,'friendId':friendId,'state':1}
  //修改内容
  let updatestr = {'state':0}
  Message.updateMany(wherestr,updatestr,(err,doc) => {
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

//关注
router.post('/isAttention',(req,res,next) => {
  let userId = req.body.id
  let focusedId = req.body.focusedId
  //判断是否已经建立聊天联系
  let wherestr = {'userId':userId,'focusedId':focusedId}
  Attention.countDocuments(wherestr,(err,doc) => {
    if(err){
      res.json({
        status:'500',
        msg:err.message
      })
    }else {
      if(doc === 0){
        //没有建立建立关注
        this.buildAttention(userId,focusedId)
      }else {
        //已经建立，取消关注
        this.removeAttention(userId,focusedId)
      }
      res.json({
        status:'200',
        msg:'成功'
      })
    }
  })

})

//建立关注
exports.buildAttention = function(userId,focusedId){
  let param = {
    userId:userId,
    focusedId:focusedId,
  }
  let attention = new Attention(param);
  attention.save(function (err,doc) {
    if(err){
      console.log('建立出错')
    }
  })
}

//删除关注
exports.removeAttention = function(userId,focusedId){
  let wherestr = {'userId':userId,'focusedId':focusedId}
  Attention.remove(wherestr,function (err,doc) {
    if(err){
      console.log('移除出错')
    }
  })
}

//汇总粉丝
router.post('/focusedNum',function (req,res,next) {
  let focusedId = req.body.id
  //汇总条件
  let wherestr = {'focusedId':focusedId}
  //console.log(wherestr)
  Attention.countDocuments(wherestr,(err,doc) => {
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


//关注列表
router.post('/getAttention',function (req,res,next) {
  let query = Attention.find({})
  let userId = req.body.id
  //查询条件
  query.where({userId:userId})
  //查询结果
  query.exec().then(function (e) {
    let result = e.map(function (ver) {
      return {
        focusedId:ver.focusedId
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
