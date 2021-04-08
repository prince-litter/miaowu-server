var express = require('express');
var router = express.Router();
var multer  = require('multer')


var mkdir = require('../until/mkdir')
//控制文件储存

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let url = req.body.url
    console.log('url',url)
    mkdir.mkdirs('../public/images/'+ url,err =>{
      console.log(err)
    })
    cb(null, './public/images/' + url)
  },
  filename: function (req, file, cb) {
    let name = req.body.name
    console.log('name',name)
    //正则匹配后缀名
    let type = file.originalname.replace(/.+\./,".")
    cb(null, name+ type)
  }
})
var upload = multer({ storage: storage })


//前端单文件上传
router.post('/upload',upload.single('file'), function(req, res, next) {
  //获取文件信息
  let data = req.file.path
  console.log(data)
  //返回给前端
  res.json({
    status:'200',
    msg:'',
    result:{
      path:data
    }
  })

});
//前端多文件上传
router.post('/uploads',upload.array('file',10), function(req, res, next) {
  //获取文件信息
  let data = req.files[0].path
  console.log(data)
  //返回给前端
  res.json({
    status:'200',
    msg:'',
    result:data
  })

});

module.exports = router;
