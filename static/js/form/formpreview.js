define(function(require, exports, module) {
	var formPlugin=require('form/form-plugin');		//表单插件
	var emojiarea = require('/static/js/form/emojiarea');
	var emojiarea_m = require('/static/js/form/m.emojiarea');
	var formpreview={};
	emojiarea_m($);
	//手机web
	$('#comment-content').emojiarea({
		buttonClass: 'a-emoji',
		buttonParent: '.inputarea-toolbar',
		buttonLabel:'<i class="icon-smile"></i>',
		buttonStyle:'color:#666;font-size:18px'
	});
	emojiarea($);
	//pc
	$('.form-comment-wrapper').find('.j_content').emojiarea({
		buttonClass: 'comment-emoji',
		emojiHeight:-165,
		emojiLeft: -70,
		buttonRoot: '.form-comment-wrapper .comment-post',
		buttonChild: '.comment-option' 
	}); 
	//加载表单预览布局数据
	formpreview.laodForm=function(){
		window.isPreview = true;
		var formId=$("#formId").val();
		var layoutId = $("#formLayoutId").val();
		var dataId=$("#dataId").val();		//用户填写ID
		var reportId=$("#reportId").val();	//报告ID
		var module = $("#module").val();
		var formCollectStatus = $("#collectStatus").val();
		var filterName=$("#filterName").val();	//获取表单名称
		var filterDescription=$("#filterDescription").val();	//获取表单描述
		var isExtDist= $("#isExtDist").val();	//是否外部分发
		if(isExtDist=='true'||isExtDist==true){
			window.isEDist=true;
		}
		
		if(reportId&&reportId.length>0){	//如果有报告ID，保存到页面元素中，在form-plugin中渲染控件使用
			$("#widget-control").data("reportId",reportId);
		}
		
		filterName=formPlugin.sensitiveWords(filterName);
		filterDescription=formPlugin.sensitiveWords(filterDescription);
		$(".form-name").text(filterName).attr("title",filterName);
		$(".form-description").text(filterDescription).attr("title",filterDescription);
		
		$("#widget-control").html("");
		
		if(TEAMS.currentUser == null){//未登录，显示登录按钮
			$('.btn-login').removeClass('hide');
			needCopy =false;
		}
		
		//外部分发id
		var distributeId = $("#distributeId").val();
		var loginMobile= $("#loginMobile").val();
		var loginEmail= $("#loginEmail").val();
		//根据distributeid查询
		if(window.location.href.indexOf("/formfills/")>0 || window.location.href.indexOf("/fill/")>0){
			var distribute='';
			var distributeCount = '';
			var netIp ='';
			if(distributeId){//表中有distributeId
				var param={};
				param['distributeId']=distributeId
				$.ajax({
					type : "post",
					async:false,
					url : TEAMS.service.formreport+"/biaoge/queryDistributeById.json",
					dataType : 'json',
					data : param,
					success : function(data){
						distribute = data.distribute;
						distributeCount = data.distributeCount;
						netIp = data.ipString;
						$("#netip").attr('href',netIp);
					}
		        });
		        if(!distribute){
		        	$(".j_form_preview").addClass("hide");
				    $(".j_form_disabled").removeClass("hide");
					return;
				}
				var showMobile = distribute.showMobile;
				var needPwd = distribute.needPwd;
				var password = distribute.password;
				var webpicUrl = distribute.webpicUrl;
				var showWebpic = distribute.showWebpic;
				var showSource = distribute.showSource;
				
				if(window.location.pathname.indexOf('/biaoge')>-1){
					if(showSource==true||showSource=='true'){
						$('.j_go-home').removeClass('hide');
					}
				}
				
				var disCollectStatus = distribute.collectStatus;
				var dueDate = distribute.dueDate;
				var collectCount = distribute.collectCount;
				//超过收集份数
				if(collectCount && distributeCount&& Number(distributeCount)>=Number(collectCount)){
					$(".j_form_preview").addClass("hide");
				    $(".j_form_disabled").removeClass("hide");
				    return;
				}
				//超过截止日期
				if(dueDate){
		        	dueDate = Date.create(dueDate).format('{yyyy}-{MM}-{dd} {HH}:{mm}');
		        	var today = new Date().format('{yyyy}-{MM}-{dd} {HH}:{mm}');
		        	if(today > dueDate){
		        		$(".j_form_preview").addClass("hide");
					    $(".j_form_disabled").removeClass("hide");
					    return;
		        	}
		        }
		        if(disCollectStatus =='close'){
		        	$(".j_form_preview").addClass("hide");
				    $(".j_form_disabled").removeClass("hide");
				    return;
		        }
		        
		        var everyOnce = distribute.everyOnce;
				if(everyOnce==true||everyOnce=='true'){
					var submitCount = '';
					if(TEAMS.currentUser != null){//登录用户
						var currentId = TEAMS.currentUser.id;
						var param={};
						param.userId = currentId;
						param.distributeId = distributeId;
						$.ajax({
							contentType: 'application/json;charset=UTF-8',
							type : "post",
							async:false,
							url :  TEAMS.service.formreport+"/biaoge/queryReportByUserAndDisId.json",
							dataType : 'json',
							data : JSON.stringify(param),
							success : function(data){
								submitCount = data.distributeCount;
							}
				        });
				        if(submitCount && Number(submitCount)>0){
							$(".j_form_preview").addClass("hide");
						    $(".j_form_disabled").removeClass("hide");
						    return;
						}
					}else{//未登录用户
						var localIp = $("#localip").attr('href');
						if(netIp && localIp){//可以获取到ip
							var dataReport = {},param = {};
							dataReport.distributeId = distributeId;
		                    dataReport.netIp = netIp;
		                    dataReport.localIp = localIp;
		                    param.dataReport = dataReport;
							$.ajax({
								contentType: 'application/json;charset=UTF-8',
								type : "post",
								async:false,
								url :  TEAMS.service.formreport+"/biaoge/queryReportByNet.json",
								dataType : 'json',
								data : JSON.stringify(param),
								success : function(data){
									submitCount = data.everyCount;
								}
					        });
							if(submitCount && Number(submitCount)>0){//该ip已经提交过
								$(".j_form_preview").addClass("hide");
							    $(".j_form_disabled").removeClass("hide");
							    return;
							}
						}else{//不能获取到ip，则判断浏览器
							var localSto = localStorage.getItem(distributeId+"_distribute");
							if(localSto){
								$(".j_form_preview").addClass("hide");
							    $(".j_form_disabled").removeClass("hide");
							    return;
							}
						}
					}
				}
		        
		        
		        //需要填写密码
		        if((needPwd==true||needPwd=='true') && password && password!=''){
					$(".j_form_preview").addClass("hide");
				    $(".j_form_inputPwd").removeClass("hide");
				    return;
				}
			}else{//表中没有distributeId，兼容老url
				if(formCollectStatus=='disable'){
					$(".j_form_preview").addClass("hide");
				    $(".j_form_disabled").removeClass("hide");
				    return;
				}
			}
		}
		
		//外部分发跟踪提交成功后，显示评论框并加载评论
		if(window.location.href.indexOf("/submitResult/")>=0){
			//pc
		    localStorage.removeItem(formId+"_datacollect");
			var trackReport = $("#trackReport").val();
			if(window.systemInfo_form!="mobile"){
				if(trackReport!=null && trackReport!=""){
					$('.form-preview-wrapper').find('#report_track input').val(trackReport).attr("readonly",true);
				}else{
					$('.form-preview-wrapper').find('#report_track input').focus();
				}
				$("#form-preview").addClass("hide");
			    $("#report_track").removeClass("hide");
			    $('.form-comment-wrapper').removeClass('hide');
			    //加载评论	
			    var param = {};
				param.pageNo=formpreview.comment.pageNo;
			    formpreview.loadComment(param);
			    var cateHeight=$('.j_catalog-list').height();
			    $('.j_catalog-item').css('height',cateHeight);
			}else{//手机web
				
				$("#form-preview").addClass("hide");
				$("#report_track").find('.j_trackBtn').attr('trackReport',trackReport);
			    $("#report_track").removeClass("hide");
			}
			return;
		}
		
		formpreview.renderFormDetail(dataId,module,formId,layoutId,distributeId,isExtDist,webpicUrl,showWebpic);
		formpreview.renderMobileOrEmail(showMobile,loginMobile,loginEmail);
		
		if(window.location.pathname.indexOf('/biaoge/preview/')!=0){
			//显示复制模板按钮
			$('.form-preview-wrapper .j_cloneForm').remove();
		}else if(TEAMS.currentUser!=null){
			$('.form-preview-wrapper .j_cloneForm').removeClass('hide');
		}
		
		if(window.location.pathname.indexOf('/previewFill')==-1){
			 //显示右侧评论
			$('.form-preview-wrapper .j_comment-content').removeClass('hide');
		}
		
		if(window.location.pathname.indexOf('/biaoge/previewFill/')>=0){
			if(window.systemInfo_form!="mobile"&&window.location.pathname.indexOf('/scanReport')<0){
				$('.form-comment-wrapper').removeClass('hide');
				//加载评论
				var param = {};
				param.pageNo=formpreview.comment.pageNo;
				formpreview.loadComment(param);
			}else{
				$('#form-preview').find('#comment-view').removeClass('hide');
				//加载评论
				var param = {};
				param.pageNo=formpreview.comment.pageNo;
				formpreview.loadComment_m(param);
			}
		}
	};
	//预览切换
	$(document).on('click','.j_view_type',function(){
		if($(this).hasClass('active')) return;
		$(this).addClass('active').siblings('a').removeClass('active');
		var type = $(this).attr('data-value');
    	var formPreviewContent=$(this).parents('.form-preview-content');
		if(type == "pc"){
			 formPreviewContent.find('.j_form-viewport-mobile').hide().css({'right':'0px','opacity':'0'});
			$("#form-preview-mobile").fadeOut(200,function(){
        		$("#form-preview").fadeIn(100,function(){
        			$("#form-preview").removeClass('hide');
        		});
        		$(window).resize();
    			setTimeout(function(){formPreviewContent.find('.j_form-viewport-pc').show().animate({
    				right:-41,
    				opacity:1
    			})},100);
		    	var pcType=formPreviewContent.find('.j_form-viewport-pc a[data-value="pc"]');
		    	pcType.addClass('active').siblings().removeClass('active');
		    	type ='mobile';
				formPreviewContent.css({'padding-top':'40px','width':'800px'});
        	});
		}else{
			formPreviewContent.find('.j_form-viewport-pc').hide().css({'right':'0px','opacity':'0'});
			$("#form-preview").fadeOut(200,function(){
        		$("#form-preview-mobile").fadeIn(100,function(){
        			$("#form-preview-mobile").removeClass('hide');
        		});
    			setTimeout(function() {formPreviewContent.find('.j_form-viewport-mobile').show().animate({
				      right:-41,
    				  opacity:1
    				  })},100);
		      	var pcType=formPreviewContent.find('.j_form-viewport-mobile a[data-value="mobile"]');
		      	pcType.addClass('active').siblings().removeClass('active');
		      	type ='pc';
				formPreviewContent.css({'padding-top':'40px','width':'375px'});
        	});
		}
	});
	//渲染表单
	formpreview.renderFormDetail=function(dataId,module,formId,layoutId,distributeId,isExtDist,webpicUrl,showWebpic){
		var scanR = $("#scanReport").val();
		var readOnly = false;
		if(scanR){
			readOnly = true;
		}
		if(window.location.pathname.indexOf('/biaoge/previewFill/')>=0){
			readOnly = true;
		}
		if(dataId!=null&&dataId!=""){	//如果表单填写ID不为空 渲染表单填写
			 formPlugin.renderFormData({
				parentEl:$("#widget-control"),
				dataId:dataId,
				module:module?module:"formdatareport",
				notDefault:true,
				readOnly:readOnly,
				callback:function(data){
					if(data.formData.dataStatus=="submit" ||scanR){	//如果是已经提交的填写 所有字段设置为只读
				    	$("#submit").parent().remove();
			    	}else{
			    		$("#submit").removeClass('hide');
			    		$("#temporary").show();
			    	}
				}
			});
		 }else{
			 //手机上随机加载banner
			 if(window.systemInfo_form == "mobile"){
			 	if(showWebpic && (showWebpic==true || showWebpic=='true')){
			 		$('.j_formbanner').empty().append('<img src="/static/img/mobile/form/banner/'+ _.random(1,10) +'.png"/>');
			 		if(webpicUrl){
					 	if(webpicUrl.indexOf('download')>-1){
					 		var fileObjId = webpicUrl.substring(webpicUrl.indexOf('download'));
							fileObjId = fileObjId.substring(fileObjId.indexOf('/')+1);
						 	var src = '/remote/previewremote/img?id='+fileObjId+'&imgFormat=image&refId='+formId+'&module=form';
						 	$('.j_formbanner').empty().append('<img src="'+src+'"/>');
					 	}
					 }
			 	}
			 }else{
				 $('.j_formbanner').empty();
			 }
			 formPlugin.renderForm({
				parentEl:$("#widget-control"),
				formId:formId,
				layoutId:layoutId,
				distributeId:distributeId,
				module:module,
				isExtDist:isExtDist,
				formData:formpreview.getFormDataLocalStorage(formId,isExtDist),
				callback:function(data){
					if(window.location.href.indexOf("/formfills/")>0 || window.location.href.indexOf("/fill/")>0){	//填写表单
						$("#submit").removeClass('hide');
						$("#temporary").show();
					}else{	//删除保存按钮
						$("#submit").parent().remove();	//删除元素
					}
				}
			});
		 }
		//如果是外部分发或者是自定义统计预览,则不显示切换预览
		if(window.isEDist == true || window.isEDist== "true" || window.location.pathname.indexOf('/form/reportPreview/')>=0 || window.location.pathname.indexOf(TEAMS.service.form+'/freeform/reportPreview/')>=0){
			$(".j_form-viewport-opt").remove();
		}else{
			$(".j_form-viewport-opt").removeClass("hide");
			var $iframe = $('#mobileIframe');
			var formId = $("#formId").val();
			window.m_formpreview = "m_formpreview";
			if(!$(this).attr("is_frist")){
				if(module == "workflow") {
					$iframe.attr("src","/mobile/ebgforms/workflow/" + formId);
				} else {
					$iframe.attr("src","/mobile/ebgforms/biaoge/" + formId);
				}
			}
            $('.j_form-viewport-mobile').hide().css({'right':'0px','opacity':'0'});
		}
		
	};
	
	//渲染手机和邮箱div
	formpreview.renderMobileOrEmail=function(showMobile,loginMobile,loginEmail){
 		//外部分发页面，新增跟踪填写手机号码和邮箱输入框;提交数据之前不显示评论框
		if(window.location.pathname.indexOf('/biaoge/formfills/')>=0 || window.location.pathname.indexOf('/biaoge/fill/')>=0){
			if(showMobile==true||showMobile=='true'){
				if(window.systemInfo_form!="mobile"){
					var item = '<div class="j_track field-hoz field-contact"><label class="widget-title w-120"><span class="widget-title_js">请填写手机或邮箱</span></label><div class="widget-content ml-130"><input type="text" class="form-control w-400 j_mobileOrEmail" placeholder="输入即可绑定本条数据，方便您之后查看或与数据收集者互动哦"></div></div>';
					$('.form-preview-wrapper .j_form_foot').before(item);
					if(loginMobile!=null && loginMobile!=""){
						$('.form-preview-wrapper .j_track .j_mobileOrEmail').val(loginMobile).attr("readonly",true);
					}else if(loginEmail!=null && loginEmail!=""){
						$('.form-preview-wrapper .j_track .j_mobileOrEmail').val(loginEmail).attr("readonly",true);
					}
				}else{
					var item = '<div class="j_track form-track-box"><div class="track-title"><span class="widget-title_js">请填写手机或邮箱</span></div><div class="track-input"><input type="text" class="j_mobileOrEmail" placeholder="输入可绑定本条数据，方便之后查看或与数据收集者互动"></div></div>';
					$('#form-preview .j_submit_btn').before(item);
					if(loginMobile!=null && loginMobile!=""){
						$('#form-preview .j_track .j_mobileOrEmail').val(loginMobile).attr("readonly",true);
					}else if(loginEmail!=null && loginEmail!=""){
						$('#form-preview .j_track .j_mobileOrEmail').val(loginEmail).attr("readonly",true);
					}
				}
			}
		}
	};
	
	//查询评论信息
	formpreview.loadComment_m = function(param){
		var targetId = $("#dataReportId").val();
		var entityType = 'formdatareport';
		var ownership = $("#ownership").val();
		var url = TEAMS.service.formreport+'/biaoge/queryComment.json';
		if(ownership&&ownership=='cloud'){
			var formId = $("#formId").val();
			param.formId = formId;
			param.pageSize=formpreview.comment.pageSize;
			url = TEAMS.service.formreport+'/biaoge/searchFormcomment.json';
		}else{
			if(targetId == "" || targetId == null){
				$('#form-preview .j_comment_enter').attr("disabled","disabled");
				return;
			}
			param.targetId = targetId;
		    param.entityType = entityType;
		    param.formId = $("#formId").val();
	    	param.pageSize=formpreview.comment.pageSize;
		}
		//加载表单评论信息
		formpreview.comment.queryComment(ownership,url,param,function(data){
			 var formComments = data.commentPage;
			if(ownership&&ownership=='cloud'){
				formComments = data.pageFormComment;
			}
			 $.each(formComments.result,function(){
			 	formpreview.renderComment_m(this,'append');
			 });
			 if(formComments.hasNext){
				$('#form-preview .j_more').removeClass('hide');
				$('#form-preview .j_more').attr('pageNo',formComments.pageNo);
			 }else{
				 $('#form-preview .j_more').addClass('hide');
			 }
			 var scanR = $("#scanReport").val();
			 var commentItem = $('#comment-list .j_comt-item').length;
			 if(scanR){
			 	if(commentItem==0){
			 		$('#comment-view').remove();
			 	}else{
			 		$('#form-preview').find('.j_comt-replay').remove();
			 	}
			 }
		});
	};
	
	//查询评论信息
	formpreview.loadComment = function(param){
		$('.form-comment-wrapper .j_comment-input .j_content').autosize();
		var ownership = $("#ownership").val();
		var targetId = $("#dataReportId").val();
		var entityType = 'formdatareport';
		var url = TEAMS.service.formreport+'/biaoge/queryComment.json';
		if(ownership&&ownership=='cloud'){
			var formId = $("#formId").val();
			param.formId = formId;
			param.pageSize=formpreview.comment.pageSize;
			url = TEAMS.service.formreport+'/biaoge/searchFormcomment.json';
		}else{
			if(targetId == "" || targetId == null){
				$('.form-comment-wrapper').removeClass('hide');
				$('.form-comment-wrapper').find('.j_module-container').empty().html('<br><p style="text-align:center;">该条数据已删除，暂不能评论！</p>');
				return;
			}
			param.targetId = targetId;
			param.formId = $("#formId").val();
		    param.entityType = entityType;
	    	param.pageSize=formpreview.comment.pageSize;
		}
	    
		//加载表单评论信息
		formpreview.comment.queryComment(ownership,url,param,function(data){
			var formComments = data.commentPage;
			if(ownership&&ownership=='cloud'){
				formComments = data.pageFormComment;
			}
			 
			 $.each(formComments.result,function(){
			 	formpreview.renderComment(this,'append');
			 });
			 if(formComments.hasNext){
				 $('.j_module-container .j_morecontent').removeClass('hide');
				 $('.j_module-container .j_morecontent').attr('pageNo',formComments.pageNo);
			 }else{
				 $('.j_module-container .j_morecontent').addClass('hide');
			 }
		});
	};
	
	
	//重新计算表单高度
	formpreview.calculateHeight=function(){
		var windowHeigth=$(window).height();
		$("#form-preview").attr("style","min-height:"+(windowHeigth-30)+"px;");
	};
	formpreview.calculateMobileHeight=function(){
		
	}
	
	
	//表单评论
	formpreview.comment={
		'pageNo':1,
		'pageSize':10,
		
		//外部分发跟踪填写后，查询
		'queryComment':function(ownership,url,param,callback){
			$.ajax({
				contentType: 'application/json;charset=UTF-8',
				type : 'post',
				url : url,
				dataType : 'json',
				data : JSON.stringify(param),
				success : function(data) {
					data=formPlugin.sensitiveWords(data,"json");	//过滤敏感词
					if (callback)
						callback(data);
				}
			});
		},
		//外部分发跟踪填写后，添加评论
		'createComment':function(url,param,callback){
			$.ajax({
				contentType: 'application/json;charset=UTF-8',
				type : 'post',
				url : url,
				dataType : 'json',
				data : JSON.stringify(param),
				success : function(data) {
					data=formPlugin.sensitiveWords(data,"json");	//过滤敏感词
					if (callback)
						callback(data);
				}
			});
		}
	};
	
	formpreview.initMessage = function(message){
		message=message.replace(/</g,'&lt').replace(/>/g,'&gt').replace(/\r\n|\n/g, ' <br/>').replace(/ /g, '  ');
		var parten1 = new RegExp('(((ht|f)tp(s?))\://)?(www.|([a-zA-Z]+[\.]{1}))[a-zA-Z0-9\-\.]*(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk|cn)(/($|[a-zA-Z0-9\:\.\;\?\'\\\+&amp;%\$#\=~_\-])+)*','g');
		var mes1 = message.match(parten1);
//		message = formpreview.initUrl(mes1, message);
		return message;
	};
	formpreview.initUrl=function(messages, message){
			if(!messages) return message;
			var seleted = '';
			for(var j =0; j < messages.length; j++){
				var msg = $.trim(messages[j]);
				if(seleted.indexOf(msg) >= 0) continue; //防止重复操作 
				if(msg.indexOf('http') == 0 || msg.indexOf('https') == 0 || msg.indexOf('ftp') == 0) //判断是否有http协议头
				{	var temp = message.split(msg);
					var tempmsg = ''; 
					for(var i =0; i < temp.length -1; i++){
						tempmsg += (temp[i]+'<a target="_blank" href="'+msg+'">'+msg+'</a>');
					}
					message =  tempmsg+temp[temp.length -1];
				}else{ 
					var temp = message.split(msg);
					var tempmsg = ''; 
					for(var i =0; i < temp.length -1; i++){
						tempmsg += (temp[i]+'<a target="_blank" href="http://'+msg+'">'+msg+'</a>');
					}
					message =  tempmsg+temp[temp.length -1];
				}	
				seleted += messages[j]+"  ";
			}
			return message;
		};
	
	
	//渲染上报评论列表
	formpreview.renderComment = function(comment,type){
		if(comment.operator){
			comment.commentor = comment.operator;
			comment.addTime = comment.createTime;
			if(comment.parent && comment.parent.operator){
				comment.parent.commentor = comment.parent.operator;
			}
		}
		 var item = $('.form-comment-wrapper #comment-clone #comment-item').clone();
		  var userMobile = $("#loginMobile").val();
		  var userEmail= $("#loginEmail").val();
		 item.attr('id',comment.id);
		 if(comment.commentor){
			 if(comment.commentor.username){
			 	 item.find('.comment-user').text(comment.commentor.username).attr('userId',comment.commentor.id);
			 }
			 var param = {};
			 param['userId'] = comment.commentor.id;
			 $.ajax({
				type : 'post',
				url : TEAMS.service.formreport+'/biaoge/queryByUserId.json',
				dataType : 'json',
				data : param,
				success : function(data) {
					var commentTenkey = data.tkey;
					 if(comment.commentor.avatar && comment.commentor.avatar.p3 && TEAMS.currentTenant && (commentTenkey.toUpperCase() == (TEAMS.currentTenant.tenantKey).toUpperCase())){
						 item.find('.j_comment_clone_avatar img').attr('src','/base/download/'+comment.commentor.avatar.p3);
					 }
				}
			 });
		 }else{
		 	item.find('.comment-user').text('游客');
		 }
		 var tempContent = formpreview.initMessage(comment.content);
		 if(comment.commentCount){
		 	item.find('#show_at_comment .j_comment-count').text("("+comment.commentCount+")");
		 }else{
		 	if(comment.parent&&comment.parent.id){
			 	var old = $('.form-comment-wrapper .j_module-container .j_comment_list').find('#'+comment.parent.id).find('.j_comment-count').text();
			 	if(!old){//为空，第一次填写
			 		$('.form-comment-wrapper .j_module-container .j_comment_list').find('#'+comment.parent.id).find('.j_comment-count').text('(1)');
			 	}else{
			 		var oldVal = old.substring(1,old.lastIndexOf(')'));
			 		var newVal = parseInt(oldVal)+1;
			 		$('.form-comment-wrapper .j_module-container .j_comment_list').find('#'+comment.parent.id).find('.j_comment-count').text('('+newVal+')');
			 	}
		 	}
		 }
		 if(comment.parent){//加载回复
		 	var tempParentContent = comment.parent.content;
		 	if(comment.parent && comment.parent.commentor){
		 		item.find('.j_parent_comment .j_p_username').text("回复@"+comment.parent.commentor.username).attr('userId',comment.parent.commentor.id);
		 	}else{
		 		item.find('.j_parent_comment .j_p_username').text("回复@游客");
		 	}
		 	if(comment.parent.userData){
		 		var parentUserData = [];
				parentUserData = eval(comment.parent.userData);
				if(parentUserData){
					for(var i=0;i<parentUserData.length;i++){
						if(parentUserData[i]){
							if(parentUserData[i].userIdIndex && parentUserData[i].userIdIndex != 0){
								var atClass = formpreview.getAtUserClass(parentUserData[i].atType);
								tempParentContent = tempParentContent.substring(0,parentUserData[i].userIdIndex-1) + "@"+parentUserData[i].userName + tempParentContent.substring(parentUserData[i].userIdIndex-1);
							}else{
								if(parentUserData[i].userId!='null'){
									clone.find("#show_at_comment").prepend("<a class='"+atClass+"' userId='"+parentUserData[i].userId+"'>@"+parentUserData[i].userName+" "+"</a>");
								}
							}
						}
					}
				}
		 	}
		 	tempParentContent = formpreview.initMessage(tempParentContent);
		 	item.find('.j_parent_comment .j_parent_content').html($.faceConvert(tempParentContent));
		 	item.find('.j_parent_comment').removeClass('hide');
		 }
		 if(comment.userData){
			var userData = [];
			userData = eval(comment.userData);
			if(userData){
				for(var i=0;i<userData.length;i++){
					if(userData[i]){
						if(userData[i].userIdIndex && userData[i].userIdIndex != 0){
							var atClass = formpreview.getAtUserClass(userData[i].atType);
							tempContent = tempContent.substring(0,userData[i].userIdIndex-1) + "@"+userData[i].userName + tempContent.substring(userData[i].userIdIndex-1);
						}else{
							if(userData[i].userId!='null'){
								clone.find("#show_at_comment").prepend("<a class='"+atClass+"' userId='"+userData[i].userId+"'>@"+userData[i].userName+" "+"</a>");
							}
						}
					}
				}
			}
		 }
		 item.find('#show_at_comment .j_content').html($.faceConvert(tempContent));
		 item.find('#show_at_comment .j_time').text(new Date(comment.addTime).format("{yyyy}-{MM}-{dd} {HH}:{mm}"));
		 if(type == 'append'){
		 	$('.form-comment-wrapper .j_module-container .j_comment_list').append(item);
		 }else{
			$('.form-comment-wrapper .j_module-container .j_comment_list').prepend(item);
		 }
	};
	
	formpreview.getAtUserClass=function(type){
		var atClass;
        if (undefined == type || type == 'user') {
            atClass = "at-user usercard-toggle";
        }else if(type == 'department'){
        	atClass = "at-user departmentcard-toggle";
        }else if(type == 'group'){
        	atClass = "at-user channelcard-toggle";
        } else {
            atClass = "at-user";
        }
        return atClass;
	};
	//手机号校验
	formpreview.mobileCheck=function(value){
		var reg0 = /^13\d{9}$/;
		var reg1 = /^14\d{9}$/;
	    var reg2 = /^15\d{9}$/;
	    var reg3 = /^18\d{9}$/;
	    var reg4 = /^17\d{9}$/;
	    var reg5 = /^((\+)?86)?1(3|4|5|7|8)\d{9}$/;
	    var reg6 = /^19\d{9}$/;
	    var reg7 = /^16\d{9}$/;
	    var my = false;
	    if (reg0.test(value))my=true;
	    if (reg1.test(value))my=true;
	    if (reg2.test(value))my=true;
	    if (reg3.test(value))my=true;
	    if (reg4.test(value))my=true;
	    if (reg5.test(value))my=true;
	    if (reg6.test(value))my=true;
	    if (reg7.test(value))my=true;
	    if(!my){return false;}
	    return true;
	};
	
	//email校验
	formpreview.emailCheck=function(value){
		var reg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		return reg.test(value);
	};
	
	//校验手机号和邮箱
	formpreview.checkVal = function(value){
		if(value != null && value!=""){
			var mbCheck = formpreview.mobileCheck(value);
			if(!mbCheck){
				var emCheck = formpreview.emailCheck(value);
				if(!emCheck){
					return false;
				}
			}
		}
		return true;
	};
	
	//手机web渲染评论列表
	formpreview.renderComment_m = function(comment,type){
		if(comment.operator){
			comment.commentor = comment.operator;
			comment.addTime = comment.createTime;
		}
		 var item = $('#form-preview #comment-clone .j_comt-item').clone();
		 var userMobile = $("#loginMobile").val();
		 var userEmail= $("#loginEmail").val();
		 item.attr('id',comment.id);
		 item.find('.j_comt-replay').attr('p_id',comment.id);
		 if(comment.commentor){
			 if(comment.commentor.username){
			 	 item.find('.j_comt-user').text(comment.commentor.username).attr('userId',comment.commentor.id);
			 }
			 
			 var param = {};
			 param['userId'] = comment.commentor.id;
			 $.ajax({
				type : 'post',
				url : TEAMS.service.formreport+'/biaoge/queryByUserId.json',
				dataType : 'json',
				data : param,
				success : function(data) {
					var commentTenkey = data.tkey;
					 if(comment.commentor.avatar && comment.commentor.avatar.p3 && TEAMS.currentTenant && (commentTenkey.toUpperCase() == (TEAMS.currentTenant.tenantKey).toUpperCase())){
						 item.find('.j_comment_clone_avatar img').attr('src','/base/download/'+comment.commentor.avatar.p3);
					 }
				}
			 });
		 }else{
		 	item.find('.j_comt-user').text('游客');
		 }
		 var tempContent = formpreview.initMessage(comment.content);
		 if(comment.parent){//加载回复
		 	var tempParentContent = comment.parent.content;
		 	if(comment.parent && comment.parent.commentor){
		 		item.find('.j_parent-content-body .j_parent-username').text("回复"+comment.parent.commentor.username+"：").attr('userId',comment.parent.commentor.id);
		 	}else{
		 		item.find('.j_parent-content-body .j_parent-username').text("回复游客：");
		 	}
		 	if(comment.parent.userData){
		 		var parentUserData = [];
				parentUserData = eval(comment.parent.userData);
				if(parentUserData){
					for(var i=0;i<parentUserData.length;i++){
						if(parentUserData[i]){
							if(parentUserData[i].userIdIndex && parentUserData[i].userIdIndex != 0){
								var atClass = formpreview.getAtUserClass(parentUserData[i].atType);
								tempParentContent = tempParentContent.substring(0,parentUserData[i].userIdIndex-1) + "@"+parentUserData[i].userName + tempParentContent.substring(parentUserData[i].userIdIndex-1);
							}else{
								if(parentUserData[i].userId!='null'){
									clone.find(".j_com-content-body").prepend("<a class='"+atClass+"' userId='"+parentUserData[i].userId+"'>@"+parentUserData[i].userName+" "+"</a>");
								}
							}
						}
					}
				}
		 	}
		 	tempParentContent = formpreview.initMessage(tempParentContent);
		 	item.find('.j_parent-content-body .j_parent-content').html($.faceConvert(tempParentContent));
		 }
		 if(comment.userData){
			var userData = [];
			userData = eval(comment.userData);
			if(userData){
				for(var i=0;i<userData.length;i++){
					if(userData[i]){
						if(userData[i].userIdIndex && userData[i].userIdIndex != 0){
							var atClass = formpreview.getAtUserClass(userData[i].atType);
							tempContent = tempContent.substring(0,userData[i].userIdIndex-1) + "@"+userData[i].userName + tempContent.substring(userData[i].userIdIndex-1);
						}else{
							if(userData[i].userId!='null'){
								clone.find(".j_com-content-body").prepend("<a class='"+atClass+"' userId='"+userData[i].userId+"'>@"+userData[i].userName+" "+"</a>");
							}
						}
					}
				}
			}
		 }
		 item.find('.j_com-content-body').html($.faceConvert(tempContent));
		 item.find('.j_comt-date').text(new Date(comment.addTime).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}"));
		 if(type == 'append'){
		 	$('#form-preview #comment-list').append(item);
		 }else{
			$('#form-preview #comment-list').prepend(item);
		 }
	};
	
	
	
	formpreview.setFormDataLocalStorage = function(formId){
	    //表单数据
        var param=formPlugin.submitAssembleForm({
            parentEl:$("#widget-control")
        });   
        //明细表信息
        var maxSubFormIndexs = [];
        var subForms = $("#widget-control").find(".subform_js").each(function(){
            var $this = $(this);
            maxSubFormIndexs.push({
                maxIndex:$this.find(".subtable_js tbody tr").length -1,
                subFormId:$this.attr("id")
            })
        })
        if(param && param.formData && param.formData.dataDetails &&  param.formData.dataDetails.length > 0){
            param.formData.maxSubFormIndexs = maxSubFormIndexs;
            localStorage.setItem(formId+"_datacollect",JSON.stringify(param.formData));  
        }
    };
    
    formpreview.getFormDataLocalStorage = function(formId,isExtDist){
    	if(isExtDist=='true'||isExtDist==true){
    		return JSON.parse(localStorage.getItem(formId+"_datacollect")) || null;
    	}
        return null;
    };
    
    formpreview.beforeunload=function(){
        window.onunload = function() {
            formpreview.setFormDataLocalStorage($("#formId").val());
            return false;
        };
    };
	
	$(function(){
	    formpreview.beforeunload();
		//手机web
		if(window.systemInfo_form=="mobile"){
			//点击评论框
			$('#form-preview').off('tap.formpreview', '.j_comment_enter').on('tap.formpreview','.j_comment_enter',function(){
				var $this = $(this);
				$('.j_page-view').addClass('hide');
				$('#edit_comment').removeClass('hide');
				$('#edit_comment').find('.j_comment-create').attr('type','create')
			});
			
			//点击提交按钮
			$('#edit_comment').off('tap.formpreview', '.j_comment-create').on('tap.formpreview','.j_comment-create',function(){
				var $this = $(this);
				var type = $this.attr('type');
				var content = $('#edit_comment #comment-content').val();
				var p_comment_id = $this.attr('p_comment_id');
				var targetId = $("#dataReportId").val();
				var module = 'formdatareport';
				var formName = $("#filterName").text();
				var ownership = $("#ownership").val();
				var url = TEAMS.service.formreport+'/biaoge/createComment.json';
				var params={};
				//新增评论提交
				if(type && type=='create'){
					if(ownership&&ownership=='cloud'){
						var formComment = {};
						formComment.formID = $("#formId").val();
						formComment.content = content;
						url = TEAMS.service.formreport+'/biaoge/createFormcomment.json';
						params.formComment = formComment;
					}else{
						var comment = {};
						comment.targetId = targetId;
						comment.module = module;
						comment.targetName = formName;
						comment.content = content;
						params.comment = comment;
						params.formId = $("#formId").val();
					}
				}else if(type && type=='replay'){//回复评论提交
					var parentId = p_comment_id;
					if(ownership&&ownership=='cloud'){
						var formComment = {};
						formComment.formID = $("#formId").val();
						formComment.content = content;
						var parent = {};
						parent.id = parentId;
						formComment.parent = parent;
						url = TEAMS.service.formreport+'/biaoge/createFormcomment.json';
						params.formComment = formComment;
					}else{
						var comment = {};
						comment.targetId = targetId;
						comment.module = module;
						comment.targetName = formName;
						comment.content = content;
						params.parentId = parentId;
						params.comment = comment;
						params.formId = $("#formId").val();
					}
				}
				if(content.length==0){
					formPlugin.notify('评论内容不能为空');
				}else if(content.length>200){
					formPlugin.notify('评论内容不能超过200个字符');
				}else{
					$this.attr("disabled","disabled");
					formpreview.comment.createComment(url,params,function(data){
						if(data && data.actionMsg && data.actionMsg.code!=0){
							formPlugin.notify(data.actionMsg.message);
							$this.removeAttr("disabled");
							return;
						}
						var comment = data.comment;
						if(ownership&&ownership=='cloud'){
						 	comment = data.formComment;
						 }
						if(data && comment){
							 formpreview.renderComment_m(comment,'prepend');
							 $('.j_page-view').removeClass('hide');
							 $('#edit_comment').addClass('hide');
							 $('#edit_comment #comment-content').val('');
							 $this.removeAttr("disabled");
							 formPlugin.notify('评论成功');
						}
					});
				}
			});
			
			//点击返回
			$('#edit_comment').off('tap.formpreview', '#j_a-back').on('tap.formpreview','#j_a-back',function(){
				$('.j_page-view').removeClass('hide');
				$('#edit_comment').addClass('hide');
			});
			
			//点击回复
			$('#form-preview').off('tap.formpreview', '.j_comt-replay').on('tap.formpreview','.j_comt-replay',function(){
				var $this = $(this);
				setTimeout(function(){
						$('.j_page-view').addClass('hide');
						$('#edit_comment').removeClass('hide');
					}, 100);
				var p_comment_id = $this.attr('p_id');
				$('#edit_comment').find('.j_comment-create').attr('type','replay').attr('p_comment_id',p_comment_id);
			});
			//加载更多
			$('#form-preview').off('tap.formpreview', '.j_more').on('tap.formpreview','.j_more',function(){
				var pageNo =$(this).attr('pageNo');
				$(this).addClass('hide');//隐藏按钮
				var param = {};
				param.pageNo=parseInt(pageNo)+1;
			    formpreview.loadComment_m(param);
			});

			$('#report_track').off('tap.formpreview', '.j_signup_btn').on('tap.formpreview','.j_signup_btn',function(){
				var local = 'http://localhost:9080';
				var teems = 'https://www.teems.cn';
				var release = 'https://www.mulinquan.com';
				var beta = 'https://www.xiezuoqu.cn';
				var smartheer = 'https://www.smartheer.cn';

				var testPass = 'https://passport.teems.cn';
				var releasePass = 'https://passport.mulinquan.com'
				var betaPass = 'https://passport.xiezuoqu.cn';
				var smartheerPass = 'https://passport.smartheer.cn';
				var formdataId = $("#dataId").val();
				var loginUrl = '';
				if(window.location.href.indexOf("localhost:9080")>=0){
					loginUrl = testPass+"/login?service="+local+"/biaoge/previewFill/"+formdataId;
				}else if(window.location.href.indexOf("teems.cn")>=0){
					loginUrl = testPass+"/login?service="+teems+"/biaoge/previewFill/"+formdataId;
				}else if(window.location.href.indexOf("mulinquan.com")>=0){
					loginUrl = releasePass+"/login?service="+release+"/biaoge/previewFill/"+formdataId;
				}else if(window.location.href.indexOf("xiezuoqu.cn")>=0){
					loginUrl = betaPass+"/login?service="+beta+"/biaoge/previewFill/"+formdataId;
				}else if(window.location.href.indexOf("smartheer.cn")>=0){
					loginUrl = smartheerPass+"/login?service="+smartheer+"/biaoge/previewFill/"+formdataId;
				}
				window.location.href=loginUrl;
			});

//			formpreview.calculateMobileHeight();	//计算高度
			$('#preview_m').width($(window).width());
			//窗口改变事件
			if(window.self != window.top){
                $('#preview_m').width($(window).width());
                $('#preview_m').css({
					'overflow':'auto',
					'-webkit-overflow-scrolling':'touch',
					'width':realClientSize.width + 'px',
					'height':realClientSize.height + 'px'
                });
				$(window).off('orientationchange.formpreview resize.formpreview').on('orientationchange.formpreview resize.formpreview',function(event){
					$('#preview_m').width(realClientSize.width);
                    $('#preview_m').height(realClientSize.height);
				});
			}
		}
		if(window.systemInfo_form!="mobile"){
			function initLayout(obj){
				var marginbottom = obj.attr('marginbottom') || 0;
				var top = obj.offset().top;
				var winHeight = $(window).height();
				obj.height(winHeight - top - marginbottom);
				var theTheme = obj.attr('theme')?obj.attr('theme'):'darkblue';
				if (!obj.hasClass('mCustomScrollbar')) {
					obj.mCustomScrollbar({
						theme:theTheme
					});
				}
			}
			
			$('body').off('resizeSroll').on('resizeSroll' ,'div.scroll-wrapper',function(event){
				var $this = $(this);
				if($this.attr('horizontal')){
					var width = $(window).width();
					var left = $this.offset().left;
					$this.css('width',width - left);
				}else{
					var height = $(window).height();
					var marginbottom = $this.attr('marginbottom') || 0;
					var top = $this.offset().top;
					$this.css('height',height - top - marginbottom);
				}
				$this.mCustomScrollbar("update");
			});
			initLayout($('.j_module-container'));
		
			formpreview.calculateHeight();	//计算高度
			//窗口改变事件
			$(window,window.parent).off('resize.formpreview').on('resize.formpreview',function(event){
				if($(".j_view_type[data_value='pc']").hasClass("active")){
					formpreview.calculateHeight();
					setTimeout(function(){
						$('body div.scroll-wrapper').each(function(event){
							$(this).trigger('resizeSroll',event);
						});
					},100);
				}
			});
			
			//表单预览右侧展开收缩事件
			$(".preview_btn").click(function(event){
			  if($(".j_comment-content").hasClass("in")){
				  $(".j_comment-content").removeClass("in");
				  $(this).addClass("preview_btn_off").attr('title','显示评论');		  
			  }
			  else{
				  $(".j_comment-content").addClass("in");
				  $(this).removeClass("preview_btn_off").attr('title','隐藏评论');
				  $('.form-comment-wrapper').find('.j_comment_list #replay').addClass('hide');
				  event.stopPropagation();
			  }
			});
			
			//评论滑出层缩回 事件
			$('body').off("click").on('click',function(event){
				var target = $(event.target);
				if(target.hasClass("j_comment-content")||target.parents(".j_comment-content").get(0)!=null){	//当前点击对象或父级 为滑出元素事件原或者
					return;
				}
				if($(".j_comment-content").hasClass('in')){
					$(".j_comment-content").removeClass("in");
					 $(".preview_btn").addClass("preview_btn_off").attr('title','显示评论');	
				}
			});
			//------外部分发跟踪start-----
			//点击回复按钮，显示回复框
			$('.j_module-container').off('click.formpreview', '.j_replay').on('click.formpreview','.j_replay',function(){
				var $this = $(this);
				if($this.parents('.j_comment-item').find(".commentreplay-emoji").length==0){
					$this.parents(".j_comment-item").find("#replay-content").emojiarea({
						wysiwyg: false,
						emojiHeight:-225,
						emojiLeft: -70,
						buttonClass: 'commentreplay-emoji',
						buttonRoot: '#'+$this.parents('.j_comment-item').attr('id'),
						buttonChild: '.comment-comment-btn-div' 
					});
				}
				$this.parents('.j_comment-item').find('#replay-content').autosize();
				$this.parents('.j_comment-item').find('.commentreplay-emoji').css('margin-left','0px');
				if($this.parents('.j_comment-item').find('#replay').hasClass('hide')){
					$this.parents('.j_comment-item').find('#replay').removeClass('hide');
				}else{
					$this.parents('.j_comment-item').find('#replay').addClass('hide');
				}
				$this.parents('.j_comment-item').find('#replay .j_btn_replay').attr('parentId',$this.parents('.j_comment-item').attr('id'));
			});
			
			//提交回复
			$('.j_module-container').off('click.formpreview', '.j_btn_replay').on('click.formpreview','.j_btn_replay',function(){
				var $this = $(this);
				var parentId = $this.attr('parentId');
				var targetId = $("#dataReportId").val();
				var formName = $("#filterName").text();
				var content = $this.parents('.j_comment-item').find('#replay #replay-content').val();
				var module = 'formdatareport';
				var ownership = $("#ownership").val();
				var url = TEAMS.service.formreport+'/biaoge/createComment.json';
				var params={};
				if(ownership&&ownership=='cloud'){
					var formComment = {};
					formComment.formID = $("#formId").val();
					formComment.content = content;
					url = TEAMS.service.formreport+'/biaoge/createFormcomment.json';
					var parent = {};
					parent.id = parentId;
					formComment.parent = parent;
					params.formComment = formComment;
				}else{
					var comment={};
					comment.targetId=targetId;
					comment.module=module;
					comment.targetName=formName;
					comment.content=content;
					params.parentId=parentId;
					params.comment=comment;
					params.formId = $("#formId").val();
				}
				if(content.length==0){
					formPlugin.notify('回复内容不能为空');
				}else if(content.length>200){
					formPlugin.notify('回复内容不能超过200个字符');
				}else{
					formpreview.comment.createComment(url,params,function(data){
						if(data && data.actionMsg && data.actionMsg.code!=0){
							formPlugin.notify(data.actionMsg.message);
							return;
						}
						var comment = data.comment;
						if(ownership&&ownership=='cloud'){
						 	comment = data.formComment;
						 }
						if(data && comment){
							 comment.content = content;
							 formpreview.renderComment(comment,'prepend');
							 $this.parents('.j_comment-item').find('#replay #replay-content').val('');
							 $this.parents('.j_comment-item').find('#replay').addClass('hide');
							 formPlugin.notify('回复成功');
						}
					});
				}
			});
			
			//回车提交回复
			$('.j_module-container').off('keyup.formpreview', '#replay-content').on('keyup.formpreview','#replay-content',function(event){
				if(event.ctrlKey && event.keyCode==13){
	    			var replayBox = $(this).parents('#replay');
	    			replayBox.find(".j_btn_replay").click();
	    		}
			});
			
			//取消回复按钮
			$('.j_module-container').off('click.formpreview', '.j_btn_cancel').on('click.formpreview','.j_btn_cancel',function(){
				var $this = $(this);
				$this.parents('.j_comment-item').find('#replay').addClass('hide');
			});
			
			
			//提交评论
			$('.j_module-container').off('click.formpreview', '.j_addcomment').on('click.formpreview','.j_addcomment',function(){
				var params = {};
				var content = $.trim($('.j_module-container .j_content').val());
				var ownership = $("#ownership").val();
				var anonymous = false;
				if(content.length==0){
					formPlugin.notify('评论内容不能为空');
				}else if(content.length>200){
					formPlugin.notify('评论内容不能超过200个字符');
				}else{
					var url = TEAMS.service.formreport+'/biaoge/createComment.json';
					if(ownership&&ownership=='cloud'){
						var formComment = {};
						formComment.formID = $("#formId").val();
						formComment.content = content;
						url = TEAMS.service.formreport+'/biaoge/createFormcomment.json';
						params.formComment = formComment;
					}else{
						var targetId = $("#dataReportId").val();
						var module = 'formdatareport';
						var formName = $("#filterName").text();
						var comment={};
						comment.targetId=targetId;
						comment.module=module;
						comment.targetName=formName;
						comment.content=content;
						params.comment=comment;
						params.formId = $("#formId").val();
					}
					var $this = $(this);
					$this.attr("disabled","disabled");
					formpreview.comment.createComment(url,params,function(data){
						if(data && data.actionMsg && data.actionMsg.code!=0){
							formPlugin.notify(data.actionMsg.message);
							$this.removeAttr("disabled");
							return;
						}
						var comment = data.comment;
						if(ownership&&ownership=='cloud'){
						 	comment = data.formComment;
						 }
						if(data && comment){
							 formpreview.renderComment(comment,'prepend');
							 $('.j_module-container').find('.j_comment-input .j_content').val('');
							 $this.removeAttr("disabled");
							 formPlugin.notify('评论成功');
						}
					});
				}
			});
			//回车提交评论
			$('.j_module-container .j_content').on('keyup.formpreview',function(event){
				if(event.ctrlKey && event.keyCode==13){
	    			$('.j_module-container .j_addcomment').trigger('click.formpreview');
	    		}
			});
			
			//显示更多表单评论信息
			$('.j_module-container .j_morecontent').click(function(){
				var pageNo =$(this).attr('pageNo');
				$(this).addClass('hide');//隐藏按钮
				var param = {};
				param.pageNo=parseInt(pageNo)+1;
			    formpreview.loadComment(param);
			});
			
			
			//表单复制事件
			$('.form-preview-wrapper .j_cloneForm').on('click.formpreview',function(){
				if(TEAMS.currentUser) {	//如果登录
					copyForm(TEAMS.currentUser.userId);
				} else {
					$('#login-dialog').modal('show');
				}
				return false;
			});
			
			$('.btn-login').on('click.formpreview',function(){
				$('#login-dialog').modal('show');
			});
			
			var ownership = $("#ownership").val();
			if(ownership&&ownership=='cloud'){
				$('.form-comment-wrapper').removeClass('hide');
				var param = {};
				param.pageNo=formpreview.comment.pageNo;
				formpreview.loadComment(param);
			}
		}
		
		formpreview.laodForm();	//加载表单
		
		var bntClick="click";	//默认PC事件 为click
		if(window.systemInfo_form=="mobile"){	//如果为手机版
			bntClick="click";	//手机的点击事件需要用 tap
		}
		
		if((navigator.language || navigator.browserLanguage).toLowerCase()=='en-us'){
			$('.j_go-home').text('From smartheer.cn');
		}else if((navigator.language || navigator.browserLanguage).toLowerCase()=='zh-cn'){
			$('.j_go-home').text('来源于 smartheer.cn');
		}
		
		
		if(window.systemInfo_form=="mobile"){
			$('#comment-view #comment-input .j_comment_enter').show();
			var scanR = $("#scanReport").val();
			if(scanR){
				$('#comment-view #comment-input .j_comment_enter').hide();
			}
		}
		
		//注册按钮事件
		$(document).on(bntClick,"#report_track .j_signupBtn",function(event){
			$('#login-dialog').modal('show');
			$('#login-dialog').find('.tab-header li').removeClass('active');
			$('#login-dialog').find('.tab-header .j_signup').addClass('active');
			var tabId = $('#login-dialog').find('.tab-header .j_signup').find('a').attr('href');
			
			$('#login-dialog .tab-pane').removeClass('active');
			$('#login-dialog').find(tabId).addClass('active');
		});
		
		//跟踪填写结果click事件
		$(document).on(bntClick,"#report_track .j_trackBtn",function(event){
			var $this=$(this);
			var dataReportId = $("#dataReportId").val();//提交后生成的上报id
			var val = '';
			var biaoge = $this.attr('biaoge');
			if(window.systemInfo_form!="mobile"){
				val = $.trim($this.parents("#report_track").find(".j_mobileOrEmail").val());//手机号或邮箱
				var placeholder = $this.parents("#report_track").find(".j_mobileOrEmail").attr('placeholder');
				if(val == placeholder){
					val = "";
				}
				if(val==null || val==""){
					formPlugin.notify('请输入跟踪查询的手机号或邮箱!');
					return false;
				}else{
					//校验格式	
					var checkval = formpreview.checkVal(val);
					if(!checkval){
						formPlugin.notify('手机号或邮箱格式不对，请重新输入!');
						return false;
					}
				}
				window.open(biaoge+"/reporttrack.jsp?reportId="+dataReportId+"&trackId="+val);
			}else{
				val = $("#report_track").find('.j_trackBtn').attr('trackReport');
				if(val){
					window.open(biaoge+"/reporttrack.jsp?reportId="+dataReportId+"&trackId="+val);
				}else{
					var dataId = $('#dataId').val();
					window.location.href="/biaoge/previewFill/"+dataId;
				}
			}
			
		});
		
		//输入填写密码，确定
		$(document).on(bntClick,"#confirm-pwd",function(event){
			var $this=$(this);
			var distributeId = $("#distributeId").val();
			var val = $.trim($(".j_password").val());
			var param={};
			param.distributeId = distributeId;
			$.ajax({
				contentType: 'application/json;charset=UTF-8',
				type : "post",
				url :  TEAMS.service.formreport+"/biaoge/queryDistributeById.json",
				dataType : 'json',
				data : JSON.stringify(param),
				success : function(data){
					var distribute = data.distribute;
					var pwd = distribute.password;
					var showMobile = distribute.showMobile;
					var webpicUrl = distribute.webpicUrl;
					var showWebpic = distribute.showWebpic;
					
					if(val &&pwd && pwd!='' && val==pwd){
						var dataId=$("#dataId").val();		//用户填写ID
						var module = $("#module").val();
						var formId=$("#formId").val();
						var layoutId = $("#formLayoutId").val();
						var isExtDist= $("#isExtDist").val();	//是否外部分发
						formpreview.renderFormDetail(dataId,module,formId,layoutId,distributeId,isExtDist,webpicUrl,showWebpic);
						
						var loginMobile= $("#loginMobile").val();
						var loginEmail= $("#loginEmail").val();
						formpreview.renderMobileOrEmail(showMobile,loginMobile,loginEmail);
						
						$(".j_form_preview").removeClass("hide");
				   		$(".j_form_inputPwd").addClass("hide");
					}else{
						formPlugin.notify('填写密码输入错误!');
					}
				}
	        });
		});
		
		//提交
		$(document).on(bntClick,"#submit",function(event){
			var $this=$(this);
			var mobileOrEmail = $.trim($this.parents(".j_form_preview").find(".j_track .j_mobileOrEmail").val());//手机号或邮箱
			var placeholder = $this.parents(".j_form_preview").find(".j_track .j_mobileOrEmail").attr('placeholder');
			if(mobileOrEmail == placeholder){
				mobileOrEmail = "";
			}
			//校验格式
			var checkval = formpreview.checkVal(mobileOrEmail);
			if(!checkval){
				formPlugin.notify('手机号或邮箱格式不对，请重新输入!');
				return false;
			}
			var formId = $("#formId").val();
			var formName = $this.parents(".j_form_preview").find('.form-name').text();
			var isSubmit=$this.data("isSubmit");	//控制快速提交
			if(isSubmit==false){
				return;
			}
			$this.data("isSubmit",false);
			$this.parents(".j_form_preview").find('.j_loading').removeClass('hide');
			formPlugin.saveFormData({
				parentEl:$("#widget-control"),
				dataStatus:1,
				isExternal:true,
				callback:function(data){
					$this.data("isSubmit",true);
					if(!data){
						$this.parents(".j_form_preview").find('.j_loading').addClass('hide');
						return;
					}
					if(data && data.actionMsg){	//保存失败
						formPlugin.notify(data.actionMsg.message);
						$this.parents(".j_form_preview").find('.j_loading').addClass('hide');
						return;
					}
					
					if(data.formData){
						//生成上报
						var distributeId = $("#distributeId").val();
						var netIp = $("#netip").attr('href');
						var localIp = $("#localip").attr('href');
						var dataReport = {},param = {};
						dataReport.status = 'finshed';
	                    dataReport.formData = data.formData.id;//保存表单数据后返回的id
	                    dataReport.name = data.formData.name;//默认为表单名称
	                    dataReport.formId = data.formData.form.id;
	                    dataReport.formLayout = data.formData.formLayout.id;
	                    dataReport.trackReport = mobileOrEmail;
	                    dataReport.distributeId = distributeId;
	                    dataReport.netIp = netIp;
	                    dataReport.localIp = localIp;
	                    param.dataReport = dataReport;
	                    var $data = data;
			            $.ajax({
			                contentType: 'application/json;charset=UTF-8',
			                type: 'post',
			                url:TEAMS.service.formreport+'/biaoge/createReport.json',
			                dataType:'json',
			                data:JSON.stringify(param),
			                success: function(data){
			                	$this.parents(".j_form_preview").find('.j_loading').addClass('hide');
			                	if(data.actionMsg){	//保存失败
									formPlugin.notify(data.actionMsg.message);
								}else{
									//保存到浏览器
									localStorage.setItem(distributeId+"_distribute",distributeId);  
				                    window.location.href="/biaoge/submitResult/"+$data.formData.id;
								}
			                }
			            });
					}else{
						$this.parents(".j_form_preview").find('.j_loading').addClass('hide');
						return;
					}
				}
			});	//提交填写
		});
		
		//暂存
		$(document).on('click',"#temporary",function(event){
			formPlugin.saveFormData({
				parentEl:$("#widget-control"),
				dataStatus:0,
				isExternal:true,
				callback:function(data){
					if(data.formData){
						window.location.href="/biaoge/previewFill/"+data.formData.id;	//跳转到填写预览页面
					}
				}
			});	//提交填写
		});
		
		
		
		//测试控件只读
		$(document).on('click',"#readOnly",function(event){
			formPlugin.setFormReadOnly({
				parentEl:$("#widget-control"),
				readOnly:true
			});
		});
		
		//测试控件只读
		$(document).on('click',"#notReadOnly",function(event){
			formPlugin.setFormReadOnly({
				parentEl:$("#widget-control"),
				readOnly:false
			});
		});
		
		
		//登录注册弹出框事件
		$('#login-dialog .tab-list').on('click','li',function(){
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			var tabId = $(this).find('a').attr('href');
			
			$('#login-dialog .tab-pane').removeClass('active');
			$('#login-dialog').find(tabId).addClass('active');
		})
	});

	module.exports = formpreview;
});

