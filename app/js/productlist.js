/**
 * Created by Administrator on 2016-11-5.
 */
$(function () {
    window.getTitle= function (categoryid) {
        $.ajax({
            type:"get",
            url:"http://mmb.ittun.com/api/getcategorybyid",
            data:{categoryid:categoryid},
            success: function (result) {
                $("#bjCategory").html(result.result[0].category);
            }
        });
    }
    window.getContent=function (categoryid,pageid) {
        if(!pageid){
            pageid=1;
        }
        var productKey="";
        function creatProductlist(result) {
                var pagesize=result.pagesize;
                var totalCount=result.totalCount;
                var pageCount=Math.ceil(totalCount/pagesize);
                console.log("总页数:"+pageCount);
                //下拉分页
                var pageArr=[];
                for (var i = 0; i < pageCount; i++) {
                    pageArr.push(i);
                }
                var transmitHtml=template("transmitPage",{items:pageArr});
                $("#select").html(transmitHtml);
                document.querySelector("#select").value=pageid;
                $("#select").on("change", function () {
                    console.log("下拉框页码:"+this.value);
                    window.location.href="productlist.html?categoryid="+categoryid+"&pageid="+this.value;
                });
                //上一页,下一页
                var prev=document.querySelector(".prev");
                var next=document.querySelector(".next");
                prev.onclick= function (e) {
                    e.preventDefault();
                }
                next.onclick= function (e) {
                    e.preventDefault();
                }
                _.tap(prev, function () {
                    pageid--;
                    if(pageid<=1){
                        pageid=1;
                    }
                    console.log("当前页:"+pageid);
                    window.location.href="productlist.html?categoryid="+categoryid+"&pageid="+pageid;
                });
                _.tap(next, function (e) {
                    pageid++;
                    if(pageid>=pageCount){
                        pageid=pageCount;
                    }
                    console.log("当前页:"+pageid);
                    window.location.href="productlist.html?categoryid="+categoryid+"&pageid="+pageid;
                });
                //引用渲染输出
                var html_ct=  template("bj_ct",result);
                $(".contain_ct").html(html_ct);
                var as=document.querySelectorAll(".contain_ct>li>a");
                var contain= document.querySelector(".contain_ct");
                for(var j=0;j<as.length;j++){
                    as[j].index=result.result[j].productId;
                    //    阻止默认跳转
                    as[j].onclick= function (e) {
                        e.preventDefault();
                    }
                }
                for(var j=0;j<as.length;j++){
                    _.tap(as[j], function (e) {
                        console.log(e.currentTarget);
                        var k=e.currentTarget.index;
                        console.log(k);
                        window.location.href="bijia.html?productid="+k+"&categoryid="+categoryid;
                    });
                }
        }
        $.ajax({
            //传过来的回调:渲染页面的代码块
            type:"get",
            url:"http://mmb.ittun.com/api/getproductlist",
            data:{categoryid:categoryid,pageid:pageid},
            beforeSend: function () {
              if(window.sessionStorage.getItem(productKey)){
                  var result=JSON.parse(window.sessionStorage.getItem(productKey));
                  console.log(result);
                  creatProductlist(result);
                  return false;
              }
            },
            success: function (result) {
                var storgeStr=JSON.stringify(result);
                productKey="key"+result.result[0].productId;
                console.log(result.result);
                window.sessionStorage.setItem(productKey,storgeStr);
               creatProductlist(result);
            }
        });
    }
    var  i = _.getUrlParam("categoryid");
    var s= _.getUrlParam("pageid");
    if(!s){
        s=1;
    }
    if(!i){
        i=0;
    }
        window.getTitle(i);
        window.getContent(i,s);
        $("#bjCategory").on("click", function () {
            window.getTitle(i);
        }) ;
    console.log("传过来的页数"+s);
});
