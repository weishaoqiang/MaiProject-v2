// 国内折购js
$(function(){
    var contentBox = document.querySelector("#centent");
    getData(contentBox,function(lis){
        for(var i=0;i<lis.length;i++){
            _.tap(lis[i].children[0],function(e){
                var _this =  e.currentTarget;
                var targetid = _this.dataset.productid;
                // 点击跳转到详情页
                window.location.href="discount.html?productid="+targetid;
            });
        }
    });
})
function getData(dom,callback){
    dom.innerHTML = "";
    $.ajax({
        type:'get',
        url:'http://mmb.ittun.com/api/getinlanddiscount',
        beforeSend:function(){
            if(window.sessionStorage.getItem("inlanddiscount")){
                var data = JSON.parse(window.sessionStorage.getItem("inlanddiscount"));
                var html = template("productTemp",data);
                dom.innerHTML = html;
                return false;
            }
        },
        success:function(data){
            // 将json转成字符串并储存。
            var resultSotorage = JSON.stringify(data);
            // 将数据储存在sessionStorage中
            window.sessionStorage.setItem("inlanddiscount",resultSotorage);
            var html = template("productTemp",data);
            dom.innerHTML = html;
        },
        complete:function(data){
            // 将商品的id给
            callback && callback(dom.children);
        }
    });
}
