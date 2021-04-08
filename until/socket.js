var User = require('../models/user');
var Friend = require('../models/friend');
var Message = require('../models/message');

module.exports = function(io){
  var users = {}; //socket注册的用户
  io.on('connection',(socket) => {

    // console.log('socket.io 链接成功')
    //用户登录注册
    socket.on('login',(id) =>{
      console.log(socket.id)
      //回复客户端
      socket.emit('login',socket.id)
      socket.name = id
      users[id] = socket.id
    });
    //用户一对一消息发送
    socket.on('msg',(msg,fromid,toid) =>{
      //修改好友最后通讯时间
      let wherestr = {'userId':fromid,'friendId':toid}
      let updatestr = {'lastTime':new Date()}
      let otherstr = {'userId':toid,'friendId':fromid}
      Friend.updateOne(wherestr,updatestr,function (err,doc) {
        if(err){
          console.log('更新好友最后通讯时间出错')
        }
      })
      Friend.updateOne(otherstr,updatestr,function (err,doc) {
        if(err){
          console.log('更新好友最后通讯时间出错')
        }
      })
      //存储一对一消息
      let param = {
        userId:fromid,
        friendId:toid,
        message:msg.message,
        types:msg.types,
        time:new Date(),
        state:1
      }

      let message = new Message(param)
      message.save(function (err,doc) {
        if(err){
          console.log(err)
        }

      })

      //发送给对方
      msg.fromid = fromid
      msg.flag = 0
      // console.log('msgId',msgId)
      if(users[toid]){
        socket.to(users[toid]).emit('msg',msg)
      }
      //socket.emit('msg',socket.id)
      //发送给自己
      msg.fromid = toid
      msg.flag = 1
      console.log(msg)
      socket.emit('msg',msg)
    });
    //用户离开
    socket.on('disconnecting',() => {
      console.log(users)
      if(users.hasOwnProperty(socket.name)){
        delete users[socket.name]
        console.log(socket.id + '离开')
      }
    })
  })
}




