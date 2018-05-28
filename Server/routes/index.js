const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const url = require('url');
const webshot = require('webshot');
const cheerio = require('cheerio');
const path = require('path');
// const iconv =require('iconv-lite');
const encoding = require('encoding');

let config = require('../config');
let util = require('./util');
let dao = require('../dao/dao');
//
router.get('/hello', (req, res) => {
    res.send('good morning');
});

//用户登录接口
//0:失败；1：老用户;2：新用户；
//0:未完善；1：完善
router.post('/login', (req, res) => {
    let data = {
        status: 0,
        info: 0,
        openId: ''
    }
    util.wxGetOpenId(config.appId, config.appSecret, req.body.code, (openIdRes) => {
        let openId = JSON.parse(openIdRes).openid;
        let sessionKey = JSON.parse(openIdRes).session_key;
        data.openId = openId;

        dao.selectInfo(openId, (infoRes) => {
            if (infoRes.length) {
                data.status = 1;
                if (infoRes[0].phone) {
                    data.info = 1;
                }
                res.send(data);
            } else {
                dao.insertInfo(openId, sessionKey, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        data.status = 2;
                    }
                    // console.log(data);
                    res.send(data);
                });
            }
        })
    });
});

//查询用户信息接口
router.post('/viewInfo', (req, res) => {
    let data = {
        satus: 0,//0：失败；1：成功
        name: '',
        phone: '',
        wechat: '',
        gender: '',
        identity: '',
    }
    dao.selectInfo(req.body.openId, (infoRes) => {
        if (infoRes.length) {
            data.name = infoRes[0].name;
            data.phone = infoRes[0].phone;
            data.wechat = infoRes[0].wechat;
            data.gender = infoRes[0].gender;
            data.identity = infoRes[0].identity;
            data.satus = 1;
            res.send(data);
        } else {
            res.send(data);
        }
    })
});

//编辑用户信息接口
router.post('/editInfo', (req, res) => {
    let data = {
        status: 0 //0：失败；1：成功
    }
    console.log(req.body);
    dao.editInfo(req.body.openId, req.body.name, req.body.phone, req.body.wechat, req.body.gender, req.body.identity, (err) => {
        if (err) {
            console.error(err);
        } else {
            data.status = 1;
            res.send(data);
        }
    })
})

//查看我的行程接口
router.post('/viewTravel', (req, res) => {
    let data = {
        status: 0,//0：失败；1：成功获取信息；2：该用户无行程信息
        departure: 1,
        destination: 6,
        date: '2018-05-25',
        time: '13:21',
        advance: 15,
        delay: 15,
        people: 1,
        journeyId:'',
    }
    console.log('viewInfo:' + req.body.openId);
    dao.selectTravelId(req.body.openId, (jourRes) => {
        console.log('jourRes:' + jourRes[0].travelId);
        if (jourRes[0].travelId) {
            dao.selectTravel(jourRes[0].travelId, (jourInfo) => {
                console.log('jourInfo:' + jourInfo[0]);
                if (jourInfo.length) {
                    data.journeyId=jourRes[0].travelId;
                    data.status = 1;
                    data.departure = jourInfo[0].departure;
                    data.destination = jourInfo[0].destination;
                    data.date = jourInfo[0].date;
                    data.time = jourInfo[0].time;
                    data.advance = jourInfo[0].advance;
                    data.delay = jourInfo[0].delay;
                    data.people = jourInfo[0].people;
                    console.log(data);
                    res.send(data);
                }
            });
            //用户存在行程，接下来查询行程信息发回给用户---------------------------------------------------------
        } else {
            data.status = 2;
            res.send(data);
            //用户不存在行程，接下来新建一条用户行程信息，在用户表里，添加TravelId字段-----------------------------------------------------------
        }
    })
})

