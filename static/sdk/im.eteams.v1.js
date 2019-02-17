
(function($) {

    var wsUrl;
    var wsIdleTime = 30;
    var msgMaxNum = '20';
    var msgMaxId = '9223372036854775807';
    var imWebDev = window.imClientDev;
    //持久化回调函数，主要是用于做推送消息
    var staticImResArray = ['15101','15106','15509','15301',
        '15306','15401','15404', '15604','15010','15112','15305',
        '15310', '15315', '15509','15409', '15416', '15420', '15422','15424', '15607', '15610',
        '15220', '15212', '15202','15213','15214', '15224', '15226','15903', '15910'
    ];
    var groupCreateSource = '0';//用户默认创建渠道
    var receiverdDatas = true;
    $.imStaticAtomNum = 0;
    $.imViewInitMethods =  function ImViewInitMethods() {};
    var currentUser;//当前人员
    $.imWebsocketTime = {};
    $.imErrorQuest = {};

    $.imSdkConfig = {
        isConnecting : false,
        heartBeatReceiveTime : new Date().getTime(),
        reconnectCount : 0,
        reqRetryCount : 0,
        retryTimesArray : [0, 0, 0, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 10000, 10000],//重连接时间数组
        requestCmdRetry : [15103, 15302, 15402],//重连接时间数组
        // retryTimesArray : [0, 100, 100, 100, 100, 100, 100, 100, 100, 100],//重连接时间数组
        imNeedReconnect : true,
        wsUrl : undefined,
        retryCmd : ['15001'],
        allowRet : ['0','100','1103','1505', '1211'],
        lastSendTime : 0,
        sendEmptyTime : 60 * 1000
    };
    $.imReconnectFunc = {};

    $.imWebsocketCallback = {
        imCallback15007 : function (data) {
        },
        // imCallback15101 : function (data) {
        //     var message = data.message;
        //     var params = {};
        //     params['uid'] = window.imCurrentUser.uid;
        //     params['cid'] = window.imCurrentUser.cid;
        //
        //     if(window.imCurrentUser.uid == message.from_uid){
        //         params['fromUid'] = message.to_uid;
        //         params['fromCid'] = message.to_cid;
        //     } else {
        //         params['fromUid'] = message.from_uid;
        //         params['fromCid'] = message.from_cid;
        //     }
        //     params['msgId'] = message.msgid;
        //     staticImRequestMethods.activeSyncSingleMsgReq(params);
        // },

        imCallback15301 : function (data){
            var message = data.message;
            var params = {};
            params['uid'] = window.imCurrentUser.uid;
            params['cid'] = window.imCurrentUser.cid;
            params['groupId'] = message.group_id;
            params['groupType'] = '0';
            params['msgId'] = message.ser_msgid;
            staticImRequestMethods.activeSyncGroupMsgReq(params);
        },

        imCallback15401 : function (data){
            var message = data.message;
            if(message.from_uid != window.imCurrentUser.uid){
                var params = {};
                params['uid'] = window.imCurrentUser.uid;
                params['cid'] = window.imCurrentUser.cid;
                params['dev'] = window.imClientDev;
                params['msgType'] =  message.msg_type;
                params['msgId'] = message.msgid;
                staticImRequestMethods.activeSyncSysMsgReq(params, $.imWebsocketCallback['imCallback15405-0']);
            }
        }
    };

    $.imWebsocket = function (wsParams, currentUserParam, connectCallbackParam) {
        console.log('正在连接im websocket');
        var connectCallback = connectCallbackParam;
        $.imSdkConfig['wsUrl'] = wsParams['wsUrl'];
        if(wsParams['wsIdleTime']){
            wsIdleTime = wsParams['wsIdleTime'] - 3;
        }
        currentUser = currentUserParam;
        //连接websocket
        var imWsConnect = function (wsUrl) {
            window.imSocket = new WebSocket($.imSdkConfig['wsUrl']);
            if(window.imSocket && window.imSocket.readyState == 0){
                console.log('websocket链接成功');
                buildWebsocket(window.imSocket);

                $.imSdkConfig['isConnecting'] = false;
                console.log('建立心跳');
                clearInterval(window.imWsHeartBeatsId);
                window.imWsHeartBeatsId = setInterval(function () {
                    if(TEAMS.imLogSwitch){
                        console.log('im heart beats :' + wsIdleTime);
                    }

                    if(window.imCurrentUser){
                        var params = {
                            uid : window.imCurrentUser.uid,
                            cid : window.imCurrentUser.cid
                        };
                        staticImRequestMethods.wsHeartBeats(params);
                    }
                }, wsIdleTime * 1000);
                return true;
            }
            return false;
        };
        var imReconnect = function (wsUrl) {
            if(!$.imSdkConfig['isConnecting'] && $.imSdkConfig['imNeedReconnect']){
                console.log('断线重连');
                // window.imSocket.close();
                $.imReconnectFunc['imRetryConnect']($.imSdkConfig['wsUrl']);
            }
        };

        $.imReconnectFunc['imRetryConnect'] = function (wsUrl) {

            if($.imSdkConfig['reconnectCount'] < 20){
                $.imSdkConfig['isConnecting'] = true;

                console.log('try to connect '+ $.imSdkConfig['reconnectCount'] + " times");
                var j =  $.imSdkConfig['reconnectCount'];


                if(j > $.imSdkConfig['retryTimesArray'].length){
                    j = $.imSdkConfig['retryTimesArray'].length - 1;

                }
                var retryTime = $.imSdkConfig['retryTimesArray'][j];
                retryTime = retryTime + parseInt(Math.random() * 2000);

                if($.imSdkConfig['reconnectCount'] > 11){
                    $('body').trigger('imInitConnectView');
                }
                setTimeout(function () {
                    imWsConnect($.imSdkConfig['wsUrl']);
                }, retryTime);
            } else {
                $.imSdkConfig['isConnecting'] = false;
            }
            $.imSdkConfig['reconnectCount'] ++;
        };

        $.imReconnectFunc['checkImRetryTime'] = function () {
            if($.imSdkConfig.lastSendTime > 0){
                var emptyTime = new Date().getTime() - $.imSdkConfig.lastSendTime;
                if(emptyTime > $.imSdkConfig.sendEmptyTime){
                    console.log("socket down");
                    $.imSdkConfig['reconnectCount'] = 0;
                    // window.imSocket.close();
                }
            }
            $.imSdkConfig.lastSendTime = new Date().getTime();
        };

        var initWebsocket = function(wsUrl){
            imWsConnect(wsUrl);
            if(!window.imSocket || window.imSocket.readyState != 0){
                imReconnect(wsUrl);
            }
        };

        var buildWebsocket = function () {
            window.imSocket.onmessage = function (event) {

                receiverdDatas = true;
                var resData = JSON.parse(event.data);
                //重试队列
                $.imErrorQuest[resData.headProtocol.seq] = undefined;
                if(JSON.stringify($.imErrorQuest).length < 3 ){
                    $.imErrorQuest = {};
                }
                $.imSdkConfig['heartBeatReceiveTime'] = new Date().getTime();
                if(resData.headProtocol.cmd != '0') {//0就是心跳
                    if(resData.headProtocol.cmd == '15010') {
                        resData.message = JSON.parse(resData.message);
                        $.imSdkConfig['imNeedReconnect'] = false;
                        console.log('强制下线');
                        imResponse(resData);
                    } else if($.imSdkConfig['retryCmd'].indexOf(resData.headProtocol.cmd) > -1) {
                        resData.message = JSON.parse(resData.message);
                        console.log(resData);
                        imResponse(resData);
                    } else {

                        resData.message=resData.message.replace(/\n/g,"\\n");
                        resData.message=resData.message.replace(/}\\n/g,"}");
                        resData.message = JSON.parse(resData.message);
                        if($.imSdkConfig['allowRet'].indexOf(resData.message.ret) > -1) {
                            console.log('cmd:'+resData.headProtocol.cmd+'  请求失败，错误返回信息：' +JSON.stringify(resData.message));
                        } else {
                            if(TEAMS.imLogSwitch){
                                console.log(resData);
                            }
                            imResponse(resData);
                        }
                    }

                } else {


                    if(TEAMS.imLogSwitch){
                        console.log('心跳回包');
                    }
                }
            };
            window.imSocket.onopen = function (event) {
                $.imSdkConfig['imNeedReconnect'] = true;
                $.imSdkConfig['heartBeatReceiveTime'] = new Date().getTime();
                connectCallback();
            };

            window.imSocket.onclose = function (event) {
                console.log('心跳结束');
                window.imSocket.close();
                window.imSocket == undefined;
                clearInterval(window.imWsHeartBeatsId);
                if($.imSdkConfig['reconnectCount'] > 5){
                    $.imSdkConfig['reconnectCount'] = 0;
                    $.imSdkConfig['isConnecting'] = false;
                }
                if(!$.imSdkConfig['isConnecting'] && $.imSdkConfig['imNeedReconnect']){
                    console.log('断线重连');
                    $.imReconnectFunc['imRetryConnect']();
                }


            };
            //根据返回值,触发协议的回调方法
            var imResponse = function (resData) {
                var headProtocal = resData.headProtocol;


                // var imCallbackName = 'imCallback' + headProtocal.cmd;
                // if (staticImResArray.indexOf(headProtocal.cmd) < 0) {
                //     imCallbackName += 'seq-' + headProtocal.seq;
                // }

                var imCallbackName = 'imCallback' + headProtocal.cmd + 'seq-' + headProtocal.seq;
                if (!$.imWebsocketCallback[imCallbackName]) {
                    imCallbackName = 'imCallback' + headProtocal.cmd;
                }

                if (undefined == $.imWebsocketCallback[imCallbackName]) {
                    // console.log("warn: im-response callback is undefined,  cmd:" + headProtocal.cmd);
                    return;
                }
                if ($.imWebsocketTime[imCallbackName]) {
                    // console.log("spend time, " + imCallbackName + ": " + (new Date().getTime() - $.imWebsocketTime[imCallbackName]) + "ms");
                }
                $.imWebsocketCallback[imCallbackName](resData);

                if (staticImResArray.indexOf(headProtocal.cmd) < 0) {
                    $.imWebsocketCallback[imCallbackName] = undefined;
                }

            };
        };

        initWebsocket($.imSdkConfig['wsUrl'], window.imSocket);
    };

    //请求失败的包，进行请求重试
    $.imDoErrorRequest =  function () {
        var imErrorQuest = $.imErrorQuest;
        if(imErrorQuest){
            var j = 0;
            for(var i in imErrorQuest){
                var requestTemp = imErrorQuest[parseInt(i)];
                if(requestTemp){
                    if( $.imSdkConfig['requestCmdRetry'].indexOf(requestTemp.headProtocol.cmd) > -1) {
                        if(j < 3){//最多只发5次重试请求
                            console.log("断线请求重试："+JSON.stringify(requestTemp));
                            window.imSocket.send(JSON.stringify(requestTemp));
                            j++;
                        } else {
                            j = 0;
                            $.imErrorQuest = {};
                            break;
                        }

                    }
                }
            }
            $.imErrorQuest = {};
        }
    };

    var staticImUtils = new ImUtils();
    var staticImRequestMethods = new ImRequestMethods();

    //im-sdk初始化化方法, 用于dom对象绑定
    $.initEteamsIm = function(imResponseCallBackParam) {
        return new Constructor(imResponseCallBackParam);
    };

    // ------------------------------------------------------Constructor构造方法集定义-----------------------------------------------------------------------
    //sdk初始化构造
    function Constructor(imResponseCallBackParam) {
        Constructor.prototype.imResponseCallBack = imResponseCallBackParam;
    }
    Constructor.prototype.imUtils = new ImUtils();//工具方法集
    Constructor.prototype.imRequestMethods = new ImRequestMethods();//im请求方法集

    // ------------------------------------------------------ImRequestMethods  im请求方法集定义-----------------------------------------------------------------------
    function ImRequestMethods() {
    }
    //发出登入请求 15001
    ImRequestMethods.prototype.loginReq = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var tokenStr = params['tokenStr'];
        var global = params['global'];
        var sak = params['sak'];
        var dev = window.imClientDev;
        if (params['dev']) {
            dev = params['dev'];
        }
        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, 15001);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var bodyProtocol = {
            uid : uid,
            cid : cid,
            dev : dev,
            token : tokenStr,
            sak : sak
        };

        if(global){
            bodyProtocol.global = global;
        }

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };

        receiverdDatas = false;
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };
    //发出登出请求 15002
    ImRequestMethods.prototype.logoutReq = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var cmd = 15002;
        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);
        var transid = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };



    //获取用户状态 15003
    ImRequestMethods.prototype.getStatusReq = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var users = params['users'];
        var cmd = 15003;
        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);
        var transid = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transid : transid,
            users : users,
            mask : '7'
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //获取用户状态 15011
    ImRequestMethods.prototype.statusChangeReq = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var data = params['data'];
        var cmd = 15011;
        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);
        var transid = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transid : transid,
            data : data
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //获取用户状态 15003
    ImRequestMethods.prototype.getStatusReq = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var users = params['users'];
        var cmd = 15003;
        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);
        var transid = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transid : transid,
            users : users,
            mask : '7'
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };


    //发送心跳  cmd : 0
    ImRequestMethods.prototype.wsHeartBeats = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, 0);

        var imRequestCommon = {
            "headProtocol": headProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //发出单人聊天  15100
    ImRequestMethods.prototype.sendSingleMsgReq = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var cmd = 15100;
        var toCid = params['toCid'];
        var toUid = params['toUid'];
        var msg = params['msg'];
        var subtitle = params['subtitle'];
        var msgTypeConf = params['msgTypeConf'];
        var dev = params['dev'];


        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var cliMsgId = transId;
        var bodyProtocol = {
            toUid : toUid,
            toCid : toCid,
            transId : transId,
            cliMsgId :cliMsgId,
            msg : msg,
            title : subtitle,
            kind : msgTypeConf,
            dev : dev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };

        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //发出单人聊天同步请求  15103
    ImRequestMethods.prototype.syncSingleMsgReq = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var syncMsgUsers = params['syncMsgUsers'];
        var order = 'desc';
        if(params['order']){
            order = params['order'];
        }

        // var maxNum = msgMaxNum;
        // if(params['maxNum']){
        //     maxNum = params['maxNum'];
        // }
        var dataList =  [];
        for(var i=0 ; i < syncMsgUsers.length ; i++){
            var tempStart;
            var tempEnd;
            var tempMaxNum = msgMaxNum;
            if(syncMsgUsers[i].maxNum && parseInt(syncMsgUsers[i].maxNum) <= 20 ){
                tempMaxNum = syncMsgUsers[i].maxNum;
            }
            if(syncMsgUsers[i].start){
                tempStart = syncMsgUsers[i].start;
            }
            switch (order){
                case 'desc':
                    tempStart = msgMaxId;
                    if(syncMsgUsers[i].start){
                        tempStart = syncMsgUsers[i].start;
                    }
                    tempEnd = '0';
                    break;
                case 'asc':
                    tempStart = '0';
                    if(syncMsgUsers[i].start){
                        tempStart = syncMsgUsers[i].start;
                    }
                    tempEnd = msgMaxId;
                    break;
                default:
                    tempStart = '0';
                    if(syncMsgUsers[i].start){
                        tempStart = syncMsgUsers[i].start;
                    }
                    tempEnd = msgMaxId;
                    break;
            }

            var tempRequest = {
                fromCid : syncMsgUsers[i].fromCid,
                fromUid : syncMsgUsers[i].fromUid,
                start : tempStart,
                end : tempEnd,
                maxNum : tempMaxNum
            };
            dataList.push(tempRequest);
        }

        var cmd = 15103;
        if(params['cmd']){
            cmd = params['cmd'];
        }
        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            datas : dataList
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //获取单人消息阅读状态，只获取自己发送的消息，指定到具体每条消息  15104
    ImRequestMethods.prototype.getSingleMsgReadStatusReq  = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var user = params['user'];
        var msgIds = params['msgIds'];
        var recvMsgIds = params['recvMsgIds'];
        var cmd = 15104;

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            user : user
        };

        if(msgIds){
            bodyProtocol.msgIds = msgIds;
        }
        if(recvMsgIds){
            bodyProtocol.recvMsgIds = recvMsgIds;
        }

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };


    //获取单人消息阅读状态，只获取自己发送的消息，指定到具体每条消息  15915
    ImRequestMethods.prototype.getHelperMsgReadStatusReq  = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var user = params['user'];
        var msgIds = params['msgIds'];
        var recvMsgIds = params['recvMsgIds'];
        var cmd = 15915;

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            user : user
        };

        if(msgIds){
            bodyProtocol.msgIds = msgIds;
        }
        if(recvMsgIds){
            bodyProtocol.recvMsgIds = recvMsgIds;
        }

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //设置单人消息阅读状态，指定到具体每条消息  15105
    ImRequestMethods.prototype.setSingleMsgReadStatusReq  = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var user = params['user'];
        var msgIds = params['msgIds'];
        var dev = window.imClientDev;

        var cmd = 15105;

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            user : user,
            msgIds : msgIds,
            dev : dev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };
    //设置单人消息阅读状态，指定到具体每条消息  15914
    ImRequestMethods.prototype.setHelperMsgReadStatusReq  = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var user = params['user'];
        var msgIds = params['msgIds'];
        var dev = window.imClientDev;

        var cmd = 15914;

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            user : user,
            msgIds : msgIds,
            dev : dev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //同步指定单人消息  15107
    ImRequestMethods.prototype.activeSyncSingleMsgReq  = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var cmd = 15107;
        var fromCid = params['fromCid'];
        var fromUid = params['fromUid'];
        var msgId = params['msgId'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            fromCid : fromCid,
            fromUid : fromUid,
            msgId : msgId
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };


    //按类型同步指定单人消息  15110
    ImRequestMethods.prototype.syncKindSingleMsgReq  = function(params, callback) {
        var cmd = 15110;
        var cid = params['cid'];
        var uid = params['uid'];
        var dev = params['dev'];
        var user = params['user'];
        var start = params['start'];
        var end = params['end'];
        var kind = params['kind'];
        var maxNum = params['maxNum'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            dev : dev,
            user : user,
            start : start,
            end : end,
            kind : kind,
            maxNum : maxNum
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //单人消息撤回  15111
    ImRequestMethods.prototype.makeSingleMsgWithdrawReq  = function(params, callback) {
        var cmd = 15111;
        var cid = params['cid'];
        var uid = params['uid'];
        var dev = params['dev'];
        var user = params['user'];
        var msgId = params['msgId'];
        var msg = params['msg'];
        var kind = params['kind'];
        var title = params['title'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            dev : dev,
            user : user,
            msgId : msgId,
            msg : msg,
            kind : kind,
            title : title
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //单人消息撤回  15911
    ImRequestMethods.prototype.helperMsgRecallReq = function(params, callback) {
        var cmd = 15911;
        var cid = params['cid'];
        var uid = params['uid'];
        var dev = params['dev'];
        var user = params['user'];
        var msgId = params['msgId'];
        var msg = params['msg'];
        var kind = params['kind'];
        var title = params['title'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            dev : dev,
            user : user,
            msgId : msgId,
            msg : msg,
            kind : kind,
            title : title
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //单人消息撤回  15912
    ImRequestMethods.prototype.hgMsgRecallReq = function(params, callback) {
        var cmd = 15912;
        var cid = params['cid'];
        var uid = params['uid'];
        var dev = params['dev'];
        var groupId = params['groupId'];
        var type = params['type'];
        var msgId = params['msgId'];
        var msg = params['msg'];
        var kind = params['kind'];
        var title = params['title'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            dev : dev,
            groupId : groupId,
            type : type,
            msgId : msgId,
            msg : msg,
            kind : kind,
            title : title
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };


    //按类型同步指定单人消息  15110
    ImRequestMethods.prototype.syncKindSingleMsgReq  = function(params, callback) {
        var cmd = 15110;
        var cid = params['cid'];
        var uid = params['uid'];
        var dev = params['dev'];
        var user = params['user'];
        var start = params['start'];
        var end = params['end'];
        var kind = params['kind'];
        var maxNum = params['maxNum'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            dev : dev,
            user : user,
            start : start,
            end : end,
            kind : kind,
            maxNum : maxNum
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //创建群组  15200
    ImRequestMethods.prototype.createGroupReq = function(params, callback) {
        var cmd = 15200;
        var cid = params['cid'];
        var uid = params['uid'];
        var createSource = groupCreateSource;
        if(params['createSource']){
            createSource = params['createSource'];
        }
        var name = params['name'];
        var type = params['type'];
        var transfer = params['transfer'];
        var users = params['users'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            createSource : createSource,
            name : name,
            transfer : transfer,
            type : type,
            users : users
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //邀请加入群组  15201
    ImRequestMethods.prototype.inviteToGroupReq = function(params, callback) {
        var cmd = 15201;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var type = params['type'];
        var users = params['users'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            type : type,
            users : users,
            dev : imWebDev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //退出群组 15203
    ImRequestMethods.prototype.exitGroupReq = function(params, callback) {
        var cmd =15203;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var type = params['type'];
        var dev = params['dev'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            type : type,
            dev : dev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //踢出群组 15204
    ImRequestMethods.prototype.kickGroupMemberReq = function(params, callback) {
        var cmd = 15204;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var type = params['type'];
        var users = params['users'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            users : users,
            type : type
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };


    //修改群组 15206
    ImRequestMethods.prototype.modifyGroupInfoReq = function(params, callback) {
        var cmd = 15206;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var type = params['type'];
        var mask = params['mask'];
        var info = params['info'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            info : info,
            mask : mask,
            type : type,
            dev : window.imClientDev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //请求群组列表 15207
    ImRequestMethods.prototype.syncGroupListReq = function(params, callback) {
        var cmd = 15207;
        var cid = params['cid'];
        var uid = params['uid'];
        var type = params['type'];
        var clientUc = params['clientUc'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            type : type,
            clientUc : clientUc
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //请求群组列表 15208
    ImRequestMethods.prototype.syncGroupMemberListReq = function(params, callback) {
        var cmd = 15208;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var type = params['type'];
        var syncType = params['syncType'];
        var memberMask = params['memberMask'];
        var clientUc = params['clientUc'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            type : type,
            syncType : syncType,
            memberMask : memberMask,
            clientUc : clientUc
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //请求群组详情 15209
    ImRequestMethods.prototype.getGroupInfoReq = function(params, callback) {
        var cmd = 15209;
        var cid = params['cid'];
        var uid = params['uid'];
        var type = params['type'];
        var mask = params['mask'];
        var groupIdList = params['groupIdList'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            type : type,
            mask : mask,
            groupIdList : groupIdList
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //请求群组详情 15210
    ImRequestMethods.prototype.syncGroupListByPageReq = function(params, callback) {
        var cmd = 15210;
        var cid = params['cid'];
        var uid = params['uid'];
        var type = '0';
        if(params['type']){
            type = params['type'];
        }
        var pageSize = '10';
        if(params['pageSize']){
            pageSize = params['pageSize'];
        }
        var addTime = 0;
        if(params['addTime']){
            addTime = params['addTime'];
        }

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            type : type,
            addTime : addTime,
            pageSize : pageSize
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //搜索群组列表 15211
    ImRequestMethods.prototype.searchGroupReq = function(params, callback) {
        var cmd = 15211;
        var cid = params['cid'];
        var uid = params['uid'];
        var type = params['type'];
        var name = params['name'];
        var mask = params['mask'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            type : type,
            name : name,
            mask : mask
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //根据版本号拉取群信息 15217
    ImRequestMethods.prototype.getGroupInfoUcReq = function(params, callback) {
        var cmd = 15217;
        var cid = params['cid'];
        var uid = params['uid'];
        var type = '0';
        if(params['type']){
            type = params['type'];
        }
        var groups = params['groups'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            type : type,
            groups : groups
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //判断是否在群内 15218
    ImRequestMethods.prototype.isGroupMemberReq = function(params, callback) {
        var cmd = 15218;
        var cid = params['cid'];
        var uid = params['uid'];
        var type = params['type'];
        var groupIds = params['groupIds'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            type : type,
            groupIds : groupIds
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    // 修改群组头像 cmd:15219
    ImRequestMethods.prototype.modifyGroupAvatarReq = function(params, callback) {
        var cmd = 15219;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var avatar = params['avatar'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            avatar : avatar,
            dev : window.imClientDev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };
    // 获取群操作记录请求 cmd:15221
    ImRequestMethods.prototype.getGroupOperNoteReq = function(params, callback) {
        var cmd = 15221;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var id = '0';
        if(params['id']){
           id = params['id'];
        }

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            id : id
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    // 获取群操作记录关联请求 cmd:15222
    ImRequestMethods.prototype.getGroupOperRelReq = function(params, callback) {
        var cmd = 15222;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var id = '0';
        if(params['id']){
           id = params['id'];
        }

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            id : id
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    // 设置群管理员 cmd:15223
    ImRequestMethods.prototype.setGroupAdminReq = function(params, callback) {
        var cmd = 15223;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var users = params['users'];
        var flag = params['flag'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            users : users,
            flag : flag,
            dev : window.imClientDev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    // 设置群组阅读状态开关 cmd:15225
    ImRequestMethods.prototype.setGroupRSOnOffReq = function(params, callback) {
        var cmd = 15225;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var rsOnOff = params['rsOnOff'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            rsOnOff : rsOnOff,
            dev : window.imClientDev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //发送群消息 15300
    ImRequestMethods.prototype.sendGroupMsgReq = function(params, callback) {

        var cmd = 15300;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var type = params['type'];
        var msg = params['msg'];
        var subtitle = params['subtitle'];
        var msgTypeConf = params['msgTypeConf'];
        var dev = params['dev'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var cliMsgId = transId;
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            type : type,
            msg : msg,
            title : subtitle,
            kind : msgTypeConf,
            dev : dev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //同步群消息 15302
    ImRequestMethods.prototype.syncGroupMsgReq = function(params, callback) {
        var cmd = 15302;
        var cid = params['cid'];
        var uid = params['uid'];
        var type = params['type'];
        var datas = params['datas'];
        var order = 'desc';
        if(params['order']){
            order = params['order'];
        }

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());

        var dataList =  [];
        for(var i=0 ; i < datas.length ; i++){
            var tempStart;
            // var maxNum = msgMaxNum;
            var tempMaxNum = msgMaxNum;
            if(datas[i].maxNum && parseInt(datas[i].maxNum) <= 20 ){
                tempMaxNum = datas[i].maxNum;
            }
            if(datas[i].start){
                tempStart = datas[i].start;
            }

            var tempEnd;
            switch (order){
                case 'desc':
                    tempStart = msgMaxId;
                    if(datas[i].start){
                        tempStart = datas[i].start;
                    }
                    tempEnd = '0';
                    break;
                case 'asc':
                    tempStart = '0';
                    if(datas[i].start){
                        tempStart = datas[i].start;
                    }
                    tempEnd = msgMaxId;
                    break;
                default:
                    tempStart = '0';
                    if(datas[i].start){
                        tempStart = datas[i].start;
                    }
                    tempEnd = msgMaxId;
                    break;
            }

            var tempData = {
                groupId : datas[i].groupId,
                start : tempStart,
                end : tempEnd,
                maxNum : tempMaxNum
            };
            dataList.push(tempData);
        }

        var bodyProtocol = {
            transId : transId,
            type : type,
            datas : dataList
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //发送@相关信息 15303
    ImRequestMethods.prototype.sendAtInfoReq = function(params, callback) {
        var cmd = 15303;
        var cid = params['cid'];
        var uid = params['uid'];
        var type = params['type'];
        var serMsgId = params['serMsgId'];
        var groupId = params['groupId'];
        var users = params['users'];
        var remindFlag = params['remindFlag'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            type : type,
            groupId : groupId,
            serMsgId : serMsgId,
            users : users
        };

        if(remindFlag){
            bodyProtocol.remindFlag = remindFlag;
        }
        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };


    //同步指定群组消息 15306
    ImRequestMethods.prototype.activeSyncGroupMsgReq = function(params, callback) {
        var cmd = 15306;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var groupType = params['groupType'];
        var msgId = params['msgId'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            type : groupType,
            msgId : msgId
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //同步指定群组消息 15308
    ImRequestMethods.prototype.syncKindGroupMsgReq = function(params, callback) {
        var cmd = 15308;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var groupType = params['groupType'];

        var dev = params['dev'];
        var user = params['user'];
        var start = params['start'];
        var end = params['end'];
        var kind = params['kind'];
        var maxNum = params['maxNum'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            type : groupType,
            dev : dev,
            user : user,
            start : start,
            end : end,
            kind : kind,
            maxNum : maxNum
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //群组消息撤回  15309
    ImRequestMethods.prototype.makeGroupMsgWithdrawReq  = function(params, callback) {
        var cmd = 15309;
        var cid = params['cid'];
        var uid = params['uid'];
        var dev = params['dev'];
        var groupId = params['groupId'];
        var type = params['type'];
        var msgId = params['msgId'];
        var msg = params['msg'];
        var kind = params['kind'];
        var title = params['title'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            dev : dev,
            groupId : groupId,
            type : type,
            msgId : msgId,
            msg : msg,
            kind : kind,
            title : title
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };


    // 获取群消息阅读状态，指定到具体每条消息 cmd:15311
    ImRequestMethods.prototype.getGroupMsgReadStatusReq  = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var msgIds = params['msgIds'];
        var recvMsgIds = params['recvMsgIds'];
        var cmd = 15311;

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId
        };

        if(msgIds){
            bodyProtocol.msgIds = msgIds;
        }
        if(recvMsgIds){
            bodyProtocol.recvMsgIds = recvMsgIds;
        }

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    // 获取群消息阅读详情 cmd:15312
    ImRequestMethods.prototype.getGroupMsgReadDetailReq  = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var msgId = params['msgId'];
        var dev = window.imClientDev;

        var cmd = 15312;

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            msgId : msgId
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    /**
     * 屏蔽群消息 
     * @param {object} params 
     * @param {string} cid 
     * @param {string} uid 
     * @param {string} dev 
     * @param {string} groupId 
     * @param {string} type 
     * @param {string} msgId 
     * @param {string} msg 
     * @param {string} kind 
     * @param {string} title 
     * @param {function} callback 
     */
    ImRequestMethods.prototype.maskGroupMsg = function (params, callback) {
        var cmd = 15314;
        var cid = params['cid'];
        var uid = params['uid'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid, cid);
        var bodyProtocol = {
            transId: staticImUtils.getImTransId(cmd.toString()),
            dev: params['dev'],
            groupId: params['groupId'],
            type: params['type'],
            msgId: params['msgId'],
            msg: params['msg'],
            kind: params['kind'],
            title: params['title']
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //设置群消息阅读状态cmd:15304
    ImRequestMethods.prototype.setGroupMsgReadStatusReq  = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var msgIds = params['msgIds'];
        var dev = window.imClientDev;

        var cmd = 15304;

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            msgIds : msgIds,
            dev : dev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //设置群消息阅读状态cmd:15916
    ImRequestMethods.prototype.setHgMsgReadStatusReq  = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var msgIds = params['msgIds'];
        var dev = window.imClientDev;

        var cmd = 15916;

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            msgIds : msgIds,
            dev : dev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };


    //发送系统聊天消息 15400
    ImRequestMethods.prototype.sendSysMsgReq = function(params, callback) {
        var cmd = 15400;
        var cid = params['cid'];
        var uid = params['uid'];
        var cliMsgId = params['cliMsgId'];
        var msg = params['msg'];
        var users = params['users'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            cliMsgId : cliMsgId,
            msg : msg,
            users : users
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };


    //同步系统消息 15402
    ImRequestMethods.prototype.syncSysMsgReq = function(params, callback) {
        var cmd = 15402;
        var cid = params['cid'];
        var uid = params['uid'];
        var dev = params['dev'];
        var order = params['order'];
        var flag = params['flag'];
        var datas = params['datas'];

        var dataList =  [];
        for(var i = 0 ; i < datas.length; i++){
            var tempStart;
            var tempEnd;
            var maxNum = msgMaxNum;
            if(datas[i].maxNum){
                maxNum = datas[i].maxNum;
            }
            switch (order){
                case 'desc':
                    tempStart = msgMaxId;
                    if(datas[i].start){
                        tempStart = datas[i].start;
                    }
                    tempEnd = '0';
                    break;
                case 'asc':
                    tempStart = '0';
                    if(datas[i].start){
                        tempStart = datas[i].start;
                    }
                    tempEnd = msgMaxId;
                    break;
                default:
                    tempStart = '0';
                    if(datas[i].start){
                        tempStart = datas[i].start;
                    }
                    tempEnd = msgMaxId;
                    break;
            }

            var tempData = {
                msgType : datas[i].msgType,
                start : tempStart,
                end : tempEnd,
                maxNum : maxNum
            };

            dataList.push(tempData);
        }

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid, cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            dev : dev,
            datas : dataList,
            flag : flag
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //设置系统消息已读 15403
    ImRequestMethods.prototype.setSysMsgReadStatusReq = function(params, callback) {
        var cmd = 15403;
        var cid = params['cid'];
        var uid = params['uid'];
        var datas = params['datas'];
        var taskId = params['taskId'];
        var sgroup = params['sgroup'];
        var flag = params['flag'];
        var dev = window.imClientDev;
        if(params['dev']){
            dev = params['dev'];
        }

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            flag : flag,
            dev : dev
        };


        switch (flag){
            case '1' :
                bodyProtocol.taskId = taskId;
                break;
            case '2' :
                bodyProtocol.group = sgroup;
                break;
            case '4' :
                bodyProtocol.group = sgroup;
                bodyProtocol.datas = datas;
                break;
        }

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };


    //收到15401消息后自动同步系统消息 15405
    ImRequestMethods.prototype.activeSyncSysMsgReq = function(params, callback) {
        var cmd = 15405;
        var cid = params['cid'];
        var uid = params['uid'];
        var dev = params['dev'];
        var msgType = params['msgType'];
        var msgId = params['msgId'];


        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid, cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            dev : dev,
            msgType : msgType,
            msgId : msgId
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //同步系统消息最近联系人 15410
    ImRequestMethods.prototype.getSysMsgContactList = function(params, callback) {
        var cmd = 15410;
        var cid = params['cid'];
        var uid = params['uid'];
        var dev = params['dev'];
        var order = params['order'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            dev : dev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //同步系统消息配置 15412
    ImRequestMethods.prototype.getSysMsgGroupTypeUCReq = function(params, callback) {
        var cmd = 15412;
        var cid = params['cid'];
        var uid = params['uid'];
        var gcid = params['gcid'];
        var flag = params['flag'];
        var uc = params['uc'];
        var gtUc = params['gtUc'];
        var datas = params['datas'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            gcid : gcid,
            flag : flag,
            uc : uc,
            gtUc : gtUc
        };

        if(datas && datas.length > 0){
            bodyProtocol.datas = datas;
        }

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //系统消息标记未读 15419
    ImRequestMethods.prototype.setSysMsgUnReadStatusReq = function(params, callback) {
        var cmd = 15419;
        var cid = params['cid'];
        var uid = params['uid'];
        var group = params['group'];
        var type = params['type'];
        var msgId = params['msgId'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            group : group,
            type : type,
            msgId : msgId,
            dev : window.imClientDev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //设置系统消息已读 15501
    ImRequestMethods.prototype.getUserContactByPageRequest = function(params, callback) {
        var cmd = 15501;
        var cid = params['cid'];
        var uid = params['uid'];

        var type = params['type'];
        var time = params['time'];
        var pageSize = params['pageSize'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            type : type,
            time : time,
            pageSize : pageSize
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //设置系统消息已读 15502
    ImRequestMethods.prototype.deleteUserContactReq = function(params, callback) {
        var cmd = 15502;
        var cid = params['cid'];
        var uid = params['uid'];
        var type = params['type'];
        var data = params['data'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            data : data
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };



    //标记未读聊天已读 15602
    ImRequestMethods.prototype.setMsgReadReq = function(params, callback) {
        var cmd = 15602;
        var cid = params['cid'];
        var uid = params['uid'];
        var info = params['info'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            dev : window.imClientDev,
            info : info
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //标记未读聊天已读 15506
    ImRequestMethods.prototype.setSessionReq = function(params, callback) {
        var cmd = 15506;
        var cid = params['cid'];
        var uid = params['uid'];
        var info = params['info'];
        var flag = params['flag'];
        var dev = window.imClientDev;
        if(params['dev']){
            dev = params['dev'];
        }

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            info : info,
            flag : flag,
            dev : dev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //拉取未读消息 15603
    ImRequestMethods.prototype.getNoReadChatMsgCount = function(params, callback) {
        var cmd = 15603;
        var cid = params['cid'];
        var uid = params['uid'];
        var type = params['type'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            type : type

        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //jpush推送 17200
    ImRequestMethods.prototype.sendPushMsgRequest = function(params, callback) {
        var cmd = 17200;
        var cid = params['cid'];
        var uid = params['uid'];
        var targetCid = params['targetCid'];
        var targetUid = params['targetUid'];
        var maxReadMsgId = params['maxReadMsgId'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            targetCid : targetCid,
            targetUid : targetUid,
            maxReadMsgId : maxReadMsgId
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //系统消息获取session 15512
    ImRequestMethods.prototype.getSessionByPageReq = function(params, callback) {
        var cmd = 15512;
        var cid = params['cid'];
        var uid = params['uid'];
        var groups = params['groups'];
        var sessionId = '0';
        var pageSize = '10';
        if(params['pageSize']){
            pageSize = params['pageSize'];
        }
        if(params['sessionId']){
            sessionId = params['sessionId'];
        }
        var sessionType = '0';
        if(params['sessionType']){
            sessionType = params['sessionType'];
        }



        var clientUc = '0';

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            clientUc : clientUc,
            sessionType : sessionType,
            sessionId : sessionId,
            pageSize : pageSize
        };

        if(groups){
            bodyProtocol.groups = groups;
        }

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //同步用户信息请求（指定用户同步）cmd:15513
    ImRequestMethods.prototype.syncUserInfoReq = function(params, callback) {
        var cmd = 15513;
        var cid = params['cid'];
        var uid = params['uid'];
        var mask = params['mask'];
        var users = params['users'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            mask : mask,
            users : users
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };
    // 同步团队信息请求 cmd:15520
    ImRequestMethods.prototype.syncCorpInfoReq = function(params, callback) {
        var cmd = 15520;
        var cid = params['cid'];
        var uid = params['uid'];
        var mask = params['mask'];
        var cids = params['cids'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            mask : mask,
            cids : cids
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //系统消息获取session 15507
    ImRequestMethods.prototype.getSessionByGroupReq = function(params, callback) {
        var cmd = 15507;
        var cid = params['cid'];
        var uid = params['uid'];
        var groups = params['groups'];
        var sessionId = '0';
        var pageSize = '10';
        if(params['pageSize']){
            pageSize = params['pageSize'];
        }
        if(params['sessionId']){
            sessionId = params['sessionId'];
        }
        var sessionType = '0';
        if(params['sessionType']){
            sessionType = params['sessionType'];
        }



        var clientUc = '0';

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            clientUc : clientUc,
            sessionType : sessionType,
            sessionId : sessionId,
            pageSize : pageSize
        };

        if(groups){
            bodyProtocol.groups = groups;
        }

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //系统消息获取session 15504
    ImRequestMethods.prototype.getSessionRequest = function(params, callback) {
        var cmd = 15504;
        var cid = params['cid'];
        var uid = params['uid'];
        var sessionType = '0';
        if(params['sessionType']){
            sessionType = params['sessionType'];
        }

        var clientUc = '0';
        if(params['clientUc']){
            clientUc = params['clientUc'];
        }

        var sessionId = '0';
        if(params['sessionId']){
            sessionId = params['sessionId'];
        }

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            clientUc : clientUc,
            sessionType : sessionType,
            sessionId : sessionId
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };


    //系统消息获取session 15505
    ImRequestMethods.prototype.deleteSessionReq = function(params, callback) {
        var cid = params['cid'];
        var uid = params['uid'];
        var info = params['info'];
        var cmd = 15505;
        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            info : info
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //获取最近联系会话 15511
    ImRequestMethods.prototype.newGetSessionReq = function(params, callback) {
        var cmd = 15511;
        var cid = params['cid'];
        var uid = params['uid'];
        var sessionType = '0';
        if(params['sessionType']){
            sessionType = params['sessionType'];
        }

        var clientUc = '0';
        if(params['clientUc']){
            clientUc = params['clientUc'];
        }

        var sessionId = '0';
        if(params['sessionId']){
            sessionId = params['sessionId'];
        }

        var reqType = '1';
        if(params['reqType']){
            reqType = params['reqType'];
        }
        var msgId = '0';
        if(params['msgId']){
            msgId = params['msgId'];
        }

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            clientUc : clientUc,
            sessionType : sessionType,
            sessionId : sessionId,
            reqType : reqType,
            msgId : msgId
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //获取客户群最近联系会话 15518
    ImRequestMethods.prototype.newGetServiceSessionReq = function(params, callback) {
        var cmd = 15518;
        // var cmd = 15511;
        var cid = params['cid'];
        var uid = params['uid'];

        var clientUc = '0';
        if(params['clientUc']){
            clientUc = params['clientUc'];
        }

        var sessionId = '0';
        if(params['sessionId']){
            sessionId = params['sessionId'];
        }

        var reqType = '1';
        if(params['reqType']){
            reqType = params['reqType'];
        }
        var msgId = '0';
        if(params['msgId']){
            msgId = params['msgId'];
        }

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            clientUc : clientUc,
            // clientUc : '0',
            // sessionType : '0',
            sessionType : '7',
            sessionId : sessionId,
            reqType : reqType,
            msgId : msgId
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //设置消息免打扰信息15606
    ImRequestMethods.prototype.setMsgRemindReq = function(params, callback) {
        var cmd = 15606;
        var cid = params['cid'];
        var uid = params['uid'];
        var remind = params['remind'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            remind : remind,
            dev : window.imClientDev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    // 获取消息免打扰信息
    // 增量更新拉取15608
    ImRequestMethods.prototype.getMsgRemindReq = function(params, callback) {
        var cmd = 15608;
        var cid = params['cid'];
        var uid = params['uid'];
        var cliUc = params['cliUc'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            cliUc : cliUc
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };


    // 个人时间段免打扰功能
    // 设置消息免打扰信息 cmd:15609
    ImRequestMethods.prototype.setMsgRemindTimeReq = function(params, callback) {
        var cmd = 15609;
        var cid = params['cid'];
        var uid = params['uid'];
        var startTime = params['startTime'];
        var endTime = params['endTime'];
        var reminder = params['reminder'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            startTime : startTime,
            endTime : endTime,
            reminder : reminder,
            dev : window.imClientDev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };


    // 客户发送小助手消息 cmd:15901
    ImRequestMethods.prototype.sendHelperMsgReq = function(params, callback) {
        var cmd = 15901;
        var cid = params['cid'];
        var uid = params['uid'];
        var msg = params['msg'];
        var subtitle = params['subtitle'];
        var msgTypeConf = params['msgTypeConf'];
        var dev = params['dev'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var cliMsgId = transId;
        var bodyProtocol = {
            user : {
                uid : '10000',
                cid : '10000'
            },
            transId : transId,
            cliMsgId :cliMsgId,
            msg : msg,
            title : subtitle,
            kind : msgTypeConf,
            dev : dev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };

        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };


    //发送小助手群消息 15902
    ImRequestMethods.prototype.sendCustomMsgReq = function(params, callback) {
        var cmd = 15902;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var type = params['type'];
        var msg = params['msg'];
        var subtitle = params['subtitle'];
        var msgTypeConf = params['msgTypeConf'];
        var dev = params['dev'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            cliMsgId : transId,
            user : {
                uid : '10000',
                cid : '10000'
            },
            groupId : groupId,
            type : type,
            msg : msg,
            title : subtitle,
            kind : msgTypeConf,
            dev : dev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //获取小助手群用户 15904
    ImRequestMethods.prototype.syncHelperGroupListReq = function(params, callback) {
        var cmd = 15904;
        var cid = params['cid'];
        var uid = params['uid'];
        var type = params['type'];
        var clientUc = params['clientUc'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            type : type,
            clientUc : clientUc
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };



    //同步小助手群消息 15905
    ImRequestMethods.prototype.syncHelperGroupMsgReq = function(params, callback) {
        var cmd = 15905;
        var cid = params['cid'];
        var uid = params['uid'];
        var type = params['type'];
        var datas = params['datas'];
        var order = 'desc';
        if(params['order']){
            order = params['order'];
        }

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());

        var dataList =  [];
        for(var i=0 ; i < datas.length ; i++){
            var tempStart;
            // var maxNum = msgMaxNum;
            var tempMaxNum = msgMaxNum;
            if(datas[i].maxNum && parseInt(datas[i].maxNum) <= 20 ){
                tempMaxNum = datas[i].maxNum;
            }
            if(datas[i].start){
                tempStart = datas[i].start;
            }

            var tempEnd;
            switch (order){
                case 'desc':
                    tempStart = msgMaxId;
                    if(datas[i].start){
                        tempStart = datas[i].start;
                    }
                    tempEnd = '0';
                    break;
                case 'asc':
                    tempStart = '0';
                    if(datas[i].start){
                        tempStart = datas[i].start;
                    }
                    tempEnd = msgMaxId;
                    break;
                default:
                    tempStart = '0';
                    if(datas[i].start){
                        tempStart = datas[i].start;
                    }
                    tempEnd = msgMaxId;
                    break;
            }

            var tempData = {
                groupId : datas[i].groupId,
                start : tempStart,
                end : tempEnd,
                maxNum : tempMaxNum
            };
            dataList.push(tempData);
        }

        var bodyProtocol = {
            transId : transId,
            type : type,
            datas : dataList
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };



    //同步指定小助手群组消息 15906
    ImRequestMethods.prototype.activeSyncHelperGroupMsgReq = function(params, callback) {
        var cmd = 15906;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var groupType = params['groupType'];
        var msgId = params['msgId'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            type : groupType,
            msgId : msgId
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //同步指定小助手群组消息 15907
    ImRequestMethods.prototype.syncKindHelpGroupMsgReq = function(params, callback) {
        var cmd = 15907;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var groupType = params['groupType'];

        var dev = params['dev'];
        var user = params['user'];
        var start = params['start'];
        var end = params['end'];
        var kind = params['kind'];
        var maxNum = params['maxNum'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            type : 'GROUPTYPE_N',
            dev : dev,
            user : user,
            start : start,
            end : end,
            kind : kind,
            maxNum : maxNum
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //退出小助手群组 15908
    ImRequestMethods.prototype.exitHelperGroupReq = function(params, callback) {
        var cmd =15908;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupId = params['groupId'];
        var type = params['type'];
        var dev = params['dev'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupId : groupId,
            type : type,
            dev : dev
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    //同步不在群内的群消息 15313
    ImRequestMethods.prototype.syncExistGroupMsgReq = function(params, callback) {
        var cmd = 15313;
        var cid = params['cid'];
        var uid = params['uid'];
        var type = params['type'];
        var datas = params['datas'];
        var order = 'desc';
        if(params['order']){
            order = params['order'];
        }

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());

        var dataList =  [];
        for(var i=0 ; i < datas.length ; i++){
            var tempStart;
            // var maxNum = msgMaxNum;
            var tempMaxNum = msgMaxNum;
            if(datas[i].maxNum && parseInt(datas[i].maxNum) <= 20 ){
                tempMaxNum = datas[i].maxNum;
            }
            if(datas[i].start){
                tempStart = datas[i].start;
            }

            var tempEnd;
            switch (order){
                case 'desc':
                    tempStart = msgMaxId;
                    if(datas[i].start){
                        tempStart = datas[i].start;
                    }
                    tempEnd = '0';
                    break;
                case 'asc':
                    tempStart = '0';
                    if(datas[i].start){
                        tempStart = datas[i].start;
                    }
                    tempEnd = msgMaxId;
                    break;
                default:
                    tempStart = '0';
                    if(datas[i].start){
                        tempStart = datas[i].start;
                    }
                    tempEnd = msgMaxId;
                    break;
            }

            var tempData = {
                groupId : datas[i].groupId,
                start : tempStart,
                end : tempEnd,
                maxNum : tempMaxNum
            };
            dataList.push(tempData);
        }

        var bodyProtocol = {
            transId : transId,
            type : type,
            datas : dataList
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    };

    // 获取群组内的匿名用户名 15618
    ImRequestMethods.prototype.getGroupAnonymousUserName = function(params, callback) {
        var cmd = 15618;
        var cid = params['cid'];
        var uid = params['uid'];
        var groupIds = params['groupIds'];

        var headProtocol = staticImUtils.buildHearProtocol(uid, cid, cmd);
        var userDataRequest = staticImUtils.buildUserData(uid,cid);

        var transId = staticImUtils.getImTransId(cmd.toString());
        var bodyProtocol = {
            transId : transId,
            groupIds : groupIds
        };

        var imRequestCommon = {
            "headProtocol": headProtocol,
            "userDataRequest": userDataRequest,
            "imRequestValue": bodyProtocol
        };
        staticImUtils.sendImRequest(headProtocol, imRequestCommon, callback);
    }

    // -------------------------------------------------------imUtils工具方法集定义-----------------------------------------------------------------------
    function ImUtils() {
    }
    //随机获取Seq
    ImUtils.prototype.getImSeq = function (cmd) {
        var dateSecond = new Date().getSeconds();
        var cmdReq = cmd.substr(2,4);
        var randomNum = (parseInt(Math.random() * 10000)).toString();
        var seq = cmdReq + dateSecond + randomNum;
        return  parseInt(seq);
    };
    //随机获取Seq
    ImUtils.prototype.getImTransId = function (cmd) {
        if(cmd){
            var dateSecond = new Date().getSeconds();
            var cmdReq = cmd.substr(2,4);
            var randomNum = (parseInt(Math.random() * 10000)).toString();
            var transId = cmdReq + dateSecond + randomNum;
            return  parseInt(transId);
        } else {
            var ramdomNum = new Date().getTime();
            ramdomNum += parseInt(Math.random() * 1000);
            return  ramdomNum.toString().substr(4,9);
        }
    };

    ImUtils.prototype.buildImCallback = function (headProtocal, callback) {
        var imCallbackName = 'imCallback'+headProtocal.cmd +'seq-'+parseInt(headProtocal.seq);
        // var imCallbackName = 'imCallback'+cmd;
        //重发缓存带
        $.imWebsocketTime[imCallbackName] =  Date.parse(new Date());
        // console.log('***************'+Date.parse(new Date()));
        if(undefined ==  $.imWebsocketCallback[imCallbackName]){
            $.imWebsocketCallback[imCallbackName] = callback;
        }


    };
    //构造包头
    ImUtils.prototype.buildHearProtocol = function (uid, cid, cmd) {
        var headProtocol = {
            "cmd" : cmd,
            "uid" : uid,
            "cid" : cid,
            "seq" : this.getImSeq(cmd.toString())
        };
        return headProtocol;
    };

    //构造用户信息
    ImUtils.prototype.buildUserData = function (uid, cid) {
        var userDataRequest = {
            "uid": uid,
            "cid": cid
        };
        return userDataRequest;
    };
    //发出im消息请求
    ImUtils.prototype.sendImRequest = function (headProtocol, reqObj, callback) {
        if(undefined == callback){
            // console.log("warn: im-request callback is undefined,  cmd:"+headProtocol.cmd);
        } else {
            //构建回调函数
            staticImUtils.buildImCallback(headProtocol, callback);
        }

        // console.log(JSON.stringify(reqObj));
        if(headProtocol.cmd == '15001'){
            console.log(JSON.stringify(reqObj));
        }
        if(TEAMS.imLogSwitch){
            console.log(JSON.stringify(reqObj));
        }


        if($.imSdkConfig['requestCmdRetry'].indexOf(reqObj.headProtocol.cmd) > -1){
            $.imErrorQuest[parseInt(reqObj.headProtocol.seq)] = reqObj;
        }
        if(window.imSocket.readyState == 3){
            console.log("socket down");
            $.imSdkConfig['reconnectCount'] = 0;
            if(!$.imSdkConfig['isConnecting'] && $.imSdkConfig['imNeedReconnect']){
                console.log('断线重连');
                $.imReconnectFunc['imRetryConnect']();
            }
        } else {
            if($.imSdkConfig.lastSendTime > 0){
                var emptyTime = new Date().getTime() - $.imSdkConfig.lastSendTime;
                if(emptyTime > $.imSdkConfig.sendEmptyTime){
                    console.log("socket down");
                    $.imSdkConfig['reconnectCount'] = 0;
                    // window.imSocket.close();
                }
            }
            $.imSdkConfig.lastSendTime = new Date().getTime();

            try {
                window.imSocket.send(JSON.stringify(reqObj));
            } catch(err) {
                var nowTime = new Date().getTime();
                if(nowTime - $.imSdkConfig['heartBeatReceiveTime']  > 30000){
                    if($.imSdkConfig['reconnectCount'] > 5){
                        $.imSdkConfig['reconnectCount'] = 0;
                        $.imSdkConfig['isConnecting'] = false;
                    }
                    if(!$.imSdkConfig['isConnecting']  && $.imSdkConfig['imNeedReconnect']){
                        console.log('断线重连');
                        $.imReconnectFunc['imRetryConnect']();
                    }
                }
            }
            var nowTime = new Date().getTime();
            if(nowTime - $.imSdkConfig['heartBeatReceiveTime']  > 30000){
                if($.imSdkConfig['reconnectCount'] > 5){
                    $.imSdkConfig['reconnectCount'] = 0;
                    $.imSdkConfig['isConnecting'] = false;
                }
                if(!$.imSdkConfig['isConnecting'] && $.imSdkConfig['imNeedReconnect']){
                    console.log('断线重连');
                    $.imReconnectFunc['imRetryConnect']();
                }
            }
        }
    }

})(jQuery);
