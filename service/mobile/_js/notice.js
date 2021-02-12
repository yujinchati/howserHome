define(["jquery",'../../common/js/utility'], function($,util) {
	var gOffset = 0;
	var gLimit = 10;
	var Notice = {
	'init':function(e){
		$("#header").load("./header.html",function(){});
		$("#footer").load("./footer.html",function(){});
		/* GNB */
		$('.inner_header .link_menu').click(function(e){
			util.target.preventEvent(e);
			$('#howserWrap').toggleClass('menu_on');
		});
		$('.inner_header .link_close').bind("touchstart",function(e){
			util.target.preventEvent(e);
			$('#howserWrap').removeClass('menu_on');
		});
		var data = {'limit':gLimit,'offset':gOffset,'subscribers':'HOMEPAGE'};
		/* TOP 으로 가기 */
		$(window).on('scroll',function(){
			var scrollTop = $(this).scrollTop();
			if(scrollTop > 80){
				$('.link_top').stop().fadeIn();
			}else{
				$('.link_top').stop().fadeOut();
			}
		});
		$('.link_top').on('click',function(e){
			util.target.preventEvent(e);
			$('html,body').animate({scrollTop:0}, 300);
		});
		
		/* 공지사항,faq */
		$(document).on('click','.list_comm .link_notice',function(e){
			util.target.preventEvent(e);
			$(this).closest(".list_comm li").toggleClass("on");
		});
	}
}

return Notice;

});
	
