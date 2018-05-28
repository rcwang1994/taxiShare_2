const config = require('../config');
function login(cb){
  wx.login({
    success: (res) => {
      wx.request({
        url: `${config.host}/login`,
        method: 'POST',
        data: {
          code: res.code
        },
        success: (res) => {
          typeof (cb) === 'function' && cb(res);
        }
      })
    }
  })
}

module.exports = {
  login:login
}
