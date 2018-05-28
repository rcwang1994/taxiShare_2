const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool(config.mysql);

//用户记录
function pick(userId, nickName, avatarUrl, background, word, card, userIdbe, scene, ip, createTime, cb) {
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('INSERT INTO userInfo (userId, nickName, avatarUrl, background, word, card, userIdbe, scene, ip, createTime) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userId, nickName, avatarUrl, background, word, card, userIdbe, scene, ip, createTime], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(err);
            conn.release();
        });
    });
}


//创建用户
function insertInfo(openId, sessionKey, cb) {
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('INSERT INTO userInfo (openId, sessionKey, createTime) VALUES ( ?, ?, NOW())', [openId, sessionKey], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(err);
            conn.release();
        });
    });
}
//查询sessionKey
function selectSessionKey(openId, cb){
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('SELECT sessionKey FROM userInfo WHERE openId = ?', [openId], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(result);
            conn.release();
        });
    });
}
//更新sessionKey
function updateSessionKey(openId, sessionKey, cb){
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('UPDATE userInfo SET sessionKey = ? WHERE openId = ?', [sessionKey, openId], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(err);
            conn.release();
        });
    });
}
//查询用户信息
function selectInfo(openId, cb) {
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('SELECT name, phone, wechat, gender, identity FROM userInfo WHERE openId = ?', [openId], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(result);
            conn.release();
        });
    });
}
//编辑用户信息
function editInfo(openId, name, phone, wechat, gender, identity, cb) {
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('UPDATE userInfo SET name = ? ,phone = ? ,wechat = ? ,gender = ? ,identity = ? WHERE openId = ?', [name, phone, wechat, gender, identity, openId], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(err);
            conn.release();
        });
    });
}
//查询行程Id
function selectTravelId(openId, cb){
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('SELECT travelId FROM userInfo WHERE openId = ?', [openId], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(result);
            conn.release();
        });
    });
}

//新建行程Id
function editTravelId(travelId,openId,cb){
        pool.getConnection((err, conn) => {
            if (err) console.error(err);
            conn.query('UPDATE userInfo SET travelId=? WHERE openId = ?', [travelId, openId], (err, result) => {
                if (err) console.error(err);
                typeof (cb) === 'function' && cb(err);
                conn.release();
            })
        })

}
//查看行程
function selectTravel(travelId, cb){
        pool.getConnection((err, conn) => {
            if (err) console.error(err);
            conn.query('SELECT departure, destination,date, time, advance, delay, people FROM travelInfo WHERE travelId = ?', [travelId], (err, result) => {
                if (err) console.error(err);
                typeof (cb) === 'function' && cb(result);
                conn.release();
            });
        });
}

//新建行程信息
function insertTravel(travelId, openId, departure, destination,date, time, advance, delay, people, cb){
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('INSERT INTO travelInfo (travelId, openId, departure, destination,date, time, advance, delay, people) VALUES ( ?, ?, ?, ?,?, ?, ?,?,?)', [travelId, openId,departure, destination, date,time, advance, delay, people], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(err);
            conn.release();
        })
    })
}
//编辑行程
function editTravel(travelId, departure, destination,date, time, advance, delay, people, cb) {
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('UPDATE travelInfo SET departure=?, destination=?, date=?,time=?, advance=?, delay=?, people=? WHERE travelId = ?', [departure, destination, date,time, advance, delay, people, travelId], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(err);
            conn.release();
        })
    })
}
//消息记录//查完message表查user表？case----------------------------------------

// //查看我的团队信息   //526修改
// function selectTeamInfo(travelId, cb){
//     pool.getConnection((err, conn) => {
//         if (err) console.error(err);
//         conn.query('SELECT departure, destination,time,advance,delay FROM travelInfo WHERE travelId = ?', [travelId], (err, result) => {
//             if (err) console.error(err);
//             typeof (cb) === 'function' && cb(result);
//             conn.release();
//         });
//     });
// }