//行程编辑接口
router.post('/editTravel', (req, res) => {
    let data = {
        status: 0 //0：失败；1：成功
    }
    console.log('editTravel:' + JSON.stringify(req.body));
    if (req.body.user == 1) {
        dao.selectTravelId(req.body.openId, (jourRes) => {
            if (jourRes[0].travelId) {
                dao.editTravel(jourRes[0].travelId, req.body.departure, req.body.destination, req.body.date, req.body.time, req.body.advance, req.body.delay, req.body.people, (err) => {
                    if (err) {
                        console.error(err);
                        res.send(data);
                    } else {
                        data.status = 1;
                        res.send(data);
                    }
                })
            } else {
                console.log('err');
            }
        })

    } else {
        let recordTime = new Date();
        let travelId = 'jour' + recordTime.getTime() + (Math.floor(Math.random() * 900) + 100);
        dao.insertTravel(travelId, req.body.openId, req.body.departure, req.body.destination, req.body.date, req.body.time, req.body.advance, req.body.delay, req.body.people, (err) => {
            if (err) {
                console.error(err);
                res.send(data);
            } else {
                dao.editTravelId(travelId, req.body.openId, (err) => {
                    if (err) {
                        console.error(err);
                        res.send(data);
                    } else {
                        data.status = 1;
                        res.send(data);
                    }
                })

            }
        })
    }

});

//组建团队接口
router.post('/generateTeam', (req, res) => {
    let data = {
        status: 0, //0：失败；1：成功
        teamId: '',
        openId1: '',
        latestArrivalTime: '',
        gathering: '',
        valid: 0, //0：失效；1：有效
        maxMumber: '',
        existMumber: '',
    }
    console.log(req.body);
    dao.generateGroup(req.body.teamId, req.body.openId1, req.body.latestArrivalTime, req.body.gathering, req.body.maxMumber, req.body.existMumber, (err) => {
        if (err) {
            console.error(err);
        } else {
            data.valid = 1;
            res.send(data);
        }
    })
});


//团队分享接口
router.post('/teamShare', (req, res) => {
    data = {
        status: 0
    }
    console.log(req.body);
    let openId = req.body.openId;
    let teamId = req.body.teamId;
    let encryptedData = req.body.encryptedData;
    let iv = req.body.iv;

    if (req.body.code == '') {
        dao.selectSessionKey(openId, (sessRes) => {
            if (sessRes.length) {
                let sessionKey = sessRes[0].sessionKey;
                let shareData = util.wxDecrypt(config.appId, sessionKey, encryptedData, iv);

                //接下来向shareInfo表里面写入分享记录-------------------------------------------------------

                console.log(shareData);
                data.status = 1;
                res.send(data);
            }
        })
    } else {
        util.wxGetOpenId(config.appId, config.appSecret, req.body.code, (openIdRes) => {
            let openId = JSON.parse(openIdRes).openid;
            let sessionKey = JSON.parse(openIdRes).session_key;
            dao.updateSessionKey(openId, sessionKey, (err) => {
                if (err) {
                    console.error(err);
                    res.send(data);
                } else {
                    let shareData = util.wxDecrypt(config.appId, sessionKey, encryptedData, iv);

                    //接下来向shareInfo表里面写入分享记录---------------------------------------------------------

                    console.log(shareData);
                    data.status = 1;
                    res.send(data);
                }
            })
        });
    }
});

