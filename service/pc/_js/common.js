$(document).ready(function(){ 
	var url = window.location.pathname;
	var split = url.split('/');
	var foldername = split[split.length-2];
	var filename = url.substring(url.lastIndexOf('/')+1,url.lastIndexOf('.'));
	var params = window.location.href.slice(window.location.href.indexOf('?') + 1);
	
	var HEADER = 120;
	var TAB = 110;
	var slideTime = 300;
	var slideIndex = 0;
	
	$("#container").addClass("cont_"+filename);	
	
	/* header load */
	$("#header").load("./header.html",function(){
		/* 메뉴 각 페이지별 활성화 */
		var partner = $(".link_gnb[href$='./partner.html']").closest(".gnb_comm li");
		
		if(filename == "partner"){
			$(".gnb_comm li").removeClass("on");
			$(partner).addClass("on");
		}
	});
	
	/* 메인 - 배너 */
	//배너 이미지뷰어
	$(".wrap_banner .link_bnr, .area_storage .link_howser").click(function(e){
		e.preventDefault();
		var target = $(this);
		
		$(".list_viewer li").eq(0).attr('style','display:block;left:0');
		$('.layer_viewer .btn_prev').hide();
		$('.layer_viewer .btn_next, .dimmed_layer, .layer_viewer').show();
		
	});
	$(".layer_viewer .btn_prev").click(function(e){
		e.preventDefault();
		Request.imgViewer(true);
	});
	$(".layer_viewer .btn_next").click(function(e){
		e.preventDefault();
		Request.imgViewer(false);
	});
	$(".layer_viewer .btn_close").click(function(e){
		e.preventDefault();
		
		$(' .layer_viewer, .dimmed_layer, .layer_viewer .list_viewer li, .layer_viewer .btn_prev').hide();
		slideIndex = 0;
	});
	//배너 안보기
	$(".wrap_banner .btn_bnrclose").click(function(e){
		e.preventDefault();
		var target = $(this);
		
		target.parent().addClass("hide");
		$('#header').attr('style','top:0');
	});
	
	/* 메인 - 동영상 */
	$(".area_intro .link_video").click(function(e){
		e.preventDefault();
		$('.dimmed_layer').show();
		$('html,body').attr('style','overflow:hidden');
		$('.video_layer').show();
		$('.iframe_video').attr('src','https://www.youtube-nocookie.com/embed/e8_Pu56M9kw?rel=0&amp;showinfo=0');
	});
	$(".video_layer .btn_close").click(function(e){
		e.preventDefault();
		$('.dimmed_layer').hide();
		$('.video_layer').hide();
		$('html,body').attr('style','');
		$('.iframe_video').attr('src','');
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
		if(scrollTop >=$('.area_contact').offset().top - 737){
			$('.area_floating').addClass('fixed_bottom');
		}else if(scrollTop >= scrollTab){
			$('.area_floating').removeClass('fixed_bottom');
		}
		if(scrollTop >=$('.area_shop').offset().top - TAB - 70){
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
		e.preventDefault();
		var target = $(this);
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
		  default   : 
			 
		  	  break;
		}
	});
	
	/* 메인 - tab */
	$(document).on('click','.tab_menu .img_tab',function(e){
		e.preventDefault();
		$(this).parents('.tab_menu').find('li').removeClass('on');
		$(this).parent('li').addClass('on');
	});
	
	/* input */
	$(".inp_g").focus(function(){
		$(this).prev($(".txt_placeholder")).attr('class','screen_out');
	});
	$(".inp_g").blur(function(){
		if($(this).val()==''){
			$(this).prev($(".txt_placeholder")).attr('class','txt_placeholder');
		}
	});
	$(".inp_g").focus(function(){
		$('.input_comm').removeClass("input_on");
		if(!$(this).parent(".input_comm").hasClass("input_on")){
			$(this).parent(".input_comm").addClass("input_on");
		}
	});
	$(".inp_g").blur(function(){
		$('.input_comm').removeClass("input_on");
	});
	/* 라디오박스 */
	$(".radio_comm input[type=radio]").click(function(){
		$(".inp_radio").attr("checked", false);
		$(".inp_radio").prop("checked", false);
		$(".radio_comm").removeClass("check_on");
		$(this).attr("checked", true);
		$(this).prop("checked", true);
		$(this).closest(".radio_comm").addClass("check_on");
	});
	/* 체크박스 */
	$(".check_comm input[type=checkbox]").change(function(){
		$(this).closest(".check_comm").toggleClass("check_on");
		if($(this).prop("checked")){
			$(this).attr("checked",true);
		} else {
			$(this).attr("checked",false);
		};
	});
	$(".tf_etc").focus(function(){
		$(this).addClass("on");
		$(this).prev($(".txt_placeholder")).attr('class','screen_out');
		$(".tf_etc").text("")
	});
	$(".tf_etc").blur(function(){
		$(this).removeClass("on");
		if($(this).val().length==0){
			$(this).prev($(".txt_placeholder")).attr('class','txt_placeholder');
		}else{
			$(this).prev($(".txt_placeholder")).attr('class','screen_out');
		}
	});
	$("#inpAgree").focus(function(){
		$(this).next().find(".ico_check").addClass("ico_focused");
	});
	$("#inpAgree").click(function(){
		$(this).next().find(".ico_check").removeClass("ico_focused");
	});
	$("#inpAgree").blur(function(){
		$(this).next().find(".ico_check").removeClass("ico_focused");
	});
	
	/* 서비스 체크박스 */
	$(".check_service input[type=checkbox]").change(function(){
		var target = $(this);
		
		if(target.is(":checked")){
			target.parent().addClass("service_on");
			target.prop("checked",true);
			target.attr("checked","checked");
		}else{
			target.parent().removeClass("service_on");
			target.prop("checked",false);
			target.removeAttr("checked");
		}
		
		if($('#userForwarding').is(":checked")){
			$('.section_forwarding').show();
		}else{
			$('.section_forwarding').hide();
		}
	});
	
	if(filename=="partner" && params=="end" || filename=="partner" && params=="end#none"){
		$('.desc_info+form').remove();
		$('.desc_info').remove();
		$('.area_complete').show();
	}
	if(filename=="partner" && params=="error" || filename=="partner" && params=="error#none"){
		$('.emph_guide').addClass('emph_r');
		$('.emph_error').show();
		$('#nameCompany').closest('.input_comm').addClass('input_on');
		$('.input_comm .inp_g').closest('.input_comm').addClass('input_wrong');
	}
	
	/* 공지사항, FAQ */
	$(document).on('click','.list_notice .detail_item .notice_name',function(e){
		e.preventDefault();
		$(this).closest(".list_notice li").toggleClass("on");

	});
	$(document).on('click','.list_notice .detail_item .notice_arrow',function(e){
		e.preventDefault();
		$(this).closest(".list_notice li").toggleClass("on");

	});
	
	/* footer load */
	$("#footer").load("./footer.html",function(){
		/* 메뉴 각 페이지별 활성화 */
		var company = $(".link_serviceinfo[href$='./company.html']").closest(".list_serviceinfo li");
		var notice = $(".link_serviceinfo[href$='./notice.html']").closest(".list_serviceinfo li");
		var faq = $(".link_serviceinfo[href$='./faq.html']").closest(".list_serviceinfo li");
		var terms = $(".link_serviceinfo[href$='./terms.html']").closest(".list_serviceinfo li");
		var privacy = $(".link_serviceinfo[href$='./privacy.html']").closest(".list_serviceinfo li");
		
		if(filename == "company"){
			$(".gnb_comm li").removeClass("on");
			$(company).addClass("on");
		}else if(filename == "notice"){
			$(".gnb_comm li").removeClass("on");
			$(notice).addClass("on");
		}else if(filename == "faq"){
			$(".gnb_comm li").removeClass("on");
			$(faq).addClass("on");
		}else if(filename == "terms"){
			$(".gnb_comm li").removeClass("on");
			$(terms).addClass("on");
		}else if(filename == "privacy"){
			$(".gnb_comm li").removeClass("on");
			$(privacy).addClass("on");
		}
		
		/* top으로 가기 */
		$('.link_top').click(function(e){
			e.preventDefault();
			$('.paging_introduce a.img_howser.link_page.on').removeClass('on');
			$('body,html').animate({scrollTop:0}, '200', 'swing', function() { 
				
			});
		});
		/* FAMILY SITE */
		$(document).on('click','.info_familysite .link_selected',function(e){
			e.preventDefault();
			$('.info_familysite').toggleClass('familysite_open');
		});
		
	});
	
	
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
			}
	}
	Request.animate(0);
});