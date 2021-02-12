define(["jquery",'../../common/js/utility','jquery-touch','jquery-drag','slick'], function($,util,slick) {
var HEADER = 75;
var TAB = 87;
var tabFixed = false;
var slideIndex = 0;
var slideTime = 300;
var height;
var Init = true;
$("#header").load("./header.html",function(){});
$("#footer").load("./footer.html",function(){});
var Home = {
		'init':function(e){
			/* GNB */
			$('.inner_header .link_menu').click(function(e){
				util.target.preventEvent(e);
				if($('#howserWrap').hasClass('menu_on')){
					$('#howserWrap').removeClass('menu_on');
					if(tabFixed){
						$('.area_tab').addClass('fixed_tab');
					}
					var scrollTop = $(window).scrollTop();
					if(scrollTop == 0){
						$("#header").attr("style","position:relative");
					}
				}else{
					$('#howserWrap').addClass('menu_on');
					$('.area_tab').removeClass('fixed_tab');
					var scrollTop = $(window).scrollTop();
					$("#header").attr("style","position:fixed");
				}
			});
			$('.inner_header .link_close').bind("touchstart",function(e){
				util.target.preventEvent(e);
				$('#howserWrap').removeClass('menu_on');
				if(tabFixed){
					$('.area_tab').addClass('fixed_tab');
				}
				var scrollTop = $(window).scrollTop();
				if(scrollTop == 0){
					$("#header").attr("style","position:relative");
				}
			});
			/* TOP 으로 가기 */
			$(window).on('scroll',function(){
				var scrollTop = $(this).scrollTop();
				if($(".wrap_banner").hasClass("hide") && scrollTop > 78){
					$("#header").attr("style","position:fixed");
					$("#mArticle").attr("style","padding-top:74px");
				}else if(scrollTop > 100){
					$("#header").attr("style","position:fixed");
					$("#mArticle").attr("style","padding-top:74px");
				}
				if(scrollTop < 100){
					$("#header").attr("style","position:relative");
					$("#mArticle").attr("style","padding-top:0");
				}
				if(scrollTop > 80){
					$('.link_top').stop().fadeIn();
				}else{
					$('.link_top').stop().fadeOut();
				}
			});
			$('.link_top').on('click',function(e){
				util.target.preventEvent(e);
				$('html,body').animate({scrollTop:0},400);
				return false;
			});
			$(window).on('scroll',function(){
				var scrollTop = $(window).scrollTop() + HEADER;
				var scrollBnr = 475;
				
				if(!$(".wrap_banner").hasClass("hide")){
					scrollBnr = 575;
				}
				if(scrollTop >= scrollBnr){
					$('.area_tab').addClass('fixed_tab');
					$('.area_intro').css('margin-bottom','88px');
					tabFixed = true;
				}else{
					$('.area_tab').removeClass('fixed_tab');
					$('.area_intro').css('margin-bottom','0');
					tabFixed = false;
				}
				
				var NOW = scrollTop + TAB;
				if(NOW >= $(".area_as").offset().top){
					$(".area_tab .tab_service li").removeClass("on");
					$(".area_tab .tab_service li").eq(4).addClass("on");
					$(".area_tab .inner_tab").attr('class','inner_tab on_as');
				}else if(NOW >= $(".area_shop").offset().top){
					$(".area_tab .tab_service li").removeClass("on");
					$(".area_tab .tab_service li").eq(3).addClass("on");
					$(".area_tab .inner_tab").attr('class','inner_tab on_shop');
				}else if(NOW >= $(".area_storage").offset().top){
					$(".area_tab .tab_service li").removeClass("on");
					$(".area_tab .tab_service li").eq(2).addClass("on");
					$(".area_tab .inner_tab").attr('class','inner_tab on_storage');
				}else if(NOW >= $(".area_forwarding").offset().top){
					$(".area_tab .tab_service li").removeClass("on");
					$(".area_tab .tab_service li").eq(1).addClass("on");
					$(".area_tab .inner_tab").attr('class','inner_tab on_forwarding');
				}else{
					$(".area_tab .tab_service li").removeClass("on");
					$(".area_tab .tab_service li").eq(0).addClass("on");
					$(".area_tab .inner_tab").attr('class','inner_tab on_delivery');
				}
			});
			$(document).on('click','.area_tab .tab_service .link_service',function(e){
				util.target.preventEvent(e);
				var target = util.target.get(e);
				var index = target.parent().index();
				
				switch (index) {
				case 0 :
					var offsetTop =  $('.area_delivery').offset().top - HEADER - TAB + 5;
					Request.animate(offsetTop);
					break;
				  case 1 : 
					  var offsetTop =  $('.area_forwarding').offset().top - HEADER - TAB + 5;
					  Request.animate(offsetTop);
					  break;
				  case 2  : 
					  var offsetTop =  $('.area_storage').offset().top - HEADER - TAB + 5;
					  Request.animate(offsetTop);
					  break;
				  case 3  : 
					  var offsetTop =  $('.area_shop').offset().top - HEADER - TAB + 5;
					  Request.animate(offsetTop);
					  break;
				  case 4  : 
					  var offsetTop =  $('.area_as').offset().top - HEADER - TAB + 5;
					  Request.animate(offsetTop);
					  break;
				  default   : 
					 
				  	  break;
				}
			})
			/* 배너 */
			$('.wrap_banner .link_bnrclose').click(function(e){
				util.target.preventEvent(e);
				var target = util.target.get(e);
				target.parent().addClass("hide");
				$("#header").attr("style","top:0px");
				$("html,body").removeClass("layer_open");
				
			});
			$('.area_storage .desc_link .link_storage').on('click',function(e){
				util.target.preventEvent(e);
				var target = util.target.get(e);
				Request.setViewer();
				$(".dimmed_layer,.layer_viewer").bind('touchmove', function(e){e.preventDefault()});
				$("html,body").addClass("layer_open");
				return false;
			});
			$('.layer_viewer .btn_close').on('click',function(e){
				util.target.preventEvent(e);
				$("html,body").removeClass("layer_open");
				$('.dimmed_layer, .layer_viewer').hide();
				return false;
			});
			$(window).load(function() {
				$("#touchSlider2").touchSlider({
					margin : 0,
					duration: 350,
					paging :true,
					autoplay: {
						enable: true,
						pauseHover: true,
						addHoverTarget: '',
						interval: 2500
					},
					speed : 200,
				});
			});
		},
		'companyInit':function(e){
			$(".slide_company").touchSlider({
				margin : 0,
				duration: 350,
				paging :false,
				autoplay: {
					enable: true,
					pauseHover: true,
					addHoverTarget: '',
					interval: 2500
				},
				speed : 200,
			});
			$(".list_media").slick({
				dots: true,
				variableWidth:true,
				prevArrow:false,
				nextArrow:false,
				centerMode: true,
				centerPadding: '0 0 0 10px',
				slidesToShow: 3,
			});
			$(window).scroll(function(e){
				scrollBnr = $(window).scrollTop();
				if(scrollBnr > 80){
					$('.link_top').stop().fadeIn();
				}else{
					$('.link_top').stop().fadeOut();
				}
				
				if(scrollBnr >= 50 && Init){
					for(var i=0;$('.list_count').length>i;i++){
						if($('.list_count').eq(i).find('dd span').text() == "0"){
							Request.count(i)
						}
					}
				}
			});
		}
}

var Request = {
	'animate':function(data){
		$('body,html').animate({scrollTop:data}, '200', 'swing', function() { 
		});
	},
	'setViewer':function(){
		$('.layer_viewer').find('.list_viewer li').show();
		$('.dimmed_layer, .layer_viewer').show();
		$("#touchSlider").touchSlider({
			resize : true,
			btn_prev : $("#touchSlider").next(".btn_prev"),
			btn_next : $("#touchSlider").next().next('.btn_next'),
		});
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
