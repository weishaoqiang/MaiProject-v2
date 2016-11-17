/**
 * Created by Administrator on 2016/11/7 007.
 */

$(function () {


    function getLisData(fun) {
        $.ajax({
            type: "get",
            url: "http://192.168.37.76:9090/api/getbrandtitle",
            data: {},
            success: function (data) {
                var data = data.result
                fun && fun(data);
            }
        });
    };
    getLisData(function (data) {
        var html = template("hot", {"hottems": data});
        $(".hot-product").html(html);

        //console.log(data);

    });
    setTimeout(function () {
        var hotProduct = $(".hot-product ul li a");
        //console.log(hotProduct);
        var $span = $("<span class='icon-font'>&#xe65e;</span>");
        hotProduct.append($span);
        var hotLis = $(".hot-product ul li a");
        var hot = $(".hot-product");
        var divs = $(".hot-product>div");
        //console.log(hot)

        //divs.each(function (key, val) {
        //    $(val).find("div").hide();
        //    var h3 = $(val).find("h3")
        //
        //    tap(h3[0], function () {
        //        $(val).find("div").toggle();
        //    });
        //})


        divs.each(function (key, val) {
            //$(val).find("div").hide();
            var h3 = $(val).find("h3");
            $(val).find("div").css({
                "height": "0",
                "overflow": "hidden",
                "transition": "all .5s",
                "-webkit-transition": "all .5s"
            });
            tap(h3[0], function () {
				divs.each(function (key, val) {
					$(val).find("div").height("0");
				});
                var lis = $(val).find("div li");
                var lisHeight = lis.length * 40 + "px";
                console.log(lisHeight);
                if (!h3.hasClass("show")) {
                    $(val).find("div").height(lisHeight);
                } else {
                    $(val).find("div").height("0");
                }
                h3.toggleClass("show");
            });
        })

    }, 200);

})

function tap(dom, callback) {
    /*1.不能滑动过
     * 2.end与start时间间隔一般在150ms内*/
    var isMove = false;//标记是否滑动过
    var startTime = 0;//记录开始触摸的时间
    dom.addEventListener("touchstart", function (e) {
        /*记录开始触摸时间--以毫秒做为单位*/
        startTime = Date.now();
    });
    dom.addEventListener("touchmove", function (e) {
        isMove = true;
    });
    dom.addEventListener("touchend", function (e) {
        if (isMove == false && Date.now() - startTime <= 150) {
            callback && callback(e);
        }
        /*重置标记是否滑动*/
        isMove = false;
    });

}