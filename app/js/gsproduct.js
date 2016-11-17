$(function  () {
	// 设置点击事件--------
	window.items = {
		tap:function (obj,collback) {
				var flag = true;
				var time = null;
				obj.addEventListener('touchstart',function  () {
					time = Date.now();
				});
				obj.addEventListener('touchmove',function  () {
					flag = false;
				});
				obj.addEventListener('touchend',function  (e) {
					if(Date.now() - time <150 && flag) {
						collback&&collback(e);
					}
				});
		}
	}
	function  setAjax(obj) {
		$.ajax({
		url:obj.url,
		success:function  (e) {
			obj.callback&&obj.callback(e);
			}
		})
	}
	setAjax({'url':'http://mmb.ittun.com/api/getgsshop',callback:function  (e) {
			var html = template('shop',e);
			$('.shop>ul').html(html);
	}});
	setAjax({'url':'http://mmb.ittun.com/api/getgsshoparea',callback:function  (e) {
			var html = template('area',e);
			$('.area>ul').html(html);
	}});
	//下拉---------------------
	var nav_lis = document.querySelectorAll('.filter>ul>li');
	var dropdown_divs = document.querySelectorAll('.dropdown>div');
	for (var i = 0; i < dropdown_divs.length; i++) {
		dropdown_divs[i].style.display = 'none';
	}
	var shopFlag = true;
	var areaFlag = true;
	var area_show = null;
	var shop_show = null;
	items.tap(nav_lis[0],function  () {
		for (var i = 0; i < dropdown_divs.length; i++) {
			dropdown_divs[i].style.display = 'none';
			nav_lis[i].classList.remove('temp')
		}
		if(shopFlag){
			shopFlag = false;
			areaFlag = true;
			dropdown_divs[0].style.display = 'block';
			nav_lis[0].classList.add('temp');
		}else {
			shopFlag = true;
			nav_lis[0].classList.remove('temp');
		}
		shop_show = document.querySelector('.shop').style.display;
	});
	items.tap(nav_lis[1],function () {
		for (var i = 0; i < dropdown_divs.length; i++) {
			dropdown_divs[i].style.display = 'none';
			nav_lis[i].classList.remove('temp')
		}
		if(areaFlag){
			areaFlag = false;
			shopFlag = true;
			dropdown_divs[1].style.display = 'block';
			nav_lis[1].classList.add('temp');
		}else {
			areaFlag = true;
			nav_lis[1].classList.remove('temp');
		}
		area_show = document.querySelector('.area').style.display;
	});
	//下拉框回收---------
	var body = document.querySelector('body');
	window.addEventListener('scroll',function  () {
		if(area_show || shop_show){
			document.querySelector('.shop').style.display = "none";
			document.querySelector('.area').style.display = "none";
			nav_lis[1].classList.remove('temp');
			nav_lis[0].classList.remove('temp');
			shopFlag = true;
			areaFlag = true;
		}
	})
	var stop_lis = null;
	var area_lis = null;
	setTimeout(function  () {
			stop_lis = document.querySelectorAll('.shop>ul>li');
			for (var i = 0; i < stop_lis.length; i++) {
				items.tap(stop_lis[i],function(e) {
					var temp = document.querySelector('.filter>ul>.temp')
					e.target.parentNode.querySelector('.on').classList.remove('on');
					e.target.classList.add('on');
					temp.querySelector('a').innerHTML = e.target.innerHTML + '<i></i>';
					e.target.parentNode.parentNode.style.display = 'none';
					areaFlag = true;
					shopFlag = true;
					temp.dataset.shopid = e.target.dataset.shopid;
					temp.classList.remove('temp');
					setproduct();
				});
			}
			area_lis = document.querySelectorAll('.area>ul>li');
			for (var i = 0; i < area_lis.length; i++) {
				items.tap(area_lis[i],function(e) {
					var temp = document.querySelector('.filter>ul>.temp')
					e.target.parentNode.querySelector('.on').classList.remove('on');
					e.target.classList.add('on');
					var str = e.target.innerHTML;
					var a = str.indexOf('（');
					var html = str.slice(0,a);
					temp.querySelector('a').innerHTML =html + '<i></i>';
					e.target.parentNode.parentNode.style.display = 'none';
					areaFlag = true;
					shopFlag = true;
					temp.dataset.areaid = e.target.dataset.areaid;
					temp.classList.remove('temp');
					setproduct();
				});
			}
	},500);
	function  setproduct() {
		var a = nav_lis[0].dataset.shopid;
		var b = nav_lis[1].dataset.areaid;
		setAjax({'url':'http://mmb.ittun.com/api/getgsproduct?shopid='+a+'&areaid='+b,callback:function  (e) {
				var html = template('product',e);
				$('.main').html(html);
		}})
	}
	setproduct();
})
