const server = {
    host: '172.16.252.24',
    port: 5000
};

const session = {
    secret: 'bein-blog',
    cookie_maxAge: 600 * 1000
};

const mysql = {
    host: '120.79.202.1',
    port: 3306,
    user: 'root',
    password: 'MySQL5612',
    database: 'taxiShare'
};

// const redis = {
//     // host: '172.19.219.215',
//     host: '120.79.202.1',
//     port: 6379,
//     password: 'MecRedis2017'
// };
const appId = 'wx5bceaf7991ba27b8';
const appSecret = 'b1ead4d94b865be5a10aab4ebefce394';

// let signName = 'SJTU研会';
// let templateCode1 = 'SMS_109345333';
// let templateCode2 = 'SMS_116563008';

// const accessKeyId = 'LTAIjlISTZFh1Jjt';
// const secretAccessKey = '1lUChg8d0tmfPHJgZjGijzpC1HQx1N';

module.exports = {
    server: server,
    session: session,
    mysql: mysql,
    appId: appId,
    appSecret: appSecret,
    // signName: signName,
    // templateCode1: templateCode1,
    // templateCode2: templateCode2    
    // accessKeyId: accessKeyId,
    // secretAccessKey: secretAccessKey
};
