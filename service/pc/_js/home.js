define(["jquery",'../../common/js/utility','jquery-touch','jquery-drag','slick'], function($,util,slick) {
var HEADER = 120;
var TAB = 110;
var slideTime = 300;
var slideIndex = 0;
var Init = true;
$("#header").load("./header.html",function(){});
$("#footer").load("./footer.html",function(){});
var Home = {
		'init':function(e){
			Request.animate(0);
			
			/* 메인 - 배너 */
			//배너 이미지뷰어
			$(".area_storage .link_howser").click(function(e){
				util.target.preventEvent(e);
				var target = util.target.get(e);
				
				$(".list_viewer li").eq(0).attr('style','display:block;left:0');
				$('.layer_viewer .btn_prev').hide();
				$('.layer_viewer .btn_next, .dimmed_layer, .layer_viewer').show();
				
			});
			$(".layer_viewer .btn_prev").click(function(e){
				util.target.preventEvent(e);
				Request.imgViewer(true);
			});
			$(".layer_viewer .btn_next").click(function(e){
				util.target.preventEvent(e);
				Request.imgViewer(false);
			});
			$(".layer_viewer .btn_close").click(function(e){
				util.target.preventEvent(e);
				
				$(' .layer_viewer, .dimmed_layer, .layer_viewer .list_viewer li, .layer_viewer .btn_prev').hide();
				slideIndex = 0;
			});
			//배너 안보기
			$(".wrap_banner .btn_bnrclose").click(function(e){
				util.target.preventEvent(e);
				var target = util.target.get(e);
				
				target.parents(".wrap_banner").addClass("hide");
				$('#header').attr('style','top:0');
			});
			
			/* 메인 - 동영상 */
			$(".area_intro .link_video").click(function(e){
				util.target.preventEvent(e);
				
				var iframeVideo = util.dom.create('iframe',{'src':'https://www.youtube-nocookie.com/embed/e8_Pu56M9kw?rel=0&amp;showinfo=0&amp;vq=hd1080','title':'하우저 소개 영상','frameborder':'0','scrolling':'no','allowfullscreen':'true','class':'iframe_video'});
				$('.video_layer .inner_video .btn_close').before(iframeVideo);

				var msVersion = navigator.userAgent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/),
				msie = !!msVersion,
				ie10_and_below = msie && parseFloat(msVersion[1]) < 11;
				if(ie10_and_below){
					var src=$('.iframe_video').attr("src");
					var check = src.indexOf("youtube");
					if (check != -1) {
						var check2 = src.indexOf("?");
						var id = src.substr(0,check2).replace("https://www.youtube-nocookie.com/embed/","");
						$('.iframe_video').before('<object width="1000" height="562"><param name="movie" value="http://www.youtube.com/v/'+id+'?rel=0&amp;showinfo=0&amp;vq=hd1080'+'"><embed width="1000" height="562" src="http://www.youtube.com/v/'+id+'?rel=0&amp;showinfo=0&amp;vq=hd1080'+'" type="application/x-shockwave-flash" allowfullscreen="true"></embed></object>');
						$('.iframe_video').remove();
					}
				}
				
				$('.dimmed_layer').show();
				$('html,body').attr('style','overflow:hidden');
				$('.video_layer').show();
			});
			$(".video_layer .btn_close").click(function(e){
				util.target.preventEvent(e);
				
				$('.video_layer, .dimmed_layer').hide();
				$('.video_layer .inner_video .iframe_video').remove();
				$('.video_layer .inner_video object').remove();
				$('html,body').attr('style','');
			});
			
			$(window).scroll(function(){
				var scrollBnr = $(window).scrollTop();
				var scrollTab = 820;
				
				if(!$(".wrap_banner").hasClass("hide")){
					scrollTab = 940;
					if(scrollBnr <= 120){
						$("#header").css("top",120-scrollBnr);
					}else{
						$("#header").css("top","0");
					}
				}else{
					$("#header").css("top","0");
					scrollTab = 820;
				}
				var scrollTop = $(window).scrollTop() + HEADER;
				if(scrollTop >= scrollTab){
					$('.area_tab').addClass('fixed_tab');
					$('.area_intro').css('margin-bottom','175px');
						$('.area_floating').stop().fadeIn();
				}else{
					$('.area_tab').removeClass('fixed_tab');
					$('.area_intro').css('margin-bottom','0');
					$('.area_floating').hide();
				}
				
				$('.area_tab .tab_menu li').removeClass('on');
				if(scrollTop >=$('.area_contact').offset().top - 673){
					$('.area_floating').addClass('fixed_bottom');
				}else if(scrollTop >= scrollTab){
					$('.area_floating').removeClass('fixed_bottom');
				}
				if(scrollTop >=$('.area_as').offset().top - TAB - 70){
					$('.area_tab .tab_menu li').eq(4).addClass('on');
					$('.area_tab .inner_tab').attr('class','inner_tab on_as');
				}else if(scrollTop >=$('.area_shop').offset().top - TAB - 70){
					$('.area_tab .tab_menu li').eq(3).addClass('on');
					$('.area_tab .inner_tab').attr('class','inner_tab on_shop');
				}
				else if(scrollTop >=$('.area_storage').offset().top - TAB - 70){
					$('.area_tab .tab_menu li').eq(2).addClass('on');
					$('.area_tab .inner_tab').attr('class','inner_tab on_storage');
				}
				else if(scrollTop >=$('.area_forwarding').offset().top - TAB - 70){
					$('.area_tab .tab_menu li').eq(1).addClass('on');
					$('.area_tab .inner_tab').attr('class','inner_tab on_forwarding');
				}
				else if(scrollTop >=$('.area_intro').offset().top - TAB - 70){
					$('.area_tab .tab_menu li').eq(0).addClass('on');
					$('.area_tab .inner_tab').attr('class','inner_tab on_delivery');
				}
			});
			$(document).on('click','.area_tab .tab_menu .img_tab',function(e){
				util.target.preventEvent(e);
				var target = util.target.get(e);
				var index = target.parent().index();
				
				switch (index) {
				  case 0  : 
					  var offsetTop =  $('.area_delivery').offset().top - HEADER - TAB - 65;
					  Request.animate(offsetTop);
					  break;
				  case 1 : 
					  var offsetTop =  $('.area_forwarding').offset().top - HEADER - TAB  - 65;
					  Request.animate(offsetTop);
					  break;
				  case 2  : 
					  var offsetTop =  $('.area_storage').offset().top - HEADER - TAB  - 65;
					  Request.animate(offsetTop);
					  break;
				  case 3  : 
					  var offsetTop =  $('.area_shop').offset().top - HEADER - TAB  - 65;
					  Request.animate(offsetTop);
					  break;
				  case 4  : 
					  var offsetTop =  $('.area_as').offset().top - HEADER - TAB  - 65;
					  Request.animate(offsetTop);
					  break;
				  default   : 
					 
				  	  break;
				}
			});
		},
		'companyInit':function(e){
			$(".list_media").slick({
				dots: true,
				centerMode: true,
				centerPadding: '0 0 0 10px',
				slidesToShow: 3,
			});
			if(Init){
				for(var i=0;$('.list_count').length>i;i++){
					if($('.list_count').eq(i).find('dd span').text() == "0"){
						Request.count(i)
					}
				}
			}
		},
		'termInt':function(){
			
		}
		
}
var Request = {
	'animate':function(data){
		$('body,html').animate({scrollTop:data}, '200', 'swing', function() { 
			  
		});
	},
	'imgViewer':function(data){
		slideIndex2 = eval(slideIndex + (data ? '-' : '+') + 1) % 6;
		if(!data && slideIndex2 < 0){
			slideIndex2 = 6 - 1;
		}
		
		$(".list_viewer li:hidden").css("left", (data ? '-' : '+') + "994px");
		$(".list_viewer li").eq(slideIndex).animate({left:(data ? '+' : '-') + "=994px"}, slideTime, function(){
			$(this).css("display","none").css("left",(data ? '-' : '+') + "994px");
		});
		$(".list_viewer li").eq(slideIndex2).css("display","block").animate({left:(data ? '+' : '-') + "=994px"}, slideTime);
		slideIndex = slideIndex2;
		
		if(slideIndex == 0){
			$('.layer_viewer .btn_prev').hide();
		}else if(slideIndex == 5){
			$('.layer_viewer .btn_next').hide();
		}else{
			$('.layer_viewer .btn_prev, .layer_viewer .btn_next').show();
		}
	},
	'count':function(i){
		Init = false;
		var target = $('.list_count').eq(i).find('dd span');
		$('.list_count').eq(i).find('dd span').each(function(){
			target.prop('Counter',0).stop().animate({
		    	Counter: target.data('value')
		    },{
		        duration: 2000,
		        easing: 'swing',
		        step: function(now){
		        	target.text(Math.ceil(now));
		        },
		        complete:function(){
		        	var now = target.text();
		        	target.text(now.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
		        }
		    });
		});
	},
}
return Home;

});