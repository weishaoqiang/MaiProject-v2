/**
 * Created by Administrator on 2016/11/5.
 */

$(function () {
    function reading_start(data) {
        var proname= window.localStorage.getItem('proname');
        var prvurls = window.localStorage.getItem('prvurl');
        console.log(prvurls);
        $.ajax({
            type:'get',
            //url:'http://mmb.ittun.com/api/getproduct',
            url:'http://mmb.ittun.com/api/getproduct',
            data:{productid:data["productid"]},
            success:function(result){
                var result_key = result.result[0];
                $('.product_write').html(result_key.productName);
                $('.product_img').html(result_key.productImg);
                $('.some_shop').html(result_key.bjShop);
                var str_all =result_key.productName.split(' ');
                $('.font_nav:nth-of-type(3)').html(str_all[0]+' '+str_all[1]);
            }
        });
        $.ajax({
            type:'get',
            //url:'http://mmb.ittun.com/api/getproductcom',
            url:'http://mmb.ittun.com/api/getproductcom',
            data:{productid:data["productid"]},
            success:function(result){
                $('.tab a:nth-of-type(3)').html("评价("+result.result.length+")");
                $('.tab a:nth-of-type(1)').html("比较商品");
                $('.tab a:nth-of-type(2)').html("产品参数");
                var result_key2=result.result;
                var html ='';
                $(result_key2).each(function(index,value){
                    html+="<div class='product_evaluate_boss'>" +
                        "<span class='comName'>" +this.comName+
                        "</span>" +
                        "<span class='comTime'>" +this.comTime+
                        "</span>" +
                        "</div> "+
                        "<div class='comFrom'>" +this.comFrom+
                        "</div>"+
                        "<div class='write'>" +this.comContent+
                        "</div>"
                });
                $('.product_evaluate').html(html);
            }
        });
        var key_categoryid=data["categoryid"];
        $.ajax({
            type:'get',
            //url:'http://mmb.ittun.com/api/getcategorybyid',
            url:'http://mmb.ittun.com/api/getcategorybyid',
            data:{categoryid:key_categoryid},
            success:function(result){
                    console.log(result);
                if(result.length==0){
                    var str =result.result[0].category;
                    console.log(result);
                    $('.font_nav:nth-of-type(2)').html(str+'>').attr('href',"productlist.html?categoryid="+key_categoryid);
                }else {
                    $('.font_nav:nth-of-type(2)').html(proname+'>').attr('href',prvurls);
                }
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
    console.log(searchObj);
});
