/**
 * 系统帮助类函数
 */
define(function(require, exports, module) {
	
	var datepickerHelper = {
		defaults : {
			el : 'input.datepicker',
			callback : function(e) {},
			eventType:"focusin.datePicker"
		},
		init : function(options) {
			var optionsArray = [];
			if($.isArray(options)){
				optionsArray = options;
			}else{
				optionsArray.push(options);
			}
			for (var i=0; i<optionsArray.length; i++){
				var options = optionsArray[i];
				//只传了一个function参数时
				if($.isFunction(options)){
					var fn = options;
					options = {};
					options.callback = fn;
				}
				options = $.extend(true, this.defaults, options);
				(function(options){
					var $el = $(options.el);
					var format = $el.attr('format')||'yyyy-mm-dd';
					/*
					 * 0 or 'hour' for the hour view
					 * 1 or 'day' for the day view
					 * 2 or 'month' for month view (the default)
					 */
					var startView = $el.attr('startView')||'month';
					var minView = $el.attr('minView')||'month';
					var maxView = $el.attr('maxView')||'decade';
					var position = $el.attr('position')||'bottom-right';
					var dateGroup = $el.attr('dateGroup');
					var callback = options.callback;
					var writeValue = $el.attr('writeValue');
					$el.each(function(){
						var $this = $(this);
						$this.on('focusin.datePicker',function(){
							$this.datetimepicker({
								format:format,
						        language:  'zh-CN',
								todayHighlight:true,
								todayBtn:dateGroup,
								autoclose: true,
								initialDate:new Date(),
								startView:startView,
								minView:minView,
								maxView:maxView,
								pickerPosition:position,
						        showMeridian: false,
						        writeValue:writeValue
						    });
							$this.datetimepicker('show');
							$this.off('focusin.datePicker');
						}).on('changeDate', function(ev){
					    	callback(ev);
					    });
					});
				})(options);
			}
		},
		remove:function(els){
			if(!arguments)	return;
			
			for(var i=0;i<arguments.length;i++){
				var el = arguments[i];
				$(el).datetimepicker('remove');
			}
		}
	};
	
	var i18nConfig = {
		date : {
			'en_US' : {
				year: "",
				days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
				months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				monthNum : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
			},
			'zh_CN' : {
				year: "年",
				days : [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日" ],
				daysShort : [ "周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日" ],
				daysMin : [ "日", "一", "二", "三", "四", "五", "六", "日" ],
				months : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
				monthsShort : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
				monthNum : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
			},
			'zh_TW' : {
				year: "年",
				days : [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日" ],
				daysShort : [ "週日", "週一", "週二", "週三", "週四", "週五", "週六", "週日" ],
				daysMin : [ "日", "一", "二", "三", "四", "五", "六", "日" ],
				months : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
				monthsShort : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
				monthNum : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
			}
		}
	};
	
	
	/**
	 * 对外暴露的函数
	 */
	var Utils = {
		/**
		 * @param json(optional) 用于渲染模版的json数据,改参数可为空，为空时直接返回模版内容
		 */
//		template :function(key,json){
//			var tpl = templates[key];
//			if(json)	return _.template(tpl,json);
//			return tpl;
//		},
		template :function(tpl,json){
			if(json) return _.template(tpl,json);
			return tpl;
		},
        setWebTitle:function(title){
            document.title = title;
            if(window.inFetionClient) return;
            if( /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && !window.inMacClient) {
				var $body = $('body');
				var $iframe = $('<iframe src="https://www.baidu.com/favicon.ico"></iframe>').on('load', function () {
					setTimeout(function () {
						$iframe.off('load').remove();
					}, 0)
				}).appendTo($body);
			}
		},
		wxMacLocationTo:function(url){
        	if(sessionStorage.getItem('wxLoginInfo')){
        		var wxLoginInfo = sessionStorage.getItem('wxLoginInfo');
				//crm特殊处理
        		if(url.indexOf('?')!=-1){
        			//业务参数必须加在后面，不然windows客户端无法返回
        			var temp=url.split("?");
        			url=temp[0]+"?"+wxLoginInfo+"&"+temp[1];
				}else{
					url = url + '?' + wxLoginInfo;
				}
			}
        	window.location.href = url;
		},
        addIMentityInfo:function (container,data,stype,module) {
			if(window.smartheerClient){
                var html = '<div class="menu-item j_openIMentityEvent" data-flag="send"><i class="ico-imsend"></i><p>事项转发</p></div>'+
                    '<div class="menu-item j_openIMentityEvent" data-flag="create"><i class="ico-imcreate"></i><p>创建群聊</p></div>';
                container.append(html);
                var $obj = container.find('.j_openIMentityEvent');
                $obj.each(function(){
                    $(this).data('imParams',{
                        flag: $(this).attr('data-flag'),
                        entity: {
                            id: data.id,
                            module: module?module:data.module.toLowerCase(),
                            name: data.name,
                            stype:stype
                        }
                    });
                });
            }
            return container.find('.j_openIMentityEvent').length;
        },
		/**
		 * 日历控件
		 */
		datepicker:function(options){
			datepickerHelper.init(options);
		},
		removeDatepicker:function(els){
			datepickerHelper.remove(els);
		},
		/**
		 * alert弹出提示框
		 * @param message 	alert提示内容
		 * @param callback	回调函数
		 */
		alert:function(message,callback){
			//多语言处理
			var perLang = window.lang_v;
			if(perLang == '_en_US'){
				bootbox.setLocale("en");  
			}else if(perLang == '_zh_TW'){
				bootbox.setLocale("zh_TW");  
			}
			callback = callback||function(){};
			bootbox.alert(message, callback);
		},
		/**
		 * 确认框
		 * @param message 	消息内容
		 * @param callback	回调函数，回调函数的参数result为用户选择的结果（确定为true，取消为false）
		 */
		confirm:function(message,callback){
			//确认框多语言处理
			var perLang = window.lang_v;
			if(perLang == '_en_US'){
				bootbox.setLocale("en");  
			}else if(perLang == '_zh_TW'){
				bootbox.setLocale("zh_TW");  
			}
			bootbox.confirm(message, function(result){
				if(callback)	callback(result);
			});
		},
		/**
		 * 弹出输入框
		 * @param message 	消息内容
		 * @param callback	回调函数，回调函数的参数result为用户用户输入的内容
		 */
		prompt:function(message,callback){
			//多语言处理
			var perLang = window.lang_v;
			if(perLang == '_en_US'){
				bootbox.setLocale("en");  
			}else if(perLang == '_zh_TW'){
				bootbox.setLocale("zh_TW");  
			}
			bootbox.prompt(message, function(result){
				if(callback)	callback(result);
			});
		},
		/**
		 * 消息提示框
		 * @param message 	消息内容
		 * @param title 	消息标题(可选参数)
		 * @param type 		消息类型（可选参数,info，error，success三种，默认为notice）
		 * @param needHide 是否需要自动隐藏消息框  ，true:自动隐藏，false:不自动隐藏
		 * */
		notify:function(message,title,type,needHide){
			if(needHide==undefined) needHide=true;
		    var opts = {
	    		sticker: false,
	    		shadow: false,
	    		history: false,
	    		hide:needHide,
	    		opacity: .95 ,
	    		animation: {'effect_in':'slide','effect_out':'none'},
		        text: message,
		        title : title
		    };
		    switch (type) {
		    case 'error':
		        opts.type = "error";
		        break;
		    case 'info':
		        opts.type = "info";
		        break;
		    case 'success':
		        opts.type = "success";
		        break;
		    default:
		    	break;
		    }
		    $.pnotify_remove_all();
		    $.pnotify(opts);
		},
		/**
		 *序列化表单数据 
		 */
		serialize:function(formEl){
			$form = $(formEl);
			var serialize = "";
			$form.find("input[type!='radio'],textarea").each(function(){
				var name = $(this).attr("name");
				var value = $(this).val();
				if(name&&value){
					serialize += name+"="+value.replace(/\r\n|\n/g, "")+"&";
				}
			});
			$form.find("input[type='radio']").each(function(){
				var name = $(this).attr("name");
				var value = $(this).val();
				if(name&&value&&$(this).prop("checked")){
					serialize += name+"="+value+"&";
				}
			});
			serialize = serialize.substring(0, serialize.length-1);
			return serialize;
		},
		/**
		 *json键值对转换函数 将序列化数据转换为json
		 */
		toSimpleJSONString:function(serialize){
			var map = "";
			if(serialize){
				var array = serialize.split("&");
				for(var i=0,j=array.length; i<j; i++){
					var array1 = array[i].split("=");
					if(array1[1]){
						map += "\""+array1[0]+"\":\""+array1[1]+"\",";
					}
				}
				if(map){
					map = map.substring(0,map.length-1);
					map = "{"+map+"}";
				}
			}
			return map;
		},
		
		/**
		 * 匹配替换字符串中的url连接
		 * @param messages
		 * @param message
		 * @returns
		 */
		initUrl:function(messages, message){
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
					//message = message.replace(re ,'<a target="_blank" href="'+msg+'">'+msg+'</a>');
					//message = message.replace(msg ,'<a target="_blank" href="'+msg+'">'+msg+'</a>');
				}else{ 
					var temp = message.split(msg);
					var tempmsg = ''; 
					for(var i =0; i < temp.length -1; i++){
						tempmsg += (temp[i]+'<a target="_blank" href="'+msg+'">'+msg+'</a>');
					}
					message =  tempmsg+temp[temp.length -1];
					//message = message.replace(re,'<a target="_blank" href="http://'+msg+'">'+msg+'</a>');
					//message = message.replace(msg,'<a target="_blank" href="http://'+msg+'">'+msg+'</a>');
				}	
				seleted += messages[j]+"  ";
			}
			 
			return message;
		},
		/**
		 * 处理message标签信息等
		 * @param message
		 * @returns
		 */
		initMessage:function(message){
			var view = this;
			// message=message.replace(/</g,'&lt').replace(/>/g,'&gt').replace(/\r\n|\n/g, ' <br/>').replace(/ /g, '  ');
			//var parten1 = new RegExp('(((ht|f)tp(s?))\://)?(www.|([a-zA-Z]+[\.]{1}))[a-zA-Z0-9\-\.]+\.(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk|cn)(\.[a-zA-Z]+)?(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\;\?\'\\\+&amp;%\$#\=~_\-])+)*','g');
			// var parten1 = new RegExp('(((ht|f)tp(s?))\://)?(www.|([a-zA-Z]+[\.]{1}))[a-zA-Z0-9\-\.]*(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk|cn)(/($|[a-zA-Z0-9\:\.\,\;\?\'\\\+&amp;%\$#\=~_\-])+)*','g');
			// var mes1 = message.match(parten1);
			// message = view.initUrl(mes1, message);
			//var reg = /(http:\/\/|https:\/\/|ftp:\/\/|mms:\/\/)?((\w|=|\?|\.|\/|&|-|\||,|\*|:){1,})(\.+)(com|cn|im|xin|shop|ltd|club|top|wang|xyz|site|vip|net|cc|ren|biz|red|link|mobi|info|org|com.cn|net.cn|org\.cn|gov\.cn|name|ink|pro|tv|kim|group|我爱你|中国|公司|网络|网址|集团)((\w|=|\?|\.|\/|&|-|\||,|\*|:){0,})/g;
			//message = message.replace(reg, "<a href='$1$2$4$5$6'>$1$2$4$5$6</a>").replace(/\n/g, "<br />");
			message = message.replace(view.getUrlReg(), function($1$2$4$5$6){
				return view.handleOpenUrl($1$2$4$5$6);
			}).replace(/\n/g, "<br />");	
			return message;
		},
		initFormMessage:function (message) {
            message=message.replace(/</g,'&lt').replace(/>/g,'&gt').replace(/\r\n|\n/g, ' <br/>').replace(/ /g, '  ');
            var parten1 = new RegExp('(((ht|f)tp(s?))\://)?(www.|([a-zA-Z]+[\.]{1}))[a-zA-Z0-9\-\.]*(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk|cn)(/($|[a-zA-Z0-9\:\.\;\?\'\\\+&amp;%\$#\=~_\-])+)*','g');
            var mes1 = message.match(parten1);
            return message;
        },
		
		handleOpenUrl:function(url){
			if(url.indexOf('http') == 0 || url.indexOf('https') == 0 || url.indexOf('ftp') == 0){
				url = "<a href='"+url+"' target='_blank'>"+url+"</a>";
			}else{
			    url = "<a href='http://"+url+"' target='_blank'>"+url+"</a>";
			}
			return url;
		},
		
		
		getUrlReg:function(){
			var reg = /(((http:\/\/|https:\/\/|ftp:\/\/|mms:\/\/)?((\w|=|\?|\.|\/|&|-|\||,|\*|:){1,})(\.+)(com|cn|im|xin|shop|ltd|club|top|wang|xyz|site|vip|net|cc|ren|biz|red|link|mobi|info|org|com.cn|net.cn|org\.cn|gov\.cn|name|io|tt|coop|biz|aero|travel|pub|edu|CC|ink|pro|tv|kim|group|我爱你|中国|公司|网络|网址|集团)((\w|=|\?|\.|\/|&|-|\||,|\*|:|%){0,})))|(^(http:\/\/|https:\/\/|ftp:\/\/|mms:\/\/){1,}((\w|=|\?|\.|\/|&|-|\||,|\*|:){1,})(\.+)((\w|=|\?|\.|\/|&|-|\||,|\*|:|%){1,}))/g;
			return reg;
		},
		
		/**
		 *序列化表单数据,并转换为json字符串 
		 */
		toJSONString:function(formEl){
			$form = $(formEl);
			return this.toSimpleJSONString(this.serialize(formEl));
		},
		/**
		 * 返回List<Map<String,String>>集合
		 */
		getList:function(el){
			var list ="";
			var obj = this;
			$(el).each(function(){
				var map1 = obj.toJSONString(this);
				if(!map1){
					return;
				}
				list += map1+',';
			});
			if(list){
				list = list.substring(0, list.length-1);
			}
			return "["+list+"]";
		},
		/**
		 * 返回Map<String,String>集合
		 */
		getMap:function(el){
			var list ="";
			var obj = this;
			$(el).each(function(){
				var map1 = obj.toJSONString(this);
				if(!map1){
					return;
				}
				list += map1.substring(0,map1.length-1).substring(1)+',';
			});
			if(list){
				list = list.substring(0, list.length-1);
			}
			return "{"+list+"}";
		},
		//上一行
	     getPrev:function(el){
	    	  var index = 0;
	    	  var list = $(el);
	    	  list.each(function(i){
	    		  if($(this).hasClass('active')){
	    			  index = i;
	    			  return;
	    		  }
	    	  });
	    	  if(index == 0){//当前行在第一行
	    		  return null;
	    	  }else{
	    		  return $(list[index-1]);
	    	  }
	      },
	      //下一行
	      getNext:function(el){
	    	  var index = 0;
	    	  var list = $(el);
	    	  list.each(function(i){
	    		  if($(this).hasClass('active')){
	    			  index = i;
	    			  return;
	    		  }
	    	  });
	    	  if(index == list.length-1){//当前行在最后一行
	    		  return null;
	    	  }else{
	    		  return $(list[index+1]);
	    	  }
	      },
	      /**
	       * 高亮显示指定行
	       */
	      highLight:function(el,id){
	    	  $(el+' li.active').removeClass('active');
	          $(el+' #'+id).addClass('active');
	          $(el+' #' + id).find('.title').focus();
	      },
	      /**
	       * 重新生成序号
	       */
	      rebuildSN:function(container){
	          var children = $(container).children();
	          container.data('index',children.length);
	          for(var i=0;i<children.length;i++){
	        	  $(children[i]).find('.sn').html(i+1);
	          }
	      },
	      
	      /**
	       * 将文本中的回车，换行，空格转换成html
	       */
	      convert2Html: function(text){
	    	  if(!text) return text;
	          return text.replace(/\r\n|\n/g, '<br/>').replace(/[ ]/g, '&nbsp;');
	      },
	      conver2Txt:function(text){
	    	  if(!text) return text;
	    	  return text.replace(/&nbsp;/gi,' ').replace(/<br>/gi,"\n").replace(/<br>/gi,"\r\n");
	      },
	     /**
	      * 事项详情查询的url
	      */
	      renderInfoUrl:function(module,id){
				var view = this;
				var userId = TEAMS.currentUser.id;
				switch(module){
				case 'task':
					return '/mobile/task/'+id;
				case 'customer':
					return '/mobile/crms?module=key_customer&info=view_CustomerCover|id_'+id;
				case 'document':
					return '/mobile/documents/'+userId+'/'+id;
				case 'workflow':
					return '/mobile/workflows/'+userId+'/'+id;
				case 'mainline':
					return '/mobile/mainline/cover/'+id;
				case 'workreport':
					return '/mobile/workreport/info/'+id;
				case 'calendar':
					return '/mobile/calendar/'+userId+'/'+id;
				case 'formdatareport':
					return '/mobile/formdatadetail/formdatareport'+'/'+id;
				case 'saleChance':
					return '/mobile/crms/'+id+'?module=key_salechance&info=view_SaleChanceView|id_'+id;
				case 'production':
					return '/mobile/crms/'+id+'?module=key_production&info=view_ProductionView|id_'+id;
				case 'competitor':
					return '/mobile/crms/'+id+'?module=key_competitor&info=view_CompetitorView|id_'+id;
				case 'marketactivity':
					return '/mobile/crms/'+id+'?module=key_marketactivity&info=view_MarketactivityView|id_'+id;
				case 'contract':
					return '/mobile/crms/'+id+'?module=key_contract&info=view_ContractView|id_'+id;
				case 'clue':
					return '/mobile/crms/'+id+'?module=key_clue&info=view_ClueView|id_'+id;
				case 'contact':
					return '/mobile/crms?module=key_contact&info=view_ContactView|id_'+id;
				default:
					break
				}
			},
			/**
			 * 他人模块数据的查询
			 */
		rednerOtherModuleUrl:function(module, emp){
			var view = this;
			switch(module){
			case 'calendar':
				return '/mobile/calendar/'+emp.id;
			case 'task':
				return '/mobile/task/list/'+emp.id;
			case 'document':
				return '/mobile/documents/'+emp.id;
			case 'customer':
				return '/mobile/crms?module=key_customer&info=view_CustomerListView|userId_'+emp.id+'|sex_'+((emp.sex && emp.sex == 'female')?0:1);
			case 'saleChance':
				return '/mobile/crms?module=key_salechance&info=view_SaleChanceListView&menu=key_mineManager|userId_'+emp.id+'|sex_'+((emp.sex && emp.sex == 'female')?0:1);
			case 'production':
				return '/mobile/crms?module=key_production&info=view_ProductionListView&menu=key_mineManager|userId_'+emp.id+'|sex_'+((emp.sex && emp.sex == 'female')?0:1);
			case 'competitor':
				return '/mobile/crms?module=key_competitor&info=view_CompetitorListView&menu=key_mineManager|userId_'+emp.id+'|sex_'+((emp.sex && emp.sex == 'female')?0:1);
			case 'marketactivity':
				return '/mobile/crms?module=key_marketactivity&info=view_MarketactivityListView&menu=key_mineManager|userId_'+emp.id+'|sex_'+((emp.sex && emp.sex == 'female')?0:1);
			case 'contract':
				return '/mobile/crms?module=key_contract&info=view_ContractListView&menu=key_mineManager|userId_'+emp.id+'|sex_'+((emp.sex && emp.sex == 'female')?0:1);
			case 'workflow':
				return '/mobile/workflows/'+emp.id;
			case 'mainline':
				return '/mobile/mainlines/'+emp.id;
			case 'blog':
				return '/mobile/blog/'+emp.id;
			case 'workreport':
				return '/mobile/workreport/'+emp.id;
			default:
				break;
			}
		},
		/**
		 * 是否CRM模块
		 */
		isCrmModule:function(module){
			if (module == "customer" || module == "contact" || module == "saleChance" || module == "production"
					|| module == "competitor" || module == "marketactivity" || module == "clue" || module == "contract" || module == "orderform"
					|| module == "saleTarget" || module == "price") {
				return true;
			} else {
				return false;
			}
		},
		/**
		 * 手机web：输入框弹出输入法时 滚动条滚动到顶部
		 */
		fixedTop:function(){
			$("html,body").animate({scrollTop:0},200);
		},
	    getCurParaJson:function(){
	    	var param = {};
			var paramStr="";
			var url=decodeURI(window.location.href);
			if (url.indexOf("?") != -1) { 
				var str = url.split("?")[1];
				var strs = str.split("|"); 
				for(var i = 0; i < strs.length; i ++) { 
					param[strs[i].split("_")[0]]=unescape(strs[i].split("_")[1]); 
				} 
			}
			return param; 
		},
		
		/**
	     * 获取指定日期所在年份及周次
	     */
	    getWeekDate : function(date) {
			var tmpDate = date.clone().endOfISOWeek();
			return {
				'year'	: tmpDate.getFullYear(),
				'month'	: tmpDate.getMonth() + 1,
				'week'	: 1 + Math.floor(tmpDate.daysSince(tmpDate.clone().beginningOfYear()) / 7)
			};
		},
	    
	    /**
	     * 获取这一年有多少周
	     */
		getWeeksOfYear : function(year) {
			var yt = ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? 366 : 365;
			var yearEndDate = new Date(year, 11, 31);
			if(yearEndDate.getDay() < 7) yt = yt-yearEndDate.getDay();
			return Math.ceil(yt / 7);
		},
		
		/**
		 * 获取该天所在周次（ISO8601标准）
		 */
		getIsoWeekOfYear : function(dateStr){
			return Date.create(dateStr).getISOWeek();
		},
		
		/**
		 * 获取ISO8601标准中该天对应周所属的年份。
		 * 比如：
		 * date为2016-12-31时，为2016年52周，返回2016；
		 * date为2017-01-01时，为2016年52周，返回2016；
		 */
		getYearOfIsoWeek : function(dateStr){
			var date = Date.create(dateStr);
			var week = date.getISOWeek();
			var month = date.format('{MM}');
			var year = date.format('{yyyy}');
			if(month == 1 && week > 50){		//1月但周次为年终几周
				return year - 1;
			}else if(month == 12 && week < 3){		//12月但周次为年前几周
				return year + 1;
			}else{
				return year;
			}
		},
		
		/**
		 * 获取该周星期一 00:00:00（ISO8601标准）
		 */
		getBeginningOfIsoWeek : function(year, week){
			if(typeof(year) == 'number'){
				year = year + '';
			}
			if(typeof(week) == 'string'){
				week = Number(week);
			}
			var date = Date.create(year+'-01-04');		//1月4号在第一周
			date.addDays(7*(week-1));
			date = date.beginningOfISOWeek();
			return date;
		},
		
		/**
		 * 获取该周星期日 23:59:59（ISO8601标准）
		 */
		getEndOfIsoWeek : function(year, week){
			if(typeof(year) == 'number'){
				year = year + '';
			}
			if(typeof(week) == 'string'){
				week = Number(week);
			}
			var date = Date.create(year+'-01-04');
			date.addDays(7*(week-1))
			date = date.endOfISOWeek();
			return date;
		},
		
		//获取这一年有多少周
		// 取得某年(year)第几周(weeks)的星期几的日期（摘自filter.js，改为IOS8601标准，统一一处调用）
		getWeekDayDate : function(year, weeks, weekDay) {
			// 用指定的年构造一个日期对象，并将日期设置成这个年的1月4日
			// 因为计算机中的月份是从0开始的,所以有如下的构造方法
			var date = new Date(year, "0", "4");
			// 取得这个日期对象 date 的长整形时间 time
			var time = date.getTime();
			// 将这个长整形时间加上第N周的时间偏移
			// 因为第一周就是当前周,所以有:weeks-1,以此类推
			// 7*24*3600000 是一星期的时间毫秒数,(JS中的日期精确到毫秒)
			time += (weeks - 1) * 7 * 24 * 3600000;
			// 为日期对象 date 重新设置成时间 time
			date.setTime(time);
			return this.getNextDate(date, weekDay);
		},
		// 取得 日期(currentDate) 所在周的星期几(weekDay)的日期
		getNextDate : function(currentDate, weekDay) {
			// 0是星期日,1是星期一,...
			weekDay %= 7;
			var day = currentDate.getDay();
			var time = currentDate.getTime();
			var sub = weekDay - day;
			time += sub * 24 * 3600000;
			currentDate.setTime(time);
			return currentDate;
		},
		
		/**
		 * 移除已禁用的模块应用
		 */
		removeDisableModules:function(els){
			_.each(TEAMS.disableModules, function(module){
				$(els).filter('[acl-module-id="' + module.moduleId + '"]').remove();
			});
		},
		/**
		 * 判断当前登陆人员是否模块管理员
		 */
		isModuleAdmin:function(module){
			var flag = false;
			if(module && module=='biaoge'){
				module = 'form';
			}
			if(TEAMS.currentUser.admin || TEAMS.currentUser.moduleAdmin){
				if(module && $.inArray(module,TEAMS.currentUser.modules)!=-1){
					flag = true;
				}
			}
			return flag;
		},
		/**
		 * 检测模块是否被禁用
		 * true:被禁用,false:没有被禁用
		 */
		isDisableModule:function(module) {
			return _.some(TEAMS.disableModules, function(disModule){
				return (disModule.moduleId == module) || (disModule.module == module && disModule.moduleId < 100);
			});
		},
		/**
		 * 模块是否付费
		 */
		moduleIsPay:function(module){
			var isPay = false;
			_.each(TEAMS.payModules,function(payModule){
				if(payModule.module == module){
					isPay = true;
				}
			});
			return isPay;
		},
		/**
		 * 是否内部人员
		 */
		isInside:function(){
			var tks=new Array();
			tks.push("t7akvdnf84");
			tks.push("twy1tuabj9");
			tks.push("tyyb04cn06");
			tks.push("toc6mlwijr");
			tks.push("thtgj53iuz");
			tks.push("tvqn9exthz");
			if(tks.indexOf(TEAMS.currentTenant.tenantKey.toLowerCase())>-1){
				return true;
			}else{
				return false;
			}
		},
		getCommonServerUrl : function(url,module){
			if(this.isCrmModule(module)){
				url = TEAMS.service['crm'] + url;
			}else if(module == 'document'){
				url = TEAMS.service['docUrl'] + url;
			}else if(module == 'formdatereport'){
				url = TEAMS.service['formreport'] + url;
			}else if(module == 'workflow'){
				url = TEAMS.service['flow'] + url;
			}else if(module == 'hrcontract' || module == 'hruserinfo' || module == 'kpiFlow' || module == 'kpiSchemeSetting'){
				url = TEAMS.service['hr'] + url;
			}else if(module == 'app'){
				url = TEAMS.service['paas'] + url;
			}
			return url;
		},
		/**
		 * comp-是否有创建权限
		 */
		hasCreatePermission:function(server,module,appId,callback){
			if(!window.compCache){
				window.compCache=new Object();
			}
			var key="createPermission_"+module;
			if(appId){
				key+="_"+appId;
			}
			if(window.compCache[key]!=undefined){
				if(callback){
					callback(window.compCache[key]);
				}
			}else{
				var self=this;
				$.ajax({
					type : "post",
					url : server + "/comp/permission/create/hasCreatePermission",
					dataType : "json",
					data : {
						"module" : module,
						"appId" : appId
					},
					success : function(data) {
						if(data.actionMsg.code==0){
							window.compCache[key]=data.data;
							if(callback){
								callback(window.compCache[key]);
							}
						}else{
							self.notify(data.actionMsg.message);
						}
					},
					error : function(data) {
						self.notify(data);
					}
				});
			}
		},
		/**
		 * comp-获取字段权限配置
		 */
		getFieldPermissionConfig:function(server,module,appId,success,error){
			if(!window.compCache){
				window.compCache=new Object();
			}
			var key="fieldPermissionConfig_"+module;
			if(appId){
				key+="_"+appId;
			}
			if(window.compCache[key]){
				if(success){
					success(window.compCache[key]);
				}
			}else{
				var self=this;
				$.ajax({
					type : "post",
					url : server + "/comp/permission/field/getFieldPermissionConfig",
					dataType : "json",
					data : {
						"module" : module,
						"appId":appId
					},
					success : function(data) {
						if(data.actionMsg.code==0){
							window.compCache[key]=data.data;
							if(success){
								success(window.compCache[key]);
							}
						}else{
							if(error){
								error(data);
							}
						}
					},
					error : function(data) {
						if(error){
							error(data);
						}
					}
				});
			}
		},
		/**
		 * comp-获取无权限的字段
		 */
		getNoPermissionFields:function(server,module,appId,success,error){
			if(!window.compCache){
				window.compCache=new Object();
			}
			var key="noPermissionFields_"+module;
			if(appId){
				key+="_"+appId;
			}
			if(window.compCache[key]){
				if(success){
					success(window.compCache[key]);
				}
			}else{
				var self=this;
				$.ajax({
					type : "post",
					url : server + "/comp/permission/field/getNoPermissionFields",
					dataType : "json",
					data : {
						"module" : module,
						"appId":appId
					},
					success : function(data) {
						if(data.actionMsg.code==0){
							var fields=data.data;
							if(!fields){
								fields=new Array();
							}
							window.compCache[key]=fields;
							if(success){
								success(window.compCache[key]);
							}
						}else{
							if(error){
								error(data);
							}
						}
					},
					error : function(data) {
						if(error){
							error(data);
						}
					}
				});
			}
		},
		getPreviewMaxSize:function(){
			var default_max_size = (TEAMS.currentTenant && TEAMS.currentTenant.isPay || TEAMS.currentTenant.status=='outFreePayRoom') ? '50' : '20';
			var previewLimit;
			if(typeof(TEAMS.currentTenant.previewLimit)=="undefined"){
				max_file_size= 0;
			}else{
				max_file_size=TEAMS.currentTenant.previewLimit;
			}
			return max_file_size;
		},
		getI18nDate:function(num, type) {
			if(type == 'year') return i18nConfig.date[TEAMS.perLang][type] || '';
			return i18nConfig.date[TEAMS.perLang][type][num-1] || '';
		},
		getFsearchTenant:function(){
			if(typeof(fullsearchOpenAll) != "undefined" && fullsearchOpenAll()){
				console.log("true");
				return true;
			}else{
				this._loadAsyncFsearchJs();
				return false;
			}
		},
		/**
		 * 动态加载全文检索js。只加载一次。如果没有获取到就设置为false
		 */
		_loadAsyncFsearchJs:function(){
			try{
				if(typeof(fsearchJs) == "undefined"){
					if(TEAMS.runMode=="develop"){
						//引用本地单文件调试
						fsearchJs=TEAMS.service.fullsearch+"/static/js/mobile/fullsearch/mobilefullsearchview.js";
					}else{
						fsearchJs=TEAMS.service.fullsearch+"/static/js/fs"+window.lang_v+".js?v="+TEAMS.version+"&time="+(new Date().getTime());
					}
					require.async(fsearchJs,function(t){
						var fsOpen = TEAMS.service.fullsearch+"/static/js/fsearch/mobileFSUtils.js";
						require.async(fsOpen,function(t){});
					});
					
				}
			}catch(e){}
			
		},
		/**
		 * GCJ02（国测局坐标系）→bd09（百度坐标系）
		 */
		gcj02_to_bd09: function(lng, lat, callback) {
			var baseUrl = TEAMS.service.base.toLowerCase(),httpTip = baseUrl.indexOf('https://') != -1 ? 'https://' : 'http://';
			
	        $.ajax({
	        	url: httpTip+'api.map.baidu.com/geoconv/v1/?coords='+lng+','+lat+'&from=3&to=5&ak=5QlDX8l9izc0mHeDEsRQe1mIEGjs9nE9',
	    	    type: 'GET',
	    	    dataType: 'jsonp',
	    	    success:function(data) {
	    	    	callback(data);
	    	    }
    	    });
		},
		/**
		 * 和飞信定位
		 */
		fetionLocation: function(callback) {
			var fetionCount = 15;
			var fetionInterval = setInterval(function(){
				//mobileAlert('window.fetionReady ==> '+window.fetionReady);
				if(window.fetionReady) {
					clearInterval(fetionInterval);
					
					window.fetionLocationCallback = function(jsonStr) {
						//mobileAlert('fetionLocationCallback.jsonStr='+jsonStr);
						window.fetionLocationCallback = undefined;
						
						var data = JSON.parse(jsonStr);
						utils.gcj02_to_bd09(data.longitude, data.latitude, function(result) {
							//mobileAlert('gcj02_to_bd09.jsonStr='+JSON.stringify(result));
							callback({
								'status':result.status,
								'lng':result.result[0].x,
								'lat':result.result[0].y
							});
						});
					};
					
					var paramStr = JSON.stringify({'backId':'1234', 'backFunc':'fetionLocationCallback'});
					
					navigator.WebContainer
					? navigator.WebContainer.rcsNewGetCurrentLocation(paramStr)
							: window.WebContainer.rcsNewGetCurrentLocation(paramStr);
				} else if(fetionCount == 0) {
					window.clearInterval(fetionInterval);
					callback({'status':-1});
				} else {
					fetionCount--;
				}
			}, 100);
		}
	};

	module.exports = Utils;
});

