define(["jquery",'common/utility'], function($,util,webapi) {
var varUA = navigator.userAgent.toLowerCase(); 
var HEADER = 120;
var center = {
	'init':function(e){
		/* GNB */
		$('.inner_header .link_menu').click(function(e){
			util.target.preventEvent(e);
			$('#howserWrap').toggleClass('menu_on');
		});
		$('.inner_header .link_close').bind("touchstart",function(e){
			util.target.preventEvent(e);
			$('#howserWrap').removeClass('menu_on');
		});
		$('.inner_header .link_menu').click(function(e){
			util.target.preventEvent(e);
			$('#howserWrap').toggleClass('menu_on');
		});
		$('.inner_header .link_close').bind("touchstart",function(e){
			util.target.preventEvent(e);
			$('#howserWrap').removeClass('menu_on');
		});
		$('.link_top').on('click',function(e){
			util.target.preventEvent(e);
			$('html,body').animate({scrollTop:0}, 300);
		});
		var option = {};
		option.Id = "mapYongin"
		option.address = "하우저 용인센터";
		option.geoLatitude =37.1935242;
		option.geoLongitude = 127.314289;
		var createMap = util.naverMap.create(option,function(data){});
		$(document).on('click','.area_tab .tab_center .link_tab',function(e){
			util.target.preventEvent(e);
			var target = util.target.get(e);
			target.parents(".tab_center").find("li").removeClass("on");
			target.closest(".tab_center li").addClass("on");
			var index = target.parents(".tab_center").find("li.on").index();
			$(".detail_center").hide();
			$(".detail_center").eq(index).show();
			if(index == "1"){
				var option = {};
				option.Id = "mapYangji"
				option.address = "하우저 양지센터";
				option.geoLatitude = 37.23007719642677;
				option.geoLongitude = 127.29263198397035;
				var createMap1 = util.Map.create(option,function(data){});
			}
		});

	}
}

return center;

});
	
