(function ($) {

    var staticImJsonRequestMethods;
    var staticImUtilsMethods;
    var staticImJsonUtils = new ImJsonUtils();
    //im-sdk初始化化方法, 用于dom对象绑定
    $.initEteamsImJson = function (imResponseCallBackParam) {
        staticImJsonRequestMethods = $.initEteamsIm().imRequestMethods;
        staticImUtilsMethods = $.initEteamsIm().imUtils;
        return new Constructor(imResponseCallBackParam);
    };

    // ------------------------------------------------------Constructor构造方法集定义-----------------------------------------------------------------------
    //sdk初始化构造
    function Constructor(imResponseCallBackParam) {
        Constructor.prototype.imResponseCallBack = imResponseCallBackParam;
    }
    Constructor.prototype.imJsonRequestMethods = new ImJsonRequestMethods(); //im请求方法集
    Constructor.prototype.imJsonUtils = new ImJsonUtils(); //im请求方法集
    // ------------------------------------------------------ImRequestMethods  im请求方法集定义-----------------------------------------------------------------------
    function ImJsonRequestMethods() {}
    //发出登入请求 15001
    ImJsonRequestMethods.prototype.loginReq = function (params, callback) {
        staticImJsonRequestMethods.loginReq(params, callback);
    };

    //发出登出请求 15002
    ImJsonRequestMethods.prototype.logoutReq = function (params, callback) {
        staticImJsonRequestMethods.logoutReq(params, callback);
    };

    //获取用户状态 15003
    ImJsonRequestMethods.prototype.getStatusReq = function (params, callback) {
        staticImJsonRequestMethods.getStatusReq(params, callback);
    };

    //发生状态改变 15011
    ImJsonRequestMethods.prototype.statusChangeReq = function (params, callback) {
        staticImJsonRequestMethods.statusChangeReq(params, callback);
    };

    //发送单人消息 15100
    ImJsonRequestMethods.prototype.sendSingleMsgReq = function (params, callback) {
        var returnParams = params;
        var resultMsg = staticImJsonUtils.buildJsonChatMsg(params);
        params['msg'] = resultMsg.msgObj;
        params['subtitle'] = resultMsg.subtitleObj;
        staticImJsonRequestMethods.sendSingleMsgReq(params, callback);
        returnParams['msg'] = resultMsg.msgObj;
        returnParams['subtitle'] = resultMsg.subtitleObj;
        return returnParams;
    };

    //构造消息内容
    ImJsonRequestMethods.prototype.buildJsonChatMsg = function (params) {
        var returnParams = params;
        var resultMsg = staticImJsonUtils.buildJsonChatMsg(params);
        returnParams['msg'] = resultMsg.msgObj;
        returnParams['subtitle'] = resultMsg.subtitleObj;
        return returnParams;
    };

    //发送单人消息 15100
    ImJsonRequestMethods.prototype.sendSingleMsgForwardReq = function (params, callback) {
        staticImJsonRequestMethods.sendSingleMsgReq(params, callback);
    };

    //15103 同步单人消息
    ImJsonRequestMethods.prototype.syncSingleMsgReq = function (params, callback) {
        staticImJsonRequestMethods.syncSingleMsgReq(params, callback);
    };

    //15103 同步单人消息
    ImJsonRequestMethods.prototype.initTempMsgId = function (params, callback) {
        return staticImUtilsMethods.getImTransId();
    };

    //获取单人消息阅读状态，只获取自己发送的消息，指定到具体每条消息  15915
    ImJsonRequestMethods.prototype.getSingleMsgReadStatusReq = function (params, callback) {
        staticImJsonRequestMethods.getSingleMsgReadStatusReq(params, callback);
    };

    //设置单人消息阅读状态，指定到具体每条消息  15914
    ImJsonRequestMethods.prototype.setHelperMsgReadStatusReq = function (params, callback) {
        staticImJsonRequestMethods.setHelperMsgReadStatusReq(params, callback);
    };

    //获取单人消息阅读状态，只获取自己发送的消息，指定到具体每条消息  15104
    ImJsonRequestMethods.prototype.getHelperMsgReadStatusReq = function (params, callback) {
        staticImJsonRequestMethods.getHelperMsgReadStatusReq(params, callback);
    };

    //设置单人消息阅读状态，指定到具体每条消息  15105
    ImJsonRequestMethods.prototype.setSingleMsgReadStatusReq = function (params, callback) {
        staticImJsonRequestMethods.setSingleMsgReadStatusReq(params, callback);
    };

    //单人消息单条同步  15107
    ImJsonRequestMethods.prototype.activeSyncSingleMsgReq = function (params, callback) {
        staticImJsonRequestMethods.activeSyncSingleMsgReq(params, callback);
    };

    //初始化单人于都状态通知方法 15106
    ImJsonRequestMethods.prototype.initSetSingleMsgReadStatusNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15106'] = callback;
    };

    //初始化群组阅读状态通知方法 15305
    ImJsonRequestMethods.prototype.initSetGroupMsgReadStatusNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15305'] = callback;
    };

    //15107  初始化首页接收单人消息回调
    ImJsonRequestMethods.prototype.initImSingleChatNotifyMethod = function (callback) {
        $.imWebsocketCallback['imCallback15101'] = callback;
    };


    //15200 创建群组
    ImJsonRequestMethods.prototype.createGroupReq = function (params, callback) {
        var uid = params['uid'];
        var users = params['users'];

        if (users.length > 0) {
            var usersTemp = [];
            for (var i = 0; i < users.length; i++) {
                if (users[i].uid != uid) {
                    usersTemp.push(users[i]);
                }
            }
            params['users'] = usersTemp;
            staticImJsonRequestMethods.createGroupReq(params, callback);
        }
    };

    //15201 邀请加入群组
    ImJsonRequestMethods.prototype.inviteToGroupReq = function (params, callback) {
        staticImJsonRequestMethods.inviteToGroupReq(params, callback);
    };

    //15203 退出群组
    ImJsonRequestMethods.prototype.exitGroupReq = function (params, callback) {
        staticImJsonRequestMethods.exitGroupReq(params, callback);
    };
    //15204 踢出群组
    ImJsonRequestMethods.prototype.kickGroupMemberReq = function (params, callback) {
        staticImJsonRequestMethods.kickGroupMemberReq(params, callback);
    };

    //15206 修改群组信息
    ImJsonRequestMethods.prototype.modifyGroupInfoReq = function (params, callback) {
        staticImJsonRequestMethods.modifyGroupInfoReq(params, callback);
    };

    //15207 拉取群组列表
    ImJsonRequestMethods.prototype.syncGroupListReq = function (params, callback) {
        staticImJsonRequestMethods.syncGroupListReq(params, callback);
    };

    //15208 拉取群组成员列表
    ImJsonRequestMethods.prototype.syncGroupMemberListReq = function (params, callback) {
        staticImJsonRequestMethods.syncGroupMemberListReq(params, callback);
    };

    //15209  同步群组信息
    ImJsonRequestMethods.prototype.getGroupInfoReq = function (params, callback) {
        staticImJsonRequestMethods.getGroupInfoReq(params, callback);
    };

    //15210 分页拉取群组列表
    ImJsonRequestMethods.prototype.syncGroupListByPageReq = function (params, callback) {
        staticImJsonRequestMethods.syncGroupListByPageReq(params, callback);
    };

    //15211 分页拉取群组列表
    ImJsonRequestMethods.prototype.searchGroupReq = function (params, callback) {
        staticImJsonRequestMethods.searchGroupReq(params, callback);
    };

    //15217 分页拉取群组列表
    ImJsonRequestMethods.prototype.getGroupInfoUcReq = function (params, callback) {
        staticImJsonRequestMethods.getGroupInfoUcReq(params, callback);
    };

    //15218 判断是否在群内
    ImJsonRequestMethods.prototype.isGroupMemberReq = function (params, callback) {
        staticImJsonRequestMethods.isGroupMemberReq(params, callback);
    };


    // 修改群组头像 cmd:15219
    ImJsonRequestMethods.prototype.modifyGroupAvatarReq = function (params, callback) {
        staticImJsonRequestMethods.modifyGroupAvatarReq(params, callback);
    };

    // 获取群操作记录请求 cmd:15221
    ImJsonRequestMethods.prototype.getGroupOperNoteReq = function (params, callback) {
        staticImJsonRequestMethods.getGroupOperNoteReq(params, callback);
    };

    // 获取群操作记录关联请求 cmd:15222
    ImJsonRequestMethods.prototype.getGroupOperRelReq = function (params, callback) {
        staticImJsonRequestMethods.getGroupOperRelReq(params, callback);
    };

    // 设置群管理员 cmd:15223
    ImJsonRequestMethods.prototype.setGroupAdminReq = function (params, callback) {
        staticImJsonRequestMethods.setGroupAdminReq(params, callback);
    };


    // 设置群组阅读状态开关 cmd:15225
    ImJsonRequestMethods.prototype.setGroupRSOnOffReq = function (params, callback) {
        staticImJsonRequestMethods.setGroupRSOnOffReq(params, callback);
    };

    //15300 群组聊天消息发送
    ImJsonRequestMethods.prototype.sendGroupMsgReq = function (params, callback) {
        var returnParams = params;
        if (!params['isForwardMsg']) {
            var resultMsg = staticImJsonUtils.buildJsonChatMsg(params);
            params['msg'] = resultMsg.msgObj;
            params['subtitle'] = resultMsg.subtitleObj;
            returnParams['msg'] = resultMsg.msgObj;
            returnParams['subtitle'] = resultMsg.subtitleObj;
        } else {
            returnParams['msg'] = params['forwardMsgObj'];
            params['msg'] = params['forwardMsgObj'];
        }
        staticImJsonRequestMethods.sendGroupMsgReq(params, callback);
        return returnParams;
    };

    //15300 群组聊天消息发送
    ImJsonRequestMethods.prototype.sendGroupMsgForwardReq = function (params, callback) {
        staticImJsonRequestMethods.sendGroupMsgReq(params, callback);
    };

    //15302 群组聊天同步
    ImJsonRequestMethods.prototype.syncGroupMsgReq = function (params, callback) {
        staticImJsonRequestMethods.syncGroupMsgReq(params, callback);
    };

    //15402
    ImJsonRequestMethods.prototype.syncSysMsgReq = function (params, callback) {
        staticImJsonRequestMethods.syncSysMsgReq(params, callback);
    };

    //15403
    ImJsonRequestMethods.prototype.setSysMsgReadStatusReq = function (params, callback) {
        // params['taskId'] = undefined;
        staticImJsonRequestMethods.setSysMsgReadStatusReq(params, callback);
    };

    //15403
    ImJsonRequestMethods.prototype.setSysMsgReadStatusBySgroup = function (params, callback) {
        params['datas'] = undefined;
        params['taskId'] = undefined;
        staticImJsonRequestMethods.setSysMsgReadStatusReq(params, callback);
    };

    //15403
    ImJsonRequestMethods.prototype.setSysMsgReadStatusByTaskId = function (params, callback) {
        params['datas'] = undefined;
        params['sgroup'] = undefined;
        staticImJsonRequestMethods.setSysMsgReadStatusReq(params, callback);
    };

    //15410
    ImJsonRequestMethods.prototype.getSysMsgContactList = function (params, callback) {
        staticImJsonRequestMethods.getSysMsgContactList(params, callback);
    };

    //15412
    ImJsonRequestMethods.prototype.getSysMsgGroupTypeUCReq = function (params, callback) {
        staticImJsonRequestMethods.getSysMsgGroupTypeUCReq(params, callback);
    };

    //15303 发送@相关信息
    ImJsonRequestMethods.prototype.sendAtInfoReq = function (params, callback) {
        staticImJsonRequestMethods.sendAtInfoReq(params, callback);
    };

    //15306 同步群组消息
    ImJsonRequestMethods.prototype.initImGroupChatReceiveMethod = function (callback) {
        $.imWebsocketCallback['imCallback15306'] = callback;
    };

    //15903 客户通知初始化
    ImJsonRequestMethods.prototype.initImHelperMsgNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15903'] = callback;

    };
    //15910 客服群通知初始化
    ImJsonRequestMethods.prototype.initImServiceGroupMsgNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15910'] = callback;
    };

    // 设置群组阅读状态开关 通知 cmd:15226
    ImJsonRequestMethods.prototype.initSetGroupRSOnOffNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15226'] = callback;
    };

    //群组消息撤回 15309
    ImJsonRequestMethods.prototype.makeGroupMsgWithdrawReq = function (params, callback) {
        var resultMsg = staticImJsonUtils.buildChatBackMsg(params);
        params['msg'] = resultMsg.msgObj;
        params['title'] = resultMsg.subtitleObj;
        staticImJsonRequestMethods.makeGroupMsgWithdrawReq(params, callback);
        return resultMsg;
    };

    //群组消息撤回 15912
    ImJsonRequestMethods.prototype.hgMsgRecallReq = function (params, callback) {
        var resultMsg = staticImJsonUtils.buildChatBackMsg(params);
        params['msg'] = resultMsg.msgObj;
        params['title'] = resultMsg.subtitleObj;
        staticImJsonRequestMethods.hgMsgRecallReq(params, callback);
        return resultMsg;
    };



    //同步指定单人消息 15110
    ImJsonRequestMethods.prototype.syncKindSingleMsgReq = function (params, callback) {
        staticImJsonRequestMethods.syncKindSingleMsgReq(params, callback);
    };

    //单人消息撤回 15111
    ImJsonRequestMethods.prototype.makeSingleMsgWithdrawReq = function (params, callback) {
        var resultMsg = staticImJsonUtils.buildChatBackMsg(params);
        params['msg'] = resultMsg.msgObj;
        params['title'] = resultMsg.subtitleObj;
        staticImJsonRequestMethods.makeSingleMsgWithdrawReq(params, callback);
        return resultMsg;
    };

    //单人消息撤回 15911
    ImJsonRequestMethods.prototype.helperMsgRecallReq = function (params, callback) {
        var resultMsg = staticImJsonUtils.buildChatBackMsg(params);
        params['msg'] = resultMsg.msgObj;
        params['title'] = resultMsg.subtitleObj;
        staticImJsonRequestMethods.helperMsgRecallReq(params, callback);
        return resultMsg;
    };

    //同步指定群组消息 15308
    ImJsonRequestMethods.prototype.syncKindGroupMsgReq = function (params, callback) {
        staticImJsonRequestMethods.syncKindGroupMsgReq(params, callback);
    };

    // 获取群消息阅读状态，指定到具体每条消息 cmd:15311
    ImJsonRequestMethods.prototype.getGroupMsgReadStatusReq = function (params, callback) {
        staticImJsonRequestMethods.getGroupMsgReadStatusReq(params, callback);
    };

    // 获取群消息阅读详情 cmd:15312
    ImJsonRequestMethods.prototype.getGroupMsgReadDetailReq = function (params, callback) {
        staticImJsonRequestMethods.getGroupMsgReadDetailReq(params, callback);
    };

    //设置群消息阅读状态cmd:15304
    ImJsonRequestMethods.prototype.setGroupMsgReadStatusReq = function (params, callback) {
        staticImJsonRequestMethods.setGroupMsgReadStatusReq(params, callback);
    };
    //设置群消息阅读状态cmd:15916
    ImJsonRequestMethods.prototype.setHgMsgReadStatusReq = function (params, callback) {
        staticImJsonRequestMethods.setHgMsgReadStatusReq(params, callback);
    };

    //15401 接收到新消息的消息通知
    ImJsonRequestMethods.prototype.initSysMsgNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15405-0'] = callback
    };

    //15404 系统消息标记已读状态通知
    ImJsonRequestMethods.prototype.initSysMsgReadStatusNoticeMethods = function (callback) {
        $.imWebsocketCallback['imCallback15404'] = callback;
    };

    //15010 用户强踢下线通知
    ImJsonRequestMethods.prototype.initKickOutNoticeMethods = function (callback) {
        $.imWebsocketCallback['imCallback15010'] = callback;
    };

    ImJsonRequestMethods.prototype.setImPortalSysMsgReceiveMethod = function (callback) {
        $.imWebsocketCallback['imCallback15405'].imSysMsgReceiveMethod['imPortalSysMsgReceiveMethod'] = callback;
    };

    //15405 推送同步单条消息
    ImJsonRequestMethods.prototype.activeSyncSysMsgReq = function (params, callback) {
        staticImJsonRequestMethods.activeSyncSysMsgReq(params, callback);
    };

    //15419 设置系统消息已读标记未读请求，针对单条消息
    ImJsonRequestMethods.prototype.setSysMsgUnReadStatusReq = function (params, callback) {
        staticImJsonRequestMethods.setSysMsgUnReadStatusReq(params, callback);
    };

    //15420 系统消息标记未读状态通知
    ImJsonRequestMethods.prototype.initSysMsgUnReadStatusNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15420'] = callback;
    };


    //15501 获取最近联系列表
    ImJsonRequestMethods.prototype.getUserContactByPageRequest = function (params, callback) {
        staticImJsonRequestMethods.getUserContactByPageRequest(params, callback);
    };

    //15501 获取最近联系列表
    ImJsonRequestMethods.prototype.setMsgReadReq = function (params, callback) {
        staticImJsonRequestMethods.setMsgReadReq(params, callback);
    };

    //15506 设置最近联系会话已读
    ImJsonRequestMethods.prototype.setSessionReq = function (params, callback) {
        staticImJsonRequestMethods.setSessionReq(params, callback);
    };

    //15502 获取最近联系列表
    ImJsonRequestMethods.prototype.deleteUserContactReq = function (params, callback) {
        staticImJsonRequestMethods.deleteUserContactReq(params, callback);
    };


    //15603 拉取未读消息
    ImJsonRequestMethods.prototype.getNoReadChatMsgCount = function (params, callback) {
        staticImJsonRequestMethods.getNoReadChatMsgCount(params, callback);
    };

    //系统消息获取session 15503
    ImJsonRequestMethods.prototype.getSessionByPageReq = function (params, callback) {
        staticImJsonRequestMethods.getSessionByPageReq(params, callback);
    };

    //系统消息获取session 15507
    ImJsonRequestMethods.prototype.getSessionByGroupReq = function (params, callback) {
        staticImJsonRequestMethods.getSessionByGroupReq(params, callback);
    };

    //系统消息获取session 15504
    ImJsonRequestMethods.prototype.getSessionRequest = function (params, callback) {
        staticImJsonRequestMethods.getSessionRequest(params, callback);
    };

    //系统消息获取session 15511
    ImJsonRequestMethods.prototype.newGetSessionReq = function (params, callback) {
        staticImJsonRequestMethods.newGetSessionReq(params, callback);
    };

    //同步用户信息请求（指定用户同步）cmd:15513
    ImJsonRequestMethods.prototype.syncUserInfoReq = function (params, callback) {
        staticImJsonRequestMethods.syncUserInfoReq(params, callback);
    };

    //同步用户信息请求（指定用户同步）cmd:15520
    ImJsonRequestMethods.prototype.syncCorpInfoReq = function (params, callback) {
        staticImJsonRequestMethods.syncCorpInfoReq(params, callback);
    };

    //获取客户群最近联系会话 15518
    ImJsonRequestMethods.prototype.newGetServiceSessionReq = function (params, callback) {
        staticImJsonRequestMethods.newGetServiceSessionReq(params, callback);
    };

    //系统会话删除session 50005
    ImJsonRequestMethods.prototype.deleteSessionReq = function (params, callback) {
        staticImJsonRequestMethods.deleteSessionReq(params, callback);
    };

    // 客户发送小助手消息 cmd:15901
    ImJsonRequestMethods.prototype.sendHelperMsgReq = function (params, callback) {
        var returnParams = params;
        var resultMsg = staticImJsonUtils.buildJsonChatMsg(params);
        params['msg'] = resultMsg.msgObj;
        params['subtitle'] = resultMsg.subtitleObj;
        staticImJsonRequestMethods.sendHelperMsgReq(params, callback);
        returnParams['msg'] = resultMsg.msgObj;
        returnParams['subtitle'] = resultMsg.subtitleObj;
        return returnParams;
    };

    //发送小助手群消息 15902
    ImJsonRequestMethods.prototype.sendCustomMsgReq = function (params, callback) {
        var returnParams = params;
        var resultMsg = staticImJsonUtils.buildJsonChatMsg(params);
        params['msg'] = resultMsg.msgObj;
        params['subtitle'] = resultMsg.subtitleObj;
        staticImJsonRequestMethods.sendCustomMsgReq(params, callback);
        returnParams['msg'] = resultMsg.msgObj;
        returnParams['subtitle'] = resultMsg.subtitleObj;
        return returnParams;

    };

    //获取小助手群用户 15904
    ImJsonRequestMethods.prototype.syncHelperGroupListReq = function (params, callback) {
        staticImJsonRequestMethods.syncHelperGroupListReq(params, callback);
    };

    //同步小助手群消息 15905
    ImJsonRequestMethods.prototype.syncHelperGroupMsgReq = function (params, callback) {
        staticImJsonRequestMethods.syncHelperGroupMsgReq(params, callback);
    };

    //同步指定小助手群组消息 15906
    ImJsonRequestMethods.prototype.activeSyncHelperGroupMsgReq = function (params, callback) {
        staticImJsonRequestMethods.activeSyncHelperGroupMsgReq(params, callback);
    };

    //同步指定小助手群组消息 15907
    ImJsonRequestMethods.prototype.syncKindHelpGroupMsgReq = function (params, callback) {
        staticImJsonRequestMethods.syncKindHelpGroupMsgReq(params, callback);
    };

    //退出小助手群组 15908
    ImJsonRequestMethods.prototype.exitHelperGroupReq = function (params, callback) {
        staticImJsonRequestMethods.exitHelperGroupReq(params, callback);
    };

    //同步不在群内的群消息 15909
    ImJsonRequestMethods.prototype.syncExistGroupMsgReq = function (params, callback) {
        staticImJsonRequestMethods.syncExistGroupMsgReq(params, callback);
    };

    //15509 标记已读状态通知
    ImJsonRequestMethods.prototype.initMsgReadStatusNoticeMethods = function (callback) {
        $.imWebsocketCallback['imCallback15509'] = callback;
    };

    //15509 主动触发已读状态通知回调
    ImJsonRequestMethods.prototype.triggerMsgReadStatusNoticeMethods = function (callback) {
        var imCallback15509 = $.imWebsocketCallback['imCallback15509'];
        if (imCallback15509) {
            imCallback15509(callback);
        }
    };


    //15306
    ImJsonRequestMethods.prototype.activeSyncGroupMsgReq = function (params, callback) {
        staticImJsonRequestMethods.activeSyncGroupMsgReq(params, callback);
    };

    //15112 单人消息撤回通知
    ImJsonRequestMethods.prototype.makeSingleMsgWithdrawNotice = function (callback) {
        $.imWebsocketCallback['imCallback15112'] = callback;
    };


    //15310 群组消息撤回通知
    ImJsonRequestMethods.prototype.makeGroupMsgWithdrawNotice = function (callback) {
        $.imWebsocketCallback['imCallback15310'] = callback;
    };

    //15315 群组消息屏蔽通知
    ImJsonRequestMethods.prototype.onMaskGroupMsg = function (callback) {
        $.imWebsocketCallback['imCallback15315'] = callback;
    };

    //15422 发送公共消息通知
    ImJsonRequestMethods.prototype.initSendCommMsgNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15422'] = callback;
    };


    //设置消息免打扰信息15606
    ImJsonRequestMethods.prototype.setMsgRemindReq = function (params, callback) {
        staticImJsonRequestMethods.setMsgRemindReq(params, callback);
    };

    // 获取消息免打扰信息
    // 增量更新拉取15608
    ImJsonRequestMethods.prototype.getMsgRemindReq = function (params, callback) {
        staticImJsonRequestMethods.getMsgRemindReq(params, callback);
    };

    // 系统消息修改通知 cmd:15409
    ImJsonRequestMethods.prototype.initSysMsgUpdateNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15409'] = callback;
    };
    // 系统消息撤回通知 cmd:15416
    ImJsonRequestMethods.prototype.initSysMsgSetUndoNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15416'] = callback;
    };
    // 系统消息批量标记未读通知 cmd:15424
    ImJsonRequestMethods.prototype.initSysMsgBatchUnReadStatusNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15424'] = callback;
    };
    // 个人设置消息免打扰信息通知 cmd:15607
    ImJsonRequestMethods.prototype.initSetMsgRemindNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15607'] = callback;
    };
    // 设置消息免打扰信息通知 cmd:15610
    ImJsonRequestMethods.prototype.initSetMsgRemindTimeNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15610'] = callback;
    };
    //修改群头像通知协议 cmd:15220
    ImJsonRequestMethods.prototype.initModifyGroupAvatarNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15220'] = callback;
    };

    // 修改群信息通知协议 15212
    ImJsonRequestMethods.prototype.initModifyGroupInfoNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15212'] = callback;
    };

    // 邀请进群通知 15202
    ImJsonRequestMethods.prototype.initInviteToGroupNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15202'] = callback;
    };

    // 踢出群通知 15213
    ImJsonRequestMethods.prototype.initKickGroupMemberNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15213'] = callback;
    };

    // 退出群通知 15214
    ImJsonRequestMethods.prototype.initExitGroupNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15214'] = callback;
    };
    // 设置管理员通知 15224
    ImJsonRequestMethods.prototype.initSetGroupAdminNoticeMethod = function (callback) {
        $.imWebsocketCallback['imCallback15224'] = callback;
    };

    // 获取群组内匿名用户名称 15618
    ImJsonRequestMethods.prototype.getGroupAnonymousUserName = function (params, callback) {
        staticImJsonRequestMethods.getGroupAnonymousUserName(params, callback);
    };

    // 


    /**
     *
     * 群消息屏蔽 cmd:15314
     * @param {*} params
     * @param {string} cid 
     * @param {string} uid 
     * @param {string} suid 
     * @param {string} scid 
     * @param {string} groupId 
     * @param {string} dev 
     * @param {string} msgId 
     * @param {string} defaultMsg 
     * @param {string} type 
     * @param {string} sname 
     * @param {string} kind
     * @param {string} time
     * @param {*} callback
     * @returns
     */
    ImJsonRequestMethods.prototype.maskGroupMsg = function (params, callback) {
        var resultMsg = staticImJsonUtils.buildChatMaskMsg(params);
        params['msg'] = resultMsg.msgObj;
        params['title'] = resultMsg.subtitleObj;
        staticImJsonRequestMethods.maskGroupMsg(params, callback);
        return resultMsg;
    };

    function ImJsonUtils() {}
    //w
    ImJsonUtils.prototype.buildJsonChatMsg = function (params) {
        var cid = params['cid'];
        var uid = params['uid'];
        var sname = params['sname'];
        var clitxt = params['clitxt'];
        var aus = params['aus'];
        var msgType = params['msgType'];
        var ver = params['ver'];
        var dev = params['dev'];
        var replyMsg = params['replyMsg'];


        var subtitleTxt = clitxt;

        if (aus && aus.length > 0) {
            var nameMap = {};
            for (var i = 0; i < aus.length; i++) {
                if (aus[i]) {
                    var userDataTemp = aus[i];
                    var userDataTempId = userDataTemp.id;
                    var userDataType = userDataTemp.t;
                    var objName = userDataTemp.nm;
                    if (userDataType != '2' && userDataType != '4') {
                        nameMap[":@" + userDataTempId + "; "] = "@" + objName + " ";
                    }
                }
            }

            for (var i in nameMap) {
                subtitleTxt = subtitleTxt.replace(new RegExp(i, "gm"), nameMap[i]);
            }
        }

        if (subtitleTxt && subtitleTxt.length > 52) {
            var strLength = 0;
            var subLength = 0;
            for (var i = 0; i < subtitleTxt.length; i++) {
                if ((subtitleTxt.charCodeAt(i) >= 0) && (subtitleTxt.charCodeAt(i) <= 255)) {
                    strLength = strLength + 1;
                } else {
                    strLength = strLength + 2;
                }
                subLength += 1;
                if (strLength > 100) {
                    break;
                }
            }

            subtitleTxt = subtitleTxt.substring(0, subLength);
        }

        var image = params['image']; //图片对象
        var attachment = params['attachment']; //附件对象
        var entity = params['entity']; //事项对象
        var notify = params['notify']; //通知对象

        var datavalueList = [];

        var datavalue = {};
        switch (msgType) {
            case '1':
                datavalue.txt = {
                    v: clitxt,
                    next: '0',
                    ft: 'china'
                };

                if (params['aus'] && params['aus'].length > 0) {
                    datavalue.txt.aus = params['aus'];
                }


                break;
            case '2':
                datavalue.img = {
                    t: image.type,
                    h: image.height,
                    w: image.width,
                    nm: image.name,
                    src: image.src,
                    s: image.size
                };
                break;

            case '4':
                datavalue.file = {
                    t: attachment.type,
                    id: attachment.id,
                    nm: attachment.name,
                    ext: attachment.extName,
                    src: attachment.src,
                    s: attachment.size,
                    dt: attachment.docType
                };
                break;

            case '8':
                datavalue.entity = {
                    id: entity.id,
                    nm: entity.name,
                    me: entity.module,
                    etype: entity.etype,
                    ups: entity.ups
                };
                break;
            case '11':
                datavalue.txt = {
                    v: clitxt,
                    i18n: notify.i18n,
                    kvs: notify.kvs
                };
                break;
        }


        datavalueList.push(datavalue);
        var msg = {
            ver: ver,
            dev: dev,
            guid: '0',
            cnt: '0',
            idx: '0',
            type: msgType,
            suid: uid,
            scid: cid,
            sname: sname,
            dt: datavalueList
        };

        if (replyMsg) {
            msg.rmsg = replyMsg;
        }

        var subtitle = {
            type: msgType,
            sname: sname
        };

        // 处理匿名消息
        if (params.isAnonymous) {
            msg.display = '1';
            subtitle.display = '1';
        }

        switch (msgType) {
            case '10':
            case '11':
            case '1':
                var dataValueTemp = [];
                var subtitleTxtObj = {
                    v: subtitleTxt
                };

                if (aus && aus.length > 0) {
                    subtitleTxtObj.aus = aus;
                }
                dataValueTemp.push({
                    txt: subtitleTxtObj
                });

                subtitle.dt = dataValueTemp;
                break;
        }

        return {
            subtitleObj: subtitle,
            msgObj: msg
        }
    };




    ImJsonUtils.prototype.buildChatBackMsg = function (params) {
        var txtObj = {
            v: params['defaultMsg'],
            i18n: 'im.chat.b',
            kvs: {
                '%NAME%': params['sname']
            }
        };
        var dtArray = [];
        dtArray.push({
            txt: txtObj
        });
        var msg = {
            type: '1',
            typeBak: '10',
            dt: dtArray,
            suid: params['suid'],
            scid: params['scid'],
            sname: params['sname']
        };

        // 匿名消息
        if (params.display) {
            msg.display = params.display
        }

        return {
            subtitleObj: msg,
            msgObj: msg
        }
    };

    /**
     *
     *
     * @param {*} params
     * @param {string} defaultMsg
     * @param {string} sname
     * @param {string} maskName
     * @param {string} suid
     * @param {string} scid
     * @param {string} time
     * @returns
     */
    ImJsonUtils.prototype.buildChatMaskMsg = function (params) {
        var dt = [{
            txt: {
                v: params['defaultMsg'],
                i18n: 'im.chat.mask',
                kvs: {
                    '%NAME%': params['maskName'],
                    '%TIME%': params['time']
                }
            }
        }];
        var msg = {
            type: '1',
            typeBak: '12',
            dt: dt,
            suid: params['suid'],
            scid: params['scid'],
            sname: params['sname'],
        };

        // 匿名消息
        if (params.display) {
            msg.display = params.display;
        }

        return {
            subtitleObj: msg,
            msgObj: msg
        }
    };

    $.imEteamsJsService = function () {
        return new ImEteamsCBConstructor();
    };

    function ImEteamsCBConstructor() {}
})(jQuery);