var needCopy = true;
//登录回调
function loginCallback(params){
	$('#login-dialog').modal('hide');
	
	var userId = params['uid'];
	if(needCopy){
		copyForm(userId);	//copy表单
	}else{
		$('.btn-login').addClass('hide'); //点击登录后，隐藏登录按钮
		window.location.reload();
	}
}


//使用表单
function copyForm(userId) {
	var formId=$("#formId").val();
	var module = $("#module").val();
	if("workflow" == module){
		$.ajax({
			type : 'post',
			url : '/form/copy.json',
			dataType : 'json',
			async: false,
			data : {'formId':formId, 'module':module},
			success : function(data) {
			    if(data.actionMsg && data.actionMsg.message){    //保存失败
                    formPlugin.notify(data.actionMsg.message);
                    return;
                }
				if(!data || !data['form']) {
					formPlugin.notify('服务器请求失败，请联系系统管理员!');
					return;
				}
				if(!TEAMS.currentUser){
				    window.location.reload();
				}	
				window.open('/workflows/'+TEAMS.currentUser.id+'/'+'personal');
			}
		});
	}else{
		$.ajax({
			type : 'post',
			url : TEAMS.service.formreport+'/biaoge/copy.json',
			dataType : 'json',
			async: false,
			data : {'formId':formId},
			success : function(data) {
			    if(data.actionMsg && data.actionMsg.message){    //保存失败
			        formPlugin.notify(data.actionMsg.message);
                    return;
			    }
				if(!data || !data['form']) {
					formPlugin.notify('服务器请求失败，请联系系统管理员!');
					return;
				}
				if(!TEAMS.currentUser){
				    window.location.reload();
				}	
			}
		});
		window.open('/forms');
	}
}
