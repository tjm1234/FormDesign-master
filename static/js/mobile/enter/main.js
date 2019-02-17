define(function(require) {
	window.utils = require('mobile/enter/utils');
	window.PAGE = require('mobile/enter/page'); // crm与web公用

	var Setting = require('mobile/enter/setting');
	var AppRouter = require('mobile/enter/router');
	window.SETTING = new Setting();
	window.ROUTER = new AppRouter();
	Backbone.history.start({
		pushState : true
	});
	// window.onpopstate = function(event) {
	// 	alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
	// };

	// 给页面中所有的a标签委托事件Ø
	$('body').on('tap', '.router', function(event) {
		event.preventDefault();
		var href = $(this).attr('href');
		if (!href || href == "#") {
			return;
		}
		var us = navigator.userAgent.toLowerCase();

		if((us.indexOf('macintosh')!=-1 && us.indexOf('wxwork')!=-1)||us.indexOf('windowswechat')!=-1){
			if(href.length>1&&href.substring(0,1)!='/'){	//处理存在部分url 第一个字符不是/问题。
				href="/"+href;
			}
			utils.wxMacLocationTo(href);
		}else{
			console.log('tt');
			ROUTER.navigate(href, {
				trigger : true
			});
		}
	});
	
	String.prototype.I18N = function() {
		var args = arguments;//获取函数传递参数数组,以便在replace回调函数内使用
		var regex = /\{(\d+)\}/g;//匹配并捕获所有 形如:{数字} 字串
		return this.replace(regex,function(m,i){//参数=匹配子串+第几次匹配+匹配字串位置+源字符串
			return args[i] || '';
		});
	};
	
	FastClick.attach(document.body);
});
