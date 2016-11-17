/**
 * Created by Administrator on 2016/11/5 005.
 */

$(function(){

    $.ajax({
        type:"get",
        url:"http://mmb.ittun.com/api/getsitenav",
        data:{},
        success:function(data){
            var data = data.result;
            var html = template("sitenavLogo",{"logoTems":data});
            $(".sitenav-logo").html(html);
            console.log(html);
        }
    })
});


$(function(){

});
