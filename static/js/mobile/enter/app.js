/**
 * APP主页面，用来管理Page对象
 */
define(function(require, exports, module){
	var App = Backbone.View.extend({
		initialize : function(options){
			
			this.homepageUrl = 'teamsjs/home/m.homepage'+seajsClip;
			this.taskpageUrl = 'teamsjs/task/m.taskpage'+seajsClip;
			this.blogpageUrl = 'teamsjs/blog/m.blogpage'+seajsClip;
			this.mainlinepageUrl = 'teamsjs/mainline/m.mainlinepage'+seajsClip;
			this.docpageUrl = 'teamsjs/doc/m.docpage'+seajsClip;
			this.workreportpageUrl = 'teamsjs/workreport/m.workreportpage'+seajsClip;
			this.agendapageUrl = 'teamsjs/calendar/m.agendapage'+seajsClip;
			this.dynamicpageUrl = 'teamsjs/dynamic/m.dynamicpage'+seajsClip;
			this.globalsearchUrl = 'teamsjs/searchall/m.searchallpage'+seajsClip;
			this.tagpageUrl = 'teamsjs/tag/m.tagpage'+seajsClip;
			this.formpageUrl = 'formreportjs/form/m.formpage'+seajsClip;
			this.flowpageUrl = 'flowjs/workflow/m.flowpage'+seajsClip;
			this.datareportpageUrl = 'formreportjs/formdatareport/m.datareportpage'+seajsClip;
			this.attendpageUrl = 'teamsjs/timecard/m.attendpage'+seajsClip;
			this.simplepageUrl = 'teamsjs/pages/m.simplepage'+seajsClip;
            this.mcpageUrl = 'imjs/m.mcpage'+seajsImClip;
			this.freepageUrl = 'teamsjs/free/m.freepage'+seajsClip;
			this.subscribeUrl = 'teamsjs/subscribe/m.subscribepage'+seajsClip;
            // var us = navigator.userAgent.toLowerCase();
            // alert('测试：'+us);
			//alert(window.location.href);
			this.windowfunction();

			if(!sessionStorage.getItem('wxLoginInfo')){
				var wxloginfo = window.location.search;
				if(wxloginfo.indexOf('agentId')!=-1){
                    wxloginfo = wxloginfo.substring(wxloginfo.indexOf('agentId'),wxloginfo.length);
                }
				sessionStorage.setItem('wxLoginInfo',wxloginfo);
			}

			function GetQueryString(name) {
			     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			     var r = window.location.search.substr(1).match(reg);
			     if(r!=null)return  unescape(r[2]); return null;
			}
			function getParamFromUrl() {
			     var r = window.location.href;
			     if(r.indexOf("corpId") > -1 && r.indexOf("suiteId") >-1 && r.indexOf("tenantKey") >-1 && r.indexOf("code") >-1 && r.indexOf("ServiceNumber") == -1){
			    	 return "wechat";
			     } else { 
			    	 return null
			     };
			}

			//微信是wechat 钉钉是ding ，oauthType为手机web访问来源标识
			var oauthType = GetQueryString("oauthType");
			if(oauthType == null){
				oauthType = getParamFromUrl();
			}
			if(oauthType != null){
				window.webapp = oauthType;
			}else{
				window.webapp = 'mobile';
			}
			if(window.platformdevice == 'Android'){
				$('body').addClass('divice-android');
			}
            if(TEAMS.runMode == 'fetion'){
                $('body').attr('third-party','fetion');
                window.inFetionClient = true;
            }
			var us = navigator.userAgent.toLowerCase();
            if((us.indexOf('macintosh')!=-1 && us.indexOf('wxwork')!=-1)||us.indexOf('windowswechat')!=-1){
                window.inWechatClient = true;
            }
            if(us.indexOf('macintosh')!=-1 && us.indexOf('wxwork')!=-1){
                window.inMacClient = true;
            }
            if(us.indexOf('windowswechat')!=-1){
                window.inWinClient = true;
            }
            if(us.indexOf('android')!=-1 && us.indexOf('wxwork')!=-1){
                window.inAndoridWxClient = true;
            }
            if(us.indexOf('iphone')!=-1 && us.indexOf('wxwork')!=-1){
                window.inIphoneWxClient = true;
            }
            if(window.inAndoridWxClient || window.inIphoneWxClient){
                window.inMobileWxClient = true;
            }
            if(us.indexOf('wxwork')!=-1){
                window.inWxMode = true;
            }
		},
		delegateEvents : function(){
			var view = this;
			//开启引导页面
			$('body').on('tap','.j_openAppGuide',function(e){
				var $obj = $('body').find('.j_webappGuide');
				var url = $obj.data('src');
				$obj.show('fast');
				$obj.find('iframe')[0].contentWindow.location.replace(url);
				$('body').addClass('appguide-open');
			});
			
			//超链接点击后的处理(用tap后，app中内嵌H5模式打开此链接，return false无效，故此处用click事件)
			$('body').on('click','a[href][href!=#]',function(event){
				var $this = $(this);
				var hrefStr = $this.attr('href');
				var entityItem = view.getEntityItem(hrefStr); //从链接中获取id和module
				
				if(entityItem){
					var id = entityItem.id;
					var module = entityItem.module;
					
					//跳转到详情页面
					if(id && module){
						view.renderEtInfo(module,id);
						return false;
					}
				}
			});
			//im事项转发
			$('body').on('tap','.j_openIMentityEvent',function(){
				var params = $(this).data('imParams');
				ETIM.trigger('entityHandler', params)
            });

			//模块引导页面退回,在window对象上供site下html调用
			window.closeAPPGuide = function(){
				$('body').find('.j_webappGuide').fadeOut('fast');
				$('body').removeClass('appguide-open');
			};
			//详情页开启底部快捷操作
			$('body').on('tap','.j_a-quickmenuOpen',function(){
				$(this).parents('.page-view').find('.quick-menu').slideUp('fast');
			});
			$('body').on('tap','.j_a-quickmenuClose',function(){
				$(this).parents('.page-view').find('.quick-menu').slideUp('fast');
			});
			
//			阻止微信中页面显示黑底
			$(document).on('touchmove','.header-fixed',function(event){
				var $target = $(event.target);
				if($target.closest('.header-menu')[0]!=null || $target.parents('.j_header-fixed_touchable')[0]!=null || $target.hasClass('j_header-fixed_touchable') || $target.parents('.header-menu')[0]!=null) return;
				 event.preventDefault();
			});
			
			$('body').on('tap','i.a-home,a.a-home', function(event){
				event.preventDefault();
				ROUTER.navigate('/', {
					trigger : true
				});
			});
			
			$('body').on('tap','i.j_a-back,li.j_a-back,a.j_a-back', function(event){
				event.preventDefault();
				event.stopPropagation();
				if(window.history.length <= 1){
					ROUTER.navigate('/', {
						trigger : true
					});
				}else{
					window.history.back();
				}
			});
			//人员选择列表搜索框滑出
			$(document).on('tap','.js_mSerchOpen',function(){
				$(this).siblings('.rt-sch-input').addClass('trans-back');
			});
			
			//下拉菜单
			$(document).find('.dropmenu-box').addClass('dropmenu-off');//标记初始状态
			$(document).on('tap','.dropmenu-link',function(e){
				e.stopPropagation();
				$('.dropmenu-box').addClass('dropmenu-off');
				if($(this).data('link')){
					$($(this).data('link')).fadeToggle(300).removeClass('dropmenu-off');
				}else{
					$(this).siblings('.dropmenu-box').fadeToggle(300).removeClass('dropmenu-off');
				}
				$('.dropmenu-off').fadeOut(300);
			});
            
			/*文本框占位文字处理*/
			$(document).on('keydown','.placerholder-focus',function(e){
				var defValue=$(this).attr('data');
				if($(this).attr('placeholder') == defValue) { 
					$(this).attr('placeholder','');
				}
			});
			$(document).on('blur','.placerholder-focus',function(e){
				var defValue=$(this).attr('data');
				 if($(this).attr('placeholder') == '') { 
					 $(this).attr('placeholder',defValue);
				 }
			});
			//将菜单内容带到标题的时候需要在"dropmenu"上加"dropmenu-gettext"
			$(document).on('tap','.dropmenu>li>a',function(){
				var dropBox = $(this).parents('.dropmenu-box');
				var menu = $(this).parents('.dropmenu');
				dropBox.fadeOut(300);
				$(this).parent().addClass('active').siblings().removeClass('active');
				if(menu.hasClass('dropmenu-gettext')){
					var txt = $(this).text()+'<i class="ico-drop"></i>';
					dropBox.prev('.dropmenu-link').html(txt);
				}
			})
			//左划出现或签等
//			$(document).on('swipeleft','.com-list[data-slidemenu="true"] li',function(e){
//				$(document).find('.com-list li').removeClass('menuon');
//				$(this).addClass('menuon');
//				e.preventDefault();
//			});
			//右划隐藏或签等
//			$(document).on('swiperight','.com-list[data-slidemenu="true"] li',function(e){
//				$(this).removeClass('menuon');
//				e.preventDefault();
//			})
			$(document).find('.header-menu-toggle').data('timer',null);
			$(document).on('tap','.header-menu-toggle',function(e){
				var _this = $(this),menu,timer;
				
				if(_this.data('link')){
					menu = $(_this.data('link'));
				}else{
					menu = _this.parents('header').find('.header-menu');
				}
				if(menu.get(0) == null) return;
				if(_this.data('timer')){
					timer = _this.data('timer');
					clearTimeout(timer);
					_this.removeData('timer');
				}
				if(menu.is(':hidden')){
					$('.header-menu').hide().removeClass('open').find('ul').slideDown(300);
					menu.show();
					timer = setTimeout(function(){
						menu.addClass('open');
						menu.find('ul').slideDown(300);
						_this.addClass('on');
					},100);
					var top=$(document).scrollTop();
					$("body").css({'position':'fixed','left':'0px','right':'0px','top':'-' + top + 'px','bottom':'0px'});
				}else{
					menu.removeClass('open');
					menu.find('ul').slideUp(300);
					//待CSS动画执行完毕
					timer = setTimeout(function(){
						menu.hide();
						_this.removeClass('on');
					},300);
					$("body").removeAttr('style');
				}
				_this.data('timer',timer);
				e.stopPropagation();
			});
			$(document).on('tap','.header-menu .mask,.header-menu li',function(e){
				var obj = $('header .header-menu-toggle'),
					menu = obj.parents('header').find('.header-menu'),
					timer;
				if(obj.data('timer')){
					clearTimeout(timer);
					obj.removeData('timer');
				}
				menu.removeClass('open');
				menu.find('ul').slideDown();
					//待CSS动画执行完毕
				timer = setTimeout(function(){
					menu.hide();
					obj.removeClass('on');
				},300);
				obj.data('timer',timer);
				$("body").removeAttr('style');
			});
			
			
			//头部菜单
			$('body').on('tap','.j_header-panel-toggle',function(e){
				e.stopPropagation();
				if($(this).data('link')){
					var $panel = $($(this).data('link'));
				}else{
					var $panel = $('header .header-panel-slider');
				}
				if(!$panel.hasClass('open')){
					$panel.removeClass('hide');
					setTimeout(function(){
						$panel.addClass('open');
					},10);
				}else{
					$panel.removeClass('open');
					setTimeout(function(){
						$panel.addClass('hide');
					},250);
				}
			});
			$('body').on('tap','.j_header-panel-close, .header-panel-slider .mask',function(){
				if($(this).data('link')){
					var $panel = $(this).data('link');
				}else{
					var $panel = $(this).parents('.header-panel-slider').get(0);
				}
				$('body').trigger('closeTopSlider',$panel);
			});
			$('body').on('closeTopSlider',function(event,obj,callback){
				var $panel = $(obj);
				$panel.removeClass('open');
				setTimeout(function(){
					$panel.addClass('hide');
					if(callback) callback();
				},250);
			});
			
			//底部弹出菜单
			$(document).on('tap','.js_actionsheet_toggle',function(e){
				if($(this).hasClass('readonly')) {
					return;
				}
				var $menu = $(this).parents('.j_page-view').find('.action-sheet-wrap');
				if(!$menu.hasClass('open')){
					//弹出框的来源name
					if($(this).attr('name')) {
						$menu.find('.action-sheet-menu').attr('name', $(this).attr('name'));
					}
					//选中项高亮显示
					if($(this).attr('type')) {
						$menu.find('.action-sheet-menu li[type="' + $(this).attr('type') + '"]').addClass('active').siblings().removeClass('active');
					}
					$menu.find('.mask').fadeIn('fast');
					$menu.addClass('open');
				}
			});
			$(document).on('tap','.action-sheet-wrap .js_closesheet,.action-sheet-wrap .mask,.action-sheet-menu li',function(e){
				$(this).parents('.action-sheet-wrap').removeClass('open').find('.mask').fadeOut('fast');
			});
			//底部弹出详情操作菜单
			$(document).on('tap','.js_infoactionsheet_toggle',function(e){
				var $menu = $(this).parents('.j_page-view').size!=0?$(this).parents('.j_page-view').find('.foot-actionsheet'):$('body').find('.foot-actionsheet');
				if(!$menu.hasClass('open')){
					$menu.find('.mask').fadeIn('fast');
					$menu.addClass('open');
				}
			});
			$(document).on('tap','.foot-actionsheet .js_closesheet,.foot-actionsheet .mask,.foot-actionsheet .menu-item',function(e){
				$(this).parents('.foot-actionsheet').removeClass('open').find('.mask').fadeOut('fast');
			});
			//右侧滑入菜单
			view.bindSidePaneSwip=function(){
				//右滑关闭滑框
				$(document).on('swiperight.sidePane','.j_sidePanelSlider',function(e){
					if($(this).hasClass('open')){
						$(this).removeClass('open');
						$(document).find('.page-view').removeClass('page-side-open');
						$(document).find('.page-view').css({
							'-webkit-transform':'none',
							'transform':'none'
						});
						var $this = $(this);
                        $('body').find('.mask-slidermask').fadeOut('fast',function(){
                            $('body').find('.mask-slidermask').remove();
                        });
						setTimeout(function(){
							$this.addClass('hide');
						},250);
						$(document).off('swiperight.sidePane');
					}
				});
			};
			$(document).on('tap','.j_sidePanelSlider-toggle',function(e){
				if(window.dropdownlist){
					window.dropdownlist.lock('down');
				}
				view.bindSidePaneSwip();
				var $menu = $($(this).data('link'));
				if(!$menu.hasClass('open')){
					$menu.removeClass('hide');
					setTimeout(function(){
						$menu.addClass('open');
                        $menu.after('<div class="mask mask-slidermask hide" style="z-index:999;"></div>');
						$('body').find('.mask-slidermask').fadeIn('fast');
						//for iphone - 避免css压缩去除空格导致calc样式无效
						/*$menu.parents('.page-view').css({
							'-webkit-transform':'translateX(calc(-100%'+' '+'+'+' '+'50px))',
							'transform':'translateX(calc(-100%'+' '+'+'+' '+'50px))'
						});*/
						$menu.parents('.page-view').addClass('page-side-open');
					},0);
				}
			});
			$(document).on('tap','.j_viewStatus',function(e){
				view.bindSidePaneSwip();
				var $menu = $($(this).data('link'));
				if(!$menu.hasClass('open')){
					$menu.removeClass('hide');
					setTimeout(function(){
						$menu.addClass('open');
                        $menu.after('<div class="mask mask-slidermask hide" style="z-index:999;"></div>');
                        $('body').find('.mask-slidermask').fadeIn('fast');
						//for iphone - 避免css压缩去除空格导致calc样式无效
						/*$menu.parents('.page-view').css({
							'-webkit-transform':'translateX(calc(-100%'+' '+'+'+' '+'50px))',
							'transform':'translateX(calc(-100%'+' '+'+'+' '+'50px))'
						});*/
						$menu.parents('.page-view').addClass('page-side-open');
					},0);
				}
			});
            $('body').on('tap','.j_sidePanelSlider',function(e){
            	if($(e.target).hasClass('j_sidePanelSlider')){
					$(this).removeClass('open');
					$(document).find('.page-view').removeClass('page-side-open');
					$(document).find('.page-view').css({
						'-webkit-transform':'none',
						'transform':'none'
					});
					var $this = $(this);
					if(window.dropdownlist){
						window.dropdownlist.unlock();
					}
					$('body').find('.mask-slidermask').fadeOut('fast',function(){
						$('body').find('.mask-slidermask').remove();
					});
					setTimeout(function(){
						$this.addClass('hide');
						$(document).off('swiperight.sidePane');
					},250);
				}
			});
			//点击关闭滑框
			$(document).on('tap','.j_closeSidePanel,.order-list:not(.j_infilter) a:not(.j_except),.mask',function(e){
				if($(this).parents('.j_sidePanelSlider')){
					$(this).parents('.j_sidePanelSlider').removeClass('open');
					$(document).find('.page-view').removeClass('page-side-open');
					$(document).find('.page-view').css({
						'-webkit-transform':'none',
						'transform':'none'
					});
					var $this = $(this);
					if(window.dropdownlist){
						window.dropdownlist.unlock();
					}
                    $('body').find('.mask-slidermask').fadeOut('fast',function(){
                        $('body').find('.mask-slidermask').remove();
                    });
					setTimeout(function(){
						$this.parents('.j_sidePanelSlider').addClass('hide');
						$(document).off('swiperight.sidePane');
					},250);
				}
			});
			//自定义打开事件
			$(document).on('openSlider',function(event,obj){
				if(window.dropdownlist){
					window.dropdownlist.lock('down');
				}
				if(obj){
					$(document).find(obj).removeClass('hide');
					setTimeout(function(){
						$(document).find(obj).addClass('open');
						/*$(obj).parents('.page-view').css({
							'-webkit-transform':'translateX(calc(-100%'+' '+'+'+' '+'50px))',
							'transform':'translateX(calc(-100%'+' '+'+'+' '+'50px))'
						});*/
						$(obj).parents('.page-view').addClass('page-side-open');
						if(obj=='#formstatdatafilter'){//表单数据筛选
							$('body').find('#formstat-datatable').addClass('page-side-open');
						}
                        $(document).find(obj).after('<div class="mask mask-slidermask hide" style="z-index:999;"></div>');
                        $('body').find('.mask-slidermask').fadeIn('fast');
					},0);
				}else{
					/*$(document).find('.page-view').css({
						'-webkit-transform':'translateX(calc(-100%'+' '+'+'+' '+'50px))',
						'transform':'translateX(calc(-100%'+' '+'+'+' '+'50px))'
					});*/
					$(document).find('.page-view').addClass('page-side-open');
					$(document).find('.j_sidePanelSlider').removeClass('hide').addClass('open');
                    $(document).find('.j_sidePanelSlider').after('<div class="mask mask-slidermask hide" style="z-index:999;"></div>');
                    $('body').find('.mask-slidermask').fadeIn('fast');
				}

				view.bindSidePaneSwip();
			});
			//自定义关闭事件
			$(document).on('closeSlider',function(event,obj){
				if(obj){
					$(document).find(obj).removeClass('open');
					$(obj).parents('.page-view').css({
						'-webkit-transform':'none',
						'transform':'none'
					});
					$(obj).parents('.page-view').removeClass('page-side-open');
					setTimeout(function(){
						$(document).find(obj).addClass('hide');
					},250);
				}else{
					$(document).find('.page-view').css({
						'-webkit-transform':'none',
						'transform':'none'
					});
					$(document).find('.page-view').removeClass('page-side-open');
					$(document).find('.j_sidePanelSlider').removeClass('open');
					setTimeout(function(){
						$(document).find('.j_sidePanelSlider').addClass('hide');
					},250);
				}
                $('body').find('.mask-slidermask').fadeOut('fast',function(){
                    $('body').find('.mask-slidermask').remove();
                });
				$(document).off('swiperight.sidePane');
				if(window.dropdownlist){
					window.dropdownlist.unlock();
				}
			});
			//目标元素外点击
			$(document).on('tap','body',function(e){
				var target = $(e.target);
				if(target.closest(".dropmenu-box").length == 0 && !target.hasClass('dropmenu-link')){
					$(".dropmenu-box").fadeOut(200);
				}
//				if($('.additem-layer').is(':visible') && target.closest(".additem-layer").length == 0 && target.closest(".js_additemBtn").length == 0
//						&& target.closest(".j_formstatMoree").length == 0){
//					if(target.closest('.js_additemBtn').length != 0 || target.closest('.additem-btn').length != 0)
//						return;
//					$('.additem-layer').removeClass('in');
//					setTimeout(function(){
//						$('.additem-layer').hide();
//					}, 100);
//				}
			});
			
			//关闭付费提示
			$('body').on('tap','#appPayRemind .close',function(){
				$('#appPayRemind').fadeOut('fast');
			});
			$('body').on('click', '.js_openList', function(event){
				if($(this).data('open')){
					$(this).next('.j_info-list').slideUp(200);
					$(this).find('.j_r-link').html('展开  <i class="icon-arrow-down"></i>');
					$(this).data('open',false);
				}else{
					$(this).next('.j_info-list').slideDown(200);
					$(this).find('.j_r-link').html('收缩  <i class="icon-arrow-up"></i>');
					$(this).data('open',true);
				}
			});
			//人员卡片信息跳转新页面
			$('body').on('tap','.employee-info', function(event){
				var userId = $(this).attr('data-userId');
				ROUTER.navigate("/mobile/employee/info/"+userId, {trigger: true});
			});
			
			
			//关联表单组件，点击表单查看详情
//			$('body').on('tap','.biaogestat-relevance', function(event){
//				var $this = $(this);
//				var formId = $this.attr('id');
//				var type = $this.attr('type');
//				var detailId = $this.attr('detailId');
//				var detailName = $this.attr('detailName');
//				var detailContent = $this.data('detailContent');
//				var fromRelevance = 'relevance';
//				if(type && type == 'statreport'){
//					utils.notify('手机web暂不支持自定义统计');
//					return;
//				}
//				require.async('teamsjs/formdatareport/formstatdatatableview'+seajsClip,function(FormStatDataTableView){
//					var formstatdatatableview = new FormStatDataTableView({
//						'id':formId,
//						'type':type,
//						'detailId':detailId,
//						'detailName':detailName,
//						'detailContent':detailContent,
//						'fromRelevance':fromRelevance,
//						'module':'form'
//					});
//					formstatdatatableview.requireRender();
//				});
//			});

			//h5二次确认框
			$('body').on('tap','.confirm-flow-btn',function(event){
				var title =  $(this).attr('confirm-context-title');
				var context = $(this).attr('confirm-context');
				var dataType = $(this).attr('confirm-data-type');
				var placeholder = $(this).attr('confirm-placeholder');
				var thisEl = $(this);
				require.async('flowjs/workflow/common/confirmview'+seajsClip,function(confirmView){
					var confirmview  = new confirmView({
						'title':title,
						'context':context,
						'dataType':dataType,
						'placeholder':placeholder,
						'thisEl':thisEl
					});
					confirmview.requireRender();
				});
			});

			//人员选择组件
			$('body').on('click','.entity-seleted', function(event){
				
//				if($(this).attr('disabled')) {
//					utils.notify('没有权限');
//					return;
//				}
				var module = $(this).attr('data-module');
				var shareType = $(this).attr('data-shareType');
				var targetId = $(this).attr('data-targetId');
				var multi = $(this).attr('data-multi');
				var rtnAvatar = $(this).attr('data-rtnAvatar'); //返回结果是否需要返回头像ID
				var noempty = ($(this).attr('data-noempty') && $(this).attr('data-noempty') =='true')?true:false ;
				var parent = $(this).parents('.j_page-view');
				var title = $(this).attr('data-title');
				var preEl = parent.attr('id');
				var el = $(this);
				var permission = $(this).attr('permission');
				//审批自由选择范围控制
				var rangeIds = $(this).data('rangeIds');
				if(module == 'task' && $(this).attr("id") == 'shareOther'){
					el = $("#share");
				}
				if(this.employeeseleted){
					this.employeeseleted.remove();
					this.employeeseleted = null;
				}
				var view = this
				require.async('teamsjs/component/userselector'+seajsClip,function(){
					view.employeeseleted = new window['UserSelector']({
						el:el,
						targetId:targetId,
						shareType:shareType,
						module:module,
						multi:multi,
						platform:window.webapp,
						preEl:'#'+preEl,
						noempty:noempty,
						permission:permission,
						title:title,
						rtnAvatar:rtnAvatar,
						rangeIds:rangeIds
					});
					view.employeeseleted.requireRender();
				});
				//钉钉特殊处理，使用钉钉人员选择控件
				if(window.webapp == 'ding'){
					if("participants" == shareType &&  window.dingPartis != null ){
						window.dingUsers = window.dingPartis;
					}else if("sharer" == shareType &&  window.dingShares != null  ){
						window.dingUsers =  window.dingShares ;
					} else {
						window.dingUsers = [];
					}
					dd.ready(function() {
						dd.biz.contact.choose({
							  startWithDepartmentId: 0, //-1表示打开的通讯录从自己所在部门开始展示, 0表示从企业最上层开始，(其他数字表示从该部门开始:暂时不支持)
							  multiple: multi, //是否多选： true多选 false单选； 默认true
							  users: window.dingUsers, //默认选中的用户列表，userid；成功回调中应包含该信息
							  corpId: _config.corpId, //企业id
							  max: 1500, //人数限制，当multiple为true才生效，可选范围1-1500
							  onSuccess: function(data) {
								  var objs = new Array();
								  var obj;
								  var dingUsers = new Array();
								  var page = window.dingUserIdEmp;
								  if(page && page.result&& page.result.length > 0){
									var list = page.result;
									for(var j=0; j < data.length;j++){
										for(var i =0; i < list.length; i++){
											var bean = list[i];
											if(bean.dingUserId == data[j].emplId){
												if(multi != false && multi != 'false'){
													objs.push(bean);
												} else {
													obj = bean;
												}
												break;
											}else{
												continue;
											}
										}
										dingUsers.push(data[j].emplId);
									}
									if("participants" == shareType){
										window.dingPartis = dingUsers;
									} else if("sharer" == shareType) {
										window.dingShares = dingUsers;
									}
									var view = this; 
									if(multi != false && multi != 'false'){
										el.trigger('employeeComfirm',{"objs":objs});
									}else{
										el.trigger('employeeComfirm',{"objs":obj});
									}
								  }
							  },
							  onFail : function(err) {
								  JSON.stringify(err);
							  }
						});
					});
				}else{
					parent.addClass('hide');
					$('#employee-seleted').removeClass('hide');
				}
			});
			
			//表格-内部收集上报人员选择组件
			$('body').on('click','.hr-entity-seleted', function(event){
				if($(this).attr('disabled')) {
					utils.notify('没有权限');
					return;
				}
				var $this = $(this);
				var module = $this.attr('data-module');
				if(module == 'flowpermissions'){
					//特殊处理H5审批表权限设置
					$this = $this.find('.j_selected');
				}
				var shareType = $this.attr('data-shareType');
				var targetId = $this.attr('data-targetId');
				var multi = $this.attr('data-multi');
				var noempty = false ;
				var parent = $this.parents('.j_page-view');
				var title = $this.attr('data-title');
				var menus = $this.data('menus');
				var preEl = parent.attr('id');
				var el = $this;
				var permission = $this.attr('permission');
				
				if(view.hrselector){
					view.hrselector.remove();
					view.hrselector = null;
				}
				require.async('teamsjs/component/hrselector'+seajsClip,function(){
					view.hrselector = new window['HRSelector']({
						el:el,
						shareType:shareType,
						module:module,
						multi:multi,
						preEl:'#'+preEl,
						noempty:noempty,
						permission:permission,
						'menus' : menus
					});
					view.hrselector.render();
					//钉钉特殊处理，使用钉钉人员选择控件
					if(window.webapp == 'ding'){
						window.dingUsers = [];
						dd.ready(function() {
							dd.biz.contact.choose({
								startWithDepartmentId: 0, //-1表示打开的通讯录从自己所在部门开始展示, 0表示从企业最上层开始，(其他数字表示从该部门开始:暂时不支持)
								multiple: multi, //是否多选： true多选 false单选； 默认true
								users: window.dingUsers, //默认选中的用户列表，userid；成功回调中应包含该信息
								corpId: _config.corpId, //企业id
								max: 1500, //人数限制，当multiple为true才生效，可选范围1-1500
								onSuccess: function(data) {
									var objs = new Array();
									var obj;
									var dingUsers = new Array();
									var page = window.dingUserIdEmp;
									if(page && page.result&& page.result.length > 0){
										var list = page.result;
										for(var j=0; j < data.length;j++){
											for(var i =0; i < list.length; i++){
												var bean = list[i];
												if(bean.dingUserId == data[j].emplId){
													if(multi != false && multi != 'false'){
														objs.push(bean);
													} else {
														obj = bean;
													}
													break;
												}else{
													continue;
												}
											}
											dingUsers.push(data[j].emplId);
										}
										var view = this; 
										if(multi != false && multi != 'false'){
											el.trigger('employeeComfirm',{"objs":objs});
										}else{
											el.trigger('employeeComfirm',{"objs":obj});
										}
									}
								},
								onFail : function(err) {
									JSON.stringify(err);
								}
							});
						});
					}else{
						parent.addClass('hide');
						$('#employee-seleted').removeClass('hide');
					}
				});
			});
			
			//表格-内部通知上报，部门选择组件
			$('body').on('tap','.insideCollect-department-select', function(event){
				if($(this).attr('disabled')) {
					utils.notify('没有权限');
					return;
				}
				var multi = $(this).attr('data-multi');
				var hasUrl = $(this).attr('data-hasUrl');
				var parent = $(this).parents('.j_page-view');
				var preEl = parent.attr('id');
				var el = $(this);
				if(this.departmentseleted){
					this.departmentseleted.remove();
					this.departmentseleted = null;
				}
				var view = this;
				require.async('teamsjs/component/departmentselector'+seajsClip,function(){
					view.departmentseleted = new window['DepartmentSelector']({
						el:el,
						multi:multi,
						hasUrl:hasUrl,
						preEl:'#'+preEl
					});
					view.departmentseleted.render();
					parent.addClass('hide');
					$('#department-component').removeClass('hide');
				});
			});
			
			//申请权限
			$('body').off('click','.share-join').on('click','.share-join',function(){
				var entityId = $(this).attr("entityId"),
					module = $(this).attr("module");
				$.ajax({
        			type: 'post', 
        			dataType: 'json', 
        			data: {"entityId":entityId,"module":module},
        			url:'/app/blog-message/shareApply.json', 
        			success: function(data){
        				utils.notify("共享申请已发送");
        			}
        		});
			});
			
			//部门选择组件
			$('body').on('tap','.department-seleted', function(event){
				if($(this).attr('disabled')) {
					utils.notify('没有权限');
					return;
				}
				var multi = $(this).attr('data-multi');
				var hasUrl = $(this).attr('data-hasUrl');
				var parent = $(this).parents('.j_page-view');
				var preEl = parent.attr('id');
				var el = $(this);
				if(this.departmentseleted){
					this.departmentseleted.remove();
					this.departmentseleted = null;
				}
				var view = this;
				require.async('teamsjs/component/departmentselector'+seajsClip,function(){
					view.departmentseleted = new window['DepartmentSelector']({
						el:el,
						multi:multi,
						hasUrl:hasUrl,
						noRouter:true,
						preEl:'#'+preEl
					});
					view.departmentseleted.render();
					parent.addClass('hide');
					$('#department-component').removeClass('hide');
				});
			});
			
			//岗位选择组件
			$('body').on('tap','.position-seleted', function(event){
				if($(this).attr('disabled')) {
					utils.notify('没有权限');
					return;
				}
				var multi = $(this).attr('data-multi');
				var hasUrl = $(this).attr('data-hasUrl');
				var parent = $(this).parents('.j_page-view');
				var preEl = parent.attr('id');
				var el = $(this);
				if(this.positionseleted){
					this.positionseleted.remove();
					this.positionseleted = null;
				}
				var view = this;
				require.async('teamsjs/component/positionselector'+seajsClip,function(){
					view.positionseleted = new window['PositionSelector']({
						el:el,
						multi:multi,
						hasUrl:hasUrl,
						preEl:'#'+preEl
					});
					view.positionseleted.render();
					parent.addClass('hide');
					$('#position-component').removeClass('hide');
				});
			});
			
			/*日期选择*/
			$('body').on('tap','.date-selected',function(event){
				if($(this).attr('disabled')) {
					utils.notify('没有权限');
					return;
				}
				var $this = $(this);
				var parent = $(this).parents('.j_page-view');
				var format = $(this).attr('format');
				var minView = $(this).attr('minview');
				//var minView = $(this).attr('maxview');
				var startView = $(this).attr('startview');
				var startDate = $(this).attr('startdate');
				var endDate = $(this).attr('enddate');
				var todayBtn = $(this).attr('todayBtn');
				var preEl = parent.attr('id');
				if(this.dateseleted){
					this.dateseleted.remove();
					this.dateseleted = null;
				}
				var initialDate = $(this).attr("initialDate");
				require.async('teamsjs/component/datetimepicker'+seajsClip,function(DateTimePicker){
					view.dateseleted = new DateTimePicker({
						el:$this,
						format:format,
						minView:minView,
						//maxView:maxView,
						startView:startView,
						startDate:startDate,
						endDate:endDate,
						todayBtn:!!todayBtn,
						preEl:'#'+preEl,
						initialDate:initialDate
					});
					view.dateseleted.render();
					parent.addClass('hide');
				});
			});
            
			/*筛选组件*/
			$('body').on('tap','.j_filter',function(event){
				var caption = $(this).attr('data-caption');
				var parent = $(this).parents('.j_page-view');
				var preEl = "#"+parent.attr('id');
				var module = $(this).attr("module");
				var el ="#"+$(this).attr("id");
				var oriType = $(this).attr('data-type') || null;
				var wrFlag = false;
				var sex = $(this).attr('data-sex') || "我";
				if($(this).hasClass('j_wrs')){
					wrFlag = true;
				}
				var $this = $(this);
				if(this.filter){
//					parent.addClass('hide');
//					$('#filter').removeClass('hide');
					$(document).trigger('openSlider','#filter');
					
//					$('#fast-create').addClass('hide'); //隐藏快速新建
				}else{
					var view = this;
					require.async('teamsjs/component/filter'+seajsClip,function(ex){
						view.filter = new ex({'button':$this,'caption':caption,'oriType':oriType,'sex':sex,'module':module,'el':el,'preEl':preEl,'wrFlag':wrFlag});
						view.filter.render();
					});
				}
//				if(module == 'workreport'){
//					view.filter.initTimeline();
//				}
			});
			
			//修改密码
			$('body').on('tap','.j_change-password', function(event){
				if(view.passwordview){
					view.passwordview.remove();
					view.passwordview = null;
				}
				var $this = $(this);
				require.async('teamsjs/user/passwordset'+seajsClip,function(ex){
					view.passwordview = new ex({
						userId:$this.attr('data-userId'),
						type:$this.attr('data-type'),
						preEl:$this.parents('.j_page-view')
					});
					view.passwordview.render();
				});
			});
			
			//修改头像
			$('body').on('tap','.j_change-avatar', function(event){
				if(view.avatarview){
					view.avatarview.remove();
					view.avatarview = null;
				}
				var $this = $(this);
				require.async('teamsjs/user/avatarset'+seajsClip,function(ex){
					view.avatarview = new ex({
						el:'#'+$this.parents('.j_page-view').attr('id')
					});
					view.avatarview.render();
				});
			});
//			var openAddItemLayer = function(){
//				if($('.additem-layer').is(':hidden')){
//					$('.additem-layer').show();
//					setTimeout(function(){
//						$('.additem-layer').addClass('in');
//					}, 100);
//				}else{
//					$('.additem-layer').removeClass('in');
//					setTimeout(function(){
//						$('.additem-layer').hide();
//					}, 100);
//				}
//			};
//			(function(win){
//				//新建按钮拖动(ios设备兼容良好，其他设备暂时屏蔽)
//				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
//					//限制body滚动
//					var ifBodyScroll = true;
//					//初始对比值位置
//					var x,y;
//					$(document).on('touchstart','.additem-btn', function(event){
//						var event = window.event;//还原事件源
//						if (!event.touches.length) return;
//						event.preventDefault();
//						ifBodyScroll = false;
//						//检测设备支持
//						if (!event.touches.length) return;
//						//获取单指触摸
//						var touch = event.touches[0],
//						_this = $(this);
//						//取得拖拽差值
//						x = $(this).offset().left;
//						y = $(this).offset().top;
//						var _x = touch.pageX - $(this).offset().left,
//						_y = touch.pageY - $(this).offset().top;
//						$(document).on('touchmove',function(event) {
//							event = window.event;
//							if(!ifBodyScroll){
//								event.preventDefault();
//							}
//							_this.css({
//								'left' : touch.pageX - _x,
//								'top' : touch.pageY - _y
//							});
//						}).on('touchend',function(event){
//							ifBodyScroll = true;
//							//防止iphone向左切屏丢失手指焦点
//							if(_this.offset().left <= 0){
//								_this.css('right','auto').animate({
//									'left' : '30px'
//								},200);
//							}
//						});
//					}).on('touchend','.additem-btn',function(event){
//						var event = window.event;//还原事件源
//						var touch = event.touches[0],
//						_this = $(this);
//						//移动小于10像素则展开新建菜单
//						if(Math.abs(_this.offset().left - x) <= 10 || Math.abs(_this.offset().top - y) <= 10){
//							openAddItemLayer();
//						}
//						//左边缘
//						if(_this.offset().left <= 0){
//							_this.css('right','auto').animate({
//								'left' : '30px'
//							},200);
//						}
//						//上边缘
//						if(_this.offset().top <= 0){
//							_this.css('bottom','auto').animate({
//								'top' : '30px'
//							});
//						}
//						//上下边缘
//						var pt = parseInt(_this.offset().top),
//						pl = parseInt(_this.offset().left),
//						sh = _this.height(),
//						sw = _this.width(),
//						wh = $(window).height(),
//						ww = $(window).width();
//						if((wh-pt)<sh){
//							_this.css('top','auto').animate({
//								'bottom' : '30px'
//							});
//						}
//						if((ww-pl)<sw){
//							_this.css('left','auto').animate({
//								'right' : '30px'
//							});
//						}
//					});
//				}else{//其他设备点击展开操作
//					$(document).on('tap','.additem-btn', function(event){
//						openAddItemLayer();
//					});
//				}
//			})(window);
			//点击其他绑定事件元素展开新建
//			$(document).on('tap','.js_additemBtn', function(event){
//				openAddItemLayer();
//			});
			//邀请加入
			$('body').on('tap','.j_invite',function(event){
				ROUTER.navigate("/mobile/invite", {trigger: true});
			});
		},
		/*
		 * forceRefresh=true 表示需要强制刷新
		 * pageKey标记不同页面
		 * requireAsync=true 表示需要提前异步加载部分资源，执行requireReady方法，否则直接执行render
		 * example-requireAsync: this.render(page,true)
		 * example-forceRefresh: this.render(page,null,true)
		 */
		render : function(page,forceRefresh){
			if(this.crmApp && this.crmApp.lastPage){
				this.crmApp.lastPage.remove();
				this.crmApp.lastPage=null;
				this.lastPage=null;
			}
			if(this.smsApp && this.smsApp.lastPage){
				this.smsApp.lastPage.remove();
				this.smsApp.lastPage=null;
				this.lastPage=null;
			}
			if(this.hrApp && this.hrApp.lastPage){
				this.hrApp.lastPage.remove();
				this.hrApp.lastPage=null;
				this.lastPage=null;
			}
			if(this.portalApp && this.portalApp.lastPage){
				this.portalApp.lastPage.remove();
				this.portalApp.lastPage=null;
				this.lastPage=null;
			}
			//第一次初始化
			if(this.lastPage==null){
				this.lastPage = page;
				page.render();
			}else if( this.lastPage.pageKey != page.pageKey || forceRefresh){
				if(this.lastPage.remove){
					this.lastPage.remove();
				}else if(this.lastPage.mainView){
					this.lastPage.mainView.remove();
				}
				this.lastPage = page;
				this.lastPage.render();
			}else{
				this.update(page);
				return;
			}
		},
		/**
		 * 更新page参数
		 */
		update:function(page){
			this.lastPage.initialize(page);
			//销毁新页面
			page.remove();
			page = null;
		},
		showSmsMobile:function(param){
			var view = this;
			require.async(['smsjs/SmsApp'+seajsClip,'smsjs/SmsUtils'+seajsClip],function(smsapp,smsutils){
				if(!window.SmsUtils){
					window.SmsUtils = smsutils;
				}
				if(!view.smsApp) {
					view.smsApp = new smsapp();
				}
				view.smsApp.showPage(param,view);
			});
		},
		showCrmMobile:function(param){
			var view = this;
			require.async(['crmjs/CrmApp'+seajsClip,'crmjs/CrmUtils'+seajsClip,'crmjs/CityUtils'+seajsClip],function(crmapp,crmutils,cityUtils){
				if(!window.CrmUtils){
					window.CrmUtils = crmutils;
				}
				if(!window.CityUtils){
					window.CityUtils = cityUtils;
				}
				if(!view.crmApp) {
					view.crmApp = new crmapp();
				}
				view.crmApp.showPage(param,view);
			});
		},
		showPaasMobile:function(appId,pageId){
			var view = this;
			require.async(["paasjs/PaasApp"+seajsClip,'paasjs/PaasUtils'+seajsClip],function(PaasApp,PaasUtils){
				if(!window.PaasUtils){
					window.PaasUtils = PaasUtils;
				}
				if(!view.paasApp) {
					view.paasApp = new PaasApp();
				}
				view.paasApp.showPage(appId,pageId,view);
			});
		},
		showCustomPage:function(pageId){
			var view = this;
			require.async(['portaljs/PortalUtils'+seajsClip,'portaljs/element/ElementUtils'+seajsClip,'portaljs/page/PageGroup'+seajsClip],function(PortalUtils,ElementUtils,PageGroup){
				if(!window.PortalUtils){
					window.PortalUtils = PortalUtils;
				}
				if(!window.ElementUtils){
					window.ElementUtils = ElementUtils;
				}
				new PageGroup({
					"el" : $("body"),
					"pageGroupId":pageId
				}).render();
			});
		},
		showPortalMobile:function(menuId,param){
			var view = this;
			require.async(["portaljs/PortalApp"+seajsClip,'portaljs/PortalUtils'+seajsClip,'portaljs/element/ElementUtils'+seajsClip],function(PortalApp,PortalUtils,ElementUtils){
				if(!window.PortalUtils){
					window.PortalUtils = PortalUtils;
				}
				if(!window.ElementUtils){
					window.ElementUtils = ElementUtils;
				}
				if(!view.portalApp) {
					view.portalApp = new PortalApp();
				}
				view.portalApp.showPage(menuId,param,view);
			});
		},
		showHrMobile:function(param){
			var view = this;
			require.async(['hrjs/HrApp'+seajsClip,'hrjs/HrUtils'+seajsClip],function(hrapp,hrutils){
				if(!window.HrUtils){
					window.HrUtils = hrutils;
				}
				if(!view.hrApp) {
					view.hrApp = new hrapp();
				}
				view.hrApp.showPage(param,view);
			});
		},
		/*----------------首页----------------*/
		renderHome:function(channel){
			var view = this;
			require.async(this.homepageUrl,function(ex){
				var page = new ex({
					'pageKey':'home',
					'module':channel
				});
				view.render(page);
			});
		},
		// 工资单
		renderSalary:function(){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'salaryview'
				});
				view.render(page);
			});
		},
		/* ----------任务模块开始 ------------*/
		//任务列表
		renderTasks:function(userId){
			var view = this;
			require.async(this.taskpageUrl,function(ex){
				var page = new ex({
					'pageKey':'mytask',
					'userId':userId,
					'type':'mine'
				});
				view.render(page);
			});
		},
		//不同类型任务列表
		renderTaskByType:function(userId,type){
			var view = this;
			require.async(this.taskpageUrl,function(ex){
				var page = new ex({
					'pageKey':'task-'+type,
					'userId':userId,
					'type':type
				});
				view.render(page);
			});
		}, 
		//任务详情
		renderTask:function(id,pid){
			var view = this;
			require.async(this.taskpageUrl,function(ex){
				var page = new ex({
					'pageKey':'taskinfo',
					'id':id,
					'pid':pid
				});
				view.render(page,true);
			});
		},
		//任务搜索
		renderTaskSearch:function(keyword){
			var view = this;
			require.async(this.taskpageUrl,function(ex){
				var page = new ex({
					'pageKey':'tasksearch',
					'keyword':keyword
				});
				view.render(page);
			});
		},
		//子任务
		renderSubtasks:function(pid){
			var view = this;
			require.async(this.taskpageUrl,function(ex){
				var page = new ex({
					'pageKey':'subtask',
					'pid':pid
				});
				view.render(page);
			});
		},
		renderSubtaskWeight:function(id, pid){
			var view = this;
			require.async(this.taskpageUrl,function(ex){
				var page = new ex({
					'pageKey':'subtaskweight',
					'id':id,
					'pid':pid
				});
				view.render(page);
			});
		},
		//新增任务
		renderTaskAdd:function(group,pid){
			var view= this;
			require.async(this.taskpageUrl,function(ex){
				var options = {
                    'pageKey':'taskadd',
                    'group':group,
                    'pid':pid,
                    'isurl':true
                };
                if(sessionStorage.getItem('taskaddInfo')){
                	var param = JSON.parse(sessionStorage.getItem('taskaddInfo'));
                    options = $.extend({},param,{'pageKey':'taskadd','isurl':true});
				}
				var page = new ex(options);
				view.render(page);
			});
		},
		//系统中的详情查看
		renderEtInfo : function(module,id){
			var view = this,modules = ['task','mainline']; //支持的模块
			if($.inArray(module,modules) == -1) return true;
			
			//进入H5详情页面
			if(module == 'task'){
				view.renderTask(id);
			}else if(module == 'mainline'){
				view.renderMainlineInfo(id);
			}
			
			//手机浏览器访问，同时打开app
			if(window.webapp == 'mobile'){
//				if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) window.location.href = "com.baidu.tieba://";//ios app协议
				if(/(Android)/i.test(navigator.userAgent)) window.location.href = "smartheer://smartheer.com/detail/"+module+"?id="+id;
			}
		},
		
		/*---------------日报模块----------------*/
		
		//日报查询
		renderBlog:function(userId, type){
			var view = this;
			require.async(this.blogpageUrl,function(ex){
				var page = new ex({
					'pageKey':'blog-'+type,
					'userId':userId,
					'type':type
				});
				view.render(page);
			});	
		},
		renderBlogInfoId:function(id){
			var view = this;
			require.async(this.blogpageUrl,function(ex){
				var page = new ex({
					'pageKey':'bloginfoid',
					'id':id
				});
				view.render(page);
			});	
		},
		renderBlogInfo:function(userId, date){
			var view = this;
			this.lastPage = null;
			require.async(this.blogpageUrl,function(ex){
				var page = new ex({
					'pageKey':'bloginfo',
					'userId':userId,
					'date':date
				});
				view.render(page);
			});	
		},
		renderBlogInfo:function(userId, date,type){
			var view = this;
			this.lastPage = null;
			require.async(this.blogpageUrl,function(ex){
				var page = new ex({
					'pageKey':'bloginfo',
					'userId':userId,
					'date':date,
					'type':type
				});
				view.render(page);
			});	
		},
		renderBlogAdd:function(){
			var view = this;
			require.async(this.blogpageUrl,function(ex){
				var page = new ex({
					'pageKey':'blogadd',
					'urlAdd':true
				});
				view.render(page);
			});	
		},
		// 日报报表
		renderReportBlog:function(){
			var view = this;
			require.async(this.blogpageUrl,function(ex){
				var page = new ex({
					'pageKey':'blogreport'
				});
				view.render(page);
			});
		},
		
		/*---------------------项目---------------------*/
		renderMainline:function(userId, type){
			var view = this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlines-'+type,
					'userId':userId,
					'type':type
				});
				view.render(page,true);
			});
		},
		renderMainlineSearch:function(keywords){
			var view = this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlinesearch',
					'keywords':keywords,
					'keysearch':true
				});
				view.render(page);
			});
		},
		renderMainlineCover:function(id,mainlineType){
			var view = this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlinecover',
					'id':id,
					'mainlineType':mainlineType
				});
				view.render(page,true);
			});
		},
		renderMainlineDynamic:function(id){
			var view =this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlinedynamic',
					'userId' : TEAMS.currentUser.id,
					'id' : id
				});
				view.render(page);
			});
		},
		renderMainlineAdd:function(){
			var view = this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlineadd',
					'urlAdd':true
				});
				view.render(page);
			});
		},
		renderMainlineCategory:function(){
			var view = this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlinecategory'
				});
				view.render(page);
			});
		},
		renderMainlineNew:function(id){
			var view = this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlinenew',
					'id' : id
				});
				view.render(page);
			});
		},
		renderMainlineReport:function(id){
			var view = this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlineReport',
					'id' : id
				});
				view.render(page);
			});
		},   
		renderMainlineReportComp:function(id,type){
			var view = this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlineReportComp',
					'id' : id,
					'type':type
				});
				view.render(page);
			});
		},
		renderMainlineReportCompDetail:function(reportType,type,reportId){
			var view = this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlineReportCompDetail',
					'type':type,
					'reportId':reportId,
					'reportType' : reportType
				});
				view.render(page);
			});
		},
		renderMainlineReportPlan:function(id){
			var view = this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlineReportPlan',
					'id' : id
				});
				view.render(page);
			});
		},
		renderMainlineReportPlanDetail:function(id,reportId){
			var view = this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlineReportPlanDetail',
					'id' : id,
					'reportId':reportId
				});
				view.render(page);
			});
		},
		renderMainlineInfo:function(id){
			var view = this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlineinfo',
					'id':id
				});
				view.render(page);
			});
		},
		renderMainlineLink:function(id, module){
			var view = this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlinelink-'+module,
					'id':id,
					'module':module
				});
				view.render(page);
			});
		},
		renderMainlineLinkSearch:function(id, module){
			var view = this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlinelinksearch-'+module,
					'mainlineId':id,
					'module':module
				});
				view.render(page);
			});
		},
		renderMainlineLinkPermission:function(id, module,permission){
			var view = this;
			require.async(this.mainlinepageUrl,function(ex){
				var page = new ex({
					'pageKey':'mainlinelink-'+module,
					'id':id,
					'permission':permission,
					'module':module
				});
				view.render(page);
			});
		},
		/*-------------------------文档-------------------------*/
		// 文档列表
		
		renderDocuments : function(userId,type,folderId,folderType){
			var view = this;
			require.async(this.docpageUrl,function(ex){
				var page = new ex({
					'pageKey':'doclist-'+type,
					'userId':userId,
					'type':type,
					'folderId':folderId,
					'folderType':folderType
				});
				view.render(page,true);
			});
		},
		// 文档详情
		renderDocument : function(userId, id){
			var view = this;
			require.async(this.docpageUrl,function(ex){
				var page = new ex({
					'pageKey':'docinfo',
					'userId' : userId,
					'id' : id
				});
				view.render(page);
			});
		},
		//文档搜索
		renderDocSearch:function(keywords){
			var view = this;
			require.async(this.docpageUrl,function(ex){
				var page = new ex({
					'pageKey':'docsearch',
					'keywords':keywords
				});
				view.render(page);
			});
		},
		//文档新建
		renderDocNew:function(param){
			var view = this;
			require.async(this.docpageUrl,function(ex){
				var page = new ex({
					'pageKey':'docadd',
					'folderId':param.folderId,
					'isUrl':true,
					'wechat':true
				});
				view.render(page);
			});
		},
		/*-------------------------报告-------------------------*/
		
		renderWorkreport:function(userId,year,type,sn,cate){
			var view = this;
			require.async(this.workreportpageUrl,function(ex){
				var page = new ex({
					'pageKey':'workreportpage-'+type,
					'userId' : userId,
					'year' : year,
					'type' : type,
					'sn' : sn,
					'cate' : cate
				});
				view.render(page,true);
			});
		},
		renderNewWorkreport:function(id,userId,year,type,sn,cate){
			var view = this;
			if(cate == 'oldwechatnew'){
				year = Date.create(TEAMS.nowTime).getUTCFullYear();
				if(type == 'week') {
					sn = utils.getIsoWeekOfYear(TEAMS.nowTime);
				} else if(type == 'month'){
					sn = (new Date(TEAMS.nowTime)).getMonth()+1;
				}
			}
			require.async(this.workreportpageUrl,function(ex){
				var page = new ex({
					'pageKey':'addnewworkreport',
					'id' : id,
					'year' : year,
					'type' : type,
					'sn' : sn,
					'cate' : cate
				});
				view.render(page,true);
			});
		},
		renderAddNewWorkreport:function(id,year,type,sn,cate){
			var view = this;
			require.async(this.workreportpageUrl,function(ex){
				var page = new ex({
					'pageKey':'addnewworkreport',
					'id' : id,
					'year' : year,
					'type' : type,
					'sn' : sn,
					'cate' : cate
				});
				view.render(page,true);
			});
		},
		renderWorkreportInfo:function(id,userId){
			var view = this;
			require.async(this.workreportpageUrl,function(ex){
				var page = new ex({
					'pageKey':'workreportinfo',
					'id' : id,
					'userId' : userId,
					'cate' : 'info'
				});
				view.render(page);
			});
		},
		renderWeeklyBlog:function(userId,date){
			var view = this;
			require.async(this.blogpageUrl+seajsClip,function(ex){
				var page = new ex({
					'pageKey'	: 'weeklyblog',
					'userId'    :  userId,
					'date'		: date
				});
				view.render(page);
			});
		},
		renderWorkreports:function(type,unread){
			var view = this;
			require.async(this.workreportpageUrl,function(ex){
				var page = new ex({
 					'pageKey':'workreportpage-'+type,
					'type':type,
					'unread':unread
				});
				view.render(page);
			});
		},
		// 报告统计报表
		renderReportWorkreport:function(){
			var view = this;
			require.async(this.workreportpageUrl,function(ex){
				var page = new ex({
					'pageKey':'workreportStatistics'
				});
				view.render(page);
			});
		},
		renderWorkreportByYear:function(year){
			var view = this;
			require.async(this.workreportpageUrl,function(ex){
				var page = new ex({
					'pageKey':'workreportbyyear',
					'year' : year
				});
				view.render(page,true);
			});
		},
		renderWorkreportTimeLine:function(date){
			var view = this;
			require.async(this.workreportpageUrl,function(ex){
				var page = new ex({
					'pageKey':'workreporttimeline',
					'date' : date
				});
				view.render(page,true);
			});
		},
		/***************************日程************************/
		renderCalendar : function(userId){
			var view = this;
			require.async(this.agendapageUrl,function(ex){
				var page = new ex({
					'pageKey':'agendas',
					'userId':userId
				});
				view.render(page);
			});
		},
		renderAgendaInfo : function(userId,id){
			var view = this;
			require.async(this.agendapageUrl,function(ex){
				var page = new ex({
					'pageKey':'agendainfo',
					'userId' : userId,
					'id' : id
				});
				view.render(page);
			});
		},
		renderRepeatAgendaInfo : function(userId,id,repeatNum){
			var view = this;
			require.async(this.agendapageUrl,function(ex){
				var page = new ex({
					'pageKey':'agendainfo',
					'userId' : userId,
					'id' : id,
					'repeatNum':repeatNum
				});
				view.render(page);
			});
		},
		renderAgendaEdit : function(userId, id){
			var view = this;
			require.async(this.agendapageUrl,function(ex){
				var page = new ex({
					'pageKey':'agendaedit',
					'userId':userId,
					'id' : id
				});
				view.render(page);
			});
		},
		renderRepeatAgendaEdit : function(userId, id, repeatNum){
			var view = this;
			require.async(this.agendapageUrl,function(ex){
				var page = new ex({
					'pageKey':'agendaedit',
					'userId':userId,
					'id' : id,
					'repeatNum':repeatNum
				});
				view.render(page);
			});
		},
		renderAgendaAdd : function(date){
			var view = this;
			require.async(this.agendapageUrl,function(ex){
				var page = new ex({
					'pageKey':'agendaadd',
					'isUrl':true,
					'date':date //指定日期
				});
				view.render(page);
			});
		},
		renderWechatAgenda:function(id){
			var view = this;
			require.async(this.agendapageUrl,function(ex){
				var page = new ex({
					'pageKey':'wechatagenda',
					'id':id
				});
				view.render(page);
			});
		},
		renderCalendarSearch:function(keywords){
			var view = this;
			require.async(this.agendapageUrl,function(ex){
				var page = new ex({
					'pageKey':'agendasearch',
					'keywords':keywords
				});
				view.render(page);
			});
		},
		
		/******************公告*********************************/
		
		renderDynamicList:function(){
			var view = this;
			require.async(this.dynamicpageUrl,function(ex){
				var page = new ex({
					'pageKey':'dynamiclist',
					'unread':0
				});
				view.render(page);
			});
		},
		renderDynamicInfo:function(id){
			var view = this;
			require.async(this.dynamicpageUrl,function(ex){
				var page = new ex({
					'pageKey':'dynamicinfo',
					'id':id
				});
				view.render(page);
			});
		},
		renderDynamicAdd:function(){
			var view = this;
			require.async(this.dynamicpageUrl,function(ex){
				var page = new ex({
					'pageKey':'dynamicadd',
					'isUrl':true
				});
				view.render(page);
			});
		},
		renderSet:function(){
			var view = this;
			require.async('teamsjs/set/m.setpage'+seajsClip,function(ex){
				var page = new ex({
				});
				view.render(page);
			});
		},
