/**
 * Created by Administrator on 2016/11/5 0005.
 */
$(function(){
    var dom = $(".overseas-main > ul");
    getPage();
    function getPage(){
        var page = _.getUrlParam("pageid");
        $.ajax({
            type:'get',
            url:'http://mmb.ittun.com/api/getmoneyctrl',
            data:{"pageid":page},
            success:function(data){
                var allPage = Math.floor((data["totalCount"])/(data["pagesize"]));
                var html = template("product",data);
                dom.html(html);
            }
        });
        var html = template('pageOption',{'pageid': _.getUrlParam("pageid")});
        $('.overseas-nav').html(html);
    }
})


