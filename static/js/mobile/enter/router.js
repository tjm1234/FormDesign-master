
define(function(require, exports, module) {

	var App = require('mobile/enter/app');
	var AppRouter = Backbone.Router.extend({
		//初始化
		initialize : function(options) {
			this.app = new App();
		},
		routes : {
			"":"home", //首页
			"/":"home",//首页
			"mobile(/)":"home",//首页
			"mobile/home":"home",//首页
			"mobile/home/:channel":"home",//首页
			"mobile/set":"set", //
//			"mobile/langset":"langset", //语言设置
			"mobile/invite":"invite",//邀请
			"mobile/salary":"salary",//邀请
			"mobile/signaturemanage":"signaturemanage",//签名管理
			"mobile/invitsmartheer":"invitsmartheer",//邀请团队/邀请码
			"mobile/invitsmartheer/rule":"invitsmartheerrule",//邀请团队/邀请码
			"mobile/invitsmartheer/records":"invitsmartheerrecords",//邀请团队/邀请码
			"mobile/usercenter" : "renderUserCenter",//用户中心
			"mobile/usercneter/:type":"renderUserCenter",//不同类别的用户中心
			"mobile/userlist" : "renderUserList",//团队成员
			"mobile/userlist/sub/:userId" : "renderUserSubList",//下属成员
			"mobile/userlist/insub/:userId" : "renderUserInSubList",//间接下属
			"mobile/userlist/follow/:userId" : "renderUserFollowList",//团队关注的成员
			"mobile/userlist/followme/:userId" : "renderUserFollowMe",//团队关注的成员
			"mobile/userlist/calendar":"renderUserListCalendar",
			"mobile/userlist/:deaprtId" : "renderUserList",// 部门查询团队成员
			"mobile/userlist/position/:posnId" : "renderPositionUserList",// 岗位查询团队成员
			"mobile/userlist/search/:keywords" : "contactSearch",//全局搜索--同事
			"mobile/employee/info":"renderEmployeeInfo",// 查看人员信息
			"mobile/employee/info/:userId":"renderEmployeeInfo",// 查看人员信息
			"mobile/employee/edit":"renderEmployeeEdit",// 编辑人员信息
			"mobile/employee/edit/:userId":"renderEmployeeEdit",// 编辑人员信息
			"mobile/department":"department",//部门设置
			"mobile/position":"position",//岗位设置
			"mobile/teams":"myteams",//团队
			
			"mobile/mainlines"	:"mainlines",  //默认查询我的项目
			"mobile/mainlines/search":"mainlineSearch",
			"mobile/mainlines/search/:keywords":"mainlineSearch",
			"mobile/mainlines/:userId"	:"mainlines", //根据用户查询项目 userId:为用户的和下属的id
			"mobile/mainlines/:userId/:type"	:"mainlines", //根据用户id和类别查询
			"mobile/mainlines/link/:id/:module":"mainlinelink", //项目下事项的查询 id:项目的id module:模块类别
			"mobile/mainlines/link/search/:mainlineId/:module":"mainlinelinksearch", //项目下事项搜索
			"mobile/mainlines/link/:id/:module/:permission":"mainlinelinkPermission", //项目下事项的查询 id:项目的id module:模块类别
			"mobile/mainline/info/:id" :"mainlinecover", //!!!!因项目老地址不好做兼容，企业微信已推送的老地址直接渲染到卡片页面，重新做个新详情地址
			"mobile/mainline/newinfo/:id" :"mainlineinfo", //!!!!因项目老地址被企业微信占用，重新建立地址，相关地址都使用新地址
			"mobile/mainline/cover/:id" :"mainlinecover", //项目卡片【 id:项目的id】
			"mobile/mainline/cover/:id/:mainlineType" :"mainlinecover", //项目卡片【 id:项目的id】
			"mobile/mainline/dynamic/:id" :"mainlinedynamic", //项目卡片【 id:项目的id】
			"mobile/mainline/add":"mainlineadd", //添加项目
			"mobile/mainline/mtcategory":"mainlinecategory", // 项目模板界面
			"mobile/mainline/mttemplate/:id":"mainlinenew", // 从模板创建项目
			"mobile/mainline/mainlinereport/:id":"mainlinereport", // 项目报告
			"mobile/mainline/mainlinereport/complete/:type/:id":"mainlinereportcomplete", // 项目报告完成情况
			"mobile/mainline/mainlinereportcomplete/:reportType/:type/:reportId":"mainlinereportcompdetail", // 项目报告完成情况明细
			"mobile/mainline/mainlinereportplan/:id":"mainlinereportplan", // 项目报告下周计划完成任务
			"mobile/mainline/mainlinereportplan/:reportId/:id":"mainlinereportplandetail", // 项目报告下周计划完成任务
			"mobile/mainline/etinfo/:id" : "mainline_etinfo",	    //系统中的详情查看（项目）
			
			"mobile/documents" : "documentlist",// 文档列表
			"mobile/documents/" : "documentlist",// 文档列表
			"mobile/documents/:userId" : "documentlist",// 文档列表
			"mobile/documents/:userId/:type/" : "documentlist",// 文档列表
			"mobile/documents/:userId/:type/:folderId" : "documentlist",// 文档列表
			"mobile/documents/:userId/:type/:folderId/:folderType" : "documentlist",// 文档列表
			
			
			"mobile/documents/:userId/:id" : "document",// 文档详情
			
			"mobile/documents/add":"documentlist", //新建文档(微信专用)
			"mobile/document/:id":"documentinfo", //新建文档(微信专用)
			
			
			/***************** 表单 ******************/
			"mobile/biaogeforms" : "biaogeforms",//表单
			"mobile/biaogeforms/:userId/:type" : "renderFormsType",
			"mobile/biaogeforms/:userId/:type/:formId" : "renderFormById",
			
			/***********************任务路由开始********************************/
			"mobile/task/add/:group" : "taskAdd",  //任务添加 (group:任务分组)
			"mobile/task/add/:group/:pid" : "taskAdd",  //子任务添加 (group:任务分组，pid:父任务ID)
			"mobile/task/list": "taskList", //任务列表
			"mobile/task/list/:userId/:type": "taskNav", //任务列表
			"mobile/task/list/:userId" : "taskList", //查看某用户的任务
			"mobile/task/search" : "taskSearch", //任务搜索
			"mobile/task/search/:keywords" : "taskSearch",// 任务搜索
			"mobile/task/subtasks/:pid" : "subtaskList", //子任务列表(pid:父任务ID)
			"mobile/task/weightinfo/:id/:pid" : "subtaskWeight",
			"mobile/task/etinfo/:id" : "task_etinfo",	    //系统中的详情查看（任务）
			
			"mobile/task/:id" : "taskInfo", // 查看任务信息(id:任务id)
			"mobile/task/:id/:pid" : "taskInfo", //查看任务信息(id:任务id，pidL:父任务Id)
			/***********************任务路由结束********************************/
			/***********************考勤路由开始********************************/
			"mobile/timecard/checkmap/:type/:lng/:lat/:addr" : "checkMap", //签到(type:类型-签到或签退,lng,lat:经纬度，addr：签到地址)
			"mobile/timecard/checkmap/:type/:lng/:lat/:addr/:customer/:contact" : "checkCrmMap", //签到(type:类型-签到或签退,lng,lat:经纬度，addr：签到地址,:customer客户ID，contact联系人ID)
			"mobile/timecard/checkmap/:type" : "checkMap", //签到(type:类型-签到或签退
			"mobile/timecard/ocheckmap/:type/:lng/:lat/:addr/:oattendEl" : "oattendCheckMap", //签到(type:类型-签到或签退
			"mobile/timecard/other" : "otherTimecard", //他人考勤 
			"mobile/timecard/orbitmap/:userId/:date" : "orbitchartmap", //外勤轨迹 
			"mobile/timecard/orbitlist/:userId/:date" : "orbitchartlist", //外勤轨迹 
			"mobile/timecard" : "timecard", //我的考勤
			"mobile/timecard/oattend" : "oattend", //我的考勤
			"mobile/timecard/oattend/:type" : "oattend", //我的考勤
			"mobile/timecard/oattend/:type/:lng/:lat" : "oattend", 
			"mobile/timecard/oattend/:type/:lng/:lat/:addr" : "oattend", 
			"mobile/timecard/crmoattend" : "oattendCrm",
			"mobile/timecard/crmoattend?:param" : "oattendCrm",
			"mobile/timecard/todayattend" : "todayattend", //今日考勤明细
			"mobile/timecard/attenddetail/:type/:date" : "attenddetail", //月考勤明细
			"mobile/timecard/maptrack/:day" : "maptrack", //我的日考勤轨迹
			"mobile/timecard/appeal/new/:attendDay/:attendPeriod/:attendStatus/:periodName/:attendRecord" : "createappeal",	//新建考勤申诉
			"mobile/timecard/appeal/new/:attendDay/:attendPeriod/:attendStatus/:periodName/" : "createappeal",	//新建考勤申诉
			"mobile/timecard/appeal/:appealId/:periodName" : "attendappeal",	//考勤申诉
			"mobile/timecard/oattendtasklist/:type/:lng/:lat/:addr/:oattendEl" : "oattendtasklist", // 外勤选择任务
			"mobile/timecard/oattendtasksearch/:type/:lng/:lat/:addr/:oattendEl" : "oattendtasksearch", // 外勤搜索任务
			"mobile/timecard/oattendmainlinelist/:type/:lng/:lat/:addr/:oattendEl" : "oattendmainlinelist", // 外勤选择项目
			"mobile/timecard/oattendmainlinesearch/:type/:lng/:lat/:addr/:oattendEl" : "oattendmainlinesearch", // 外勤搜索项目
			"mobile/timecard/oattendworkflowlist/:type/:lng/:lat/:addr/:oattendEl" : "oattendworkflowlist", // 外勤选择审批
			"mobile/timecard/oattendworkflowsearch/:type/:lng/:lat/:addr/:oattendEl" : "oattendworkflowsearch", // 外勤搜索审批
			"mobile/timecard/todayattend/:type/:lng/:lat/:addr/:entityType/:targetId/:customer/:contact" : "todayOattendMap", // 外勤搜索项目
			"mobile/timecard/oattendcalendar/:type/:lng/:lat/:addr/:oattendEl" : "oattendcalendar", // 外勤选择日程
			"mobile/timecard/abnormal" : "abnormal", // 异常考勤
			"mobile/timecard/attendinfo/:date" : "attendinfo", // 出勤记录
			/***********************考勤路由结束********************************/
			/***********************报告路由开始********************************/
			"mobile/workreport/info/:id"			: "workreportInfo",	//指定用户的指定报告
			"mobile/workreport/info/:id/:userId"	: "workreportInfo",	//指定用户的指定报告
			"mobile/workreport/list/:type"                :"workreports",
			"mobile/workreport/list/:type/:unread"                :"workreports",
			"mobile/workreport/weeklyreport/:userId/:date" :"weeklyblog",
			"mobile/workreport/new/:type"	: "newWorkreport", //
			"mobile/workreport" : "workreport", 
			"mobile/workreport/:userId"			: "workreport",	//指定用户的报告
			"mobile/workreport/:userId/:year/:type"	: "workreport",	//查看半年，年度报告
			"mobile/workreport/:userId/:year/:type/:sn"	: "workreport", //查看周报 月报 年报
			"mobile/report/workreport" : "reportWorkreport", //报告统计报表
			"mobile/report/workreport/:year" : "workreportByYear", // 查询某年已经写的报告
			"mobile/report/workreporttimeline/:date" : "workreporttimeline", // 新建报告
			"mobile/workreport/info/:id/:year/:type/:sn"	: "addnewworkreport",	//指定用户的指定报告
			
			/***********************报告路由结束********************************/
			/***********************标签路由开始********************************/
			"mobile/tag/list" :"taglist", 
			"mobile/tag/link/:id/:module":"taglink", //标签下事项的查询 id:标签的id module:模块类别
			"mobile/tag/link/:id" :"taglink", //标签下事项的查询 id:标签的id
			"mobile/tag/search" : "tagSearch", //标签搜索
			"mobile/tag/search/:keywords" : "tagSearch", //标签搜索
			
			/***********************标签路由结束********************************/
			"mobile/forms": "forms",			// 提交(新建)审批	[加载审批表单列表]
			"mobile/forms/:ownership": "forms",	// 提交(新建)审批	[加载审批表单列表]
			"mobile/forms/:ownership/:type": "forms",
			
			//PC下查看H5
			"mobile/mobileformview": "mobileform",
			//H5预览
			"mobile/mobileformview/:module/:formId": "workflowpre",

            /***************** 云表单begin ****************/
            // 云表单列表
            "mobile/ebgforms/search": "ebgformSearch",
            "mobile/ebgforms/search/:keyword": "ebgformSearch",
            "mobile/ebgforms/:module": "ebgformList",
            "mobile/ebgforms/biaogecate/:type": "ebgformCateList", 	// 云表单列表
            "mobile/ebgforms/biaogecate/:type/:module": "ebgformCateList", 	// 云表单列表
            "mobile/ebgforms/:module/:formId": "ebgformDetail", 	// 云表单详情
            "mobile/ebgforms/:module/:formId/copy": "ebgformCopy", 	// 云表单使用
			/***************** 云表单end ******************/
			
			"mobile/workflows" : "workflowlist",// 审批列表
			"mobile/workflows/flowseniorsearch"		 : "flowseniorsearch",	//审批高级搜索
			"mobile/workflows/workflowbatch/:type" : "workflowbatch",// 审批批量
			"mobile/workflows/flowdatastatsearch/:ownership" : "flowdatastatsearch",// 审批表统计筛选
			"mobile/workflows/flowcomprestat/userstat" : "flowstatuser",// 审批按人员统计
			"mobile/workflows/flowdatastatlist/:type/:id" : "flowdatastatlist",// 审批统计数据列表展示
			"mobile/workflows/flowdatastatlist/search/:type/:id" : "flowdatastatlistsearch",// 审批统计数据列表展示
			"mobile/workflows/flowdatastatlist/:type/:id/:linkageType/:beginDate/:endDate" : "flowdatastatlist",// 审批统计数据列表展示
			"mobile/workflows/:userId" : "workflowlist",// 审批列表
			"mobile/workflows/:userId/:id" : "workflow",// 审批详情
			"mobile/workflows/:userId/:formId/" : "createworkflow",// 审批新建
			"mobile/workflow/info/:id" : "workflowinfo",// 审批详情(微信专用)
			"mobile/workflows/search/:keywords" : "flowSearch",// 审批搜索
			"mobile/workflow/:type" : "renderFilterFlows",// url驱动审批菜单
			"mobile/workflow/:userId/:type" : "renderFilterFlows",// url驱动审批菜单
			
			"mobile/calendar" : "calendar",// 日程主页面
			"mobile/calendar/add" : "calendarAdd",// 新建日程
            "mobile/calendar/:date/add" : "calendarAdd",// 指定某天新建日程
			"mobile/calendar/:userId" : "calendar",// 日程主页面                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
			"mobile/calendar/search/:keywords" : "calendarSearch",	//日程搜索
			"mobile/calendar/:userId/:id" : "agenda",// 日程详情
			"mobile/calendar/:userId/:id/:repeatNum" : "repeatAgenda",// 重复日程详情（加上了第几次重复的参数）
			"mobile/agenda/:id" : "viewAgenda", //日程查看，微信专用
				
			"mobile/blog":"blog",  //默认查询我的日报
			"mobile/blog/add":"blogadd", //添加日报
			"mobile/blog/unread":"blogunread",
			"mobile/blog/other":"blogother",
			"mobile/blog/comment":"blogcomment",
			"mobile/blog/replay":"blogreplay",
			"mobile/blog/info/:id":"blogById",//日报详情 （id 日报的id）
			"mobile/blog/info/:userId/:date":"bloginfo", //日报详情 （userId:日报创建人  date:日报事件）
			"mobile/blog/info/:userId/:date/:type":"bloginfoOther",//他人日报详情
			"mobile/blog/:userId":"blog", //根据用户id查询日报 （userId可以是下属或者关注人的id 自己的id）
			"mobile/blog/:type/:userId":"blogType", //按类别查询用户的日报（userId:当前用户id  type:未读 评论 他人  反馈）
			
			"mobile/report/blog":"reportBlog", //报表日报
		
			"crmapp/customer/mobile" : "showCrmMobile",//客户模块单独访问用，同"mobile/crms"
			"crmapp/customer/mobile/:id" : "showCrmMobile",//客户模块单独访问用，同"mobile/crms"
			"crmapp/customer/mobile?:param" : "showCrmMobile",//客户模块单独访问用，同"mobile/crms?:param"
			
			"mobile/crms(/)" : "showCrmMobile",//默认显示客户列表
			"mobile/crms?:param" : "showCrmMobile",
			"mobile/crms/:id" : "showCrmMobile",//默认显示客户列表
			"mobile/crms/:id?:param" : "showCrmMobile",//根据param来跳转到不同的客户页面。param格式：info=view_CustomerNewView|key1_value1|key2_value2。view_后面的CustomerNewView表示具体页面
			"mobile/crms/index/:id" : "showCrmMobile",
			
			"mobile/bulksms(/)" : "showSmsMobile",
			"mobile/bulksms?:param" : "showSmsMobile",
			"mobile/bulksms/:id" : "showSmsMobile",
			"mobile/bulksms/:id?:param" : "showSmsMobile",
			
			//paas app
			"mobile/paas/app/:appId" : "showPaasMobile",
			"mobile/paas/app/:appId/:pageId" : "showPaasMobile",
			
			//portal
			"mobile/pagepreview/:pageId" : "showCustomPage",
			"mobile/portals/:menuId" : "showPortalMobile",
			"mobile/portals/:menuId?:param" : "showPortalMobile",
			
			"mobile/hrs" : "showHrMobile",//默认显示人事列表
			"mobile/hrs?:param" : "showHrMobile",
			"mobile/hrs/:id" : "showHrMobile",//默认显示人事列表
			"mobile/hrs/:id?:param" : "showHrMobile",//根据param来跳转到不同的人事页面。
			
			"mobile/messages/messagebox":"messagebox", //消息中心
			"mobile/messages/remind/:type":"remind", //申请提醒处理  加入申请 共享申请 关注申请  新用户加入
			"mobile/messages/remind/:type/:userId":"remindApply", //关注申请
			"mobile/messages/feed":"feed", //消息中心
			"mobile/messages/feed/:type":"feed", //类别查询消息中心   关注事项  未读事项等
				
			"mobile/dynamicInfo" : "old_dynamicInfo", // 通知公告
			"mobile/dynamicInfo/publish" :"old_dynamicNew",
			
			"mobile/dynamic/list" : "dynamicList", // 通知公告
			"mobile/dynamic/add" :"dynamicAdd",//新建公告
			"mobile/dynamic/:id" :"dynamicInfo",//查阅、修改公告
			
			"mobile/search":"searchall", //全局搜索
			"mobile/search/:keywords":"searchall", //全局搜索
			"mobile/search/:module/:keywords":"searchcomment",//搜索评论
			
			"mobile/fullsearch?:param":"fullsearch",
			"mobile/fullsearch":"fullsearch",
//			"mobile/wechat":"wechat",//微信
//			"mobile/wechat/:id":"wechatOne",
//			"mobile/wechat/channel/:id":"wechatChannel",
//			"mobile/wechat/wechatinfo/:type/:id":"wechatinfo",
//			"mobile/wechat/history/:type/:id":"wechathistory",
			    
				//----------------------done
			"mobile/formdatareports":"formDataReportList",
			"mobile/formdatareports/search/:type" : "formDataReportSearchList",
			"mobile/formdatareports/:type" : "formDataReportList",
			
			
			"mobile/formdatareport/info/:id" : "formDataReportInfo",// 详情(微信专用)
			"mobile/formdatareport/search/:keywords" : "formDataReportSearch",	// 审批搜索
			
			//兼容app老的url带userid的
			"mobile/formstatdata/:id":"formStatDataTable",  //表单统计页面
			"mobile/formstatdata/:userId/:id":"formStatDataTableForUserId",  //表单统计页面
			"mobile/formdatareport/:id":"formdataReportDetail" , // formDataReport(待填写、已填写、下属)
			"mobile/formdatareport/:userId/:id":"formdataReportDetailForUserId" , // formDataReport(待填写、已填写、下属)
			
			"mobile/formstatdata/search/:id":"formStatDataTableSearch",
			"mobile/formdatadetail/:type/:id":"formdatadetail",  //表单统计，点击查看详情
			
			"mobile/writereport/:formId":"writereport",  //填写上报页面
			"mobile/formdatastatisticschat/:formId" : "formdatastatisticschat",	// 数据统计
			"mobile/formdatastatdetail/:formId/:keywords" : "formdatastatdetail",	// 统计详细信息
			"mobile/mcentitymessage/:mcType" : "mcentitymessage",//事项消息列表
            "mobile/imsysmsg/:sgroupId" : "imsysmsg",//事项消息列表
            "mobile/imsysmsg/:sgroupId/:type" : "imsysmsg",//事项消息列表
			//自定义
			"mobile/free/:sysMenuId" : "free_navigation",
			"mobile/free/:sysMenuId/" : "free_navigation",
			"mobile/free/:sysMenuId/:formModule/:userId/:type" : "free_navigation",
	        "mobile/free/:sysMenuId/:formModule/:userId/:type/" : "free_navigation",
	        "mobile/free/:sysMenuId/:formModule/:userId/:type/:formId" : "free_navigation",
	        "mobile/free/:sysMenuId/:formModule/:userId/:type/:formId/" : "free_navigation",
	        "mobile/free/:sysMenuId/:formModule/:userId/:type/:formId/:id" : "free_navigation",
	        "mobile/free/:sysMenuId/:formModule/:userId/:type/:formId/:id/" : "free_navigation",

			"mobile/formstatdata/relevance/:type/:formId/:relId": "relformstatdata",	//公共关联，关联表单后，查看详情
		
			"mobile/subscribe/:module/:dataId" : "subscribe", //数据订阅详情
			
			"mobile/comment/position/:lng/:lat/:addr" : "commentMap"//评论地址
		},
		
		commentMap:function(lng,lat,addr){
			this.app.renderCommentMap(lng,lat,addr);
		},
		subscribe:function(module, dataId) {
			this.app.subscribe(module, dataId);
		},
		
		relformstatdata:function(type,formId,relId){
			this.app.relformstatdata(type,formId,relId);
		},
		
		home : function(channel){
			this.app.renderHome(channel);
		},
		salary:function () {
			this.app.renderSalary();
		},
		//解决第一次登陆进来url后带;jsessionid=8B6186D456DADE8CBED1F39AF2AD5C5F的问题
		home_session : function(){
			//this.home();
		},
		set:function(){
			this.app.renderSet();
		},
//		langset:function(){
//			this.app.renderLangSet();
//		},
		signaturemanage:function() {
			this.app.renderSignatureManage();
		},

        // signatureforscancode:function() {
         //    this.app.renderSignatureForScanCode();
		// },

		invite:function(){
			this.app.renderInvite();
		},
		invitsmartheer:function(){
			this.app.renderInvitsmartheer();
		},
		invitsmartheerrule:function(){
			this.app.renderInvitsmartheer("rule");
		},
		invitsmartheerrecords:function(){
			this.app.renderInvitsmartheerRecords();
		},
		renderUserCenter:function(type){
			this.app.renderUserCenter(type);
		},
		renderUserListCalendar:function(){
			this.app.renderUserListType('calendar');
		},
		renderUserList:function(departId){
			this.app.renderUserList(departId);
		},
		renderUserFollowList:function(userId){
			this.app.renderUserFollowList(userId);
		},
		renderUserFollowMe:function(userId){
			this.app.renderUserFollowMe(userId);
		},
		renderUserSubList:function(userId){
			this.app.renderUserSubList(userId);
		},
		renderUserInSubList:function(userId){
			this.app.renderUserInSubList(userId);
		},
		renderPositionUserList:function(posnId){
			this.app.renderPositionUserList(posnId);
		},
		contactSearch:function(keywords){
			this.app.renderContactSearch(keywords);
		},
		renderEmployeeInfo:function(userId){
			this.app.renderEmployeeInfo(userId);
		},
		renderEmployeeEdit:function(userId){
			this.app.renderEmployeeEdit(userId);
		},
		department:function(){
			this.app.renderDepartment();
		},
		position:function(){
			this.app.renderPosition();
		},
		mainlines:function(userId, type){
			this.app.renderMainline(userId, type);
		},
		mainlineSearch:function(keywords){
			this.app.renderMainlineSearch(keywords);
		},
		mainlinelinkPermission: function(id, module,permission){
			this.app.renderMainlineLinkPermission(id, module,permission);
		},
		mainlinelink: function(id, module){
			this.app.renderMainlineLink(id, module);
		},
        mainlinelinksearch:function (mainlineId,module) {
			this.app.renderMainlineLinkSearch(mainlineId,module);
        },
		//团队设置
		myteams:function(){
			this.app.renderTeams();
		},
		/**
		 * 审批表单
		 */
		forms: function(ownership, type){
			if(type == 'search') {
                this.app.renderFormsSearch(ownership);
			} else {
                this.app.renderForms(ownership);
            }
		},
		
		/**
		 * 业务表单,原表单模块
		 */
		biaogeforms: function(){
			this.app.renderBiaogeForms();
		},
		
		renderFormsType: function(userId, type){
			this.app.renderBiaogeForms(userId, type);
		},
		
		renderFormById: function(userId,type,formId){
			this.app.renderFormById(userId,type,formId);
		},
		/**
		 * 云表单列表页面
		 * @param module（workflow-审批云表单；biaoge-业务云表单）
		 */
		ebgformList: function(module,ownership){
			this.app.renderEbgFormList(module,ownership);
		},
        ebgformSearch: function(keyword){
            this.app.renderEbgFormSearch(keyword);
        },
		// 云表单分类列表  module(模块,不传默认为表单)
        ebgformCateList: function(type,module){
            this.app.renderEbgFormCateList(type,module);
        },
		/**
		 * 云表单详情页面
		 * @param module（workflow-审批云表单；biaoge-业务云表单）
		 * @param formId 表单ID
		 */
		ebgformDetail: function(module, formId){
			if(formId == 'personal' || formId == 'company'){
				//云表单使用成功完毕
				this.ebgformList(module, formId);
			}else{
				this.app.renderEbgFormDetail(module, formId);
			}
		},
		/**
		 * 表单预览切换H5
		 */
		mobileform: function(){
			this.app.renderEbgFormDetail("biaoge",'mobileform');
		},
		/**
		 * 表单预览
		 */
		workflowpre:function(module,formId){
			this.app.renderWorkflowpre(module,formId);
		},
		/**
		 * 云表单使用页面
		 * @param module（workflow-审批云表单；biaoge-业务云表单）
		 * @param formId 表单ID
		 */
		ebgformCopy: function(module, formId){
			this.app.renderEbgFormCopy(module, formId);
		},
		
		mainlineinfo: function(id){
			this.app.renderMainlineInfo(id);
		},
		mainlinecover:function(id,mainlineType){
			this.app.renderMainlineCover(id,mainlineType);
		},
		mainlinedynamic:function(id){
			this.app.renderMainlineDynamic(id);
		},
		mainlineadd:function(){
			this.app.renderMainlineAdd();
		},
		mainlinecategory:function(){
			this.app.renderMainlineCategory();
		},
		mainlinenew:function(id){
			this.app.renderMainlineNew(id);
		},
		mainlinereport:function(id){
			this.app.renderMainlineReport(id);
		},
		mainlinereportcomplete:function(type,id){
			this.app.renderMainlineReportComp(id,type);
		},
		mainlinereportcompdetail:function(reportType, type, reportId){
			this.app.renderMainlineReportCompDetail(reportType, type, reportId);
		},
		mainlinereportplan:function(id){
			this.app.renderMainlineReportPlan(id);
		},
		mainlinereportplandetail:function(reportId,id){
			this.app.renderMainlineReportPlanDetail(id, reportId);
		},
		mainline_etinfo:function(id){
			this.app.renderEtInfo('mainline',id);
		},
		/*-----任务模块start--------*/
		taskList:function(userId){
			this.app.renderTasks(userId);
		},
		taskNav:function(userId,type){
			this.app.renderTaskByType(userId,type);
		},
		subtaskList:function(pid){
			this.app.renderSubtasks(pid);
		},
		subtaskWeight:function(id, pid){
			this.app.renderSubtaskWeight(id, pid);
		},
		taskInfo:function(id,pid){
			this.app.renderTask(id,pid);
		},
		taskAdd:function(group,pid){
			this.app.renderTaskAdd(group,pid);
		},
		taskSearch:function(keywords){
			this.app.renderTaskSearch(keywords);
		},
		task_etinfo:function(id){
			this.app.renderEtInfo('task',id);
		},
		/*-----任务模块end----------------*/
		/*-----考勤模块start----------------*/
		timecard:function(){
			this.app.renderTimecard();
		},
		oattend:function(type,lng,lat,addr){
			this.app.renderOattend(type,lng,lat,addr);
		},
		oattendCrm:function(param){
			this.app.showCrmMobile(param);
		},
		todayattend:function(){
			this.app.renderTodayattend();
		},
		attenddetail:function(type,date){
			this.app.renderAttenddetail(type,date);
		},
		maptrack:function(day){
			this.app.renderMaptrack(day);
		},
		createappeal:function(attendDay, attendPeriod, attendStatus, periodName, attendRecord){
			this.app.renderAttendAppeal('new', attendDay, attendPeriod, attendStatus, periodName, attendRecord);
		},
		attendappeal:function(appealId, periodName){
			this.app.renderAttendAppeal(appealId, null, null, null, periodName);
		},
		checkMap:function(type,lng,lat,addr){
			this.app.renderCheckMap(type,lng,lat,addr);
		},
		checkCrmMap:function(type,lng,lat,addr,customer,contact){
			this.app.renderCheckMap(type,lng,lat,addr,customer,contact);
		},
		oattendCheckMap:function(type,lng,lat,addr,oattendEl){
			this.app.renderOattendCheckMap(type,lng,lat,addr,oattendEl);
		},
		otherTimecard:function(){
			this.app.renderOtherTimecard();
		},
		orbitchartmap:function(userId,date){
			this.app.renderOrbitchartMap(userId,date);
		},
		orbitchartlist:function(userId,date){
			this.app.renderOrbitchartList(userId,date);
		},
		oattendtasklist:function(type,lng,lat,addr,oattendEl){
			this.app.renderOattendTaskList(type,lng,lat,addr,oattendEl);
		},
		oattendtasksearch:function(type,lng,lat,addr,oattendEl){
			this.app.renderOattendTaskSearch(type,lng,lat,addr,oattendEl);
		},
		oattendmainlinelist:function(type,lng,lat,addr,oattendEl){
			this.app.renderOattendMainlineList(type,lng,lat,addr,oattendEl);
		},
		oattendmainlinesearch:function(type,lng,lat,addr,oattendEl){
			this.app.renderOattendMainlineSearch(type,lng,lat,addr,oattendEl);
		},
		oattendworkflowlist:function(type,lng,lat,addr,oattendEl){
			this.app.renderOattendWorkFlowList(type,lng,lat,addr,oattendEl);
		},
		oattendworkflowsearch:function(type,lng,lat,addr,oattendEl){
			this.app.renderOattendWorkFlowSearch(type,lng,lat,addr,oattendEl);
		},
		todayOattendMap:function(type,lng,lat,addr,entityType,targetId,customer,contact){
			this.app.renderTodayOattendMap(type,lng,lat,addr,entityType,targetId,customer,contact);
		},
		oattendcalendar:function(type,lng,lat,addr,oattendEl){
			this.app.renderOattendCalendar(type,lng,lat,addr,oattendEl);
		},
		abnormal:function(){
			this.app.renderAbnormal();
		},
		attendinfo:function(date){
			this.app.renderAttendInfo(date);
		},
		/*-----考勤模块end----------------*/
		/*-----报告模块start----------------*/
		workreport:function(userId,year,type,sn){
			this.app.renderWorkreport(userId,year,type,sn);
		},
		addnewworkreport:function(id,year,type,sn){
			this.app.renderAddNewWorkreport(id,year,type,sn,'new');
		},
		newWorkreport:function(type){
			this.app.renderNewWorkreport('new',null,null,type,null,'oldwechatnew');
		},
		workreportInfo:function(id,userId){
			this.app.renderWorkreportInfo(id,userId);
		},
		weeklyblog:function(userId,date){
			this.app.renderWeeklyBlog(userId,date);
		},
		workreports:function(type,unread){
			this.app.renderWorkreports(type,unread);
		},
		reportWorkreport:function(type,unread){
			this.app.renderReportWorkreport(type,unread);
		},
		workreportByYear:function(year){
			this.app.renderWorkreportByYear(year);
		},
		workreporttimeline:function(date){
			this.app.renderWorkreportTimeLine(date);
		},
		/*-----报告模块end----------------*/
		
		/*-----标签模块开始----------------*/
		taglink:function(id, module){
			this.app.renderTagLink(id, module);
		},
		taglist:function(){
			this.app.renderTagList();
		},
		tagSearch:function(keywords){
			this.app.renderTagSearch(keywords);
		},

		/*-----标签模块结束----------------*/
		
		documentlist : function(userId,type,folderId,folderType){
			if(userId == 'search'){
				this.app.renderDocSearch();
			} else if(userId == 'add'){
				this.app.renderDocNew({
					'folderId':type
				});
			}else{
				this.app.renderDocuments(userId,type,folderId,folderType);				
			}
		},
		document : function(userId, id){
			if(userId == 'search'){
				this.app.renderDocSearch(id);
			}else{
				this.app.renderDocument(userId, id);				
			}
		},
		documentinfo:function(id){
			this.app.renderDocument(TEAMS.currentUser.id, id);
		},
		workflowlist : function(userId){
			if(userId == 'search'){
				this.app.renderFlowSearch();
			}else if(userId == 'trashbinsearch'){
				this.app.renderFlowTrashBinSearch();
			}else if(userId == 'trashbin'){
				this.app.renderTrashbinWorkflows();
			}else if(userId == 'flowintroduce'){
				this.app.renderFlowintroduce();
			}else{
				this.app.renderWorkflows(userId);				
			}
		},
		//H5审批表管理
		flowmanages:function(type,ownership){
			this.app.renderFlowmanages(type,ownership);
		},
		//H5审批表管理查询
		flowmanagessearch:function(type,ownership){
			this.app.renderFlowmanagesSearch(type,ownership);
		},
		//审批统计按人员统计
		flowstatuser:function(){
			this.app.renderFlowStatUser();
		},
		flowdatastatlist:function(type,id,linkageType,beginDate,endDate){
			if(type == 'headerset'){
				this.app.renderFlowDataStatListHeaderSet(type,id);
			}else{
				this.app.renderFlowDataStatList(type,id,linkageType,beginDate,endDate);
			}
		},
		flowdatastatlistsearch:function(type,id){
			this.app.renderFlowDataStatListSearch(type,id,'keyword');
		},
		flowdatastatsearch:function(ownership){
			this.app.renderFlowDataStatSearch(ownership);
		},
		workflowbatch:function(type){
			this.app.renderWorkflowbatch(type);
		},
		flowseniorsearch:function(){
			this.app.renderFlowSeniorSearch();
		},
		workflow : function(userId, id){
			if(userId == 'flowdatastat'){
				this.app.renderFlowDataStat('flowdatastat',id);
			}else if(userId == 'flowcomprestat'){
				this.app.renderFlowCompreStat('flowcomprestat',id);
			}else if(userId == 'flowstat'){
				this.app.renderFlowStat('flowstat',id);
			}else if(userId == 'flowmanages'){
				this.flowmanages('flowmanages',id);
			}else if(userId == 'flowmanagessearch'){
				this.flowmanagessearch('flowmanagessearch',id);
			} else if(userId == 'flowpermissions'){
				this.app.renderFlowpermissions(id);
			}else if(userId == 'search'){
				this.app.renderFlowSearch(id);
			}else{
				this.app.renderWorkflow(userId, id);				
			}
		},
		createworkflow:function(userId,formId){
			this.app.renderNewWorkflow(userId,formId);
		},
		renderFilterFlows:function(type){
			this.app.renderFilterFlows(TEAMS.currentUser.id, type);
		},
		renderFilterFlows:function(userId,type){
			if(isNaN(userId)){
				this.app.renderFilterFlows(TEAMS.currentUser.id, userId);
			}else{
				this.app.renderFilterFlows(userId, type);//查看下属的下属的审批，返回会有问题(直接返回到自己的审批列表)，传一个userId解决此问题。				
			}
		},
		workflowinfo:function(id){
			this.app.renderWorkflow(TEAMS.currentUser.id, id);
		},
		flowSearch : function(keywords){
			this.app.renderFlowSearch(keywords);
		},
		
		calendar : function(userId){
			this.app.renderCalendar(userId);
		},
		calendarAdd :function(date){
			this.app.renderAgendaAdd(date);
		},
		calendarSearch : function(keywords){
			this.app.renderCalendarSearch(keywords);
		},
		/*agenda : function(userId, id){
			if(userId == 'view'){
				// 详情页
				this.app.renderAgendaInfo(id);
			}else{
				this.app.renderAgendaEdit(userId, id);				
			}
		},*/
		agenda : function(userId, id){
//			if(userId != TEAMS.currentUser.id){//下属(他人)的日程
//				// 详情页
//				this.app.renderAgendaInfo(userId,id);
//			}else{
				this.app.renderAgendaEdit(userId,id);				
//			}
		},
		repeatAgenda : function(userId, id, repeatNum){
//			if(userId != TEAMS.currentUser.id){//下属(他人)的日程
//				// 详情页
//				this.app.renderRepeatAgendaInfo(userId,id,repeatNum);
//			}else{
				this.app.renderRepeatAgendaEdit(userId,id,repeatNum);				
//			}
		},
		viewAgenda : function(id){
			this.app.renderWechatAgenda(id);
		},
		blog:function(userId){
			this.app.renderBlog(userId);
		},
		blogadd:function(){
			this.app.renderBlogAdd();
		},
		blogType:function(type, userId){
			this.app.renderBlog(userId, type);
		},
		bloginfo:function(userId, date){
			this.app.renderBlogInfo(userId, date);
		},
		bloginfoOther:function(userId, date,type){
			this.app.renderBlogInfo(userId, date,type);
		},
		blogById:function(id){
			this.app.renderBlogInfoId(id);
		},
		blogother:function(){
			this.app.renderBlog(TEAMS.currentUser.id, 'other');
		},
		blogunread:function(){
			this.app.renderBlog(TEAMS.currentUser.id, 'unread');
		},
		blogcomment:function(){
			this.app.renderBlog(TEAMS.currentUser.id, 'comment');
		},
		blogreplay:function(){
			this.app.renderBlog(TEAMS.currentUser.id, 'replay');
		},
		reportBlog:function(){
			this.app.renderReportBlog();
		},
		showCrmMobile:function(param){
			this.app.showCrmMobile(param);
		},
		showSmsMobile:function(param){
			this.app.showSmsMobile(param);
		},
		showPaasMobile:function(appId,pageId){
			this.app.showPaasMobile(appId,pageId);
		},
		showCustomPage:function(pageId){
			this.app.showCustomPage(pageId);
		},
		showPortalMobile:function(menuId,param){
			this.app.showPortalMobile(menuId,param);
		},
		showHrMobile:function(param){
			this.app.showHrMobile(param);
		},
		messagebox:function(){
			this.app.renderMessageBox();
		},
		feed:function(type){
			this.app.renderFeedSearch(type);
		},
		remind:function(type){
			this.app.renderMessageRemind(type);
		},
        remindApply:function(type, userId){
            this.app.renderApplyMessageRemind(type, userId);
        },
		old_dynamicInfo:function(){
//			this.app.renderDynamicInfo();
			this.dynamicList();
		},
		old_dynamicNew:function(){
//			this.app.renderDynamicNew();
			this.dynamicAdd();
		},
		dynamicList:function(){
			this.app.renderDynamicList();
		},
		dynamicAdd:function(){
			this.app.renderDynamicAdd();
		},
		dynamicInfo:function(id){
			this.app.renderDynamicInfo(id);
		},
		searchall:function(keywords){
			this.app.searchAll(keywords);
		},
		fullsearch:function(param){
			this.app.fullsearch(param);
		},
		searchcomment:function(module,keywords){
			this.app.searchComment(module,keywords);
		},
		wechat:function(){
			this.app.wechatlist();
		},
		wechatOne:function(id){
			this.app.wechat('chat',id);
		},
		wechatChannel:function(id){
			this.app.wechat('channel',id);
		},
		wechatinfo:function(type, id){
			this.app.wechatinfo(type, id);
		},
		wechathistory:function(type, id){
			this.app.wechathistory(type, id);
		},
		formDataReportList:function(type){
			this.app.formDataReportList(type);
        },
        formDataReportSearchList:function(type){
        	this.app.writeFormSearch(type);
        },
        
        formDataReport:function(userId, id){
            if(userId == 'search'){
                this.app.formDataReportSearch(id);
            }else{
                this.app.formDataReport(userId, id);                
            }
        },
        formDataReportInfo:function(id){
        	this.app.formDataReport(TEAMS.currentUser.id, id);   
		},
		formdatastatisticschat:function(formId) {
			this.app.formdatastatisticschat(formId);
		},
		formdatastatdetail:function(formId, keywords) {
			this.app.formdatastatdetail(formId, keywords);
		},
        imsysmsg:function(sgroup,type) {
			this.app.imsysmsg(sgroup,type);
		},
        formDataReportSearch:function(keywords){
            this.app.formDataReportSearch(keywords);
        },
        formStatDataTable:function(id){
        	this.app.formStatDataTable(id);
        },
        formStatDataTableForUserId:function(userId,id){
        	if(userId == 'search'){
        		this.app.formStatDataTableSearch(id);
        	}else{
        		this.app.formStatDataTable(id);
        	}
        },
        formStatDataTableSearch:function(id){
        	this.app.formStatDataTableSearch(id);
        },
        formdatadetail:function(type,id){
        	this.app.formdatadetail(type,id);
        },
        formdataReportDetail:function(id){
        	this.app.formdataReportDetail(id);
        },
        formdataReportDetailForUserId:function(userId,id){
        	this.app.formdataReportDetail(id);
        },
        writereport:function(formId){
        	this.app.writereport(formId);
        },
        free_navigation:function (sysMenuId,formModule,userId,type,formId,id) {
			this.app.renderFreeApplication(userId,type,sysMenuId,formModule,formId,id);
		}
	});

	module.exports = AppRouter;
});