//		renderLangSet:function(){
//			var view = this;
//			require.async('teamsjs/set/langset'+seajsClip,function(ex){
//				var page = new ex({
//				});
//				view.render(page);
//			});
//		},
		renderSignatureManage:function(){
			var view = this;
			require.async('teamsjs/set/signaturemanage' + seajsClip,function(ex){
				var page = new ex({
				});
				view.render(page);
			});
		},
		/**************************全局搜索**************************/
		searchAll:function(keywords){
			var view = this;
			require.async(this.globalsearchUrl,function(ex){
				var page = new ex({
					'pageKey':'searchall',
					'keywords':keywords
				});
				view.render(page);
			});
		},
		/**************************全文检索**************************/
		fullsearch:function(param){
			var view = this;
			require.async(['fsearch/FSApp'+seajsClip,'fsearch/FSUtils'+seajsClip],function(fsapp,fsutils){
				if(!window.FSUtils){
					window.FSUtils = fsutils;
				}
				if(!view.fsapp) {
					view.fsapp = new fsapp();
				}
				view.fsapp.showPage(param,view);
			});
		},
		/**************************评论搜索**************************/
		searchComment:function(module,keywords){
			var view = this;
			require.async(this.globalsearchUrl,function(ex){
				var page = new ex({
					'pageKey':'searchcomment',
					'module':module,
					'keywords':keywords
				});
				view.render(page);
			});
		},
		/***************************标签*************************/
		renderTagLink:function(id, module){
			var view = this;
			require.async(this.tagpageUrl,function(ex){
				var page = new ex({
					'pageKey':'taglink',
					'id':id,
					'module':module
				});
				view.render(page);
			});
		},
		renderTagList:function(){
			var view = this;
			require.async(this.tagpageUrl,function(ex){
				var page = new ex({
					'pageKey':'taglist'
				});
				view.render(page);
			});
		},
		renderTagSearch:function(keywords){
			var view = this;
			require.async(this.tagpageUrl,function(ex){
				var page = new ex({
					'pageKey':'tagsearch',
					'keywords':keywords
				});
				view.render(page);
			});
		},
		/************************** 原表单模块 **************************/
		
		renderBiaogeForms: function(userId, type){
			var view = this;
			require.async(this.formpageUrl,function(ex){
				var page = new ex({
					'pageKey':'biaogeformlistview',
					'userId': userId,
					'type': type
				});
				view.render(page);
			});
		},
		
		renderFormById:function(userId,type,formId){
			var view = this;
			require.async(this.formpageUrl,function(ex){
				var view = new ex({
					'pageKey':'biaogeformdetail',
					'userId':userId,
					'type':type,
					'formId':formId
				});
				view.render();
			});
		},
		
		/**************************手机表单列表**************************/
		
		/**
		 * 审批表单
		 * @param ownership
		 */
		renderForms: function(ownership){
			var view = this;
			require.async(this.formpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowforms',
					'ownership': ownership
				});
				view.render(page);
			});
		},

        //表单搜索
        renderFormsSearch:function(ownership){
            var view = this;
            require.async(this.formpageUrl,function(ex){
                var page = new ex({
                    'pageKey':'formSearch',
                    'ownership': ownership
                });
                view.render(page);
            });
        },
		
		/**
		 * 云表单列表
		 */
		renderEbgFormList: function(module,ownership){
			var view = this;
			require.async(this.formpageUrl,function(ex){
				var page = new ex({
					'pageKey':'ebgforms',
					'module': module,
					'ownership':ownership
				});
				view.render(page);
			});
		},
        /**
         * 按类型渲染
         */
        renderEbgFormCateList: function(type, module){
            var view = this;
            require.async(this.formpageUrl,function(ex){
                var page = new ex({
                    'pageKey':'ebgformscatelist',
                    'type': type,
                    'module':module
                });
                view.render(page);
            });
        },
        /**
         * 云表单搜索
         */
        renderEbgFormSearch: function(keyword){
            var view = this;
            require.async(this.formpageUrl,function(ex){
                var page = new ex({
                    'pageKey':'ebgformsearch',
                    'keyword': keyword
                });
                view.render(page);
            });
        },
		/**
		 * 云表单详情
		 */
		renderEbgFormDetail: function(module, formId){
			var view = this;
			require.async(this.formpageUrl,function(ex){
				var page = new ex({
					'pageKey':'ebgforminfo',
					'module': module,
					'formId': formId,
					'readOnly': true
				});
				view.render(page);
			});
		},
		
		/**
		 * 云表单使用
		 */
		renderEbgFormCopy: function(module, formId){
			var view = this;
			require.async(this.formpageUrl,function(ex){
				var page = new ex({
					'pageKey':'ebgformcopy',
					'module': module,
					'formId': formId
				});
				view.render(page);
			});
		},
		
		//表单列表点击提交审批,渲染表单布局
		renderNewWorkflow:function(userId,formId){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'newflow',
					'userId' : userId,
					'formId' : formId
				});
				view.render(page);
			});
		},
		/**************************审批**************************/
		// 审批列表
		renderWorkflows:function(userId){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'userflowlist',
					'userId':userId
				});
				view.render(page);
			});
		},
		
		// 审批回收站列表
		renderTrashbinWorkflows:function(userId){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'userbinflowlist',
					'userId':userId,
					'isTrashbinList' : true
				});
				view.render(page);
			});
		},
		
		//按类型
		renderFilterFlows : function(userId, type){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowlist-'+type,
					'userId':userId,
					'type' :type
				});
				view.render(page);
			});
		},
		//详情
		renderWorkflow : function(userId,id){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowinfo'+id||1,
					'userId':userId,
					'id':id
				});
				view.render(page);
			});
		},
		
		//审批搜索
		renderFlowSearch:function(keywords){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowsearch',
					'keywords':keywords
				});
				view.render(page);
			});
		},
		//审批表管理
		renderFlowmanages:function(type,ownership){
			var view = this;
			if(!window.flowmanagesIndex){
				window.flowmanagesIndex = 0;
			}
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowmanages'+(++window.flowmanagesIndex),
					'type':'flowmanages',
					'ownership':ownership
				});
				view.render(page);
			});
		},
		//H5审批综合统计按人员统计
		renderFlowStatUser:function(){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowstatuser'
				});
				view.render(page);
			});
		},
		//H5审批数据统计列表 表头设置
		renderFlowDataStatListHeaderSet:function(type,id){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowdatastatlistheaderset',
					'type':type,
					'id': id
				});
				view.render(page);
			});
		},
		//H5审批数据统计列表
		renderFlowDataStatList:function(type,id,linkageType,beginDate,endDate){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowdatastatlist'+type,
					'type':type,
					'id': id,
					'linkageType':linkageType,
					'beginDate':beginDate,
					'endDate':endDate
				});
				view.render(page);
			});
		},
		renderFlowDataStatListSearch:function(type,id,searchType){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowdatastatlistsearch',
					'type':type,
					'id': id,
					'searchType':searchType
				});
				view.render(page);
			});
		},
		//H5审批综合统计
		renderFlowCompreStat:function(type,module){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':type,
					'searchType':type,
					'type':type,
					'module': module
				});
				view.render(page);
			});
		},
		/**
		 * 审批高级搜索
		 */
		renderFlowSeniorSearch:function(){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowseniorsearch'
				});
				view.render(page);
			});
		},
		//H5审批表统计搜索
		renderFlowDataStatSearch:function(ownership){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowdatastatsearch',
					'ownership': ownership
				});
				view.render(page);
			});
		},
		//H5审批表统计
		renderFlowDataStat:function(type,ownership){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowdatastat'+ownership,
					'searchType':type,
					'type':type,
					'ownership': ownership
				});
				view.render(page);
			});
		},
		//H5审批表统计入口
		renderFlowStat:function(type,module){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowstat',
					'searchType':'flowstat',
					'type':'flowstat',
					'module': module
				});
				view.render(page);
			});
		},
		//H5审批表管理查询
		renderFlowmanagesSearch:function(type,ownership){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowmanagessearch',
					'searchType':'flowmanagessearch',
					'ownership':ownership
				});
				view.render(page);
			});
		},
		//H5审批表统计搜索
		renderWorkflowbatch:function(type){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'workflowbatch',
					'type': type
				});
				view.render(page);
			});
		},
		//表单预览
		renderWorkflowpre:function(module,formId){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'workflowpre',
					'module':module,
					'formId':formId
				});
				view.render(page);
			});
		},
		//审批表管理介绍
		renderFlowintroduce:function(){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowintroduce'
				});
				view.render(page);
			});
		},
		//审批表权限设置
		renderFlowpermissions:function(formId){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowpermissions',
					'formId':formId
				});
				view.render(page);
			});
		},
		renderFlowTrashBinSearch:function(){
			var view = this;
			require.async(this.flowpageUrl,function(ex){
				var page = new ex({
					'pageKey':'flowtrashbinsearch',
					'type':'trashbin'
				});
				view.render(page);
			});
		},
		/*************************上报*************************/
		
		// 上报列表
		formDataReportList : function(type){
			var view = this;
			require.async(this.datareportpageUrl,function(ex){
//				if((userId == 'write' || userId == 'todo'||userId == 'finshed') && !type){
//					var page = new ex({
//						'pageKey':'datareportlist-'+userId,
//						'type':userId
//					});
//				}else{
					var page = new ex({
						'pageKey':'datareportlist-'+type,
						'type':type
					});
//				}
				view.render(page);
			});
        },
        formDataReport : function(userId,id){
        	var view = this;
        	require.async(this.datareportpageUrl,function(ex){
        		var page = new ex({
        			'pageKey':'formdatareport',
        			'userId':userId,
        			'id' :id
        		});
        		view.render(page);
        	});
        },
        formDataReportSearch:function(keywords){
        	var view = this;
        	require.async(this.datareportpageUrl,function(ex){
        		var page = new ex({
        			'pageKey':'formdatareportsearch',
        			'keywords':keywords
        		});
        		view.render(page);
        	});
        },
        //表单统计
        formStatDataTable:function(id){
        	var view = this;
        	require.async(this.datareportpageUrl,function(ex){
        		var page = new ex({
        			'pageKey':'formstatdatatable',
        			'id' :id
        		});
        		view.render(page);
        	});
        },
        formStatDataTableSearch:function(id){
        	var view = this;
        	require.async(this.datareportpageUrl,function(ex){
        		var page = new ex({
        			'pageKey':'formstatdatatablesearch',
        			'id' :id
        		});
        		view.render(page);
        	});
        },
        
        formdatadetail:function(type,id){
        	var view = this;
        	require.async(this.datareportpageUrl,function(ex){
        		var page = new ex({
        			'pageKey':'formdatadetail',
        			'type':type,
        			'id' :id
        		});
        		view.render(page,true);
        	});
        },
        formdataReportDetail:function(id){
        	var view = this;
        	require.async(this.datareportpageUrl,function(ex){
        		var page = new ex({
        			'pageKey':'formdatadetail',
        			'id' :id
        		});
        		view.render(page,true);
        	});
        },
        writeFormSearch:function(type){
        	var view = this;
        	require.async(this.datareportpageUrl,function(ex){
        		var page = new ex({
        			'pageKey':'datareportsearch',
        			'type':type
        		});
        		view.render(page);
        	});
        },
        //数据统计
        formdatastatisticschat : function(formId) {
        	var view = this;
        	require.async(this.datareportpageUrl,function(ex){
        		var page = new ex({
        			'pageKey':'formdatastatisticschat',
        			"formId" : formId
        		});
        		view.render(page);
        	});
        },
		formdatastatdetail : function(formId, keywords) {
			var view = this;
			require.async(this.datareportpageUrl,function(ex){
				var page = new ex({
					'pageKey':'formstatdatadetail',
					"formId" : formId,
					"keywords" : keywords
				});
				view.render(page);
			});
		},
        imsysmsg : function(sgroup) {
            var view = this;
            require.async(this.mcpageUrl,function(ex){
                var page = new ex({
                    'pageKey':'imsysmsg',
                    'el':'#homeContent',
                    'sgroup':sgroup
                });
                view.render(page);
            });
        },
		formdatastatdetail : function(formId, keywords) {
			var view = this;
			require.async(this.datareportpageUrl,function(ex){
				var page = new ex({
					'pageKey':'formstatdatadetail',
					"formId" : formId,
					"keywords" : keywords
				});
				view.render(page);
			});
		},
        writereport:function(formId){
        	var view = this;
        	require.async(this.datareportpageUrl,function(ex){
        		var page = new ex({
        			'pageKey':'datareportwrite',
        			"formId" : formId
        		});
        		view.render(page);
        	});
        },
        /*************************考勤模块*************************/
		renderTimecard:function(){
			var view = this;
			require.async(this.attendpageUrl,function(ex){
				var page = new ex({
					'pageKey':'attendhome'
				});
				view.render(page);
			});
		},
		renderOtherTimecard:function(){
			var view = this;
			require.async(this.attendpageUrl,function(ex){
				var page = new ex({
					'pageKey':'othertimecard'
				});
				view.render(page);
			});
		},
		renderOrbitchartMap:function(userId,date){
			var view = this;
			require.async(this.attendpageUrl,function(ex){
				var page = new ex({
					'pageKey':'orbitchartmap',
					'userId':userId,
					'date':date
				});
				view.render(page);
			});
		},
		renderOrbitchartList:function(userId,date){
			var view = this;
			require.async(this.attendpageUrl,function(ex){
				var page = new ex({
					'pageKey':'orbitchartlist',
					'userId':userId,
					'date':date
				});
				view.render(page);
			});
		},
		renderTodayattend:function(){
			var view = this;
			require.async(this.attendpageUrl,function(ex){
				var page = new ex({
					'pageKey':'todayattend'
				});
				view.render(page);
			});
		},
		renderAttenddetail:function(type,date){
			var view = this;
			require.async(this.attendpageUrl,function(ex){
				var page = new ex({
					'pageKey':'attenddetail',
					'type':type,
					'date':date
				});
				view.render(page);
			});
		},
		renderOattend:function(type,lng,lat,addr){
			var view = this;
			require.async(this.attendpageUrl,function(ex){
				var page = new ex({
					'pageKey':'outattend-'+type,
					'type':type,
					'lng':lng,
					'lat':lat,
					'addr':addr
				});
				view.render(page);
			});
		},
		renderMaptrack:function(day){
			var view = this;
			require.async(this.attendpageUrl,function(ex){
				var page = new ex({
					'pageKey':'maptrack',
					'day':day
				});
				view.render(page);
			});
		},
		renderAttendAppeal:function(appealId,attendDay,attendPeriod,attendStatus,periodName,attendRecord){
			var view = this;
			require.async(this.attendpageUrl,function(ex){
				var page = new ex({
					'pageKey' : 'attendappeal',
					'appealId' : appealId,
					'attendDay' : attendDay,
					'attendPeriod' : attendPeriod,
					'periodName' : periodName,
					'attendStatus' : attendStatus,
					'attendRecord' : attendRecord
				});
				view.render(page);
			});
		},
		renderCheckMap:function(type,lng,lat,addr,customer,contact){
			var view = this;
			require.async(this.attendpageUrl,function(ex){
				var page = new ex({
					'pageKey':'checkmap-'+type,
					'type':type,
					'lng':lng,
					'lat':lat,
					'addr':addr,
					'customer':customer,
					'contact':contact
				});
				view.render(page);
			});
		},
		renderCommentMap:function(lng,lat,addr){
			var view = this;
			require.async('teamsjs/component/commentmap'+seajsClip,function(ex){
				var page = new ex({
					'lng':lng,
					'lat':lat,
					'addr':addr
				});
				view.render(page);
			});
		},
		renderOattendCheckMap:function(type,lng,lat,addr,oattendEl){// 外勤选择位置
			if($('#attendcrmContainer').length){
				var view = this;
				require.async(this.attendpageUrl,function(ex){
					var page = new ex({
						'pageKey':'outattendcheckmap-'+type,
						'type':type,
						'lng':lng,
						'lat':lat,
						'addr':addr,
						'oattendEl':oattendEl
					});
					view.render(page,true);
				});
			} else {
				ROUTER.navigate('/mobile/timecard/oattend/'+type+'/'+lng+'/'+lat+'/'+addr, {trigger: true});
			}
		},
		renderOattendTaskList:function(type,lng,lat,addr,oattendEl){
			if($('#attendcrmContainer').length){
				var view = this;
				require.async(this.attendpageUrl,function(ex){
					var page = new ex({
						'pageKey':'oattendtasklist',
						'oattendEl':oattendEl,
						'type':type,
						'lng':lng,
						'lat':lat,
						'addr':addr
					});
					view.render(page,true);
				});
			} else {
				ROUTER.navigate('/mobile/timecard/oattend/'+type+'/'+lng+'/'+lat+'/'+addr, {trigger: true});
			}
		},
		renderOattendTaskSearch:function(type,lng,lat,addr,oattendEl){
			if($('#attendcrmContainer').length){
				var view = this;
				require.async(this.attendpageUrl,function(ex){
					var page = new ex({
						'pageKey':'oattendtasksearch',
						'oattendEl':oattendEl,
						'type':type,
						'lng':lng,
						'lat':lat,
						'addr':addr
					});
					view.render(page,true);
				});
			} else {
				ROUTER.navigate('/mobile/timecard/oattend/'+type+'/'+lng+'/'+lat+'/'+addr, {trigger: true});
			}
		},
		renderOattendMainlineList:function(type,lng,lat,addr,oattendEl){
			if($('#attendcrmContainer').length){
				var view = this;
				require.async(this.attendpageUrl,function(ex){
					var page = new ex({
						'pageKey':'oattendmainlinelist',
						'oattendEl':oattendEl,
						'type':type,
						'lng':lng,
						'lat':lat,
						'addr':addr
					});
					view.render(page,true);
				});
			} else {
				ROUTER.navigate('/mobile/timecard/oattend/'+type+'/'+lng+'/'+lat+'/'+addr, {trigger: true});
			}
		},
		renderOattendMainlineSearch:function(type,lng,lat,addr,oattendEl){
			if($('#attendcrmContainer').length){
				var view = this;
				require.async(this.attendpageUrl,function(ex){
					var page = new ex({
						'pageKey':'oattendmainlinesearch',
						'oattendEl':oattendEl,
						'type':type,
						'lng':lng,
						'lat':lat,
						'addr':addr
					});
					view.render(page,true);
				});
			} else {
				ROUTER.navigate('/mobile/timecard/oattend/'+type+'/'+lng+'/'+lat+'/'+addr, {trigger: true});
			}
		},
		renderOattendWorkFlowList:function(type,lng,lat,addr,oattendEl){
			if($('#attendcrmContainer').length){
				var view = this;
				require.async(this.attendpageUrl,function(ex){
					var page = new ex({
						'pageKey':'oattendworkflowlist',
						'oattendEl':oattendEl,
						'type':type,
						'lng':lng,
						'lat':lat,
						'addr':addr
					});
					view.render(page,true);
				});
			} else {
				ROUTER.navigate('/mobile/timecard/oattend/'+type+'/'+lng+'/'+lat+'/'+addr, {trigger: true});
			}
		},
		renderOattendWorkFlowSearch:function(type,lng,lat,addr,oattendEl){
			if($('#attendcrmContainer').length){
				var view = this;
				require.async(this.attendpageUrl,function(ex){
					var page = new ex({
						'pageKey':'oattendworkflowsearch',
						'oattendEl':oattendEl,
						'type':type,
						'lng':lng,
						'lat':lat,
						'addr':addr
					});
					view.render(page,true);
				});
			} else {
				ROUTER.navigate('/mobile/timecard/oattend/'+type+'/'+lng+'/'+lat+'/'+addr, {trigger: true});
			}
		},
		renderTodayOattendMap:function(type,lng,lat,addr,entityType,targetId,customer,contact){
			var view = this;
			require.async(this.attendpageUrl,function(ex){
				var page = new ex({
					'pageKey':'checkmap-'+type,
					'type':type,
					'lng':lng,
					'lat':lat,
					'addr':addr,
					'entityType':entityType,
					'targetId':targetId,
					'customer':customer,
					'contact':contact
				});
				view.render(page);
			});
		},
		renderOattendCalendar:function(type,lng,lat,addr,oattendEl){
			if($('#attendcrmContainer').length){
				var view = this;
				require.async(this.attendpageUrl,function(ex){
					var page = new ex({
						'pageKey':'oattendcalendar',
						'oattendEl':oattendEl,
						'type':type,
						'lng':lng,
						'lat':lat,
						'addr':addr
					});
					view.render(page,true);
				});
			} else {
				ROUTER.navigate('/mobile/timecard/oattend/'+type+'/'+lng+'/'+lat+'/'+addr, {trigger: true});
			}
		},
		renderAbnormal:function(){
			var view = this;
			require.async(this.attendpageUrl,function(ex){
				var page = new ex({
					'pageKey':'attend-abnormal'
				});
				view.render(page);
			});
		},
		renderAttendInfo:function(date){
			var view = this;
			require.async(this.attendpageUrl,function(ex){
				var page = new ex({
					'pageKey':'attend-attendinfo',
					'date':date
				});
				view.render(page);
			});
		},
		/*************************未分类页面*************************/
		renderInvite:function(){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'inviteview',
					'isurl':true
				});
				view.render(page);
			});
		},
		renderInvitsmartheer:function(type){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'invitsmartheer',
					'type':type
				});
				view.render(page);
			});
		},
		renderInvitsmartheerRecords:function(type){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'invitsmartheerrecords',
					'type':type
				});
				view.render(page);
			});
		},
		renderTeams:function(){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'myteams'
				});
				view.render(page);
			});
		},
		renderEmployeeInfo:function(userId){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'usercard',
					'userId':userId
				});
				view.render(page);
			});
		},
		renderEmployeeEdit:function(userId){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'employeeedit',
					'userId':userId
				});
				view.render(page);
			});
		},
		renderUserCenter:function(){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'employeecenter'
				});
				view.render(page);
			});
		},
		renderUserList:function(departId){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'userlistpage',
					'departmentId':departId
				});
				view.render(page);
			});
		},
		renderPositionUserList:function(posnId){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'persitionuserlist',
					'positionId':posnId
				});
				view.render(page);
			});
		},
		renderUserListType:function(module){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'userlisttype',
					'module':module
				});
				view.render(page);
			});
		},
		renderContactSearch:function(keywords){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'contactsearch',
					'keywords':keywords
				});
				view.render(page);
			});
		},
		renderMessageBox:function(){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'messagescenter'
				});
				view.render(page);
			});
		},
		renderFeedSearch:function(type){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'feedsearch',
					'type':type
				});
				view.render(page);
			});
		},
		renderMessageRemind:function(type){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'messageremind',
					'type':type
				});
				view.render(page);
			});
		},
        renderApplyMessageRemind:function(type, userId){
            var view = this;
            require.async(this.simplepageUrl,function(ex){
                var page = new ex({
                    'pageKey':'messageremind',
                    'userId':userId,
                    'type':type
                });
                view.render(page);
            });
        },
		//部门设置
		renderDepartment:function(){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'departmentselector',
					'hasUrl':true
				});
				view.render(page);
			});
		},
		//岗位设置
		renderPosition:function(){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'positionselector',
					'hasUrl':true
				});
				view.render(page);
			});
		},
		//我关注的
		renderUserFollowList:function(userId){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'userfollowlist',
					'userId':userId
				});
				view.render(page);
			});
		},
		//关注我的
		renderUserFollowMe:function(userId){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'userfollowme',
					'userId':userId
				});
				view.render(page);
			});
		},
		//下属
		renderUserSubList:function(userId){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'usersublist',
					'userId':userId
				});
				view.render(page);
			});
		},
		//间接下属
		renderUserInSubList:function(userId){
			var view = this;
			require.async(this.simplepageUrl,function(ex){
				var page = new ex({
					'pageKey':'userinsublist',
					'userId':userId
				});
				view.render(page);
			});
		},
		//自定义应用
		renderFreeApplication:function (userId,type,sysMenuId,formModule,formId,id) {
			var view = this;
			if(!userId)	userId = TEAMS.currentUser.id;
			require.async(this.freepageUrl,function(ex){
				var page = new ex({
					'pageKey':'freepage'+type+formId,
					'type'   : type,
					'userId':userId,
					'formModule':formModule,
					'sysMenuId':sysMenuId,
					'formId':formId,
					'id':id
				});
				view.render(page);
			});
		},

		relformstatdata:function(type,formId,relId){
			var view = this;
//			if(type && type == 'statreport'){s
//				utils.notify('手机web暂不支持自定义统计');
//				return;
//			}
			require.async('teamsjs/formdatareport/formstatdatatableview'+seajsClip,function(FormStatDataTableView){
				var formstatdatatableview = new FormStatDataTableView({
					'id':formId,
					'type':type,
					'relId':relId,
					'fromRelevance':'relevance',
					'module':'form'
				});
				formstatdatatableview.requireRender();
			});
		},
		
		subscribe:function(module, dataId) {
			var view = this;
			require.async(this.subscribeUrl,function(ex){
				var page = new ex({
					'pageKey':module,
					'dataId' : dataId
				});
				view.render(page);
			});
		},
		
		//根据url判断超链接是否是查看系统中的详情
		getEntityItem : function(href){
			//含有etinfo的链接
			var hrefKeywood = '/etinfo/';
			var index = href.indexOf('/etinfo/');
			
			if(index > -1){
				//是http或https请求
				var beforeIndex;
				if(href.indexOf('http://') > -1){
					beforeIndex = 7;
				}else if(href.indexOf('https://') > -1){
					beforeIndex = 8;
				}else {
					return null;
				}
				
				var startIndex = href.indexOf('/',beforeIndex) + 1;  //module所在位置
				if(index > startIndex){
					//返回id和module数据
					var id = href.substring(index + hrefKeywood.length);
					var module = href.substring(startIndex,index);
					
					//识别手机web详情链接
					if(module.indexOf('mobile/') > -1) module = module.replace('mobile/','');
					
					var entityObj = {"id":id,"module":module};
					return entityObj;
				}
			}
			return null;
		},
		//需要放到window下的函数
		windowfunction:function(){
			if(!window.getdatastaturl){
				/**
				 * @author sunhaoming
				 * @date 2018年4月18日17:12:15
				 * 获取url 通过model区分审批的url
				 * 处理formdatastat打头的接口，处理审批拆分拆库时，审批统计、高级查询接口的调整
				 * param 参数对象，主要用到module
				 * webmethods请求web接口名称
				 * app   app前缀,PC端传空字符串或不传   app传 /app
				 */
				window.getdatastaturl = function(param, webmethods , app){
					console.log("module:"+param.module);
					if(!app) app = '';
					var href = window.location.href;
					var url = app + "/formdatastat"+webmethods;
					if(param.module != null && ((param.module == 'workflow' || param.module == 'workflowStat' || param.module == 'workflowMenu')
		    				|| (param.module == 'formField' && window.location.href.indexOf('workflows') > -1))){
		    			url = TEAMS.service.flow + app +"/flowdatastat" + webmethods;
		    		}else if((param.module == null || param.module == '')  && href.indexOf('workflows') > -1){
		    			//处理module为空且不在app.jsp页面的
						url = TEAMS.service.flow + app +"/flowdatastat" + webmethods;
		    		}else if((param.module == null || param.module == '')  && (href.indexOf('/freeform/edit') > -1 && href.indexOf('/workflow') > -1)){
						//表单编辑页面处理
		    			url = TEAMS.service.flow + app +"/flowdatastat" + webmethods;
		    		}
		    		return url;
				}
			}
		}
		
	});
	
	module.exports = App;

});
