define(["jquery","common/js/utility"], function($,util) {


var Paging = function(totalPage,limit,pageLimit){
	this.offset = 0;
	this.limit = limit;
	this.totalPage = totalPage;
	this.pageLimit = pageLimit;
	this.btnIndex = null;
	this.nextBtn = function(event){
		util.target.preventEvent(event);
		var curObj = event.data.obj;
		var target = util.target.get(event);
		var len = parseInt(curObj.totalPage/curObj.limit);
		var addPage = (curObj.totalPage % curObj.limit) ? 1 : 0;
		len = len + addPage;
		var index = parseInt(target.prev().text());
		curObj.InitSearch = false;
		if(index == len){
			return;
		}
	
		var selectIndex = parseInt(target.parent().children('.link_page.num.select').text())+1;
		
		target.parent().children('.link_page.num').removeClass('select');
		if(index+curObj.pageLimit == len){
			target.hide();
		}
		if(index+curObj.pageLimit > len){
			for(var i = curObj.pageLimit-1; i >= 0; i--){
				if(selectIndex == len){
					target.parent().children('.link_page.num').eq(i).addClass('select').text(len);
				}
				else
					target.parent().children('.link_page.num').eq(i).text(len);
				len --;
			}
			target.hide();
		}
		else{
			for(var i = 0; i < curObj.pageLimit; i++){
				var cur = index+i+1;
				if(i == 0){
					target.parent().children('.link_page.num').eq(i).addClass('select').text(index+i+1);
				}
				else
					target.parent().children('.link_page.num').eq(i).text(index+i+1);
			}
		}
		
		
	    index = target.parent().children('.link_page.num.select').text();
		//target.parent().children('.link_page.num').removeClass('select');
		if(!target.parent().children('.link_page.num.select').length){
			target.parent().children('.link_page.num').eq(0).addClass('select');
			 index = target.parent().children('.link_page.num.select').text();
		}
	    //target.parent().children('.link_page.num').eq(0).addClass('select');
		(curObj.btnIndex).apply(this,[index-1]);
	};
	this.prevBtn = function(event){
		util.target.preventEvent(event);
		var curObj = event.data.obj;
		var target = util.target.get(event);
		var index = parseInt(target.next().text());
			
		curObj.InitSearch = false;
		var len = index-1;
		if(index == 1){
			return;
		}
		if(!target.parent().children('.link_page.btn_next').is("visiable")){
			target.parent().children('.link_page.btn_next').show();
		}	
		if(index < curObj.pageLimit+1){
			for(var i = curObj.pageLimit; i > 0; i--){
				
				target.parent().children('.link_page.num').eq(i-1).text(i);
			}
		}else{
			for(var i = curObj.pageLimit-1; i >= 0; i--){
				target.parent().children('.link_page.num').eq(i).text(len);
				len --;
			}
		}
		index = parseInt(target.next().text());
		target.parent().children('.link_page.num').removeClass('select');
		target.parent().children('.link_page.num').eq(0).addClass('select');
		if(curObj.btnIndex){
			(curObj.btnIndex).apply(this,[index-1]);
		}

	};
	this.indexBtn = function(event){
		util.target.preventEvent(event);
		var curObj = event.data.obj;
		var target = util.target.get(event);
		var index = parseInt((target.text()));
		target.parent().children('.link_page.num').removeClass('select');
		target.addClass('select');
		if(curObj.btnIndex){
			(curObj.btnIndex).apply(this,[index-1]);
		}
	};
}	
Paging.prototype = {
		'create':function(target,pageLimit){
			var currentPage = 0;
			$(target).find('.paging_global').remove();
			if(this.totalPage == 0)
				return;
			var div = util.dom.create('div',{'class':'paging_global'});
			var span = util.dom.create('span',{'class':'inner_pages'});
			var prev = util.dom.create('a',{'class':'link_page btn_prev'});
			var prevSpan = util.dom.create('span',{'class':'ico_howser','text':'이전페이지'});
			prev.append(prevSpan);
			var next = util.dom.create('a',{'class':'link_page btn_next'});
			var nextSpan = util.dom.create('span',{'class':'ico_howser','text':'다음페이지'});
			next.append(nextSpan);
			$(prev).bind('click',{'obj':this},this.prevBtn);
			$(next).bind('click',{'obj':this},this.nextBtn);
			
			var mlen = parseInt(this.totalPage/this.limit);
			var maddPage = (this.totalPage % this.limit) ? 1 : 0;
			mlen = mlen + maddPage;
			if(mlen <= pageLimit){
				next.hide();
				prev.hide();
			}
			span.append(prev).append(next);
			div.append(span);
			
			$(target).append(div);
			
			//var len = parseInt(this.totalPage/this.limit) + 1;
			
			if(HashManager.get('offset')){
				var pageIndex = parseInt(HashManager.get('offset') / this.limit);
				currentPage = pageIndex;
				var len = parseInt(this.totalPage/this.limit);
				var del = this.totalPage%this.limit ? 1 : 0;
				len = len + del;
				var position = pageIndex % (this.pageLimit);
				var first = pageIndex - position;
				if(first + (this.pageLimit) <= len){
					for(var i=first;i < len; i++){
						var style = 'link_page num ';
						if(i == pageIndex){
							style = style +'select';
						}else if(i > ((this.pageLimit - 1) +first)){
							break;
						}
						var page = util.dom.create('a',{'class':style,'href':'#','text':i+1});
						$(page).bind('click',{'obj':this},this.indexBtn);
						$(next).before(page);
					}
				}else{
					var lastPo = len - (this.pageLimit);
					lastPo = lastPo < 0 ? 0 : lastPo;
					for(var i= (len-1); i >= lastPo; i--){
						var style = 'link_page num ';
						if(i == pageIndex){
							style = style +'select';
						}else if(i > ((this.pageLimit - 1) +first)){
							break;
						}
						var page = util.dom.create('a',{'class':style,'href':'#','text':i+1});
						$(page).bind('click',{'obj':this},this.indexBtn);
						$(prev).after(page);
					}
				}
			}else{
				var len = parseInt(this.totalPage/this.limit);
				var del = this.totalPage%this.limit ? 1 : 0;
				len = len + del;
				
				for(var i = 0; i < len; i++){
					var style = 'link_page num ';
					if(i == 0){
						style = style +'select';
					}
					if(i > pageLimit-1){
						break;
					}
					var page = util.dom.create('a',{'class':style,'href':'#','text':i+1});
					$(page).bind('click',{'obj':this},this.indexBtn);
					$(next).before(page);
				}
			}
			$(target).find('.paging_global .inner_pages').removeClass('off');
			if(len < pageLimit){
				$(target).find('.paging_global.img_global.more').css({ 'pointer-events': 'none' });
			}
			else{
				$(target).find('.paging_global .img_global.more').addClass('on');
				$(target).find('.paging_global .img_global.more').css({ 'cursor': 'pointer' });
			}
			return currentPage;
		},
		'deletePage':function(target){
			$(target).find('.paging_global').remove();
		},
		'registBtn':function(indexbtn){
			this.btnIndex = indexbtn;
		}
}
var HashManager = {
		'add' :function(value){
			location.href = (location.href).split('#')[0] + '#' + value;
		},
		'get':function(key){
			var hash = (location.href).split("#")[1];
			if(typeof hash == "undefined"){
				return null;
			}
			//hash = hash.replace(/\&$/, '');
			var index = hash.indexOf(key + "=");
			if(index < 0)
				return null;
			hash = hash.substring(index+key.length+1);
			hash = hash.split('&')[0];
			return hash;
		}
}


return Paging;

});
	
