define(["jquery",'../../common/js/utility','https://developers.kakao.com/sdk/js/kakao.js'], function($,util,webapi) {
var varUA = navigator.userAgent.toLowerCase(); 
var center = {
	'init':function(e){
		$("#header").load("./header.html",function(){});
		$("#footer").load("./footer.html",function(){});
		Kakao.init('6a4a5dbdf04dbed2a42055de1f7c97ef');
		/* GNB */
		$(window).on('scroll',function(){
			var scrollTop = $(this).scrollTop();
			if(scrollTop > 80){
				$('.link_top').stop().fadeIn();
			}else{
				$('.link_top').stop().fadeOut();
			}
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
		$(document).on('click','.detail_center .link_nav',function(e){
			util.target.preventEvent(e);
			var target = util.target.get(e);
			var targetNav = target.attr("class").split(" ");
			if(target.parents(".detail_center").hasClass("center_type1")){
				var param = {};
				param.name = '하우저 용인센터';
				param.geoLatitude = 37.192777;
				param.geoLongitude = 127.316769;
				
				if(targetNav[1] == "link_tmap"){
					location.href = 'https://apis.openapi.sk.com/tmap/app/routes?appKey=3e316051-ee4c-4b07-8b0f-debec31396b6&name='+param.name+'&lon='+param.geoLongitude+'&lat='+param.geoLatitude;
				}else if(targetNav[1] == "link_kakao"){
					fn.kakaoNav(param);
				}else{
					fn.naverNav(param);
				}
			}else{
				var param = {};
				param.name = '하우저 양지센터';
				param.geoLatitude = 37.2297795;
				param.geoLongitude = 127.293911;
				
				if(targetNav[1] == "link_tmap"){
					location.href = 'https://apis.openapi.sk.com/tmap/app/routes?appKey=3e316051-ee4c-4b07-8b0f-debec31396b6&name='+param.name+'&lon='+param.geoLongitude+'&lat='+param.geoLatitude;
				}else if(targetNav[1] == "link_kakao"){
					fn.kakaoNav(param);
				}else{
					fn.naverNav(param);
				}
			}
		});
		$(document).on('click','.btn_copylink',function(e){
			  var txtArea = document.createElement("textarea");
			  document.body.appendChild(txtArea);
			  txtArea.value = window.document.location.href;
			  txtArea.select();
			  document.execCommand('copy');
			  document.body.removeChild(txtArea);
			alert("URL이 복사되었습니다."); 
		});
		$(document).on('click','.info_address dd',function(e){
			util.target.preventEvent(e);
			var target = util.target.get(e);
			var txtArea = document.createElement("textarea");
			document.body.appendChild(txtArea);
			txtArea.value = target.text();
			txtArea.select();
			document.execCommand('copy');
			document.body.removeChild(txtArea);
			alert("주소가 복사되었습니다."); 
		});
	}
}

var fn = {
	'kakaoNav':function(param){
		Kakao.Navi.start({
			name: param.name,
			x: param.geoLongitude,
			y: param.geoLatitude,
			coordType: 'wgs84'
		});
	},
	'naverNav':function(param){
    	if (varUA.match('android') != null) { 
    		location.href = 'intent://place?lat='+param.geoLatitude+'&lng='+param.geoLongitude+'&name='+param.name+'&appname=com.example.myapp#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;end'
    	} else if (varUA.indexOf("iphone")>-1||varUA.indexOf("ipad")>-1||varUA.indexOf("ipod")>-1) { 
    		function openNaverMapApp(url) {
    		    var clickedAt = +new Date();
    		    location.href = url;
    		    setTimeout(function() {
    		        if (+new Date() - clickedAt < 2000) {
    		            location.href = 'http://itunes.apple.com/app/id311867728?mt=8';
    		        }
    		    }, 1500);
    		}
    		openNaverMapApp('nmap://navigation?dlat='+ param.geoLatitude +'&dlng='+param.geoLongitude+'&dname='+param.name+'&appname=com.example.myapp');
    	}
	}
}


return center;

});
	