//查看队员信息接口
router.post('/checkMember', (req, res) => {
    let data = {
        satus: 0,//0：失败；1：成功
        name: '',
        phone: '',
        wechat: '',
        gender: '',
        identity: '',
    }
    dao.selectInfo(req.body.openId, (infoRes) => {
        if (infoRes.length) {
            data.name = infoRes[0].name;
            data.phone = infoRes[0].phone;
            data.wechat = infoRes[0].wechat;
            data.gender = infoRes[0].gender;
            data.identity = infoRes[0].identity;
            data.satus = 1;
            res.send(data);
        } else {
            res.send(data);
        }
    })
});
//查看消息
router.post('/viewMessageRecord', (req, res) => {
    let data = [{
        valid: 1,//0：失效；1：有效
        openId: '',
        type: '',
    }]
    dao.selectMessageInfo(req.body.openId, (messageRes) => {
        if (messageRes.length) {
            for (i = 0; i < messageRes.length; i++) {
                data[i].openIdSender = messageRes[0].openIdSender;
                data[i].openIdReceiver = messageRes[0].openIdReceiver;
                data[i].type = messageRes[0].type;
            }
            res.send(data);
            data.valid = 0;
        } else {
            res.send(data);
        }
    })
});
//同意“申请消息”接口
router.post('/agreeMessageApply', (req, res) => {
    let data = {
        valid: '', //判断团队人数是否已满，0：失效（已满）；1：有效（未满）
        mark: '', //判断行程信息是否有效，0：失效；1：有效
        openIdSender: '',
        openIdReceiver: '',
        flag: 1 //判断当前申请信息是否有效，0：失效；1：有效
    }
    dao.checkTeamValid(req.body.teamId, (teamRes) => {
        if (data.valid = 0) {
            console.error(err);
        } else {
            dao.checkTravelValid(req.body.teamId, (teamRes) => {
                if (data.mark = 0) {
                    console.error(err);
                } else {
                    data.flag = 0;
                    dao.insertMessageInfo
                }
            })
        }
    })
});


//查看团队信息接口
router.post('/viewTeam', (req, res) => {
    let data = {
        satus: 0,//0:没有团队；1：已有团队
        flag:0,//0,有此用户,1没有此用户
        members: [{
            name: '',
            openId: '',
        }],
        mark: 0,//是否队长,不是为0,是为1
    }
    console.log('wwwwwwwwwwg');
    dao.getTeamInfo(req.body.openId, (infoRes) => {
        console.log('wang');
        console.log(infoRes.length);
        if (infoRes.length) {
            if(infoRes[0].teamId!=null){
            data.satus = 1;
            dao.getTeamMembers(infoRes[0].teamId, (memberRes) => {
                for (i = 0; i < memberRes.length; i++) {
                    data.members[i].name = memberRes[i].name;
                    data.members[i].openId = memberRes[i].openId;
                }
            });
            console.log(infoRes[0]);
            console.log(infoRes[0].teamId);
            dao.getTeamTravel(infoRes[0].teamId, (travelRes) => {
                console.log(travelRes[0].length);
                data.departure = travelRes[0].departure;
                data.destination = travelRes[0].destination;
                data.departureTime = travelRes[0].departureTime;
                data.time1 = travelRes[0].time1;
                data.time2 = travelRes[0].time2;
                data.openId1 = travelRes[0].openId1;
                res.send(data);
            });
        } else {
            res.send(data);
        }
    }
    else{
        data.flag=1;
        res.send(data);
    }
    })
});

// //团队表最后两部分
// //退出团队
// router.post('/teamWithdraw',(req,res)=>{
//     let data_user={
//         status: 0 //0：失败；1：成功
//     }
//     let data_team={
//         status: 0 //0：失败；1：成功
//     }
//     let data_person={
//         status: 0 //0：失败；1：成功
//     }
//     dao.getTeamInfo(req.body.openId, (infoRes) => {
//             if (req.body.openId == openId1){
//                 dao.selectTeamIdInfo(req.body.teamId, (infoUserRes) => {
//                     dao.updateUserTeamIdNull(infoRes,(valueRes) => {
//                         if (err) {
//                             console.error(err);
//                             data_user.status=0;               
//                          }
//                         else{
//                             data_user.status=1;
//                          }
//                         res.send(data_user);
//                     })
//                 })
//                 dao.editGroupValid(req.body.teamId, (infoTeamRes) =>  {
//                     infoTeamRes.existMumber--;
//                     if (err) {
//                         console.error(err);
//                         data_team.status=0;               
//                      }
//                     else{
//                         data_team.status=1;
//                      }
//                     res.send(data_team);
//                  })
//                 }
//             else
//             {
//                 dao.updateTeamIUserdNull(req.body.teamId, (inRes) =>  {
//                     if (err) {
//                         console.error(err);
//                         data_person.status=0;               
//                      }
//                     else{
//                         data_person.status=1;
//                      }
//                     res.send(data_person);
//                  })
//             }    
//     })

