$(function  () {
	function  setAjax(obj) {
		$.ajax({
			url:obj.url,
			data:obj.data,
			success:function  (e) {
				obj.callback&&obj.callback(e);
			}
		})
	}
	var url = window.location.href;
	var arr = ['平板电视','液晶电视','LED电视','等离子电视','3D电视','智能电视','网络电视','空调','变频空调','中央空调','移动空调','嵌入式空调','冷暖空调','挂壁式空调','单冷空调','风管式空调','家庭影院','冰箱','对开门冰箱','迷你冰箱','双门冰箱','三门冰箱','DVD高清播放器','蓝光dvd播放器','音响/音箱','洗衣机','滚筒洗衣机','全自动洗衣机','迷你洗衣机','干衣机','波轮洗衣机','脱水机','双缸洗衣机','热水器','燃气热水器','空气能热水器','品牌'];
	console.log(typeof _.getUrlParam('brandtitleid'));
	var num = Number(_.getUrlParam('brandtitleid'));
	num = num>36?36:num;

	setAjax({
		// 'url':'http://mmb.ittun.com/api/getbrand',
		'url':'http://mmb.ittun.com/api/getbrand',
		data:{'brandtitleid':num},
		// data:{'brandtitleid':0},
		callback:function(e) {
			$('h2').html(arr[num] + '那个牌子好');
			$('.current').html(arr[num] + '那个牌子好');
			var html = template('brand',e);
			$('.productlist>ul').html(html);
		}
	});
	var ul = document.querySelector('.productlist>ul');
	_.tap(ul,function  (e) {
		var a = e.target;
		if(! a.dataset.brandtitleid){
			a.parentNode.dataset.brandtitleid?a = a.parentNode : a = a.parentNode.parentNode;
		}
		window.localStorage.setItem('url',url);
		window.localStorage.setItem('brand',arr[num]);
		window.location.href = 'brandlist.html?brandtitleid='+a.dataset.brandtitleid;
	})
})
