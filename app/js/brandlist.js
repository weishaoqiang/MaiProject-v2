/**
 * Created by Administrator on 2016/11/7.
 */
$(function () {

    /*获取本地存储*/
    var str_brand = window.localStorage.getItem('brand');
    var str_url = window.localStorage.getItem('url');
    var str_now_url=window.location.href;
    console.log(str_url);
    console.log(str_brand);
    window.itams={
        tap:function(obj,callback){
            var flag =true;
            var data_time;
            obj.addEventListener('touchstart',function(){
                data_time = Date.now()
            })
            obj.addEventListener('touchmove',function(e){
                flag=false;
            })
            obj.addEventListener('touchend',function(){
                var data_over = Date.now();
                var sul =data_over-data_time;
                if(sul<150&& flag ){
                    callback&&callback();
                }
            })
        }
    };

    $.ajax({
        type:'get',
        //url:'http://mmb.ittun.com/api/getbrandtitle',
        url:'http://mmb.ittun.com/api/getbrandtitle',
        success:function(result){
            console.log(result.result)
        }
    });
    $.ajax({
        type:'get',
        //url:'http://mmb.ittun.com/api/getbrand',
        url:'http://mmb.ittun.com/api/getbrand',
        data:{brandtitleid:1},
        success:function(result){
            console.log(result.result)
        }
    });
function reading_start(searchObj){
    console.log(searchObj);
    $.ajax({
        type: 'get',
        //url: 'http://mmb.ittun.com/api/getbrandproductlist',
        url: 'http://mmb.ittun.com/api/getbrandproductlist',
        data: {brandtitleid:searchObj.brandtitleid},
        success: function (result) {

            var html = '';
            var result_all = result.result;
            //console.log(result_all);
            $(result_all).each(function (index, value) {
                html += "<li data-style="+value.productId+" data-name="+value.brandName+">" +
                    "<div class='left_pic'>" + value.productImg +
                    "</div>" +
                    "<div class='ri_write'>" +
                    "<div class='ri_info'>" +
                    "<div>" + value.productName +
                    "</div>" +
                    "</div>" +
                    "<div class='ri_price'>" + value.productPrice +
                    "</div>" +
                    "<div class='ri_other'>" +
                    "<span>" + value.productQuote +
                    "</span>&nbsp;&nbsp;<span>" + value.productCom +
                    "</span>" +
                    "</div>" +
                    "</div>" +
                    "</li>";
            });
            $('.pro_list ul').html(html);
            //console.log(result_all[0].brandName);
            $('.font_nav').eq(2).html(str_brand).next().append(result_all[0].brandName);
            $('.seturl').attr('href',str_url);
                var pro_li_all = document.querySelectorAll('li');
                //console.log(pro_li_all);
                $.each(pro_li_all,function(index,value){
               /*     console.log(value);*/
                    var url_key = $(value).data('style');
                    var url_name= $(value).data('name');
                 /*   console.log(url_key);*/
                    itams.tap(value, function () {

                      /*  window.location.href = 'http://mmb.ittun.com/api/getproductcom?productid=' +url_key;*/
                        window.location.href = 'bijia.html?productid='+url_key;
                        window.localStorage.setItem('proname',url_name);
                        window.localStorage.setItem('prvurl',str_now_url);
                    })
                })
        }
    });
}
    function searchParse() {
        var resultObj = {};
        var search = window.location.search;
        if (search && search.length > 1) {
            var search = search.substring(1);
            var items = search.split('&');
            for ( var index = 0; index < items.length; index++) {
                if (!items[index]) {
                    continue;
                }
                var kv = items[index].split('=');
                resultObj[kv[0]] = typeof kv[1] === "undefined" ? "" : kv[1];
            }
        }
        return resultObj;
    }
    var searchObj = searchParse();
    reading_start(searchObj);

});
