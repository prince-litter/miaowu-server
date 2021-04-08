//mkdir.js 新建目录
const fs = require('fs')
const path = require('path')

exports.mkdirs = function (pathname,callback) {
  //需要判断是否是绝对路径
  pathname = path.isAbsolute(pathname) ? pathname : path.join(__dirname,pathname);
  //获取相对路径
  pathname = path.relative(__dirname,pathname);
  let floders = pathname.split(path.sep);
  let pre = "";
  floders.forEach(floder => {
    try {
      //没有异常，文件已经创建，提示用户改文件已经创建
      let _stat = fs.statSync(path.join(__dirname, pre, floder));
      let hasMkdir = _stat && _stat.isDirectory();
      if(hasMkdir){
        callback
      }
    }catch (error) {
      //抛出异常文件不存在则创建文件
      try {
        fs.mkdirSync(path.join(__dirname, pre, floder))
        callback && callback(null)
      }catch (error) {
        callback && callback(error)
      }
    }
    pre = path.join(pre, floder);//合并路径
  })

}
