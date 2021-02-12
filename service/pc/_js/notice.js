define(["jquery",'../../common/js/utility'], function($,util) {
	var gOffset = 0;
	var gLimit = 10;
	var pageLimit = 5;
	var Notice = {
		'init':function(e){
			$("#header").load("./header.html",function(){});
			$("#footer").load("./footer.html",function(){})
			$(document).on('click','.list_notice .detail_item .notice_name',function(e){
				util.target.preventEvent(e);
				$(this).closest(".list_notice li").toggleClass("on");
			});
			$(document).on('click','.list_notice .detail_item .notice_arrow',function(e){
				util.target.preventEvent(e);
				$(this).closest(".list_notice li").toggleClass("on");

			});
		}
}
var Layout = {
	'noticeList':function(data) {
		for(var i = 0; i < data.length; i ++){
			var li = util.dom.create('li',{'value':data[i].srl});
			var titDiv = util.dom.create('div',{'class':'detail_item'});
			var updDate  =  data[i].regDate.replace(/-/gi, '.').substring(0,10);
			var titDate = util.dom.create('span',{'class':'notice_head notice_date','text':updDate});
			var titLink = util.dom.create('a',{'class':'notice_head notice_name'});
			var titLinkDetail = util.dom.create('strong',{'class':'detail_name','text':data[i].title});
			titLink.append(titLinkDetail);
			var titArrow = util.dom.create('a',{'class':'notice_head notice_arrow'});
			var titArrowIco = util.dom.create('span',{'class':'img_howser ico_folder','text':'펼치기'});
			titArrow.append(titArrowIco);
			titDiv.append(titDate).append(titLink).append(titArrow);
			
			var descCont = decodeURIComponent(data[i].contnt);
			var descDiv = util.dom.create('div',{'class':'desc_item','html':descCont});

			li.append(titDiv).append(descDiv);
			$('.cont_notice .list_notice').append(li);
		}
	},
	'Paging':function(data){
		var totalCnt = data;
		if(!Paging)
			Paging = new paging(totalCnt,gLimit,pageLimit);
		
		Paging.create($('#mArticle'),pageLimit);
		if(totalCnt > gLimit){
			Paging.registBtn(function(index){
				//init param
				var param = {'limit':gLimit,'offset':index*gLimit,'subscribers':'HOMEPAGE'};
				//create table
				Request.getNoticeList(param,false);
			});
		}else{
			$('.info_section .list_notice').css('margin-bottom','150px');
			$('.info_section .paging_global').remove();
		}
	}
}
return Notice;

});
	
