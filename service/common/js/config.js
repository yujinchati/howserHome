(function(){
	var ver = '20201207';
	require.config({
		baseUrl:'../../service/',
/*		baseUrl:'https://s3.ap-northeast-2.amazonaws.com/webcontents.howser.co.kr/resources',*/
	   	 paths: {
	   		 'jquery': 'common/js/jquery-1.11.2.min', 
		     'jquery-touch': 'common/js/jquery.touchSlider',
		     'jquery-drag': 'common/js/jquery.event.drag-1.5.1.min',
		     'jquery-mobile': 'common/js/jquery.mobile-1.4.5.min',
		     'slick': 'common/js/slick'
		    },
		  shim:{
			 'jquery': {
				 exports:'$'
			 },
			 'jquery-touch':['jquery'],
			 'jquery-drag':['jquery'],
			 'jquery-mobile':['jquery']
			 
		 },	 
		 urlArgs:function(id, url) {
		        var args = 'ts=' + ver;
		        if (url.indexOf('common/js/lib/') >= 0) {
		            args = 'ts=20160720';
		        }

		        return (url.indexOf('?') === -1 ? '?' : '&') + args;
		    }

	   });
})();



