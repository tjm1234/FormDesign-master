 /**
 * 手机web版主页面Page对象，用来管理内部的view对象
 */
define(function(require,exports,module){
	var Page = Backbone.View.extend({

		_initialize : function(options) {
            TEAMS.currentEnvironment= "web";
			if(options.codeBranch == 'crm'){//crm项目使用
				//保证不同page的pageKey不同
				this.pageKey = options.info.view + this.cid;
				//标记模块名
				this.pageName = options.module.key;
				this.codeBranch = options.codeBranch;
				if(options.nobodyempty) this.nobodyempty = true;//标记切换页面不清空body
				delete options.module.key;
                TEAMS.currentEnvironment= "crm";
			}else if(options.codeBranch == 'app'){
				this.pageKey = "app";
				this.pageName = "app";
				this.codeBranch = options.codeBranch;
				if(options.nobodyempty) this.nobodyempty = true;
			}else if(options.codeBranch == 'portal'){
				this.pageKey = options.info.view + this.cid;
				this.pageName = options.module.key;
				this.codeBranch = options.codeBranch;
				if(options.nobodyempty) this.nobodyempty = true;
			}else if(options.codeBranch == 'sms'){
				//保证不同page的pageKey不同
				this.pageKey = options.info.view + this.cid;
				//标记模块名
				this.pageName = options.module.key;
				this.codeBranch = options.codeBranch;
				if(options.nobodyempty) this.nobodyempty = true;//标记切换页面不清空body
			}else if(options.codeBranch == 'hr'){
				//保证不同page的pageKey不同
				this.pageKey = options.info.view + this.cid;
				//标记模块名
				this.pageName = options.module.key;
				this.codeBranch = options.codeBranch;
				if(options.nobodyempty) this.nobodyempty = true;//标记切换页面不清空body
                TEAMS.currentEnvironment= "hr";
			}else{//web项目使用
				this.pageKey = options['pageKey'];//标记当前view
				if(!options.userId) options.userId = TEAMS.currentUser.id;
				if(options.type) {this.type = options.type;}
				if(options.nobodyempty) this.nobodyempty = true;
				if(options.module) {this.module = options.module;}
				delete options.pageKey;
			}
			// if(window.module != this.pageName){
			// 	window.module = this.pageName;
			// }else{
			//
			// }
			//处理好页面判断所需参数并返回最终传入页面的options

			return options;
		},
		/**
		 * 渲染page
		 */
		render : function(){
			console.error('you need to rewrite the method : render','color:red');
		},
		/**
		 * page父类的render方法
		 * isAsync=true 表示需要提前异步加载部分资源，执行mainView的requireReady方法，否则直接执行render
		 */
		_render : function(isAsync,cssName){
			var view = this;
			var imVersion = '';
			if(!view.webTitle){view.webTitle = 'smartheer应用'}
			utils.setWebTitle(view.webTitle);

			//避免css切换导致页面变化突兀，且为PAGE加载添加过程
			//nobodyempty = true时不清空body
			if(!(window.nobodyempty || this.nobodyempty)){
				if(!window.teamsLoadMark){
                    $('body').html('<div class="data-loading"></div>');
                }
			}
			window.teamsLoadMark = null;

			if($.type(isAsync) == 'string'&&!cssName){
				var cssName = isAsync;
			}
			var csslink = this.getCssLink(cssName);
			var preload = csslink;
            if(!$.isArray(preload)){
                preload = [preload];
            }
			//im前端版本号控制		
			if(TEAMS.runMode !='develop'){
				imVersion = '?v='+TEAMS.version;
				if(imConfig&&imConfig.version){
					imVersion = '?v='+imConfig.version;
				}
			}
			if(this.pageName&&(this.pageName=='home'||this.pageName == 'im')){
				var im= ['/static/js/plugins/im.smartheer.v1.js'+imVersion,'/static/js/plugins/im.smartheer.json-format.v1.js'+imVersion,TEAMS.service.imWebapp+'/static/js_compress/imi18n/imlang.js'+imVersion];
				preload = preload.concat(im);
			}
			if(this.codeBranch == 'crm'){
                TEAMS.currentEnvironment= "crm";
                preload = preload.concat([TEAMS.service.crm+'/static/css/mobile/crm'+(TEAMS.runMode == 'develop'?'.css':'-min.css')]);
			}
            if(this.codeBranch == 'sms'){
                preload = preload.concat([TEAMS.service.sms+'/static/css/mobile/'+(TEAMS.runMode == 'develop'?'email.css':'sms-min.css')]);
            }
            if(this.pageName == 'document'){
                TEAMS.currentEnvironment= "docUrl";
            }

            //客户端中打开H5
            if(window.smartheerClient){
                preload = preload.concat(['imjs/component/client'+ seajsImClip]);
			}

			require.async(preload,function(){

				//变更当前模块CSS文件
				if(!window.imwebsocketLoaded && view.pageName&&(view.pageName=='home'||view.pageName == 'im')){
					window.imwebsocketLoaded = true;
					require.async([
		                "imjs/component/imWebsocket"+ seajsImClip,
			       		'teamsjs/imextra/imSysMsgCBService'+ seajsClip,
			       		'teamsjs/imextra/imRecentListCBService'+ seajsClip
			           ],function(ImWebsocket, ImSysMsgCBService, ImRecentListCBService){

						if(!window.iminfoMap){
                            $.ajax({
                                type : 'POST',
                                url : '/imrequest/queryIMInfo.json',
                                async : false,
                                dataType : 'json',
                                success : function(data){
                                    window.iminfoMap = data.iminfoMap;
                                    var params = {
                                        imAppKey :  window.iminfoMap.imAppKey
                                    };
                                    window.ImWebsocket = new ImWebsocket(params);
                                    new ImSysMsgCBService();
                                    new ImRecentListCBService();
                                }
                            });
                        } else {
                            var params = {
                                imAppKey :  window.iminfoMap.imAppKey
                            };
                            window.ImWebsocket = new ImWebsocket(params);
                            new ImSysMsgCBService();
                            new ImRecentListCBService();
						}

			        });
				}
				if(isAsync && $.type(isAsync) == 'boolean'){
					view.mainView.requireRender();
				}else{
					view.mainView.render();
				}


				//延迟异步加载系统插件,新添插件非自动执行的，请在预加载文件plugin.mockup.js中处理防止报错
                setTimeout(function () {
                    require.async([_formDesign+'/static/js/plugins/bootstrap.datetimepicker.min.js',
                        _formDesign+'/static/js/plugins/bootstrap.all.m.min.js'],function(){
                    });
                },2000);


				//阻止在一个模块中来回请求
				if(window.webapp == 'wechat' && (!window.pageName || (window.pageName != view.pageName))){
					$.ajax({
						url:'/remote/wechatAuthApp/getQyWechatConfig?v='+1.0,
						type:'get',
						dataType:'jsonaccount.models',
						data : {"module":view.pageName,"tenantKey":TEAMS.currentTenant.tenantKey,"url":window.qy_wehcat_url},
						contentType:'application/json',
						async: false,
						success:function(json){
							if(json != null){
								_wechatSign =window["eval"]("("+json.responseText+")");
								window.pageName = view.pageName;
							}
						},
						error:function(json){
							_wechatSign =window["eval"]("("+json.responseText+")");
                            //window.pageName = view.pageName;
						}
					});
					wx.config({
						beta: true,// 必须这么写，否则在微信插件有些jsapi会有问题
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: _wechatSign.appId, // 必填，企业微信的cropID
						timestamp: _wechatSign.timeStamp, // 必填，生成签名的时间戳
						nonceStr: _wechatSign.nonceStr, // 必填，生成签名的随机串
						signature: _wechatSign.signature,// 必填，签名，见[附录1](#11974)
						jsApiList: ['scanQRCode','onHistoryBack'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
					wx.error(function(res){
						// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
						//alert(JSON.stringify(res));
					});
					wx.onHistoryBack(function(){
						//取得页面中唯一正在显示的“取消”或“关闭”按钮，返回时触发点击事件关闭当前控件，并阻止浏览器返回
						var $taps = $('body').find('.j_wx_back_tap');
						var $currentTap = null;
						if($taps.length>=1){
							$taps.each(function(){
								if($(this).is(':visible')){
									$currentTap = $(this);
								}
							});
						}
						if($currentTap){
							$currentTap.trigger('tap');
                            $currentTap.trigger('click');
							return false;
						}else{
							return true;
						}
					});
				}
			});
			//钉钉付费提醒
			if(window.webapp == 'ding'){
				window.dingPayRemind = this.dingPayRemind;
			}

		},
		//引用对应Css文件
		getCssLink:function(cssName){
			if(cssName == 'noCSS') return;
			if(!cssName){var cssName = this.pageName;}
			
			if(this.codeBranch == 'crm'){
				cssName = 'customer';//crm项目只有customer.css
			}else if(this.codeBranch == 'app'){
				cssName = 'paas';//paas项目
			}else if(this.codeBranch == 'portal'){
				cssName = 'portal';//portal项目
			}
			//如果cssName为数组，则创建新标签引用
			if($.type(cssName) == 'array'){
				var cssLink = [];
				for(var i = 0;i<cssName.length;i++){
				}
			}else{
			}
			return cssLink;
		},
		
		//钉钉相关公用方法请挪至此处
		ddSubmit:function(application){
			$.ajax({
				url:'/remote/getDingConfig',
				type:'get',
				dataType:'jsonaccount.models',
				data : {"application":application,"dingCor": dingCor},
				contentType:'application/json',
				async: false,
				success:function(json){
					if(json != null){
						_config =window["eval"]("("+json.responseText+")");
					}
				},
				error:function(json){
					_config =window["eval"]("("+json.responseText+")");
				}
			});
			dd.config({
				agentId: _config.agentId, // 必填，微应用ID
				corpId:_config.corpId,//企业ID
			    timeStamp: _config.timeStamp, // 必填，生成签名的时间戳
			    nonceStr: _config.nonceStr, // 必填，生成签名的随机串 
			    signature:  _config.signature,// 必填，签名
			    jsApiList:['biz.util.ut','biz.contact.choose']
			});
			dd.error(function(err) {
				 JSON.stringify(err);
			});
		},

		//用户数超限付费提示
		dingPayRemind:function(){
			if(TEAMS.currentTenant.status == 'inweek'||TEAMS.currentTenant.status == 'outweek'){
				require.async('teamstpl/component/payremind'+seatplClip,function(payremindtpl){
					if(TEAMS.currentTenant.status == 'inweek'){
						if(TEAMS.currentUser.admin){
								$('body').append(utils.template(payremindtpl));
								var newDate = 14 * 24 * 60 * 60 * 1000;
								if(typeof(TEAMS.currentTenant.transfiniteDate) != 'undefined'){
									newDate += TEAMS.currentTenant.transfiniteDate ;
								} else {
									newDate += new Date().getTime(); 
								}
								var rDate = new Date(newDate);  
								var year = rDate.getFullYear();  
								var month = rDate.getMonth() + 1;  
								if (month < 10) month = "0" + month;  
								var date = rDate.getDate();  
								if (date < 10) date = "0" + 10; 
								startRemind = parseInt(year) + "-" + parseInt(month) + "-" + parseInt(date);
								var url = "http://www.smartheer.cn/mobileapp/payremind?isAdmin=true&startRemind="+startRemind;
								$('#appPayRemind .btn a').attr('href',url);
								$('body').find('#appPayRemind').fadeIn('fast');
						} 
					} else if(TEAMS.currentTenant.status == 'outweek'){
						$('body').append(utils.template(payremindtpl));
						if(TEAMS.currentUser.admin){
							var newDate = 14 * 24 * 60 * 60 * 1000;
							if(typeof(TEAMS.currentTenant.transfiniteDate) != 'undefined'){
								newDate += TEAMS.currentTenant.transfiniteDate ;
							} else {
								newDate += new Date().getTime(); 
							}
							var rDate = new Date(newDate);  
							var year = rDate.getFullYear();  
							var month = rDate.getMonth() + 1;  
							if (month < 10) month = "0" + month;  
							var date = rDate.getDate();  
							if (date < 10) date = "0" + 10; 
							startRemind = parseInt(year) + "-" + parseInt(month) + "-" + parseInt(date);
							var url = "http://www.smartheer.cn/mobileapp/payremind?isAdmin=true&startRemind="+startRemind;
							$('#appPayRemind .btn a').attr('href',url);
						} else {
							var url = "http://www.smartheer.cn/mobileapp/payremind?isAdmin=false" ;
							$('#appPayRemind .btn a').attr('href',url);
						}
						$('body').find('#appPayRemind').fadeIn('fast');
					}
				});
			}
		},

		remove : function(){
			//document.title = window.originalTitle;
			if(this.mainView){
				this.mainView.off();
				if(!window.noRemoveEvent){
					this.mainView.remove();
				}
				this.mainView = null;
			}
			window.noRemoveEvent = null;
			window.nobodyempty = null;
			$(document).off('swiperight.sidePane');
		}
	});

	module.exports = Page;

});
