$(function(){
    // 返回上一页
    var back = document.querySelector(".back");
    _.tap(back,function(){
        window.history.go(-1);
    });
    // 数据渲染
    var id = _.getUrlParam("productid");
    console.log(typeof id);
    var url = "";
    if(id < 20){
        url='http://mmb.ittun.com/api/getdiscountproduct';
    }else{
        url='http://mmb.ittun.com/api/getmoneyctrlproduct';
    }
    var details = document.querySelector(".details");
    details.innerHTML = "";
    // 国内折购数据模板渲染
    discountData({
        url:url,
        id:id,
        dom:details,
        Temp:"moneyCtrlcontentTemp"
    });
})
// 得到id之后进行数据渲染。
function discountData(json){
    $.ajax({
        'type':'get',
        'url':json['url'],
        'data':{"productid":json['id']},
        success:function(data){
            var html = template(json['Temp'],data);
            json['dom'].innerHTML = html;
        }
    });
}
