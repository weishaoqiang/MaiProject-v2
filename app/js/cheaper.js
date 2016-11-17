/*
* @Author: Administrator
* @Date:   2016-11-05 16:15:05
* @Last Modified by:   Administrator
*/
$(function() {
	var nav=$("nav");
	var navW=nav.width();
	var navUl=$("nav ul");
	var main=$("main");
	var data=null;
	var navSearch=$("nav .search");
	var navHidden=$("nav .hidden");
	var loading=$(".loading");
	nav.css("display","none");
	getMain(0);//首次加载main部分的数据
	$.ajax({	//请求nav的数据
		type:'GET',
		url:'http://mmb.ittun.com/api/getbaicaijiatitle',
		data:{},
		beforeSend:function(){
			var navList=window.sessionStorage.getItem("navKey");
			if(navList!=null){
				navList=JSON.parse(navList);
				nav.css({"display":"block"});
				var html=template("cheaperNav",navList);
				navUl.html(html);
				return false;
			}
		},
		success:function(result){
			nav.css({"display":"block"});
			var html=template("cheaperNav",result);
			navUl.html(html);
			var navValue=JSON.stringify(result);
			window.sessionStorage.setItem("navKey",navValue);
		},
		complete:function(){
			//导航栏nav部分的拖动事件和点击事件(开始)
			var ul=$("nav ul");
			var lis=$("nav ul li");
			var ulW=65*lis.length;
			ul.width(ulW);
			var maxW=0;
			var minW=navW-ulW-60;
			var bounceMaxW=maxW+60;
			var bounceMinW=minW-60;
			var startX=0;
			var moveX=0;
			var distanceX=0;
			var currentX=0;
			nav[0].addEventListener("touchstart", function(e){
				startX=e.touches[0].clientX;
			});
			nav[0].addEventListener("touchmove", function(e){
				moveX=e.touches[0].clientX;
				distanceX=moveX-startX;
				if(currentX+distanceX>bounceMaxW){
					currentX=bounceMaxW;
					noTrans(ul,currentX);
				}else if(currentX+distanceX<bounceMinW){
					currentX=bounceMinW;
					noTrans(ul,currentX);
				}else{
					noTrans(ul,currentX+distanceX);
				}
			});
			nav[0].addEventListener("touchend", function(e){
				if(currentX+distanceX<minW){
					currentX=minW;
					useTrans(ul,currentX);
				}else if(currentX+distanceX>maxW){
					currentX=maxW;
					useTrans(ul,currentX);
				}
				else{
					currentX+=distanceX;
				}
			});
			ul.tap(function(e){
				var index=$(e.target).index();
				var liW=$(e.target).width();
				var h1=$("header h1");
				var text=$(e.target).text();
				if($(e.target).index()==0){
					h1.text("白菜价-淘宝内部劵");
				}else{
					h1.text(text+"-白菜价");
				}
				if(-index*liW<minW){
					currentX=minW;
					useTrans(ul,currentX);
				}else{
					useTrans(ul,-index*liW);
					currentX=-index*liW;
				}
				var titleid=$(e.target).data("titleid");
				$(e.target).data("titleid");
				getMain(titleid);
				$(e.target).siblings().css({
					"border":0,
					"color":"black"
				});
				$(e.target).css({
				"color":"red",
				"border-bottom":"2px solid red"
				});
			})

			function noTrans(dom,distance){		//变化过程不使用过度效果实现
				dom.css("webkitTransition","none");
				dom.css("webkitTransform","translateX("+distance+"px)");
				dom.css("transition","none");
				dom.css("transform","translateX("+distance+"px)");
			}
			function  useTrans(dom,distance){		//变化过程使用过度效果实现
				ul.css("webkitTransition","all 0.3s");
				ul.css("webkitTransform","translateX("+distance+"px)");
				ul.css("transition","all 0.3s");
				ul.css("transform","translateX("+distance+"px)");
			}
		}
		//导航栏nav部分的点击和拖动事件(结束)
	});

	navSearch.tap(function(){
		navHidden.toggleClass('block');
		$(this).toggleClass('delete');
	})
	function getMain(titleid){	//main部分发生的ajax
		var key="cheaper"+titleid;
		$.ajax({
		type:'GET',
		url:'http://mmb.ittun.com/api/getbaicaijiaproduct',
		data:{"titleid":titleid},
		beforeSend:function(){
			loading.css("display","block");//控制发生请求前，请求未成功时loading的显示
			var value=window.sessionStorage.getItem(key);//读取本地数据
			if(value!=null){
				var data=JSON.parse(value);
				var html=template("cheaperItem",data);
				$("main").html(html);
				loading.css("display","none");//控制load在数据请求成功之后隐藏
				return false;
			}
		},
		success:function(data){
			var html=template("cheaperItem",data);
			$("main").html(html);
			loading.css("display","none");//控制load在数据请求成功之后隐藏
			var str=JSON.stringify(data);//将数据转成字符串
			window.sessionStorage.setItem(key,str);//将转字符串后的数据存到本地
		}
	})
	}


})
