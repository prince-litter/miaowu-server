var bcrypt = require('bcryptjs');

//生成hash密码
exports.encryption = function (e) {
  //生成随机的salt
  var salt = bcrypt.genSaltSync(10);

  //生成hash密码
  var hash = bcrypt.hashSync(e,salt);

  return hash
}

//解密
exports.verifcation = function (e,hash) {
  //e前端传来的密码
  //hash加密的密码
  //返回true或者false
  let verif = bcrypt.compareSync(e,hash);

  return verif
}