//查看我的团队id//通过我的openId在用户表中查询我现在的teamId   
function getTeamInfo(openId, cb){
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('SELECT teamId FROM userInfo WHERE openId = ?', [openId], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(result);
            conn.release();
        });
    });
}
//查看我的团队<行程>信息
function getTeamTravel(teamId, cb){
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('SELECT openId1, departure, destination, departureTime, time1, time2 FROM teamInfo WHERE teamId = ?', [teamId], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(result);
            conn.release();
        });
    });
}

//查看我的团队其他成员信息//通过我的teamId查询其他含有该teamId的成员信息   
function getTeamMembers(teamId, cb){
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('SELECT name, openId FROM userInfo WHERE teamID = ?', [teamId], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(result);
            conn.release();
        });
    });
}

//形成团队
function insertTeam( openId1, cb){
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('INSERT INTO teamInfo (teamId, openId1, latestArrivalTime, gathering, maxMumber, existMumber) VALUES ( ?, ?, ?, ?, ?, ?)', [teamId, openId1, latestArrivalTime, gathering, maxMumber, existMumber], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(err);
            conn.release();
        })
    })
}

//消息记录//查完message表查user表？case
function selectMessageInfo(openId, cb) {
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('SELECT openIdSender, openIdReceiver, type FROM messageInfo WHERE openIdReceiver = ? or openIdSender = ?', [openId], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(result);
            conn.release();
        });
    });
}
//判断当前团队信息是否有效
function checkTeamValid (teamId, cb) {
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('SELECT valid FROM teamInfo WHERE teamId = ?', [teamId], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(result);
            conn.release();
        }); 
    });
}
//判断当前行程信息是否有效
function checkTravelValid (messageId, cb) {
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('SELECT mark FROM travelInfo where travelId = SELECT trevalId FROM messageInfo WHERE messangId = ?', [messangId], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(result);
            conn.release();
        }); 
    });
}
//创建新的消息
function insertMessageInfo(messageId, teamId, travelId, openIdSender, openIdReceiver, type, flag, cb) {
    pool.getConnection((err, conn) => {
        if (err) console.error(err);
        conn.query('INSERT INTO messageInfo (messageId, teamId, travelId, openIdSender, openIdReceiver, type, flag) VALUES ( ?, ?, ?, ?, ?, ?, ?)', [messageId, teamId, travelId, openIdSender, openIdReceiver, type, flag], (err, result) => {
            if (err) console.error(err);
            typeof (cb) === 'function' && cb(err);
            conn.release();
        });
    });
}


// //用户表中的teamId置为空
// function updateTeamIdUserNull(openId, cb) {
//     pool.getConnection((err, conn) => {
//         if (err) console.error(err);
//         conn.query('UPDATE teamInfo SET teamId = ? WHERE teamId = ? AND valid = ?', [null, 0], (err, result) => {
//             if (err) console.error(err);
//             typeof (cb) === 'function' && cb(err);
//             conn.release();
//         });
//     });
// }
// conn.query('UPDATE userInfo SET sessionKey = ? WHERE openId = ?', [sessionKey, openId], (err, result) => {
// //编辑团队表：teamId=NULL,valid=0
// function editGroupValid( teamId, cb){
//     pool.getConnection((err, conn) => {
//         if (err) console.error(err);
//         conn.query('UPDATE INTO teamInfo (teamId, value) VALUES ( ?, ?)', [null, 0], (err, result) => {
//             if (err) console.error(err);
//             typeof (cb) === 'function' && cb(err);
//             conn.release();
//         })
//     })
// }
// //编辑团队表：existMumber-1
// function editGroupMumber( teamId, cb){
//     pool.getConnection((err, conn) => {
//         if (err) console.error(err);
//         conn.query('UPDATE INTO teamInfo (existMumber) VALUES (?)', [existMumber--], (err, result) => {
//             if (err) console.error(err);
//             typeof (cb) === 'function' && cb(err);
//             conn.release();
//         })
//     })
// }
// //name
// function name(nickName, cb) {
//     pool.getConnection((err, conn) => {
//         if (err) console.error(err);
//         conn.query('INSERT INTO name (nickName) VALUES ( ?)', [nickName], (err, result) => {
//             if (err) console.error(err);
//             typeof (cb) === 'function' && cb(err);
//             conn.release();
//         });
//     });
// }