// //踢人
// router.post('/memberDelete',(req,res)=>{
//     let data={
//         status: 0 //0：失败；1：成功
//     }
//     //console.log(req.body);
//     dao.updateUserTeamIdNull(infoRes,(valueRes) => {
//         if (err) {
//             console.error(err);
//             data.status=0;               
//          }
//         else{
//             data.status=1;
//          }
//         res.send(data);
//     })
//     dao.editGroupMumber(infoRes,(valueRes) => {
//         if (err) {
//             console.error(err);
//             data.status=0;               
//          }
//         else{
//             data.status=1;
//          }
//         res.send(data);
//     })
// })

router.post('/pick', (req, res) => {
    // console.log(req.body.nickName);
    let data = {
        userId: '',
        status: 0,
        background: 'bg00.jpg',
        word: 'wd00.png',
        qrCode: 'qr00.png',
        // card: 'cd01.png',
        // nickName: '',
        mode: 1
    }
    let createTime = new Date();
    let userId = createTime.getTime() + '-' + (Math.floor(Math.random() * 900) + 100);
    if (req.body.userId == '') {
        data.userId = userId;
    } else {
        data.userId = req.body.userId;
    }

    let bgValue = 0;
    let wdClass = 0;
    let wdValue = 0;
    switch (parseInt(req.body.card)) {
        case 0:
            wdClass = 9;
            wdValue = parseInt(userId.substr(12, 1) + userId.substr(11, 1) + userId.substr(10, 1)) % 17;
            bgValue = parseInt(userId.substr(12, 1) + userId.substr(11, 1) + userId.substr(10, 1)) % 2;
            data.qrCode = 'qr90.png';
            data.background = 'bg9' + bgValue + '.jpg';
            break;
        case 1:
            wdClass = 2;
            wdValue = parseInt(userId.substr(12, 1) + userId.substr(11, 1) + userId.substr(10, 1)) % 17;
            bgValue = parseInt(userId.substr(12, 1) + userId.substr(11, 1) + userId.substr(10, 1)) % 2;
            data.background = 'bg0' + bgValue + '.jpg';
            break;
        case 2:
            wdClass = 0;
            wdValue = parseInt(userId.substr(12, 1) + userId.substr(11, 1) + userId.substr(10, 1)) % 13;
            bgValue = parseInt(userId.substr(12, 1) + userId.substr(11, 1) + userId.substr(10, 1)) % 8;
            data.background = 'bg0' + bgValue + '.jpg';
            break;
        case 3:
            wdClass = 1;
            wdValue = parseInt(userId.substr(12, 1) + userId.substr(11, 1) + userId.substr(10, 1)) % 11;
            bgValue = parseInt(userId.substr(12, 1) + userId.substr(11, 1) + userId.substr(10, 1)) % 2;
            data.background = 'bg0' + bgValue + '.jpg';
            break;
        default:
            wdClass = parseInt(userId.substr(10, 3)) % 3;
            wdValue = parseInt(userId.substr(12, 1) + userId.substr(11, 1) + userId.substr(10, 1)) % 8;
            bgValue = parseInt(userId.substr(12, 1) + userId.substr(11, 1) + userId.substr(10, 1)) % 2;
            data.background = 'bg0' + bgValue + '.jpg';
    }
    // data.background = 'bg0' + bgValue + '.jpg';
    // data.word = 'wd' + wdClass + wdValue + '.png';
    data.word = 'wd' + wdClass + wdValue + '.png';
    if (data.word == 'wd06.png') {
        data.background = 'bg05.jpg';
    }
    // data.card = req.body.card;
    // let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress.replace(/^.*:/, '');
    let ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress.replace(/^.*:/, '') || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0];
    }
    dao.pick(userId, req.body.nickName, req.body.avatarUrl, data.background, data.word, req.body.card, req.body.userId, req.body.scene, ip, createTime, (err) => {
        if (err) {
            data.status = 1,
                res.send(data);
        } else {
            res.send(data);
        }
    });
});
module.exports = router;