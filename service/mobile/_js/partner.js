define(["jquery",'../../common/js/utility','common/js/network'], function($,util,webapi) {
var partner = {
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
			/* input, textarea */
			$('.box_input .input_comm .inp_g').focus(function(e){
				util.target.preventEvent(e);
				var target = util.target.get(e);
				target.parent().removeClass("input_on");
				target.parent().removeClass("input_wrong");
				target.parent().addClass('input_on');
				target.parent().siblings('.emph_error').hide();
			});
			$('.box_input .input_comm .inp_g').blur(function(e){
				util.target.preventEvent(e);
				var target = util.target.get(e);
				target.parent().removeClass("input_on");
				target.parent().removeClass("input_wrong");
			});
			$(".tf_etc").focus(function(){
				$(this).addClass("on");
				$(".tf_etc").text("");
			});
			$(".tf_etc").blur(function(){
				$(this).removeClass("on");
			});
			$('.box_input .input_comm .inp_g, .tf_etc').keyup(function(e){
				util.target.preventEvent(e);
				util.bindInputBox(e);
			});
			$('.txt_placeholder').click(function(){
				$(this).next().focus();
			});
			$('.box_input .input_comm .btn_delete').click(function(e){
				util.target.preventEvent(e);
				$(this).prev().val("");
				if($("#userAddress").val().length==0){
					$(this).siblings('.txt_placeholder').removeClass('screen_out');
				}else{
					$(this).siblings('.txt_placeholder').addClass('screen_out');
				}
				$('#userAddress').blur(function(e){
					if($("#userAddress").val().length==0){
						$(this).prev().removeClass('screen_out');
					}else{
						$(this).prev().addClass('screen_out');
					}
				});
			});
			/* 라디오박스 */
			$(".radio_comm input[type=radio]").click(function(e){
				var target = util.target.get(e);
				$(".radio_comm").removeClass("check_on");
				target.closest(".radio_comm").addClass("check_on");
				target.parent().siblings('.emph_guide').hide();
			});
			/* 체크박스 */
			$(".check_comm input[type=checkbox]").change(function(e){
				var target = util.target.get(e);
				if(target.is(":checked")){
					target.closest(".check_comm").addClass("check_on");
					target.next().children().addClass("ico_focused");
					target.prop("checked",true);
					target.attr("checked","checked");
					target.parent().siblings('.emph_error').hide();
				}else{
					target.closest(".check_comm").removeClass("check_on");
					target.next().children().removeClass("ico_focused");
					target.prop("checked",false);
					target.removeAttr("checked");
				}
			});
			/* 서비스 체크박스 */
			$(".check_service input[type=checkbox]").change(function(e){
				var target = util.target.get(e);
				
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
			/* 포워딩 */
			if(util.HashManager.get('service') && util.HashManager.get('service') == "forwarding"){
				$('#userForwarding').trigger('click');
			}
			
			$('#partnerForm').submit(function(e){
				util.target.preventEvent(e);
				if(partner.validateForm()){
					var serviceStr = '';
		               $(".check_service input:checked").each(function() {
		                  if(serviceStr){
		                     serviceStr = serviceStr + " / " + $(this).val();
		                  }
		                  else{
		                     serviceStr = "[" + $(this).val();
		                  }
		                  
		               });
		               serviceStr = serviceStr + "]";
		               if($('#userForwarding').is(":checked")){
		            	   var data ={
		            			   "senderName":$('#nameClient').val(),
		            			   "contents" :$(".box_service .lab_g").text()+":&nbsp;&nbsp;"+ serviceStr +"<br><br>"+
		            			   $("label[for=userAddress]").text()+":&nbsp;&nbsp;"+$('#userAddress').val()+"<br><br>"+
		            			   $("label[for=userPhone]").text()+":&nbsp;&nbsp;"+$('#userPhone').val()+"<br><br>"+
		            			   $("label[for=userCellphone]").text()+":&nbsp;&nbsp;"+$('#userCellphone').val()+"<br><br>"+
		            			   $("label[for=userEmail]").text()+":&nbsp;&nbsp;"+$('#userEmail').val()+"<br><br>"+
		            			   $("label[for=departureName]").text()+":&nbsp;&nbsp;"+$('#departureName').val()+"<br><br>"+
		            			   $("label[for=departurePort]").text()+":&nbsp;&nbsp;"+$('#departurePort').val()+"<br><br>"+
		            			   $("label[for=arrivalPort]").text()+":&nbsp;&nbsp;"+$('#arrivalPort').val()+"<br><br>"+
		            			   $("label[for=importItem]").text()+":&nbsp;&nbsp;"+$('#importItem').val()+"<br><br>"+
		            			   $("label[for=amountItem]").text()+":&nbsp;&nbsp;"+$('#amountItem').val()+"<br><br>"+
		            			   $("label[for=tradeTerms]").text()+":&nbsp;&nbsp;"+$('#tradeTerms').val()+"<br><br>"+
		            			   $("label[for=hopeDate]").text()+":&nbsp;&nbsp;"+$('#hopeDate').val()+"<br><br>"+
		            			   $("label[for=freightInbound]").text()+":&nbsp;&nbsp;"+$('#freightInbound').val()+"<br><br>"+
		            			   $("label[for=userEtc]").text()+":&nbsp;&nbsp;"+$('#userEtc').val()+"<br><br>"
		            			   ,
		            			   "subject": serviceStr + "_" + $(".radio_comm input:checked").prev().text()+ "_" + $('#nameCompany').val(),
		            	   };
		               }else{
			               var data ={
			                     "senderName":$('#nameClient').val(),
			                     "contents" :$(".box_service .lab_g").text()+":&nbsp;&nbsp;"+ serviceStr +"<br><br>"+
			                                 $("label[for=userAddress]").text()+":&nbsp;&nbsp;"+$('#userAddress').val()+"<br><br>"+
			                                 $("label[for=userPhone]").text()+":&nbsp;&nbsp;"+$('#userPhone').val()+"<br><br>"+
			                                 $("label[for=userCellphone]").text()+":&nbsp;&nbsp;"+$('#userCellphone').val()+"<br><br>"+
			                                 $("label[for=userEmail]").text()+":&nbsp;&nbsp;"+$('#userEmail').val()+"<br><br>"+
			                                 $("label[for=userEtc]").text()+":&nbsp;&nbsp;"+$('#userEtc').val()+"<br><br>"
			                     ,
			                     "subject": serviceStr + "_" + $(".radio_comm input:checked").prev().text()+ "_" + $('#nameCompany').val(),
			               };
		               }
		               webapi.putMail(data,function(res){
							$(".desc_info").hide();
							$("#partnerForm").hide();
							$('.fw_b').text($('#nameClient').val())
							$(".area_complete").show();
							$("body").scrollTop(0)
							
						},function(e){
							alert("메일 발송을 실패하였습니다. 고객 센터에 문의해주세요.");
							
						});
				}
			});
			$(".area_complete .btn_comm").click(function(e){
				location.href="/home"
			});
		},
		'validateForm':function(){
			var errmsg = '';
			$('.emph_error').text('').hide();
			$('.emph_guide').removeClass('emph_r');
			$('.emph_error').removeClass("on");
			var data;
			if(!$(".check_service input:checked").prev().text()){
				errmsg = '문의할 서비스를 선택해주세요.';
				$(".box_service").find(".emph_guide").addClass("emph_r");
				$(".box_service").find(".emph_guide").text(errmsg);
				data = false;
			}
			if(!$('#userAddress').val()){
				$('#userAddress').parent().addClass("input_wrong");
				errmsg = '주소를 입력해 주세요.';
				$("#userAddress").parent().siblings('.emph_error').text(errmsg).show();
				data = false;
			}
			if(!$(".radio_comm input:checked").prev().text()){
				errmsg = '서비스 중인 업종을 선택해 주세요.';
				$(".radio_comm").siblings(".emph_guide").addClass("emph_r");
				$(".radio_comm").siblings(".emph_guide").text(errmsg);
				data = false;
			}
			if(!$('#nameCompany').val()){
				$('#nameCompany').parent().addClass("input_wrong");
				errmsg = '상호명을 입력해 주세요.';
				$("#nameCompany").parent().siblings('.emph_error').text(errmsg).show();
				data = false;
			}
			if(!$('#nameClient').val()){
				$('#nameClient').parent().addClass("input_wrong");
				errmsg = '문의하신분의 이름을 입력해 주세요.';
				$("#nameClient").parent().siblings('.emph_error').text(errmsg).show();
				data = false;
			}
			if(!$('#userPhone').val()){
				$('#userPhone').parent().addClass("input_wrong");
				errmsg = '전화번호를 입력해 주세요.';
				$('#userPhone').parent().siblings('.emph_error').text(errmsg).show();
				data = false;
			}
			else{
				var regExp = /^[0-9-]+$/;
				if ( !regExp.test( $('#userPhone').val() ) ) {
					$('#userPhone').parent().addClass("input_wrong");
					errmsg = '전화번호를 확인 후 다시 입력해 주세요.';
					$('#userPhone').parent().siblings('.emph_error').text(errmsg).show();
					data = false;
				}
			}
			if(!$('#userCellphone').val()){
				$('#userCellphone').parent().addClass("input_wrong");
				errmsg = '휴대폰 번호를 입력해 주세요.';
				$('#userCellphone').parent().siblings('.emph_error').text(errmsg).show();
				data = false;
			}
			else{
				var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
				if ( !regExp.test( $('#userCellphone').val() ) ) {
					$('#userCellphone').parent().addClass("input_wrong");
					errmsg = '휴대폰 번호를 확인 후 다시 입력해 주세요.';
					$('#userCellphone').parent().siblings('.emph_error').text(errmsg).show();
					data = false;
				}
			}
			if(!$('#userEmail').val()){
				$('#userEmail').parent().addClass("input_wrong");
				errmsg = '이메일 주소를 입력해 주세요.';
				$('#userEmail').parent().siblings('.emph_error').text(errmsg).show();
				data = false;
			}
			else{
				if(!(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($('#userEmail').val()))) {
					$('#userEmail').parent().addClass("input_wrong");
					errmsg = '이메일 주소를 확인 후 다시 입력해 주세요.';
					$('#userEmail').parent().siblings('.emph_error').text(errmsg).show();
					data = false;
				} 
			}
			if(!$(".check_comm input").is(':checked')){
				errmsg = "'개인정보 수집 및 이용약관'에 대해 동의해 주셔야 문의를 등록할 수 있습니다.";
				$(".check_comm").siblings(".emph_error").text(errmsg).show();
				data = false;
			}
			/* 포워딩 영역 시작 */
			if($('#userForwarding').is(":checked")){
				if(!$('#departureName').val()){
					$('#departureName').parent().addClass("input_wrong");
					errmsg = '출발지를 입력해 주세요.';
					$("#departureName").parent().siblings('.emph_error').text(errmsg).show();
					data = false;
				}
				if(!$('#departurePort').val()){
					$('#departurePort').parent().addClass("input_wrong");
					errmsg = '출발항구명을 입력해 주세요.';
					$("#departurePort").parent().siblings('.emph_error').text(errmsg).show();
					data = false;
				}
				if(!$('#arrivalPort').val()){
					$('#arrivalPort').parent().addClass("input_wrong");
					errmsg = '입항항구명을 입력해 주세요.';
					$("#arrivalPort").parent().siblings('.emph_error').text(errmsg).show();
					data = false;
				}
				if(!$('#importItem').val()){
					$('#importItem').parent().addClass("input_wrong");
					errmsg = '수입품목을 입력해 주세요.';
					$("#importItem").parent().siblings('.emph_error').text(errmsg).show();
					data = false;
				}
				if(!$('#amountItem').val()){
					$('#amountItem').parent().addClass("input_wrong");
					errmsg = '물량을 입력해 주세요.';
					$("#amountItem").parent().siblings('.emph_error').text(errmsg).show();
					data = false;
				}
				if(!$('#tradeTerms').val()){
					$('#tradeTerms').parent().addClass("input_wrong");
					errmsg = '거래조건을 입력해 주세요.';
					$("#tradeTerms").parent().siblings('.emph_error').text(errmsg).show();
					data = false;
				}
				if(!$('#hopeDate').val()){
					$('#hopeDate').parent().addClass("input_wrong");
					errmsg = '희망일정을 입력해 주세요.';
					$("#hopeDate").parent().siblings('.emph_error').text(errmsg).show();
					data = false;
				}
				if(!$('#freightInbound').val()){
					$('#freightInbound').parent().addClass("input_wrong");
					errmsg = '화물입고지를 입력해 주세요.';
					$("#freightInbound").parent().siblings('.emph_error').text(errmsg).show();
					data = false;
				}
			}
			/* 포워딩 영역 끝 */
			if(data==false){
				if($(".input_comm").hasClass("input_wrong")){
					$("body").scrollTop(($(".input_wrong").eq(0).offset().top)-160);
				}
				return false;
			}else{
				return true;
			}
		}
}
return partner;

});
	
