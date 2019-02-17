/*
 * AppGo使用的 图片查看插件
 */
(function($) {

var windowMargin = 8; //加多边距的宽高，使得图片看起来有边框效果
  
//图片查看器
$.fn.extend({
  	
	photoGallery: function(options) {

		var isFirefox = navigator.userAgent.indexOf("Firefox") > -1 ;
		var MOUSEWHEEL_EVENT = isFirefox ? "DOMMouseScroll" : "mousewheel";
		var defaults = {
      		//图片缩放倍率
 	 		ratio : 1.2, 
 	 		//右下角缩略图宽度
 	 		thumbnailsWidth : 180, 
			//右下角缩略图高度
 	 	 	thumbnailsHeight : 120, 
 	 	 	//HTML模版
 	 	 	template : {
	 	 	 	//操作工具
	 	 	 	OPERTATION : '<div class="oper">' +
								'<span class="prev"><i class="icon_tool-prev"></i></span>' +
								'<span class="loading"><img src="'+_formDesign+'/static/img/galleryIcon/loading.gif"></img></span>'+
								'<span class="next"><i class="icon_tool-next"></i></span>' +
							 '</div>' +
							 '<div class="tool">' +
							 	'<div class="toolct">' +
								 	/*'<span class="oper_fullscreen" title="查看全屏"><i class="icon_tool-fullscreen"></i></span>' +*/
									'<span class="oper_bigger" title="放大图片"><i class="icon_tool-bigger"></i></span>' +
									'<span class="oper_smaller" title="缩小图片"><i class="icon_tool-smaller"></i></span>' +
									'<span class="oper_download" title="下载"><i class="icon_tool-download"></i></span>' +
									'<span class="oper_rotate" title="向右旋转"><i class="icon_tool-rotate"></i></span>' +
				     				'<span class="oper_close" title="关闭"><i class="icon_tool-close"></i></span>' +
								'</div>' +
							 '</div>',
				//缩略图
				THUMBNAILS : "<div class='thumbnails'>" +
				  		  	 	'<span class="thumbClose" title="关闭缩略图"><i class="icon_close-small"></i></span>' +
				  		  		'<img ondragstart="return false;"/>' +
				  		  		'<div class="thumbDrag"><span></span></div>' +
				  		 	 "</div>",
				//大图
				IMAGE : '<img class="image" ondragstart="return false;"/>' 	 	 	
 	 	 	}
		};
      
		var o = $.extend(defaults, options),
        	$gallery = $(this);
      	$gallery.append(o.template.OPERTATION).append(o.template.THUMBNAILS); 

      	var $tool = $(this).find(".tool"),
			$fullscreen = $(this).find(".oper_fullscreen"),
			$bigger = $(this).find(".oper_bigger"),
			$smaller =  $(this).find(".oper_smaller"),
			$download =  $(this).find(".oper_download"),
			$rotate = $(this).find(".oper_rotate"),
			$close = $(this).find(".oper_close"),
			$prev = $(this).find(".prev"),
			$next = $(this).find(".next"),
			$oper = $(this).find(".oper"),
			$thumbnails = $(this).find(".thumbnails"),
			$loading = $(this).find(".loading"),
			$image,
			$thumbImg,
			imageWidth,
			imageHeight,
			imgRatio,
			dragX,
			dragY,
			cW,
			cH,
			w,h,isVertical,
			thumbX,
			thumbY;
		//上一张
		$prev.on('click',function(){
      		if(o.activeIndex > 0) o.activeIndex--;
      		init();
  			toggleImage();  			
      	}).on("mouseover",function(e){
      		if(o.activeIndex > 0)
  	   			$(this).addClass("active");
  	  	}).on("mouseout",function(e){
  			$(this).removeClass("active"); 
  	  	});
  	  
  	  	//下一张
      	$next.on('click',function(){
      		if(o.activeIndex < o.imgs.length -1) o.activeIndex++;
      		init();
      		toggleImage();
      	}).on("mouseover",function(e){
      		if(o.activeIndex < o.imgs.length -1)
  	   			$(this).addClass("active");
  	 	}).on("mouseout",function(e){
  	  		$(this).removeClass("active"); 
  	  	});
       
  	  	//缩略图
      	$thumbnails.css({
			height: o.thumbnailsHeight,
			width : o.thumbnailsWidth
	  	}).on("mouseenter",function(e){
  			thumbX = -1;
  	 	}).on("mousedown",function(e){
  	 		thumbX=e.pageX || e.clientX;
			thumbY=e.pageY || e.clientY;

			cW = document.body.clientWidth;
			cH = document.body.clientHeight;
  	  		e.stopPropagation(); 
  		}).on("mousemove",function(e){
  	  		if(thumbX > 0){
	   	  		var nextDragX=e.pageX || e.clientX;
				var nextDragY=e.pageY || e.clientY;
				var $td= $(this).find(".thumbDrag"),
			    	imageWidth = $image.width(),
					imageHeight = $image.height(),
					thumbImgWidth = $thumbImg.width(),
					thumbImgHeight = $thumbImg.height(),
					left =parseFloat($td.css("left")) +  (nextDragX - thumbX),
					top =parseFloat($td.css("top")) + (nextDragY - thumbY),
					w = $td.width(),
					h = $td.height(),
					it,
					il,
					maxL,
					maxT;
			
				if(isVertical){
					thumbImgWidth = [thumbImgHeight, thumbImgHeight = thumbImgWidth][0];
					imageWidth = [imageHeight, imageHeight = imageWidth][0];
				}
				it = (o.thumbnailsHeight - thumbImgHeight) / 2 ,
				il = (o.thumbnailsWidth - thumbImgWidth) / 2,
				maxL = o.thumbnailsWidth - w - il - 2, //减去2像素边框部分
				maxT = o.thumbnailsHeight - h - it - 2;
				
				if(left < il ) left = il;
				else if(left > maxL) left = maxL;
			
				if(top < it ) top = it;
				else if(top > maxT) top = maxT;
				
				$td.css({
					left : left,
					top : top
				})
				thumbX=nextDragX;
				thumbY=nextDragY; 	  

				if(imageWidth < cW) left = (cW - imageWidth) / 2;
				else left = -imageWidth * (left-il) / thumbImgWidth;
			 
				if(imageHeight < cH ) top = (cH - imageHeight) / 2;
				else top = -imageHeight * (top-it) / thumbImgHeight;
			
				$image.offset({
					left : left,
					top : top
				});
  	  		}
  	 	}).on("mouseup",function(e){
  	  		thumbX = -1;
  	 	});
				  	 
	 	$thumbnails.find(".thumbClose").on("click",function(){
	  		$thumbnails.hide();
	  	});
    	  
      	//显示工具栏
  	  	$gallery.on("mouseover",function(e){ 		
  	  		$tool.show();
  	  		if(o.activeIndex > 0)
  			$prev.addClass("active");
  	  		if(o.activeIndex < o.imgs.length -1)
  			$next.addClass("active");		
  	  	}).on("mouseenter",function(e){
			dragX = -1;
		}).on("mouseout",function(e){
			$tool.hide();
			$prev.removeClass("active");
			$next.removeClass("active");
		}).on("mousedown",function(e){
  	 		dragX=e.pageX || e.clientX;
			dragY=e.pageY || e.clientY;

			cW = document.body.clientWidth;
			cH = document.body.clientHeight;
  	  		e.stopPropagation(); 
  	  	}).on("mousemove",function(e){
  	  		if(dragX > 0){
	   	  		var nextDragX=e.pageX || e.clientX;
				var nextDragY=e.pageY || e.clientY ;
				var o = $image.offset(),
					left =o.left +  (nextDragX - dragX),
					top =o.top + (nextDragY - dragY),
					w = $image.width(),
					h = $image.height();
			
				if(isVertical){
					w = [h, h = w][0];
				}
				if(w > cW){
					if(left > 0){
						left = 0 ;
					}
					else if(left < cW - w){
						left = cW - w;
					}
				}else{
					left = o.left;
				}
				if(h > cH){
					if(top > 0){
						top = 0 ;
					}
					else if(top < cH - h){
						top = cH - h;
					} 
				} else{
					top = o.top;
				}	
			
				$image.offset({
					left : left,
					top : top
				});
				dragX=nextDragX;
				dragY=nextDragY; 	  
				setThumbnails(); //缩略图拖拽点
  	  		}
  	 	}).on("mouseup",function(e){
  	  		dragX = -1;
  	  	});
  	    	  
  	  	//全屏
		var isMax,preWidth, preHeight, preTop, preLeft;
  	 	$fullscreen.on("click", function(){
			var parentD = window.parent.document,
				J = $(parentD.getElementById("J_pg"));
			if(!isMax){
				isMax = true;
				preWidth = document.body.clientWidth;
				preHeight = document.body.clientHeight;
				preTop = J.css("top");
				preLeft = J.css("left");
				J.css({
					top: 0,
					left : 0,
					width : parentD.body.clientWidth,
					height : parentD.body.clientHeight
				});
			} else{
				isMax = false;
				J.css({
					top: preTop,
					left : preLeft,
					width : preWidth,
					height : preHeight
				});
			}
  	  	});
  	  
  	  	//放大图片
  	  	$bigger.on("click", function(){
  	  		biggerImage();
  	  	});
  	  
  	  	//缩小图片
  	 	$smaller.on("click", function(){
			smallerImage();
  	  	});
  	 	//下载图片
  	 	$download.on("click",function(){
  	 		downloadImg();
  	 	});
  	  	//旋转
  	  	$rotate.on("click", function(){
  	  	
  	  		var rotateClass = $image.attr("class").match(/(rotate)(\d*)/);

  	  		if(rotateClass){
  	  			var nextDeg = (rotateClass[2] * 1 + 90) % 360;
				$image.removeClass(rotateClass[0]).addClass("rotate" + nextDeg);
  	  			$thumbImg.removeClass(rotateClass[0]).addClass("rotate" + nextDeg);
  	  			resizeImage(nextDeg);
  	  			resizeThumbImg(nextDeg);
  	  			isVertical = nextDeg == 90 || nextDeg == 270;
  	  		} else{
  	  			$image.addClass("rotate90");
  	  			$thumbImg.addClass("rotate90");
  	  			resizeImage("90");
  	  			resizeThumbImg("90");
  	  			isVertical = true;
  	  		}
  	  	});
        //下载图片 
  	  	function downloadImg(){
  	  		var dowloadUrl = $image.attr("src").replace('?downloadType=picPre','');
  	  		if(dowloadUrl && dowloadUrl != '' && dowloadUrl.indexOf("download=true") == -1){//图片预览下载按钮增加下载头
  	  	  		if(dowloadUrl.indexOf("?") == -1){
  	  	  			dowloadUrl+="?";
  	  	  		}else{
  	  	  			dowloadUrl+="&";
  	  	  		}
  	  	  		dowloadUrl+="download=true";
  	  		}
  	  		window.open(dowloadUrl,"_blank"); 
  	  	};
  	  	

  	  	//下载
  	  	$close.on("click", function(){

  	 		$(".closeWin").click();
  	  	});
  	  
	  	$(window).on("resize",function(){
	  		setImagePosition();
	  	});
		
		if(document.attachEvent){
			document.attachEvent("on"+MOUSEWHEEL_EVENT, function(e){
				mouseWheelScroll(e);
			});
		} else if(document.addEventListener){
			document.addEventListener(MOUSEWHEEL_EVENT, function(e){
				mouseWheelScroll(e);
			}, false);
		}	
		
		function mouseWheelScroll(e){
			var _delta = parseInt(e.wheelDelta || -e.detail);
	    	//向上滚动
	  		if (_delta > 0) {
        		biggerImage();
        	}
        	//向下滚动
        	else {
            	smallerImage();
        	}
		}
		
	  	//键盘左右键
	  	document.onkeydown = function(e){

	  		e = e || window.event;
	  		if (e.keyCode) {
			   	if(e.keyCode == 37 ){ //left
			    	if(o.activeIndex > 0) o.activeIndex--;
			  		toggleImage();	
			   	}
		  	   	if(e.keyCode == 39 ){ //right
		        	if(o.activeIndex < o.imgs.length -1) o.activeIndex++;
	      			toggleImage();
			   	}
			}
	 	};
		
	  	function biggerImage(){
  			var w = $image.width(),
  	  	 		h = $image.height(),
  	  	 		nextW = w * o.ratio,
  	  	 		nextH = h * o.ratio;
		 	if(nextW - w < 1) nextW = Math.ceil(nextW);
  	  	 	var percent =  (nextW / imageWidth * 100).toFixed(0) ;
  	  	 	if(percent > 90 && percent < 110){
  	  	 		percent = 100;
  	  	 		nextW = imageWidth;
  	  	 		nextH = imageHeight;
  	  		}
  	  	 	else if(percent > 1600) {
  	  	 		percent = 1600;
  	  	 		nextW = imageWidth * 16;
  	  	 		nextH = imageHeight * 16; 
  	  	 	}

  	  	 	$image.width(nextW).height(nextH);
  	  	 	setImagePosition();
  	  	 	showPercentTip(percent);
  	  	 	showThumbnails(nextW, nextH);
	  	}
	  
	  	function smallerImage(){
	  		$loading.css("display","none");
	  		var w = $image.width(),
  	  	 		h = $image.height(),
  	  	 		nextW,
  	  	 		nextH;
  	  	 	var percent =  (w / o.ratio / imageWidth * 100).toFixed(0) ;
  	  	 	if(percent < 5) {
  	 			percent = 5;
  	  	 		nextW = imageWidth / 20;
  	  	 		nextH = imageHeight / 20;  	  	 		
  	  	 	}
  	  	 	else if(percent > 90 && percent < 110){
  	  	 		percent = 100;
   	  	 		nextW = imageWidth;
  	  	 		nextH = imageHeight;
  	  	 	} else{
  	  	 		nextW = w / o.ratio;
  	  	 		nextH = h / o.ratio; 
  	  	 	}
  	  	 
  	  	 	$image.width(nextW).height(nextH);
  	  	 	setImagePosition();
  	  	 	showPercentTip(percent);
  	  	 	showThumbnails(nextW, nextH);
	  	}
	  
	  	//显示缩略图
	  	function showThumbnails(width, height){
	  		if(isVertical) width = [height, height = width][0];
	  		if(width > document.body.clientWidth || height > document.body.clientHeight){
	  			$thumbnails.show();
	  			setThumbnails();
	  		} else{
	  			$thumbnails.hide();
	  		}	  
	  	}
	  
	  	//重置图片宽高
	  	function resizeImage(rotateDeg){
	  	
	  		var mH = document.body.clientHeight - windowMargin,
  	  			mW = document.body.clientWidth - windowMargin;
	  		if(rotateDeg == '90' || rotateDeg == '270'){
	  			mW = [mH, mH = mW][0];
	  		}

	  		var width, height;
	  		width = Math.min(imageWidth, mW);
	  		height = Math.min(imageHeight, mH);
		
	  		if(width / height > imgRatio){
	  			width = height * imgRatio;
	  		} else{
	  			height = width / imgRatio;
	  		}

	  		$image.css({
				width:width,
				height:height
  			});
  			setImagePosition();
	  	}
	  
	  	function resizeThumbImg(rotateDeg){
	  		var maxW = o.thumbnailsWidth, maxH = o.thumbnailsHeight;
	  		if(rotateDeg == '90' || rotateDeg == '270'){
	  			maxW = [maxH, maxH = maxW][0];
	  		}
	  		$thumbImg.css({
	  			maxWidth : maxW,
	  			maxHeight : maxH
	  		});
	  		$thumbnails.hide();
	  	}
	  
	  	//显示百分比提示
	  	function showPercentTip(percent){
	    	$gallery.find(".percentTip").remove();
	  		$("<div class='percentTip'><span>"+percent+"%</span></div>").appendTo($gallery).fadeOut(1500);
	  	}
	  
  	  	//设置图片位置
	  	function setImagePosition(){
	  		var w = $image.width(),
	  	    	h = $image.height(),
  	  			cW = document.body.clientWidth,
  	  			cH = document.body.clientHeight;

  	  		var left = (cW - w)/2,
				top = (cH - h)/2;

  			$image.css("left", left +"px").css("top", top+"px");
	  	}
	  
	  	//设置缩略图拖拽区域
	  	function setThumbnails(){
	  		var $img = $thumbnails.find("img"),
  				sW = $img.width(),
  				sH = $img.height(),
  				w = $image.width(),
  				h =  $image.height(),
  				imf = $image.offset(),
  				imfl = imf.left,
  				imft = imf.top,
  				cW = document.body.clientWidth,
				cH = document.body.clientHeight,
				tW,
				tH,
				tl,
				tt;
	
			if(isVertical){
				sW = [sH, sH = sW][0];
				w = [h, h = w][0];
			}

			tW = sW / (w / cW);
			if(w < cW) tW = sW;
			tH = sH / (h / cH);
			if(h < cH) tH = sH;
			tl = (o.thumbnailsWidth - sW)/2 + -imfl/w * sW ;
			if(w < cW) tl = (o.thumbnailsWidth - sW)/2;
			tt = (o.thumbnailsHeight - sH)/2 + -imft/h * sH ;
			if(h < cH) tt = (o.thumbnailsHeight - sH)/2;
			$thumbnails.find(".thumbDrag").css({
				width: tW,
				height: tH,
				left: tl,
				top: tt
			});
	  	}
	  
	  	function getWH(){
	  		
	  	}
	  	
	  	function init(){
  	    	toggleImage();
  	    	//$loading.css("display","inline-block");
  	    	$(o.imgs).each(function(i, img){
  	    		if(i == o.activeIndex && $(this)[0].imgHeight == 0 && $(this)[0].imgWidth == 0){
	  	    	$(o.template.IMAGE)
	  	    		.appendTo($gallery)
	  	    		.attr("src", img.url)
	  	    		.attr("index", i)
	  	    		.on("error",function(){
	  	    			var img = $(this)[0];
	  	    			img.src = _formDesign+"/static/img/galleryIcon/nopic.gif";
	  	    			$(img).attr("comp","error")
	  	    		})
	  	    		.on("load",function(){
			  	    		var img = $(this)[0],
			  	  			imgHeight = img.naturalHeight,
			  	  			imgWidth = img.naturalWidth,
			  	  			ratio  = imgWidth / imgHeight,
			  	  			wH = document.body.clientHeight,
			  	  			wW = document.body.clientWidth,
			  	  			winHeight,
			  	  			winWidth,
			  	  			maxHeight = document.body.clientHeight - windowMargin * 2,
			  	  			maxWidth = document.body.clientWidth- windowMargin,
			  	  			index = $(img).attr("index");
			  	    		$(img).attr("comp","true")
			  	    		if(o.imgs[index].imgWidth != 0 && o.imgs[index].imgHeight != 0 ){
			  	    			return;
			  	    		}
			  	  		
				  	  		winWidth = Math.max(wW, imgWidth);
				  	  		winHeight = Math.max(wH, imgHeight);
			
				  	  		if(winWidth > maxWidth) {
				  	  			winWidth = maxWidth;
				  	  			winHeight =Math.max(wH, Math.ceil(winWidth / ratio));
				  	  			if(imgWidth > winWidth) {
				  	  				imgWidth = winWidth;
				  	  				imgHeight = Math.ceil(imgWidth / ratio);
				  	  			}
				  	  		}
				  	  		
				  	  		if(winHeight > maxHeight) {
				  	  			winHeight = maxHeight;
				  	  			winWidth = Math.max(wW, Math.ceil(winHeight * ratio));
				  	  			if(imgHeight > winHeight) {
				  	  				imgHeight = winHeight;
				  	  				imgWidth = Math.ceil(imgHeight * ratio);
				  	  			}		 
				  	  		}
			  	    		
					  		var url = this.src,
							img = $(this)[0],
							nH = img.naturalHeight,				
							nW = img.naturalWidth;
							var ratio  = nW / nH,
								w = nW,
								h = nH;
								
							if(index == o.activeIndex){
								w = imgWidth;
								h = imgHeight;
							}
							else{
								if(nW > winWidth) {
									w = winWidth;
									nH = h = Math.ceil(w / ratio);
									if( h > winHeight){
										nH = h = winHeight;
										w = Math.ceil(h * ratio);
									}
								}	
								if(nH > winHeight) {
									h = winHeight;
									w = Math.ceil(h * ratio);
									if( w > winWidth){
										w = winWidth;
										h = Math.ceil(w / ratio);
									}
								}	
							}
							$(img).css({
								width : w,
						  	 	height : h,
						  	 	left : (cW - w)/2,
						  	 	top: (cH - h)/2
							});
					  		
							o.imgs[index].imgWidth=w;
							o.imgs[index].imgHeight=h;
							if($(img).attr("index") == o.activeIndex){
								imageWidth = w;
								imageHeight = h;
								imgRatio = w/h;
								//$image = $(".image[index='"+o.activeIndex+"']", $gallery).addClass("active");
						  		$image = $(".image[index='"+o.activeIndex+"']", $gallery).addClass("active").css({
									width : w,
									height : h
								}).removeClass("rotate0 rotate90 rotate180 rotate270");							
						  		setImagePosition();
						  		$loading.css("display","none");
							}
			  	})
			  	.on("dblclick", function(){
				  	//app.window.close();
				});
  	    		}
	  	    });
  	    	var curImg = $(".image[index='"+o.activeIndex+"']", $gallery);
  	    	if($(curImg) && $(curImg).imgWidth != 0 && $(curImg).imgWidth < document.body.clientWidth && $(curImg).imageHeight != 0 && $(curImg).imageHeight < document.body.clientHeight)
  	    		$image = $(".image[index='"+o.activeIndex+"']", $gallery).addClass("active");
	  	}
	  	
	  	function toggleImage(){
	  		cW = document.body.clientWidth;
			cH = document.body.clientHeight;
	    	imageWidth = o.imgs[o.activeIndex].imgWidth;

       		imageHeight = o.imgs[o.activeIndex].imgHeight;

       		imgRatio = imageWidth/imageHeight;
        	
			$(".image", $gallery).removeClass("active");
			$image = $(".image[index='"+o.activeIndex+"']", $gallery).addClass("active").css({
				width : imageWidth,
				height : imageHeight
			}).removeClass("rotate0 rotate90 rotate180 rotate270");
	  		$thumbImg = $thumbnails.find("img").attr("src", o.imgs[o.activeIndex].url);	
	  		$thumbnails.find("img").removeAttr("class").removeAttr("style");
	  		isVertical = false;
	  		$thumbnails.hide();
	  		$prev.removeClass("active");
	  		$next.removeClass("active");
	  		if($image.attr("comp") == "true"){
	  			$loading.css("display","none");	  			
	  		}else{
	  			$loading.css("display","inline-block");
	  		}
	  		setImagePosition();
	  	}
	  	
  	  	init();
		return this;
	}
});
  
$.extend({
	//打开图片查看器
	openPhotoGallery : function(obj){
		var $img = $(obj),
  			imgUrl = $img.attr("imghref");
		if(!imgUrl) return;
		//HTML5提供了一个新属性naturalWidth/naturalHeight可以直接获取图片的原始宽高
		var wH = document.body.clientHeight,
			wW = document.body.clientWidth,
			ratio = wW/wH,
			winHeight,
			winWidth,
			maxHeight = document.body.clientHeight - windowMargin * 2,
			maxWidth = document.body.clientWidth- windowMargin;
		
			winWidth = wW;
			winHeight = wH;
			if(winWidth > maxWidth) {
				winWidth = maxWidth;
				winHeight =Math.max(wH, Math.ceil(winWidth / ratio));
			}
			if(winHeight > maxHeight) {
				winHeight = maxHeight;
				winWidth = Math.max(wW, Math.ceil(winHeight * ratio));
			}
			


		var $gallerys = $(obj).parent().parent().parent(),
			activeIndex=0,
			imgs = [];
		$gallerys.find(".gallery-pic").each(function(i, elem){
			var url = $(this).attr("imghref");

			if(url == imgUrl){
				activeIndex = i;

			} 
		
			imgs.push({
				url: url, 
				imgHeight : 0,
				imgWidth : 0
			});
		});
		
		localStorage["photoGalleryImgs"] = JSON.stringify(imgs); //因为此字符串可能是base64字符，appgo无法传
		localStorage["photoGalleryActiveIndex"] = activeIndex; 
		
		$("#J_pg").remove();
		$("<iframe id='piciframe' style='z-index:99999'></iframe").appendTo("body")
			.attr("id", "J_pg")
			.attr("src", TEAMS.gallery)
			.css({
				position : "absolute",
				left : (document.body.clientWidth - winWidth) /2,
				top : (document.body.clientHeight - winHeight) /2,
				width : winWidth,
				height : winHeight,
				background: 'rgba(177, 178, 179, 0.6)',
				border: '1px solid #6D6D6D',
				'border-radius': '4px'
			});
		var parentD = window.parent.document,
		J = $(parentD.getElementById("J_pg"));
		J.css({
			top: 0,
			left : 0,
			width : '100%',
			height : '100%'
		});
		
	},
	//做初始化
	initGallery : function(){
		
        var activeIndex = localStorage["photoGalleryActiveIndex"],
        	imgs = JSON.parse(localStorage["photoGalleryImgs"]);
        
		localStorage.removeItem("photoGalleryActiveIndex");
		localStorage.removeItem("photoGalleryImgs");
       
		
		$(".gallery").photoGallery({
			imgs : imgs,
			activeIndex:activeIndex
		});
		
		$(".closeWin").click(function(){
			var _parent =  window.parent || window.top,
				_jg = _parent.document.getElementById("J_pg");
				
			$(_jg).remove();
		});
		
		$(".gallery").click(function(e){
			if($(e.target).hasClass("gallery") || $(e.target).hasClass("oper") || $(e.target).hasClass("thumbnails")){
				$(".closeWin").click();
			}
		});
		
		window.parent.window.onkeydown = function(event){
			var key = event.which;
			if(key == 27){
				$(".closeWin").click();
			}
		};
		
		window.parent.window.onresize=function()
		{
			if(window == null || window.parent == null)
				return;
			$(".box").css({"height":parseInt(window.parent.document.body.clientHeight- 2),"width":parseInt(window.parent.document.body.clientWidth- 2)});
		};
		
	}
});
  
})(jQuery);
