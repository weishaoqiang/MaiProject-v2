/**
 * Created by 甘庆学 on 2016-11-6.
 */
$(function () {
    window.tap= function (dom,callback) {
        var isMove=false;
        var t=0;
        if(dom&&typeof dom=="object"){
            dom.addEventListener("touchstart", function () {
                t=Date.now();
            });
            dom.addEventListener("touchmove", function () {
                isMove=true;
            });
            dom.addEventListener("touchend", function (e) {
                if(isMove==false&&Date.now()-t<150){
                    callback&&callback(e);
                }
                isMove=false;
            });
        }
    }
    var titleIds=[];
    getCategoryTitle();
    //获取标题数据
    function getCategoryTitle() {
var k="";
        $.ajax({
            url:'http://mmb.ittun.com/api/getcategorytitle',
            beforeSend: function () {
                if(window.sessionStorage.getItem(k)){
                    var res=JSON.parse(window.sessionStorage.getItem(k));
                    console.log(res);
                    var html= template("category_title",res);
                    $(".category>.ul").html(html);
                    for (var i = 0; i <res.result.length; i++) {
                        titleIds.push(res.result[i].titleId);
                        getCategoryContent(res.result[i].titleId);
                    }
                    return false;
                }
            },
            success: function (res) {
                var storgeStr=JSON.stringify(res);
                k="key"+res.result[0].titleId;
                window.sessionStorage.setItem(k,storgeStr);
                var html= template("category_title",res);
                $(".category>.ul").html(html);
                for (var i = 0; i <res.result.length; i++) {
                    titleIds.push(res.result[i].titleId);
                    getCategoryContent(res.result[i].titleId);
                }
            }
        });
    }
    //获取内容数据
    function getCategoryContent(index) {
        var key="";
        //请求成功之后的操作的回调:即渲染内容
        function creatTable(res) {
            var tbodys=document.querySelectorAll("tbody");
            var tbody=document.querySelector("tbody");
            /*生成表格*/
            for (var i = 0; i < res.result.length; i++) {
                if(i%3==0){
                    var tr=document.createElement("tr");
                    tbodys[index].appendChild(tr);
                }
                var td=document.createElement("td");
                tr.appendChild(td);
                var a=document.createElement("a");
                a.innerHTML=res.result[i].category;
                td.appendChild(a);
                a.ind=res.result[i].categoryId;
            }
            //点击表格内容跳转对应链接
            window.tap(tbodys[index], function (e) {
                console.log(e.target.ind);
                var categoryid= e.target.ind;
                window.location.href ="productlist.html?categoryid="+categoryid;
            });
            var lis=document.querySelectorAll(".li");
            var tables=document.querySelectorAll("table");
            var arrows=document.querySelectorAll(".arrow1");
            //阻止默认行为
            for (var i = 0; i < lis.length; i++) {
                lis[i].onclick= function (e) {
                    e.preventDefault();
                }
                lis[i].ist=false;
            }
            //点击下拉显示
            window.tap(lis[index], function () {
                if(arrows[index].classList.contains("arrow2")){
                    for (var i = 0; i < lis.length; i++) {
                        tables[i].classList.add("none");
                        arrows[i].classList.remove("arrow2");
                        arrows[i].classList.add("arrow1");
                    }
                }else{
                    for (var i = 0; i < lis.length; i++) {
                        tables[i].classList.add("none");
                        arrows[i].classList.remove("arrow2");
                        arrows[i].classList.add("arrow1");
                    }
                    tables[index].classList.remove("none");
                    arrows[index].classList.remove("arrow1");
                    arrows[index].classList.add("arrow2");
                }
            });
        };
        $.ajax({
            url:'http://mmb.ittun.com/api/getcategory',
            data:{titleid:index},
            beforeSend: function () {
                if(window.sessionStorage.getItem(key)){
                    var res=JSON.parse(window.sessionStorage.getItem(key));
                    console.log(res);
                    creatTable(res,index);
                    return false;
                }
            },
            success: function (res) {
                var storgeStr=JSON.stringify(res);
                 key="key"+res.result[0].categoryid;
                window.sessionStorage.setItem(key,storgeStr);
                creatTable(res,index);
            }
        });
    }


});
