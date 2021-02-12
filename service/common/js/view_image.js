define(["jquery",'common/utility'], function($,util) {
	var IE8_9 = false;
	if(window.navigator.userAgent.indexOf("MSIE 9") >= 0 || window.navigator.userAgent.indexOf("MSIE 8") >= 0){
		IE8_9 = true;
	}
	var operation = {
			'eventHandler':function(){
				$( window ).resize(function() {
					$viewer.xpoint = ($(window).width()) /2;
					$viewer.ypoint = ($(window).height()) /2;
					operation.transform();
        			
        		});
			if(!IE8_9){
				$( ".imgcontainer" ).mousedown(function( event ) {
					$(this).addClass('down');
       			 	$viewer.clientX = event.clientX;
       			 	$viewer.clientY = event.clientY;
       			 	$viewer.endEvent =true;
       			 
       			});
				$( ".imgcontainer" ).mouseup(function( event ) {
	       			$(this).removeClass('down');
	       			$(this).attr("style",$(this).attr('style') +";cursor: move;cursor: grab;cursor: -moz-grab;cursor: -webkit-grab;");
	      			$viewer.endEvent = false;
	      			});
	       		$( ".imgcontainer" ).mouseout(function( event ) {
	         			  
	       			//$(this).attr("style",$(this).attr('style') +";cursor: default;");
	         			$viewer.endEvent = false;
	         			});
	       		$( ".imgcontainer" ).mousemove(function( event ) {
         			if($viewer.endEvent){
         				var Height = 0;
         				var Width = 0;
         				if(($viewer.deg / 90) % 2){
         					//rotate
         					Height = $('#viewReg').width();
         					Width = $('#viewReg').height();
         					
         				}
         				else{
         					Height = $('#viewReg').height();
         					Width = $('#viewReg').width();
         				}
         				var difX = event.clientX - $viewer.clientX;
         				//clientX = clientX + difX;
         				var difY = event.clientY - $viewer.clientY;
         				if(difY > 0){
         					if($('#viewReg').position().top > 10){
         						//console.log($('#viewReg').offset().top);
         						difY = 0;
         					}
             					
         				}
         				else{
         					if(Height * $viewer.scale + $('#viewReg').position().top  < ($(window).height()-10)){
         						difY = 0;
         					}
         						
         				}
         				if(difX > 0){
         					if($('#viewReg').position().left > 10){
         						difX = 0;
         					}
         				}
         				else{
         					if(Width * $viewer.scale + $('#viewReg').position().left < ($(window).width()-10)){
         						difX = 0;
         					}
         				}
         				$viewer.clientX = event.clientX;
         				$viewer.clientY = event.clientY;
         			
         				$viewer.xpoint = $viewer.xpoint + difX;
         				$viewer.ypoint = $viewer.ypoint + difY;
         				//console.log($viewer.ypoint);
		        		operation.transform();
         				
         			} 
       			
         			});
       		
       		
   			$('#viewReg').bind('mousewheel',
						function(event) {
					var delta = 0
					if ( event.originalEvent.deltaY ) {
						delta = event.originalEvent.deltaY/120;
					}
					
					if ( event.originalEvent.wheelDelta ){ 
						delta = event.originalEvent.wheelDelta/-120;
					}
					//if ( event.detail) 
						//delta = -event.detail/3;
							
							if (delta < 0) {
								//previouspage();
								$viewer.scale = $viewer.scale + 0.1;
								if($viewer.scale > 4)
									$viewer.scale = 4;
								
							} else {
								//nextpage();
								$viewer.scale = $viewer.scale - 0.1;
								if($viewer.scale <= 0.1)
									$viewer.scale = 0.1;
							}
							$viewer.xpoint = ($(window).width()) /2;
							$viewer.ypoint = ($(window).height()) /2;
			        		operation.transform();
			        		var title = parseInt($viewer.scale * 100);
			        		title = title + "%";
			        		 util.toastMsg(title);

							return false;
						});
   				if (window.addEventListener)
				{
				document.getElementById('viewReg').addEventListener("DOMMouseScroll",function(event){
					
					if ( event.detail) 
						delta = -event.detail/3;
							
							if (delta > 0) {
								$viewer.scale = $viewer.scale + 0.1;
								if($viewer.scale > 4)
									$viewer.scale = 4;
							} else {
								$viewer.scale = $viewer.scale - 0.1;
								if($viewer.scale <= 0.1)
									$viewer.scale = 0.1;
							}
							$viewer.xpoint = ($(window).width()) /2;
							$viewer.ypoint = ($(window).height()) /2;
			        		operation.transform();
							return false;
						});	
				}
	       		
			}

       	
       		
				
			},
			'close':function(e){
				util.target.preventEvent(e);
				$('#viewerImg').remove();
				$('.dimmed_layer').removeClass('dimmed_layer2').hide();
				$('body').css('overflow','auto');
			}
	};	
	var viewer = function(option){
		this.xpoint = ($(window).width()) /2;
		this.ypoint = ($(window).height()) /2;
		this.scale = 1;
		this.clientX = 0;
		this.clientY = 0;
		this.endEvent = false;
		this.deg = 0;
		
	}
	viewer.prototype ={
			'create':function(src){
				this.xpoint = ($(window).width()) /2;
				this.ypoint = ($(window).height()) /2;
				this.scale = 1;
				this.clientX = 0;
				this.clientY = 0;
				this.endEvent = false;
				this.deg = 0;
				src = location.protocol +  "//" + location.host  + src;
				$('body').css('overflow','hidden');
				if($('.dimmed_layer.popup').length == 0){
					var dimlayer = util.dom.create('div',{'class':'dimmed_layer popup dimmed_layer2','style':'display:block;'});
					$('body').append(dimlayer);
				}
				else{
					$('.dimmed_layer').addClass('dimmed_layer2').show();	 
				}
				$('.thumb_loading2').show();
				var style = "width: 100%;min-height: 100%;position: fixed;z-index: 9999;overflow: hidden;top:0;";
				if(IE8_9)
					style = "width: 100%;min-height: 100%;position: fixed;z-index: 9999;overflow: auto;top:0;";
				var viewReg = util.dom.create('div',{'id':'viewerImg','style':style,'class':'layer_viewer'});
				var viewWrap = '';
				if(IE8_9){
					viewWrap = util.dom.create('div',{'class':'imgViewWrap','style':'position:absolute;left:50%;top:50%;display: none;'});
				}
				else{
					viewWrap = util.dom.create('div',{'class':'imgViewWrap','style':'width: 0;height: 0;display: none;'});
				}
				var imgStyle= "height: 600px;width: 600px";
				var imgContainer = util.dom.create('div',{'class':'imgcontainer','id':'viewReg','style':imgStyle});
				$(imgContainer).css(
					'transform', 'translate3d(-50%, -50%, 0px) scale(1, 1)'
				);
				
				var imgTag = util.dom.create('img',{'src':src,'alt':'첨부 이미지','style':'-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;-o-user-select: none;user-select: none;'});
				imgTag.attr('draggable','false');
				imgTag.on('dragstart', function(e) {
					   return false;
					});
				viewReg.append(viewWrap.append(imgContainer.append(imgTag)));
				$('body').append(viewReg);
				operation.eventHandler();
				$('#viewerImg').show();
				$viewer.addbtn();
				var img = new Image();
				img.onload = function() {
					//$(imgTag).attr('src', src);	
					$('.thumb_loading2').hide();
					$('.imgcontainer').css('width',this.width + 'px');
					$('.imgcontainer').css('height',this.height + 'px');
					if(IE8_9){
						if($(window).width() < this.width || $(window).height() < this.height){
							$(viewWrap).css('left',0);
							$(viewWrap).css('top',0);
							
						}
						else{
							$('.imgViewWrap').css({'margin-top':-(this.height / 2) + 'px','margin-left':-(this.width / 2) +'px'});
						}
						
						$viewer.scale = 1;
					}
					else{
						var widthRatio = this.width / $(window).width();
						var heightRatio = this.height / $(window).height();
						var ratio = widthRatio > heightRatio ? widthRatio : heightRatio;
						if(ratio > 1)
						$viewer.scale =  1 / ratio;
					}	
					
					operation.transform();
	        		$('.imgViewWrap').show();
				};
				$(img).attr('src', src);	
				
				/*imgTag.load(function(){
					$('.thumb_loading2').hide();
					$('.imgcontainer').css('width',this.naturalWidth + 'px');
					$('.imgcontainer').css('height',this.naturalHeight + 'px');
					operation.transform();
	        		$('.imgViewWrap').show();
				});*/
				
				
			},
			'addbtn':function(){
				var div = util.dom.create('div',{'class':'wrap_btnimg'});
				var btn4 = util.dom.create('button',{'type':'button','class':'img_global btn_close','text':'닫기','click':operation.close});
				$('#viewerImg').append(btn4); 
				$('#viewerImg').append(div);
			},
			'addCustomBtn':function(_type,cb){
				var cls = 'img_global ';
				if(_type == 'btn_prev'){
					var text = '이전이미지';
					cls = cls + _type;
					var btn = util.dom.create('button',{'type':'button','class':cls,'text':text,'click':cb});
					$('#viewerImg').append(btn);
				}
				else if(_type == 'btn_next'){
					var text = '다음이미지';
					cls = cls + _type;
					var btn = util.dom.create('button',{'type':'button','class':cls,'text':text,'click':cb});
					$('#viewerImg').append(btn);
				}
				
				return btn;
			},
			'changeSrc':function(src){
				$('.imgcontainer img').one("load",function(){
					$('.imgcontainer').css('width',this.width + 'px');
					$('.imgcontainer').css('height',this.height + 'px');
					if(IE8_9)
						$('.imgViewWrap').css({'margin-top':-(this.height / 2) + 'px','margin-left':-(this.width / 2) +'px'});
					var widthRatio = this.width / $(window).width();
					var heightRatio = this.height / $(window).height();
					var ratio = widthRatio > heightRatio ? widthRatio : heightRatio;
					if(ratio > 1)
					$viewer.scale =  1 / ratio;
					operation.transform();
				}).attr('src', src);
				
			},
			'init':function(){
				$viewer.xpoint = ($(window).width()) /2;
				$viewer.ypoint = ($(window).height()) /2;
				$viewer.clientX = 0;
   			 	$viewer.clientY = 0;
				$viewer.scale = 1;
				
			}
			
	}
	
	$viewer = new viewer;
	return $viewer;
});
	
