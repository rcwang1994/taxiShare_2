const crypto = require('crypto');
const https = require('https');
const WXBizDataCrypt = require('./WXBizDataCrypt');

let config = require('../config');
// const SMSClient = require('@alicloud/sms-sdk');
// const accessKeyId = 'LTAIjlISTZFh1Jjt';
// const secretAccessKey = '1lUChg8d0tmfPHJgZjGijzpC1HQx1N';
// let smsClient = new SMSClient({accessKeyId, secretAccessKey});

function formatTime(date, type = true) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('') + '' + (type ? [hour, minute, second] : [hour, minute]).map(formatNumber).join('');
}

function formatDate(date, type = true) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return [year, month, day].map(formatNumber).join('-');
}

function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}

function diffTime(date, type = true) {
    let date1 = new Date(date);
    let date2 = new Date();
    let diffMs = type ? date2.getTime() - date1.getTime() : date1.getTime() - date2.getTime();

    return type ? Math.floor(diffMs / 1000) : (diffMs > 0 ? [Math.floor(diffMs / (1000 * 3600 * 24)), Math.floor(diffMs % (1000 * 3600 * 24) / (1000 * 60))] : [0, 0]);
}

//获取微信用户openId
function wxGetOpenId(appId, appSecret, code, cb) {
    let options = {
        host: 'api.weixin.qq.com',
        method: 'GET',
        path: `/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
            typeof (cb) === 'function' && cb(data);
        });
    });
    req.on('error', (err) => {
        res.send('error:', err);
    });
    req.end();
}
//校验微信用户信息完整性
function wxSignature(rawData, sessionKey, signature) {
    let md5sum = crypto.createHash('sha1');                  //哈西算法，计算签名的完整性
    md5sum.update(rawData + sessionKey, 'utf-8');
    let signature2 = md5sum.digest('hex');
    return signature === signature2;
}
//解密微信用户加密信息
function wxDecrypt(appId, sessionKey, encryptedData, iv) {
    let pc = new WXBizDataCrypt(appId, sessionKey);
    return pc.decryptData(encryptedData, iv);
}

//发送手机验证码
// function smsSend(tel, signName, templateCode, templateParam) {
//     console.log(tel);
//     smsClient.sendSMS({
//         PhoneNumbers: tel,
//         SignName: signName,
//         TemplateCode: templateCode,
//         TemplateParam: templateParam
//     }).then(function (res) {
//         console.log(res)
//         let {Code}=res
//         if (Code === 'OK') {
//             //处理返回参数
//             return res;
//         }
//     }, function (err) {
//         console.log(err);
//         return err;
//     });
// }


module.exports = {
    formatTime: formatTime,
    formatDate: formatDate,
    formatNumber: formatNumber,
    diffTime: diffTime,
    wxGetOpenId: wxGetOpenId,
    wxSignature: wxSignature,
    wxDecrypt:wxDecrypt,
    // smsSend: smsSend
}