// function selectName(userId, cb) {
//     pool.getConnection((err, conn) => {
//         if (err) console.error(err);
//         conn.query('SELECT nickName FROM userInfo WHERE userId = ?', [userId], (err, result) => {
//             if (err) console.error(err);
//             typeof (cb) === 'function' && cb(result);
//             conn.release();
//         });
//     });
// }

// //用户注册
// function register(openId, sessionKey, unionId, name, gender, telNum, cb) {
//     pool.getConnection((err, conn) => {
//         if (err) console.error(err);
//         conn.query('INSERT INTO user (openId, sessionKey, name, gender, telNum, unionId, createTime) VALUES ( ?, ?, ?, ?, ?, ?, NOW())', [openId, sessionKey, name, gender, telNum, unionId], (err, result) => {
//             if (err) console.error(err);
//             typeof (cb) === 'function' && cb(err);
//             conn.release();
//         });
//     });
// }
// //手机号与验证码
// function insertTel(num, telNum, telCode, cb) {
//     pool.getConnection((err, conn) => {
//         if (err) console.error(err);
//         conn.query('INSERT INTO telVerify (num, telNum, telCode, createTime) VALUES ( ?, ?, ?, NOW())', [num, telNum, telCode], (err, result) => {
//             if (err) console.error(err);
//             typeof (cb) === 'function' && cb(err);
//             conn.release();
//         });
//     });
// }
// //手机号验证
// function verifyTel(telNum, telCode, cb) {
// pool.getConnection((err, conn) => {
//     if (err) console.error(err);
//     conn.query('SELECT num FROM telVerify WHERE telNum = ? AND telCode =? ', [telNum, telCode], (err, result) => {
//         if (err) console.error(err);
//         typeof (cb) === 'function' && cb(result);
//         conn.release();
//     });
// });
// }
// //用户登录
// function login(openId, cb) { 
//     pool.getConnection((err, conn) => {
//         if (err) console.error(err);
//         conn.query('SELECT name FROM user WHERE openId = ? ', [openId], (err, result) => {
//             if (err) console.error(err);
//             typeof (cb) === 'function' && cb(result);
//             conn.release();
//         });
//     });
// }
// //写信
// function insertMessage(num, openId, telNum, appellation, message, signature, cb) {
//     pool.getConnection((err, conn) => {
//         if (err) console.error(err);
//         conn.query('INSERT INTO record (num, user1, receiverTel, message, appellation, signature, createTime) VALUES ( ?, ?, ?, ?, ?, ?, NOW())', [num, openId, telNum, message, appellation, signature], (err, result) => {
//             if (err) console.error(err);
//             typeof (cb) === 'function' && cb(err);
//             conn.release();
//         });
//     });
// }

module.exports = {
    pick: pick,
    insertInfo: insertInfo,
    updateSessionKey:updateSessionKey,        
    selectSessionKey:selectSessionKey,
    selectInfo: selectInfo,
    editInfo: editInfo,
    selectTravelId:selectTravelId,
    editTravelId:editTravelId,
    insertTravel:insertTravel,
    editTravel:editTravel,
    selectTravel:selectTravel,
    insertTeam:insertTeam,    
    selectMessageInfo:selectMessageInfo,
    getTeamInfo:getTeamInfo,
    getTeamMembers:getTeamMembers,
    getTeamTravel:getTeamTravel,
};